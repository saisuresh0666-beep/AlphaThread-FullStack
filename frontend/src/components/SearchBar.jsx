import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { search_icon, cross_icon } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setshowSearch } = useContext(ShopContext);
  const [Visible,setVisible] = useState(false)
    const location = useLocation();

    useEffect(()=>{
if(location.pathname.includes('collection')){
setVisible(true);
}else{
  setVisible(false)
}
    },[location])



  return showSearch && Visible ? (
    <div className=" bg-white-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search products..."
        />

        <img className="w-5" src={search_icon} alt="search" />
      </div>

   <img
  onClick={() => setshowSearch(false)}
  className="inline w-3 cursor-pointer ml-3"
  src={cross_icon}
  alt=""
/>

    </div>
  ) : null;
};

export default SearchBar;