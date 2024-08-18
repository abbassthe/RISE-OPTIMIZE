import numpy as np
import random
import torch
from torch import nn
from torch.utils.data import Dataset, DataLoader
from tqdm import tqdm
import os 

os.environ['KMP_DUPLICATE_LIB_OK']='True'

# Use GPU if available, otherwise use CPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

class RatingDataset(Dataset):
    def __init__(self, train, label):
        self.feature_ = train
        self.label_ = label

    def __len__(self):
        return len(self.feature_)

    def __getitem__(self, idx):
        return torch.tensor(self.feature_[idx], dtype=torch.long), torch.tensor(self.label_[idx])

class MatrixFactorization(torch.nn.Module):
    def __init__(self, n_bio, n_factors=20):
        super().__init__()
        self.bio_factors = torch.nn.Embedding(n_bio, n_factors)
        torch.nn.init.xavier_uniform_(self.bio_factors.weight)
        self.log_sigmoid = nn.LogSigmoid()

    def forward(self, pos_idxs, ys, neg_idxs, num_neg=10):
        u = self.bio_factors(pos_idxs[0])
        v = self.bio_factors(pos_idxs[1])
        alpha = torch.log(torch.sqrt(ys) + 1.) + 1.
        positive_loss = -alpha * self.log_sigmoid(torch.sum(u * v, dim=1)).squeeze()

        nu = self.bio_factors(neg_idxs[0])
        nv = self.bio_factors(neg_idxs[1])
        negative_loss = -self.log_sigmoid(-torch.sum(nu * nv, dim=1)).squeeze()

        return (torch.sum(positive_loss) + torch.sum(negative_loss)) / (pos_idxs.shape[1] * (1 + num_neg))

batch_size = 10000
num_factor = 64
num_neg = 5

idx2species = dict()
species2idx = dict()
Xs = []
ys = []

import os


input_dir = os.path.join("insects", 'processed_files') 
# Construct the full path to the file
input_file_path = os.path.join(input_dir, "species_matrix.csv")


with open(input_file_path, "r", encoding='utf-8') as f:
    line = f.readline()
    while line:
        line = f.readline()
        lines = line.strip().split(',')
        if len(lines) != 3:
            continue
        if lines[0] == lines[1]:
            continue
        if lines[0] not in species2idx:
            species2idx[lines[0]] = len(idx2species)
            idx2species[len(idx2species)] = lines[0]
        if lines[1] not in species2idx:
            species2idx[lines[1]] = len(idx2species)
            idx2species[len(idx2species)] = lines[1]
        Xs.append((species2idx[lines[0]], species2idx[lines[1]]))
        ys.append(float(lines[2]))
        Xs.append((species2idx[lines[1]], species2idx[lines[0]]))
        ys.append(float(lines[2]))

# Define the directory where you want to save the file
output_dir = os.path.join("insects", 'processed_files') 

# Ensure the directory exists
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Construct the full path to the output file
output_file_path = os.path.join(output_dir, "idx2species.csv")

# Open the file and write the data
with open(output_file_path, "w", encoding='utf-8') as out_file:
    for key in sorted(idx2species.keys()):
        try:
            out_file.write("{}\t{}\n".format(key, idx2species[key]))
        except:
            print(key, idx2species[key])

print("embedding size = ({}, {})".format(len(idx2species), num_factor))
print("number of data = {}".format(len(Xs)))
print("batch_size = {}; num_neg = {}".format(batch_size, num_neg))

train_dataloader = DataLoader(RatingDataset(Xs, ys), batch_size=batch_size, shuffle=True)
model = MatrixFactorization(len(idx2species), n_factors=num_factor)
model.to(device)

optimizer = torch.optim.Adam(model.parameters(), lr=0.1, weight_decay=1e-6)

epochs = 500  # Reduced from 2000 for quicker results
for epoch in range(0, epochs):
    pbar = tqdm(enumerate(train_dataloader), total=len(train_dataloader))
    count = 0
    cum_loss = 0.
    for i, (train_batch, label_batch) in pbar:
        count = 1 + i

        neg_smpls = np.zeros(num_neg)
        for i in range(min(batch_size, train_batch.shape[0])):
            delta = random.sample(list(range(len(idx2species))), num_neg)
            neg_smpls = np.vstack([neg_smpls, delta])
        neg_cols = torch.tensor(neg_smpls[1:].reshape((-1,)), dtype=torch.long)
        neg_rows = train_batch[:, 0].repeat(num_neg)
        neg_idxs = torch.vstack([neg_rows, neg_cols])

        loss = model(train_batch.T.to(device), label_batch.to(device), neg_idxs.to(device))

        optimizer.zero_grad()
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), 1)
        optimizer.step()

        cum_loss += loss.item()
        pbar.set_description('training loss at {} batch {}: {}'.format(epoch, i, loss.item()))

    train_loss = cum_loss / count
    print('avg training loss: ', train_loss)
    # torch.save(model.state_dict(), f'model_step_{epoch}.pt')
    torch.save(model.state_dict(), os.path.join(output_dir, f'model_step_{epoch}.pt'))
print("Training completed.")


# Save the entire model
# torch.save({
#     'model_state_dict': model.state_dict(),
#     'optimizer_state_dict': optimizer.state_dict(),
#     'species2idx': species2idx,
#     'idx2species': idx2species,
#     'num_factor': num_factor
# }, 'bio_vector_model.pth')
torch.save({
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'species2idx': species2idx,
    'idx2species': idx2species,
    'num_factor': num_factor
}, os.path.join(output_dir, 'bio_vector_model.pth'))


print("Model saved as bio_vector_model.pth")