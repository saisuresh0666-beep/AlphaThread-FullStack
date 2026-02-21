import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { backendUrl, token, navigate, setToken } = useContext(ShopContext);

  const [user, setUser] = useState({
    name: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: ""
    }
  });

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(backendUrl + '/api/user/profile', {
        headers: { token },
      });
      if (res.data.success) {
        setUser(res.data.userData);
      }
    } catch (err) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchUser();
    else navigate("/login");
  }, [token]);

  const updateProfile = async () => {
    try {
      const res = await axios.post(backendUrl + '/api/user/profile', user, { headers: { token } });
      if (res.data.success) {
        toast.success("Profile Updated");
        setEdit(false);
        fetchUser();
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // Handler for nested address fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      address: { ...prev.address, [name]: value }
    }));
  };

  if (loading) return <div className="min-h-[60vh] flex justify-center items-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Name Section */}
        <div>
          <label className="text-gray-500 text-sm">Full Name</label>
          {edit ? (
            <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="w-full border p-2 rounded mt-1" />
          ) : (
            <p className="text-lg font-medium">{user.name || "N/A"}</p>
          )}
        </div>

        <hr />

        {/* Address Section */}
        <div className="space-y-4">
          <label className="text-gray-500 text-sm font-semibold uppercase">Shipping Address</label>
          {edit ? (
            <div className="flex flex-col gap-3">
              <input name="street" onChange={handleAddressChange} value={user.address?.street || ""} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street'/>
              <div className='flex gap-3'>
                <input name="city" onChange={handleAddressChange} value={user.address?.city || ""} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City'/>
                <input name="state" onChange={handleAddressChange} value={user.address?.state || ""} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State'/>
              </div>
              <div className='flex gap-3'>
                <input name="zipcode" onChange={handleAddressChange} value={user.address?.zipcode || ""} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode'/>
                <input name="country" onChange={handleAddressChange} value={user.address?.country || ""} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country'/>
              </div>
              <input name="phone" onChange={handleAddressChange} value={user.address?.phone || ""} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone'/>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded text-gray-700">
              <p>{user.address?.street || "No street added"}</p>
              <p>{user.address?.city}, {user.address?.state} {user.address?.zipcode}</p>
              <p>{user.address?.country}</p>
              <p className="text-sm text-gray-500 mt-2">Phone: {user.address?.phone || "N/A"}</p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          {edit ? (
            <>
              <button onClick={updateProfile} className="bg-black text-white px-8 py-2 rounded">Save</button>
              <button onClick={() => setEdit(false)} className="border border-gray-300 px-8 py-2 rounded">Cancel</button>
            </>
          ) : (
            <button onClick={() => setEdit(true)} className="border border-black px-8 py-2 rounded">Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;