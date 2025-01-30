import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const backendUrl = 'http://localhost:8000/user';

  const SignupSubmitHandler = async () => {
    try {
      if (name === '' || email === '' || password === '') {
        setSuccess(false);
        return;
      }
      await axios.post(backendUrl, { name, email, password });
      setSuccess(true);
      setName('');
      setEmail('');
      setPassword('');
      setTimeout(() => {
        navigate("/signin"); 
    }, 1000);
      ;
    } catch (err) {
      alert('Error in signup', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {success && <h1 className="text-green-600 text-center mb-4">User is Successfully Signed Up</h1>}
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        <input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text" 
          placeholder='Enter your name' 
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
          onClick={SignupSubmitHandler}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
