#!/bin/bash

# Step 1: Install stripe-mock
echo "Installing stripe-mock..."
brew install stripe/stripe-mock/stripe-mock

# Step 2: Start stripe-mock
echo "Starting stripe-mock server..."
stripe-mock &

# Step 3: Modify Backend
echo "Modifying backend for Stripe integration..."
cat <<EOT >> backend/app/stripe_routes.py
import stripe
from flask import request, jsonify
from . import app

stripe.api_base = "http://localhost:12111/v1"
stripe.api_key = "sk_test_your_test_key"  # Use your test key

@app.route('/stripe-tokenize', methods=['POST'])
def stripe_tokenize():
    card_details = request.json.get('card_details')
    try:
        token = stripe.Token.create(
            card={
                "number": card_details["number"],
                "exp_month": card_details["exp_month"],
                "exp_year": card_details["exp_year"],
                "cvc": card_details["cvc"],
            }
        )
        return jsonify({"token": token.id}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/stripe-detokenize', methods=['POST'])
def stripe_detokenize():
    token = request.json.get('token')
    try:
        # Note: Stripe's mock server does not support detokenization.
        # You would typically store the token and handle detokenization in a real service.
        return jsonify({"data": "Detokenization not supported in mock"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/stripe-token-status', methods=['POST'])
def stripe_token_status():
    token = request.json.get('token')
    try:
        # Mock checking the status of a token
        return jsonify({"status": "active"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
EOT

# Import the new routes in your backend
echo "Updating backend to include stripe routes..."
echo "from .stripe_routes import *" >> backend/app/__init__.py

# Step 4: Modify Frontend
echo "Modifying frontend for Stripe integration..."
cat <<EOT >> frontend/src/services/stripeApi.js
import axios from 'axios';

export const stripeTokenizeCard = (cardDetails) => {
    return axios.post('http://127.0.0.1:5000/stripe-tokenize', {
        card_details: {
            number: cardDetails.number,
            exp_month: cardDetails.exp_month,
            exp_year: cardDetails.exp_year,
            cvc: cardDetails.cvc,
        }
    });
};

export const stripeTokenStatus = (token) => {
    return axios.post('http://127.0.0.1:5000/stripe-token-status', {
        token: token
    });
};
EOT

# Step 5: Add Stripe tokenization form to the frontend
echo "Updating frontend UI to include Stripe tokenization..."
cat <<EOT >> frontend/src/App.js

// New Stripe Tokenization form
const [stripeCardNumber, setStripeCardNumber] = useState("");
const [stripeExpMonth, setStripeExpMonth] = useState("");
const [stripeExpYear, setStripeExpYear] = useState("");
const [stripeCvc, setStripeCvc] = useState("");

const handleStripeTokenize = async () => {
    clearMessages();
    try {
        const response = await stripeTokenizeCard({
            number: stripeCardNumber,
            exp_month: stripeExpMonth,
            exp_year: stripeExpYear,
            cvc: stripeCvc,
        });
        setResult(`Stripe Tokenized Value: ${response.data.token}`);
        setDebug(`Stripe Tokenization successful: ${response.data.token}`);
    } catch (err) {
        setError('Failed to tokenize data with Stripe');
        setDebug(err.message);
    }
};

// Adding UI for Stripe tokenization
return (
    <div className="mb-3">
        <input
            type="text"
            className="form-control"
            value={stripeCardNumber}
            onChange={(e) => setStripeCardNumber(e.target.value)}
            placeholder="Enter Stripe Card Number"
        />
        <input
            type="text"
            className="form-control mt-2"
            value={stripeExpMonth}
            onChange={(e) => setStripeExpMonth(e.target.value)}
            placeholder="Enter Expiration Month"
        />
        <input
            type="text"
            className="form-control mt-2"
            value={stripeExpYear}
            onChange={(e) => setStripeExpYear(e.target.value)}
            placeholder="Enter Expiration Year"
        />
        <input
            type="text"
            className="form-control mt-2"
            value={stripeCvc}
            onChange={(e) => setStripeCvc(e.target.value)}
            placeholder="Enter CVC"
        />
        <button className="btn btn-primary mt-2" onClick={handleStripeTokenize}>
            Tokenize with Stripe
        </button>
    </div>
);
EOT

# Step 6: Restart Backend and Frontend
echo "Restarting backend and frontend..."
pkill -f "python backend/wsgi.py"
pkill -f "npm start"
source ../venv/bin/activate && python backend/wsgi.py &
cd frontend && npm start &

echo "Setup complete. Stripe mock server integration is ready."

