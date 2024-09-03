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
