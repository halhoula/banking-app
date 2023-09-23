import axios from 'axios';
import { useState } from 'react';

const CreateAccount = () => {
  const [customerId, setCustomerId] = useState('');
  const [initialCredit, setInitialCredit] = useState(0);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/createAccount', {
        customerId,
        initialCredit,
      });
      console.log('Account created:', response.data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
      <input
        type="text"
        placeholder="Customer ID"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Initial Credit"
        value={initialCredit}
        onChange={(e) => setInitialCredit(e.target.value)}
      />
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default CreateAccount;
