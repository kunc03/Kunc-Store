import { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });

      // const data = await response.json();

      // if (response.ok) {
      //   // Handle successful login
      console.log('Login successful');
      // } else {
      //   setError(data.error || 'An unexpected error occurred.');
      // }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error('Error during login:', err);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-200">
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-[10rem]">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
