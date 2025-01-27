import axios from 'axios';
import { useState } from 'react';

const Signup = () => {
  const [name ,setname] = useState("");
  const [email ,setemail] = useState("");
  const [password ,setpassword] = useState("");
  const [success,setSuccess] = useState(false);
  const backendUrl = 'http://localhost:8000/user';

  const SignupSubmitHandler = async () => {
    if(name==='' || email === '' || password === ''){
      setSuccess(false);
      return ;
    }
    try{
      await axios.post(backendUrl,{name , email , password})
      setSuccess(true);
      setname('');
      setemail('');
      setpassword('');
      window.location.href = "http://localhost:5173/signin";
    }catch(err){
      alert('error in signup',err);
    }
  }
  
  return (
    <div>
      {success&&<h1>User is Successfully Signup</h1>}
      <h1>Sign up Page</h1><br />
      <input 
        value={name}
        onChange={(e)=>setname(e.target.value)}
        type="text" 
        placeholder='Enter your name' 
      /><br />
      <input 
        value={email}
        onChange={(e)=>setemail(e.target.value)}
        type="email" 
        placeholder='Enter email' 
      /><br />
      <input 
        value={password}
        onChange={(e)=>setpassword(e.target.value)}
        type="password" 
        placeholder='Enter password' 
      /><br />
      <button onClick={SignupSubmitHandler}>Signup</button>
    </div>
  );
}

export default Signup;