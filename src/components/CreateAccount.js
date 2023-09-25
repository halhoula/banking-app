import axios from 'axios';
import { useState } from 'react';
import '../assets/styles/CreateAccount.css';

const CreateAccount = () => {
  const [customerId, setCustomerId] = useState('');
  const [initialCredit, setInitialCredit] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleKeyPress = (e) => {
    // Prevent non-numeric characters
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleKeyPressforDecimal = (e, value) => {

    const charCode = e.which ? e.which : e.keyCode;

    // Check if the key pressed is not a number or a dot
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      e.preventDefault();
    }

    // Check if the key pressed is a dot and the input already contains a dot
    if (charCode === 46 && value.includes('.')) {
      e.preventDefault();
    }
  };

  const handleSubmit = async () => {

    if (customerId.trim() === '') {
      setMessage('Customer Id is manadatory');
      setIsError(true);
    } else {
      const response = await axios.post('http://localhost:8080/createAccount', {
        customerId,
        initialCredit,
      }).then(response => {
        setMessage(response.data || 'Account successfully created!');
        setIsError(false);
    })
    .catch(error => {
        setMessage(error.response?.data || 'Error creating account.');
        setIsError(true);
    });
  }
  };

  return (
    <div className="accountcontainer">
      <h1 className="header">Create Account</h1>
      <input
        type="text"
        placeholder="Customer ID"
        value={customerId}
        onKeyPress={handleKeyPress}
        onChange={(e) => setCustomerId(e.target.value)}
        className="input"
      />
      <input
         type="number" 
         step="0.01" 
        placeholder="Initial Credit"
        value={initialCredit}
        onKeyPress={(e) => handleKeyPressforDecimal(e, initialCredit)}
        onChange={(e) => setInitialCredit(e.target.value)}
        className="input"
      />
      <button onClick={handleSubmit} className="button">Create</button>

      {message && <div className={`message ${isError ? 'error' : 'success'}`}>{message}</div>}
    </div>
  );
};

export default CreateAccount;
