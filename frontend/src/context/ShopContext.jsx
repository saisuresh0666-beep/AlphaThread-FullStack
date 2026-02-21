import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState("");
    const [showSearch, setshowSearch] = useState(true);
    const [cartItems, setcartItem] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate(); // Standardized naming to 'navigate'

    // --- ADD TO CART ---
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select product size");
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setcartItem(cartData);

        // Sync with Database
        if (token) {
        try {
            await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
            toast.success("Added to database");
        } catch (error) {
            console.log(error);
            toast.error("Failed to sync with DB");
        }
    }
    };

    // --- UPDATE QUANTITY ---
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setcartItem(cartData);

        // Sync with Database
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    // --- FETCH USER CART DATA ---
    const getUserCart = async ( token ) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
            if (response.data.success) {
                setcartItem(response.data.cartData);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Helper functions for UI
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }
            }
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalAmount += itemInfo.price * cartItems[items][item];
                }
            }
        }
        return totalAmount;
    };
    const getFinalAmount = () => {
    const amount = getCartAmount();
    // Logic: If cart is empty, don't charge delivery fee
    return amount === 0 ? 0 : amount + delivery_fee;
};

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list");
            if (response.data.success) {
                setProducts(response.data.product);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            const storedToken = localStorage.getItem('token');
            setToken(storedToken);
            getUserCart(storedToken); // Load the cart from DB on refresh
        }
    }, []);

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setshowSearch,
        cartItems, addToCart, updateQuantity,
        getCartCount, getCartAmount,getFinalAmount,
        navigate, backendUrl, setToken, token,setcartItem
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;