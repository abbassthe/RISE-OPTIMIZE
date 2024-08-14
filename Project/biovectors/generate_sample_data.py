import pickle
import random

def generate_sample_data(year, month, num_observations):
    data = {}
    species = ['Apis mellifera', 'Bombus terrestris', 'Vespula vulgaris', 'Pieris rapae', 
               'Aglais io', 'Vanessa atalanta', 'Gonepteryx rhamni', 'Lasius niger', 
               'Formica rufa', 'Myrmica rubra', 'Xylocopa violacea', 'Osmia bicornis', 
               'Vespa crabro', 'Polistes dominula', 'Papilio machaon', 'Coccinella septempunctata']
    
    for _ in range(num_observations):
        long = round(random.uniform(-5, 5), 1)  # Longitude
        lat = round(random.uniform(50, 55), 1)  # Latitude
        
        if long not in data:
            data[long] = {}
        if lat not in data[long]:
            data[long][lat] = []
        
        observation = {
            'scientificName': random.choice(species),
            'Lat': str(lat),
            'Long': str(long)
        }
        data[long][lat].append(observation)
    
    return data

# Generate data for multiple months
for year in range(2023, 2025):
    for month in range(1, 13):
        if year == 2024 and month > 8:
            break
        data = generate_sample_data(year, month, 1000)
        filename = f"maps_{year}-{month:02d}.pkl"
        with open(filename, "wb") as f:
            pickle.dump(data, f)
        print(f"Generated {filename}")

print("Sample data generation complete.")