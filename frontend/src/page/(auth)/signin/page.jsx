import axios from 'axios';
import { useState } from 'react';

const Signin = () => {
  const [email ,setemail] = useState("");
  const [password ,setpassword] = useState("");
  const [success,setSuccess] = useState(false);
  const backendUrl = 'http://localhost:8000/user';

  const SigninSubmitHandler = async () => {
    if(email === '' || password === ''){
      setSuccess(false);
      return ;
    }
    try{
      await axios.post(backendUrl,{email , password})
      setSuccess(true);
      setemail('');
      setpassword('');
      window.location.href = "http://localhost:5173/";
    }catch(err){
      alert('error in signup',err);
    }
  }
  
  return (
    <div>
      {success&&<h1>User is Logged in</h1>}
      <h1>Sign up Page</h1><br />
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
      <button onClick={SigninSubmitHandler}>Signup</button>
    </div>
  );
}

export default Signin;