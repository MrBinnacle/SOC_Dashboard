import random
import json

def generate_multimedia_dataset(num_files=10):
    dataset = []
    for i in range(num_files):
        file_info = {
            "filename": f"sample_{i}.{'mp4' if random.choice([True, False]) else 'jpg'}",
            "authentic": random.choice([True, False])
        }
        dataset.append(file_info)
    return dataset

if __name__ == "__main__":
    dataset = generate_multimedia_dataset()
    with open("simulated_multimedia.json", "w") as f:
        json.dump(dataset, f, indent=2)
    print("Simulated multimedia dataset generated.")
