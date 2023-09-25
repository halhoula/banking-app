import axios from 'axios';
import { useState } from 'react';
import '../assets/styles/DisplayUser.css';

const DisplayUser = () => {
  const [customerId, setCustomerId] = useState('');
  const [customerData, setCustomerData] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyPress = (e) => {
    // Prevent non-numeric characters
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleFetch = async () => {
    if (customerId.trim() === '') {
      setMessage('Customer Id is manadatory');
      setIsError(true);
      setCustomerData('');
    }else{
    setIsLoading(true);
      axios.get(`http://localhost:8080/getUserInfo/${customerId}`).then(response => {
        setCustomerData(response.data);
        setMessage('');
        setIsError(false);
    })
    .catch(error => {
        setCustomerData('');
        setMessage(error.response?.data || 'Error creating account.');
        setIsError(true);
        console.error("Error fetching customer data:", error);
    })
    .finally(setIsLoading(false));
  }
  };

  return (
    <div className="usercontainer">
      <h1 className="header">Customer Informations</h1>
      <input
        type="text"
        placeholder="Customer ID"
        value={customerId}
        onKeyPress={handleKeyPress}
        onChange={(e) => setCustomerId(e.target.value)}
        className="input"
      />
      <button onClick={handleFetch} className="button">Fetch</button>
      {customerData && (
        <div className="userDetails" >
          <h2>Customer Details</h2>
          <p>Name: {customerData.name}</p>
          <p>Surname: {customerData.surname}</p>
          <p>Balance: {customerData.balance} Euro</p>
          <h2>Accounts:</h2>
          <div className="container">
          
          {customerData.accounts.length === 0 && 
          <div className="message error">The current customer has no accounts</div>}
          {customerData.accounts?.map(account => (
                <div className="subblock" key={account.id}>
                  
                    <h4>Id: {account.id} - Balance: {account.balance} Euro</h4>
                    <table className="table">
                        <thead className="tableHeader">
                            <tr>
                                <th>Transaction ID</th>
                                <th>Amount</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {account.transactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td className="tableCell">{transaction.id}</td>
                                    <td className="tableCell">{transaction.amount}</td>
                                    <td className={`${transaction.type=='CREDIT' ? 'credit' : 'debit'}`}>{transaction.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   
                </div>
            ))}
            </div>
            
        </div>
        
        
      )}
      
      {isLoading ? (
      <p>Loading...</p>
    ) : (
        message && <div className={`message ${isError ? 'error' : 'success'}`}>{message}</div>
    )
      
      }
    </div>
  );
};

export default DisplayUser;
