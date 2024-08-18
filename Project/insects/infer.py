import torch
import numpy as np
import os

# Define the directory where you want to save the model file
input_dir = os.path.join("insects", 'processed_files') 

# Ensure the directory exists
if not os.path.exists(input_dir):
    os.makedirs(input_dir  )

model_file_path = os.path.join(input_dir, 'bio_vector_model.pth')

# Load the model from the specific directory
checkpoint = torch.load(model_file_path)

# Load the saved model
# checkpoint = torch.load('bio_vector_model.pth')
species2idx = checkpoint['species2idx']
idx2species = checkpoint['idx2species']
num_factor = checkpoint['num_factor']

class MatrixFactorization(torch.nn.Module):
    def __init__(self, n_bio, n_factors=20):
        super().__init__()
        self.bio_factors = torch.nn.Embedding(n_bio, n_factors)

    def forward(self, idxs):
        return self.bio_factors(idxs)

# Initialize and load the model
model = MatrixFactorization(len(idx2species), n_factors=num_factor)
model.load_state_dict(checkpoint['model_state_dict'])
model.eval()
# Define the output directory and file name
output_dir = os.path.join("insects", 'processed_files') 
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

output_file_path = os.path.join(output_dir, 'species_similarity.txt')

output_text = ""


def get_embedding(species): 
    if species not in species2idx:
        print(f"Species '{species}' not found in the dataset.\n")
        output_text += (f"Species '{species}' not found in the dataset.\n") 
        return None
    idx = species2idx[species]
    with torch.no_grad():
        embedding = model(torch.tensor([idx])).numpy()[0]
    return embedding

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Test with sample data
sample_species = [
    "Apis mellifera",
    "Bombus terrestris",
    "Vespula vulgaris",
    "Pieris rapae",
    "Lasius niger"
]

# Get embeddings
embeddings = {species: get_embedding(species) for species in sample_species}

# Compare similarities
for i, species1 in enumerate(sample_species):
    for species2 in sample_species[i+1:]:
        if embeddings[species1] is not None and embeddings[species2] is not None:
            similarity = cosine_similarity(embeddings[species1], embeddings[species2])
            print(f"Similarity between {species1} and {species2}: {similarity:.4f}\n") 
            output_text += (f"Similarity between {species1} and {species2}: {similarity:.4f}\n")
# Find most similar species to a given species
target_species = "Apis mellifera"
target_embedding = embeddings[target_species]
if target_embedding is not None:
    similarities = [(species, cosine_similarity(target_embedding, emb)) 
                    for species, emb in embeddings.items() if emb is not None]
    similarities.sort(key=lambda x: x[1], reverse=True)

    print(f"\nMost similar species to {target_species}:\n") 
    output_text += (f"\nMost similar species to {target_species}:\n") 
    for species, similarity in similarities[1:4]:  # Exclude the species itself
        output_text += (f"{species}: {similarity:.4f}\n")
        print(f"{species}: {similarity:.4f}\n")

with open(output_file_path, 'w') as file:
    file.write(output_text)