# Tokenization Proof of Concept (PoC)

## Overview

This repository contains a Proof of Concept (PoC) for a tokenization service built in Python. The primary purpose of this project is to demonstrate the tokenization of funding instruments (e.g., credit card numbers) and lifecycle management of tokens. This PoC will be developed incrementally, eventually integrating a wallet system and simulating money movement transactions.

## Features

- **Tokenization Service**: Securely tokenizes sensitive data such as credit card numbers using the Fernet symmetric encryption method.
- **Lifecycle Management**: Manage the lifecycle of tokens, including suspending, activating, and closing tokens.
- **Database Integration**: Persists token data and their lifecycle states in a relational database using SQLAlchemy.
- **Notification Handling**: (Planned) Handle inbound notifications from external services.

## Architecture

The project is structured as follows:

- `tokenization_service.py`: Main Flask application that provides endpoints for tokenization, detokenization, and lifecycle management.
- `models.py`: Defines the database schema and ORM mappings using SQLAlchemy.
- `requirements.txt`: Lists the Python dependencies required for the project.

## Setup

To set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-github-username/tokenization-poc.git
   cd tokenization-poc
   ```

2. Create a virtual environment and install dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. Run the Flask application:
   ```bash
   python tokenization_service.py
   ```

The service will start on `http://localhost:5001`.

## API Endpoints

- **POST /tokenize**: Tokenizes the provided data.
  - Request: `{"data": "<your-sensitive-data>"}`
  - Response: `{"token": "<your-token>"}`

- **POST /detokenize**: Detokenizes the provided token.
  - Request: `{"token": "<your-token>"}`
  - Response: `{"data": "<your-original-data>"}`

- **POST /suspend**: Suspends the provided token.
  - Request: `{"token": "<your-token>"}`
  - Response: `{"message": "Token suspended successfully"}`

- **POST /activate**: Activates the provided token.
  - Request: `{"token": "<your-token>"}`
  - Response: `{"message": "Token activated successfully"}`

- **POST /close**: Closes the provided token.
  - Request: `{"token": "<your-token>"}`
  - Response: `{"message": "Token closed successfully"}`

## Roadmap

- **Step 1**: Implement tokenization and lifecycle management (Completed).
- **Step 2**: Add notification handling for token status updates (Planned).
- **Step 3**: Integrate a wallet system and simulate money movement transactions (Planned).
- **Step 4**: Expand to a microservices architecture (Planned).
- **Step 5**: Deploy the system to the cloud (Planned).

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License.

## Contact

For questions or collaboration, please reach out to [ranga.rangarajan@gmail.com].
