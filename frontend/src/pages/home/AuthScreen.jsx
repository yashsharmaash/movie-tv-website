import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const AuthScreen = () => {
    const[email, setEmail] = React.useState('');
    const navigate=useNavigate();
    const handleFormSubmit = (e) => {
        e.preventDefault();
        navigate('/signup?email='+email)}
  return (
    <div className='hero-bg relative'>
        {/*Navbar*/}
        <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10'>
            <img src='/logo.png' alt='logo' className='w-32 md:w-52 rounded-full'/>
            <Link to={"/login"} className='text-white bg-teal-500 py-1 px-2 rounded-3xl'>
            Sign In
            </Link>

        </header>
        {/*Hero section*/ }
        <div className='flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto'> 
            <h1 className='text-4xl md:text-6xl font-bold md-4'>
                Welcome to Movies-Tv
            </h1>
            <p className='text-lg font-bold mb-4'>
                Watch your favorite movies and TV shows online
            </p>
            <p className='font-bold mb-4'>Dive into the world of cinema</p>

            <form className='flex flex-col md:flex-row gap-4 w-1/2' onSubmit={handleFormSubmit} >
            <input 
            type="email"
            placeholder="Email address"
            className='p-2 rounded flex-1 bg-black/80 border border-gray-700'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}

             />
             <button className='bg-teal-500 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center'>
                Get Started
                <ChevronRight className='size-8 md:size-10'/>

             </button>
            </form>


        </div>
        {/*seperator*/}
        <div className='h-2 w-full bg-[#232323]'aria-hidden='true'></div>
        <div className='py-10 bg-black text-white'>
            <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
                <div className='flex-1 text-center md:text-left'>
                    <h2 className='text-4xl md:text-5xl font-extrabold md-4'>
                        Enjoy TV shows,Movies and more
                    </h2>
                    <p className='text-lg md:text-xl py-2'>
                        Watch on Laptop,  Pc or Mobile
                    </p>

                </div>
                <div className='flex-1'>
                    <img src="/device-pile.jpg " alt="tv-image" className='mt-4 w-50 h-49 rounded-3xl' />
                    

                </div>

            </div>
        </div>

    </div>
  )
}

export default AuthScreen