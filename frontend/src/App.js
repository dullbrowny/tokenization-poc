import React, { useState } from 'react';
import { tokenizeData } from './services/api';
import { stripeTokenizeCard } from './services/stripeApi';

function App() {
    // States for regular tokenization
    const [cardNumber, setCardNumber] = useState("");
    const [expMonth, setExpMonth] = useState("");
    const [expYear, setExpYear] = useState("");
    const [cvc, setCvc] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
    const [debug, setDebug] = useState("");

    // States for Stripe tokenization
    const [stripeCardNumber, setStripeCardNumber] = useState("");
    const [stripeExpMonth, setStripeExpMonth] = useState("");
    const [stripeExpYear, setStripeExpYear] = useState("");
    const [stripeCvc, setStripeCvc] = useState("");

    const clearMessages = () => {
        setResult("");
        setError("");
        setDebug("");
    };

/*

    const handleTokenize = async () => {
        clearMessages();
        try {
    	const dataToTokenize = `${cardNumber}|${expMonth}|${expYear}|${cvc}`;

            const response = await tokenizeData(dataToTokenize);

            const response = await tokenizeData({
                number: dataToTokenize,
                exp_month: expMonth,
                exp_year: expYear,
                cvc: cvc,
            });

            setResult(`Tokenized Value: ${response.data.token}`);
            setDebug(`Tokenization successful: ${response.data.token}`);
        } catch (err) {
            setError('Failed to tokenize data');
            setDebug(err.message);
        }
    };
*/

const handleTokenize = async () => {
    try {
    	const dataToTokenize = `${cardNumber}|${expMonth}|${expYear}|${cvc}`;
        const response = await tokenizeData(dataToTokenize); 
        if (response && response.token) {
            console.log('Tokenized data:', response.token);
            setResult(`Tokenized Value: ${response.token}`);
            setDebug(`Stripe Tokenization successful: ${response.data.token}`);
            // Handle successful tokenization here, e.g., display token
        } else {
            console.error("Token property is missing in the response");
            // Handle the case where the token is missing in the response
        }
    } catch (error) {
        console.error("Failed to tokenize data:", error);
        // Handle the error here, e.g., show an error message to the user
    }
};

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

    return (
        <div className="App">
            <h1>Tokenization Service</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Enter Card Number"
                />
                <input
                    type="text"
                    className="form-control mt-2"
                    value={expMonth}
                    onChange={(e) => setExpMonth(e.target.value)}
                    placeholder="Enter Expiration Month"
                />
                <input
                    type="text"
                    className="form-control mt-2"
                    value={expYear}
                    onChange={(e) => setExpYear(e.target.value)}
                    placeholder="Enter Expiration Year"
                />
                <input
                    type="text"
                    className="form-control mt-2"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="Enter CVC"
                />
                <button className="btn btn-primary mt-2" onClick={handleTokenize}>
                    Tokenize
                </button>
            </div>

            <h2>Stripe Tokenization Service</h2>
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

            {result && <div className="alert alert-success mt-3">{result}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {debug && <div className="alert alert-info mt-3">{debug}</div>}
        </div>
    );
}

export default App;

