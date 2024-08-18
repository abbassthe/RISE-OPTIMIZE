import pickle as pkl
import os
import glob
def add_month(time, months):
    year, month = time
    month += months
    while month > 12:
        year += 1
        month -= 12
    while month < 1:
        year -= 1
        month += 12
    return year, month

item_set = set()
mat = dict()
maps = dict()

# tmp_t = (2023, 1)
# end_t = (2024, 8)
 
input_dir = os.path.join("insects", 'input_files')
if not os.path.exists(input_dir):
    os.makedirs(input_dir)


file_pattern = os.path.join(input_dir, "maps_*.pkl")
files = glob.glob(file_pattern)

file_info = []

for file_path in files:
    filename = os.path.basename(file_path)
    
    try:
        # Remove 'maps_' prefix and '.pkl' suffix, then split by '-'
        base_name = filename.replace("maps_", "").replace(".pkl", "")
        year, month = base_name.split('-')
        year = int(year)
        month = int(month)

        # Add to list for sorting
        file_info.append((year, month, file_path))
    except (IndexError, ValueError) as e:
        print(f"Skipping file {filename} due to error: {e}")

# Sort the file_info list by year and month
file_info.sort()

# Process the files in sorted order
for year, month, file_path in file_info:
    tmp_t = (year, month)
    
    print("Read data in ({}, {:02d})".format(tmp_t[0], tmp_t[1]))
    with open(file_path, "rb") as f:
        maps[tmp_t] = pkl.load(f)

# while tmp_t[0] * 12 + tmp_t[1] <= end_t[0] * 12 + end_t[1]:
#     print("Read data in ({}, {:02d})".format(tmp_t[0], tmp_t[1]))
#     # with open("maps_{}-{:02d}.pkl".format(tmp_t[0], tmp_t[1]), "rb") as f:
#     input_file_path = os.path.join(input_dir, "maps_{}-{:02d}.pkl".format(tmp_t[0], tmp_t[1]))
#     with open(input_file_path, "rb") as f:
#         maps[tmp_t] = pkl.load(f)
#     tmp_t = add_month(tmp_t, 1)

for t in maps:
    print("t = ({}, {:02d})".format(t[0], t[1]))
    for long in maps[t]:
        for lat in maps[t][long]:
            for i in range(len(maps[t][long][lat])):
                obsrv_x = maps[t][long][lat][i]
                item_set.add(obsrv_x['scientificName'])
                
                # Observations in the same grid
                for j in range(i+1, len(maps[t][long][lat])):
                    obsrv_y = maps[t][long][lat][j]
                    if (float(obsrv_x['Lat']) - float(obsrv_y['Lat']))**2 + (float(obsrv_x['Long']) - float(obsrv_y['Long']))**2 > 0.01:
                        continue
                    if (obsrv_x['scientificName'], obsrv_y['scientificName']) in mat:
                        mat[(obsrv_x['scientificName'], obsrv_y['scientificName'])] += 1
                    else:
                        mat[(obsrv_x['scientificName'], obsrv_y['scientificName'])] = 1
                        
                # Observations in the nearby grids
                for dt, dlong, dlat in [(0, 0.1, 0), (0, 0, 0.1), (0, -0.1, 0), (0, 0, -0.1)]:
                    nt = add_month(t, dt)
                    nlong, nlat = long + dlong, lat + dlat
                    if nt not in maps:
                        continue
                    if nlong not in maps[nt]:
                        continue
                    if nlat not in maps[nt][nlong]:
                        continue
                    for obsrv_y in maps[nt][nlong][nlat]:
                        if (float(obsrv_x['Lat']) - float(obsrv_y['Lat']))**2 + (float(obsrv_x['Long']) - float(obsrv_y['Long']))**2 > 0.01:
                            continue
                        if (obsrv_x['scientificName'], obsrv_y['scientificName']) in mat:
                            mat[(obsrv_x['scientificName'], obsrv_y['scientificName'])] += 1
                        else:
                            mat[(obsrv_x['scientificName'], obsrv_y['scientificName'])] = 1


 

# Ensure the directory exists
output_dir = os.path.join("insects", 'processed_files') 
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Define the full path for the output file
output_file_path = os.path.join(output_dir, "species_matrix.csv")



with open(output_file_path, "w", encoding='utf-8') as out_file:
    for key in mat:
        out_file.write("{},{},{}\n".format(key[0], key[1], mat[key]))

print("Matrix generation complete. Output saved to species_matrix.csv")