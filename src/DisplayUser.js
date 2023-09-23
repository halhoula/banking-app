import axios from 'axios';
import { useState } from 'react';

const DisplayUser = () => {
  const [customerId, setCustomerId] = useState('');
  const [customerData, setCustomerData] = useState(null);

  const handleFetch = async () => {
    
      axios.get(`http://localhost:8080/getUserInfo/${customerId}`).then(response => {
        setCustomerData(response.data);
    })
    .catch(error => {
        console.error("Error fetching customer data:", error);
    });
    
  };

  return (
    <div>
      <h1>User Information</h1>
      <input
        type="text"
        placeholder="Customer ID"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      <button onClick={handleFetch}>Fetch</button>
      {customerData && (
        <div>
          <h2>User Details</h2>
          <p>Name: {customerData.name}</p>
          <p>Surname: {customerData.surname}</p>
          <p>Balance: {customerData.balance}</p>
          {customerData.accounts.map(account => (
                <div key={account.id}>
                    <h2>Account: {account.id} - Balance: {account.balance}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Amount</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {account.transactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
        
        
      )}
    </div>
  );
};

export default DisplayUser;
