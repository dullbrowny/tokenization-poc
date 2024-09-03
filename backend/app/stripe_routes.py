import stripe
from flask import request, jsonify
from . import app

stripe.api_base = "http://localhost:12111"
stripe.api_key = "sk_test_51LVIXYEMh05i2LLA0VHeQIsyHAuK4el1zJ5Biyx3wDey4dr65gxExAQBioIynPzc7m3a39BBhqa5g15vbtIxwpbR00Mf12v8tY"


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
            },
            api_key="sk_test_123"  # Add your Stripe test API key here
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
