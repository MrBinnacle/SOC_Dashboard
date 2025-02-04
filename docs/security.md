# Security Measures

- **Authentication:** JWT-based authentication with secure secret management.
- **Input Validation:** All endpoints validate inputs using Pydantic and parameterized queries.
- **File Handling:** File uploads are restricted by type and size; scanning is recommended.
- **Container Security:** Docker images run as non-root; minimal base images used.
- **DevOps:** CI/CD pipelines integrate SAST and dependency scans.
