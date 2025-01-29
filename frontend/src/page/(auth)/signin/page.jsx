import axios from 'axios';
import { useState } from 'react';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const backendUrl = 'http://localhost:8000/user';

  const SigninSubmitHandler = async () => {
    if (email === '' || password === '') {
      setSuccess(false);
      return;
    }
    try {
      await axios.post(backendUrl, { email, password });
      setSuccess(true);
      setEmail('');
      setPassword('');
      window.location.href = "http://localhost:5173/";
    } catch (err) {
      alert('Error in signin', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {success && <h1 className="text-green-600 text-center mb-4">User is Logged In</h1>}
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        <input 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email" 
          placeholder='Enter email' 
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password" 
          placeholder='Enter password' 
          className="w-full p-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={SigninSubmitHandler}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Signin
        </button>
      </div>
    </div>
  );
};

export default Signin;
