import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState('');
  const [token, setToken] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [debug, setDebug] = useState(null);

  const clearMessages = () => {
    setResult(null);
    setError(null);
    setDebug(null);
  };

  const handleTokenize = async () => {
    clearMessages();
    try {
      const response = await axios.post('http://127.0.0.1:5000/tokenize', { data });
      setResult(`Tokenized Value: ${response.data.token}`);
      setToken(response.data.token);  // Automatically set token for further testing
      setDebug(`Tokenization successful: ${response.data.token}`);
    } catch (err) {
      setError('Failed to tokenize data');
      setDebug(err.message);
    }
  };

  const handleDetokenize = async () => {
    clearMessages();
    try {
      const response = await axios.post('http://127.0.0.1:5000/detokenize', { token });
      setResult(`Original Data: ${response.data.data}`);
      setDebug(`Detokenization successful: ${response.data.data}`);
    } catch (err) {
      setError('Failed to detokenize data');
      setDebug(err.message);
    }
  };

  const handleSuspend = async () => {
    clearMessages();
    try {
      const response = await axios.post('http://127.0.0.1:5000/suspend', { token });
      setResult(response.data.message);
      setDebug('Token suspended successfully');
    } catch (err) {
      setError('Failed to suspend token');
      setDebug(err.message);
    }
  };

  const handleActivate = async () => {
    clearMessages();
    try {
      const response = await axios.post('http://127.0.0.1:5000/activate', { token });
      setResult(response.data.message);
      setDebug('Token activated successfully');
    } catch (err) {
      setError('Failed to activate token');
      setDebug(err.message);
    }
  };

  const handleClose = async () => {
    clearMessages();
    try {
      const response = await axios.post('http://127.0.0.1:5000/close', { token });
      setResult(response.data.message);
      setDebug('Token closed successfully');
    } catch (err) {
      setError('Failed to close token');
      setDebug(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Tokenization Service</h1>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter data to tokenize"
        />
        <button className="btn btn-primary mt-2" onClick={handleTokenize}>
          Tokenize
        </button>
      </div>

      <div className="mt-5">
        <h2>Detokenize Data</h2>
        <input
          type="text"
          className="form-control"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter token to detokenize"
        />
        <button className="btn btn-secondary mt-2" onClick={handleDetokenize}>
          Detokenize
        </button>
      </div>

      <div className="mt-5">
        <h2>Suspend Token</h2>
        <input
          type="text"
          className="form-control"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter token to suspend"
        />
        <button className="btn btn-warning mt-2" onClick={handleSuspend}>
          Suspend
        </button>
      </div>

      <div className="mt-5">
        <h2>Activate Token</h2>
        <input
          type="text"
          className="form-control"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter token to activate"
        />
        <button className="btn btn-success mt-2" onClick={handleActivate}>
          Activate
        </button>
      </div>

      <div className="mt-5">
        <h2>Close Token</h2>
        <input
          type="text"
          className="form-control"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter token to close"
        />
        <button className="btn btn-danger mt-2" onClick={handleClose}>
          Close
        </button>
      </div>

      {result && (
        <div className="mt-3 alert alert-success">
          <h4>Result:</h4>
          <p>{result}</p>
        </div>
      )}

      {error && (
        <div className="mt-3 alert alert-danger">
          <h4>Error:</h4>
          <p>{error}</p>
        </div>
      )}

      {debug && (
        <div className="mt-3 alert alert-info">
          <h4>Debug Info:</h4>
          <p>{debug}</p>
        </div>
      )}
    </div>
  );
}

export default App;

