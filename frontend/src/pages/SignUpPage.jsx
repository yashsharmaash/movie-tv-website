
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthUser} from '../store/authUser.js';

const SignUpPage = () => {
  const {searchParams} = new URL(document.location)
  const emailValue = searchParams.get("email")
  const[email, setEmail] = React.useState(emailValue||"");
  const[username, setUsername] = React.useState('');
  const[password, setPassword] = React.useState('');

  const{signup}=useAuthUser();

  



  const handleSignUp =(e)=>{
    e.preventDefault();
    signup({email,username,password
    }); 
  }
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl ml-10 mr-auto flex items-center justify-between p-4">
        <Link to={"/"}>
        <img src="logo.png" alt="logo" className="w-40 rounded-full mx-0 " />
        </Link>
      </header>
      <div className="flex justify-center items-center mt-15 mx-3 mb-40">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
        <h1 className="text-center text-white text-2xl font-bold mb-4">
          Sign Up
        </h1>
        <form className="space-y-3" onSubmit={handleSignUp}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
              Email
            </label>
            <input type="email" className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
            placeholder='your@email.com' 
            id='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="username" className="text-sm font-medium text-gray-300 block">
              Username
            </label>
            <input type="text" className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
            placeholder='Type your username' 
            id='username'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
              Password
            </label>
            <input type="password" className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
            placeholder='Type your password' 
            id='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
          </div>


          <button className='w-full py-2 px-6 bg-teal-500 text-black font-semibold rounded-md hover:bg-teal-700'>
            Sign Up
          </button>
          
          
        </form>
        <div className="text-white text-center">
          Already a member?{"  "}
          <Link to={"/login"} className="text-teal-500 hover:underline">Sign in</Link>
        </div>

        </div>

      </div>
    </div>
  )
}

export default SignUpPage