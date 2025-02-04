import random
import json
from datetime import datetime, timedelta

def generate_security_metrics(num_records=100):
    data = []
    base_time = datetime.utcnow()
    for i in range(num_records):
        record = {
            "event_id": f"evt_{i}",
            "timestamp": (base_time - timedelta(minutes=i*5)).isoformat(),
            "severity": random.randint(1, 10),
            "user_behavior": random.uniform(0, 1),
            "historical_pattern": random.uniform(0, 1)
        }
        data.append(record)
    return data

if __name__ == "__main__":
    metrics = generate_security_metrics()
    with open("simulated_metrics.json", "w") as f:
        json.dump(metrics, f, indent=2)
    print("Simulated security metrics generated.")
