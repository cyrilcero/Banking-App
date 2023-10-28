import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAccounts from './useAccounts'; // custom hook

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { getAccountID, setAccounts } = useAccounts(); // custom hook

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedAccounts = JSON.parse(localStorage.getItem('UserAccounts'));
    const account = storedAccounts.find(acc => {
      return acc.email === email && acc.password === password;
    });

    if (account) {
      if (account.email === 'admin@email.com' && account.password === 'admin00') {
        localStorage.setItem('CurrentUser', JSON.stringify(account));
  
        setAccounts(prevAccounts => {
          const updatedAccounts = prevAccounts.map(prevAccount => {
            if (prevAccount.email === email) {
              return { ...prevAccount, loggedInEmail: email };
            }
            return prevAccount;
          });
  
            return updatedAccounts;
          });
    
          navigate('/admin');
        }

        else {
          localStorage.setItem('CurrentUser', JSON.stringify(account));
    
          setAccounts(prevAccounts => {
            const updatedAccounts = prevAccounts.map(prevAccount => {
              if (prevAccount.email === email) {
                return { ...prevAccount, loggedInEmail: email };
              }
              return prevAccount;
            });
               
            return updatedAccounts; 
          });
    
          const accountID = getAccountID(email);
          setEmail("");
          setPassword("");
          navigate(`/overview/${accountID}`);
        }
      }
    }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
