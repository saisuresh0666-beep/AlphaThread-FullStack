// ... (keep existing imports)

import Profile from "./Profile";

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod')
    const { navigate, backendUrl, token, cartItems, getCartAmount, delivery_fee, products, setcartItem } = useContext(ShopContext)
    
    // State to store the profile address for the preview
    const [savedAddress, setSavedAddress] = useState(null);

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    // Fetch saved address on mount to show it as an option
    useEffect(() => {
        const getProfile = async () => {
            if (token) {
                try {
                    const response = await axios.get(backendUrl + '/api/user/profile', { headers: { token } });
                    if (response.data.success && response.data.userData.address) {
                        setSavedAddress(response.data.userData.address);
                    }
                } catch (error) {
                    console.error("Error loading profile", error);
                }
            }
        };
        getProfile();
    }, [token]);

    // Function to only update address fields
    const applySavedAddress = () => {
        if (savedAddress) {
            setFormData(prev => ({
                ...prev, // Keep current firstname, lastname, and email
                street: savedAddress.street || '',
                city: savedAddress.city || '',
                state: savedAddress.state || '',
                zipcode: savedAddress.zipcode || '',
                country: savedAddress.country || '',
                phone: savedAddress.phone || ''
            }));
            toast.success("Address applied!");
        }
    }

    // ... (keep onChangeHandler and onSubmitHandler)

    return (


        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t '>
            
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={"DELIVERY"} text2={'INFORMATION'} />
                </div>

                {/* --- SAVED ADDRESS OPTION CARD --- */}
                {savedAddress && (
                    <div 
                        onClick={applySavedAddress}
                        className="border border-blue-100 bg-blue-50/50 p-3 rounded-lg cursor-pointer hover:border-blue-400 transition-all mb-2 flex items-start gap-3"
                    >
                        <input type="radio" checked={formData.street === savedAddress.street} readOnly className="mt-1" />
                        <div>
                            <p className="text-xs font-bold text-blue-600 uppercase">Use Saved Profile Address</p>
                            <p className="text-sm text-gray-600 truncate w-60">
                                {savedAddress.street}, {savedAddress.city}
                            </p>
                        </div>
                    </div>
                )}

                {/* Manual Inputs - now they can be mixed with the saved address */}
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name="firstname" value={formData.firstname} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name="lastname" value={formData.lastname} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
                </div>
                
                <input required onChange={onChangeHandler} name="email" value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
                
                <div className="h-[1px] bg-gray-100 my-2"></div>

                <input required onChange={onChangeHandler} name="street" value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
                
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name="city" value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
                    <input required onChange={onChangeHandler} name="state" value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
                </div>
                
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name="country" value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
                </div>
                
                <input required onChange={onChangeHandler} name="phone" value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
            </div>

            {/* ... (right side remains the same) */}
        </form>
    )
}

export default PlaceOrder