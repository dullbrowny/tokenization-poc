from flask import Flask, request, jsonify
from cryptography.fernet import Fernet
from datetime import datetime

app = Flask(__name__)

# Generate a key for encryption and decryption
key = Fernet.generate_key()
cipher_suite = Fernet(key)

# In-memory store for tokens and their lifecycle states
token_store = {}

@app.route('/tokenize', methods=['POST'])
def tokenize():
    data = request.json.get('data')
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    token = cipher_suite.encrypt(data.encode()).decode()
    token_store[token] = {"data": data, "status": "active", "created_at": datetime.utcnow()}
    return jsonify({"token": token}), 200

@app.route('/detokenize', methods=['POST'])
def detokenize():
    token = request.json.get('token')
    if not token or token not in token_store:
        return jsonify({"error": "Invalid token"}), 400
    
    token_data = token_store.get(token)
    if token_data["status"] != "active":
        return jsonify({"error": "Token is not active"}), 400
    
    return jsonify({"data": token_data["data"]}), 200

@app.route('/suspend', methods=['POST'])
def suspend_token():
    token = request.json.get('token')
    if not token or token not in token_store:
        return jsonify({"error": "Invalid token"}), 400
    
    token_store[token]["status"] = "suspended"
    return jsonify({"message": "Token suspended successfully"}), 200

@app.route('/activate', methods=['POST'])
def activate_token():
    token = request.json.get('token')
    if not token or token not in token_store:
        return jsonify({"error": "Invalid token"}), 400
    
    token_store[token]["status"] = "active"
    return jsonify({"message": "Token activated successfully"}), 200

@app.route('/close', methods=['POST'])
def close_token():
    token = request.json.get('token')
    if not token or token not in token_store:
        return jsonify({"error": "Invalid token"}), 400
    
    token_store[token]["status"] = "closed"
    return jsonify({"message": "Token closed successfully"}), 200

if __name__ == "__main__":
    app.run(port=5001)
