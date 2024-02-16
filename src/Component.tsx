import React, { useState, useEffect } from 'react';
import './Component.css';

const Component: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://randomuser.me/api');
      const data = await response.json();
      const { name, email } = data.results[0];
      setFullName(`${name.first} ${name.last}`);
      setEmail(email);
      // Save data to local storage
      localStorage.setItem('fullName', `${name.first} ${name.last}`);
      localStorage.setItem('email', email);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRefresh = () => {
    fetchUserData();
  };

  return (
    <div>
      <h1 className='header'>User Information</h1>
      <div className='div1'>
        <p><strong>Full Name:</strong> {fullName}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
      <button onClick={handleRefresh} className='btn1'>Refresh</button>
    </div>
  );
};

export default Component;
