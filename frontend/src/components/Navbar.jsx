import React from 'react';
import { Link } from 'react-router-dom';
import { Search,LogOut, Menu } from 'lucide-react';
import { useAuthUser } from '../store/authUser.js';
import { useContentStore } from '../store/content.js';
;


const Navbar = () => {
  const {user,logout} = useAuthUser();
  const [isMobileopen, setIsMobileOpen] = React.useState(false)
  const toggleMobileMenu = () => setIsMobileOpen(!isMobileopen);

  const {setcontentType} = useContentStore();
  



  return <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
    <div className='flex items-center gap-10 z-50'>
        <Link to='/'>
            <img src='logo.png' alt='logo' className='w-32 rounded-full sm:w-40' />
        </Link>
        {/*desktop ke liye items*/}
        <div className='hidden sm:flex gap-2 items-center'>
            <Link to="/" className ="transition duration-75  hover:underline hover:text-white hover:scale-105 " onClick={()=> setcontentType("movie")}>
            Movies
            </Link>
            <Link to="/" className ="transition duration-75  hover:underline hover:text-white hover:scale-105"onClick={()=> setcontentType("tv")}>
            Tv shows
            </Link>
            <Link to='/history' className="transition duration-75  hover:underline hover:text-white hover:scale-105">
            History
            </Link>

        </div>
    </div>
    <div className="flex gap-2 items-center z-50">
      <Link to={"/search"}>
      <Search className="size-6 cursor-pointer tansition duration-75 hover:scale-125 hover:text-white  "/></Link> 
      <img src={user.image} alt="profile pic" className="h-8 rounded cursor-pointer" />
      <LogOut className="size-6 cursor-pointer tansition duration-75 hover:scale-125 hover:text-white " onClick={logout} />
     { <div className="sm:hidden">
        <Menu className="size-6 cursor-pointer tansition duration-75 hover:scale-125 hover:text-white " onClick={toggleMobileMenu}/>
      </div>}
      

    </div>
    {/*mobile ke liye items*/}
    {isMobileopen && (
      <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
        <Link to={"/"} className="block transition duration-75  hover:underline hover:text-white hover:scale-105 p-2 "
        onClick={toggleMobileMenu}>
          Movies
        </Link>
        <Link to={"/history"} className="block transition duration-75  hover:underline hover:text-white hover:scale-105 p-2 "
        onClick={toggleMobileMenu}>
          History
        </Link>
        <Link to={"/"} className="block transition duration-75  hover:underline hover:text-white hover:scale-105 p-2 "
        onClick={toggleMobileMenu}>
          Tv shows
        </Link>

      </div>
    ) }


  </header>
}

export default Navbar