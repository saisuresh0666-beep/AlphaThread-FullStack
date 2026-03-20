import React, { useContext, useState } from "react";
import { logo,search_icon,profile_icon,cart_icon,menu_icon,dropdown_icon } from "../assets/assets";
import { NavLink,Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";


const NavBar = () => {
  const navigate = useNavigate();
    const [visible,setVisible] =useState(false)

    const { setshowSearch, getCartCount, token, setToken, setCartitem } = useContext(ShopContext)


    const logout = ()=>{
      navigate('/login')
      localStorage.removeItem("token")
      setToken('')
      setCartitem({})
       
    }
  return (
    <div className="flex items-center justify-between py-5 font-medium">
     <Link to='/'> <img src={logo} alt="logo" className="w-36" /></Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
<NavLink to='/' className="flex flex-col items-center gap-1">
<p>HOME</p>
<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
</NavLink>
<NavLink to='/collection' className="flex flex-col items-center gap-1">
<p>COLLECTION</p>
<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
</NavLink>
<NavLink to='/about' className="flex flex-col items-center gap-1">
<p>ABOUT</p>
<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
</NavLink>  
<NavLink to='/contact' className="flex flex-col items-center gap-1">
<p>CONTACT</p>
<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
</NavLink>  
      </ul>
      <div className="flex items-center gap-6">
         <img onClick={()=>setshowSearch(true)} src={search_icon} alt=""  className="w-5 cursor-pointer" />
         <div className="group relative">

  <img onClick={()=> token ? null : navigate('/login')}
    className="w-5 cursor-pointer opacity-70 hover:opacity-100 transition"
    src={profile_icon}
    alt=""
  />

{/* Dropdown menu */}
{token && 
<div className="group-hover:block hidden absolute right-0 pt-3 z-50">
  <div
    className="flex flex-col w-40
               bg-white
               border border-black/20
               text-gray-700 text-xs
               tracking-wide
               rounded-sm shadow-xl"
  >
    <p onClick={()=>navigate('/profile')}
      className="px-5 py-3 cursor-pointer
                 hover:bg-black hover:text-white
                 transition-colors duration-200"
    >
      My Profile
    </p>

    <p onClick={()=>navigate('/orders')}
      className="px-5 py-3 cursor-pointer
                 hover:bg-black hover:text-white
                 transition-colors duration-200"
    >
      Orders
    </p>

    <div className="h-px bg-black/20 mx-3"></div>

    <p onClick={logout}
      className="px-5 py-3 cursor-pointer
                 hover:bg-black hover:text-white
                 transition-colors duration-200"
    >
      Log Out
    </p>
  </div>
</div>}

      </div>
      <Link to='/cart' className="relative">
      <img src={cart_icon}  className=" min w-5" alt=""/>
      <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]">{getCartCount()}</p>

      </Link>
      <img onClick={()=>setVisible(true)} src={menu_icon} className="w-5 cursor-pointer sm:hidden" alt="menu"/>


</div>

{/* side  menu for small screens */}
<div className={`fixed top-0 right-0 h-screen w-full bg-white transition-transform duration-300 z-50 ${
    visible ? "translate-x-0" : "translate-x-full"}`}>
 
<div className="flex flex-col text-gray-600">
  <div
    onClick={() => setVisible(false)}
    className="flex items-center gap-4 p-3 cursor-pointer"
  >
    <img className="h-4 rotate-180" src={dropdown_icon} alt="" />
    <p>Back</p>
  </div>
  <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
  <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>Collection</NavLink>
  <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>About</NavLink>
  <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
</div>

</div>

    </div>



 
  );
};

export default NavBar;