// "use client"

// import { createContext, useContext, useReducer, useEffect } from "react"
// import axios from "axios"
// import toast from "react-hot-toast"

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

// // Types
// const initialState = {
//   cart: [],
//   orders: [],
//   wishlist: [],
//   user: null,
//   loading: false,
//   error: null,
// }

// // Actions
// const ACTIONS = {
//   SET_LOADING: "SET_LOADING",
//   SET_ERROR: "SET_ERROR",
//   SET_USER: "SET_USER",
//   LOGOUT: "LOGOUT",
//   SET_CART: "SET_CART",
//   ADD_TO_CART: "ADD_TO_CART",
//   REMOVE_FROM_CART: "REMOVE_FROM_CART",
//   UPDATE_CART_QUANTITY: "UPDATE_CART_QUANTITY",
//   CLEAR_CART: "CLEAR_CART",
//   ADD_TO_WISHLIST: "ADD_TO_WISHLIST",
//   REMOVE_FROM_WISHLIST: "REMOVE_FROM_WISHLIST",
//   SET_ORDERS: "SET_ORDERS",
//   ADD_ORDER: "ADD_ORDER",
// }

// const storeReducer = (state, action) => {
//   switch (action.type) {
//     case ACTIONS.SET_LOADING:
//       return { ...state, loading: action.payload }
//     case ACTIONS.SET_ERROR:
//       return { ...state, error: action.payload, loading: false }
//     case ACTIONS.SET_USER:
//       return { ...state, user: action.payload, loading: false }
//     case ACTIONS.LOGOUT:
//       return { ...state, user: null, cart: [], orders: [], wishlist: [] }
//     case ACTIONS.SET_CART:
//       return { ...state, cart: action.payload }
//     case ACTIONS.ADD_TO_CART: {
//       const { product, quantity, color, storage } = action.payload
//       const existingItemIndex = state.cart.findIndex(
//         (item) => item.id === product.id && item.color === color && item.storage === storage,
//       )

//       if (existingItemIndex > -1) {
//         const updatedCart = [...state.cart]
//         updatedCart[existingItemIndex].quantity += quantity
//         return { ...state, cart: updatedCart }
//       }

//       return {
//         ...state,
//         cart: [...state.cart, { ...product, quantity, color, storage }],
//       }
//     }
//     case ACTIONS.REMOVE_FROM_CART:
//       return {
//         ...state,
//         cart: state.cart.filter((item) => item.id !== action.payload),
//       }
//     case ACTIONS.UPDATE_CART_QUANTITY: {
//       const { id, quantity } = action.payload
//       const updatedCart = state.cart.map((item) => (item.id === id ? { ...item, quantity } : item))
//       return { ...state, cart: updatedCart }
//     }
//     case ACTIONS.CLEAR_CART:
//       return { ...state, cart: [] }
//     case ACTIONS.ADD_TO_WISHLIST: {
//       if (state.wishlist.some((item) => item.id === action.payload.id)) {
//         return state
//       }
//       return { ...state, wishlist: [...state.wishlist, action.payload] }
//     }
//     case ACTIONS.REMOVE_FROM_WISHLIST:
//       return {
//         ...state,
//         wishlist: state.wishlist.filter((item) => item.id !== action.payload),
//       }
//     case ACTIONS.SET_ORDERS:
//       return { ...state, orders: action.payload }
//     case ACTIONS.ADD_ORDER:
//       return {
//         ...state,
//         orders: [...state.orders, action.payload],
//         cart: [], // Clear cart after order
//       }
//     default:
//       return state
//   }
// }

// // Create context
// const StoreContext = createContext()

// export const StoreProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(storeReducer, initialState)

//   // Calculate cart total
//   const cartTotal = state.cart.reduce((total, item) => total + item.price * item.quantity, 0)

//   // Calculate cart count
//   const cartCount = state.cart.reduce((count, item) => count + item.quantity, 0)

//   // Load cart from localStorage on initial render
//   useEffect(() => {
//     const storedCart = localStorage.getItem("buyitnow-cart")
//     if (storedCart) {
//       try {
//         const parsedCart = JSON.parse(storedCart)
//         dispatch({ type: ACTIONS.SET_CART, payload: parsedCart })
//       } catch (error) {
//         console.error("Failed to parse stored cart:", error)
//       }
//     }

//     const storedWishlist = localStorage.getItem("buyitnow-wishlist")
//     if (storedWishlist) {
//       try {
//         const parsedWishlist = JSON.parse(storedWishlist)
//         dispatch({ type: ACTIONS.SET_WISHLIST, payload: parsedWishlist })
//       } catch (error) {
//         console.error("Failed to parse stored wishlist:", error)
//       }
//     }

//     // Check for logged in user
//     const token = localStorage.getItem("buyitnow-token")
//     if (token) {
//       fetchUserData(token)
//     }
//   }, [])

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("buyitnow-cart", JSON.stringify(state.cart))
//   }, [state.cart])

//   // Save wishlist to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("buyitnow-wishlist", JSON.stringify(state.wishlist))
//   }, [state.wishlist])

//   // Fetch user data
//   const fetchUserData = async (token) => {
//     try {
//       dispatch({ type: ACTIONS.SET_LOADING, payload: true })
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//       const { data } = await axios.get(`${API_URL}/users/profile`, config)
//       dispatch({ type: ACTIONS.SET_USER, payload: data })

//       // Fetch user's orders
//       const { data: orders } = await axios.get(`${API_URL}/orders`, config)
//       dispatch({ type: ACTIONS.SET_ORDERS, payload: orders })
//     } catch (error) {
//       console.error("Error fetching user data:", error)
//       localStorage.removeItem("buyitnow-token")
//       dispatch({ type: ACTIONS.SET_ERROR, payload: error.response?.data?.message || "Failed to fetch user data" })
//     }
//   }

//   // Login user
//   const login = async (email, password) => {
//     try {
//       dispatch({ type: ACTIONS.SET_LOADING, payload: true })
//       const { data } = await axios.post(`${API_URL}/users/login`, { email, password })
//       localStorage.setItem("buyitnow-token", data.token)
//       dispatch({ type: ACTIONS.SET_USER, payload: data.user })

//       // Fetch user's orders
//       const config = {
//         headers: {
//           Authorization: `Bearer ${data.token}`,
//         },
//       }
//       const { data: orders } = await axios.get(`${API_URL}/orders`, config)
//       dispatch({ type: ACTIONS.SET_ORDERS, payload: orders })

//       return data
//     } catch (error) {
//       dispatch({ type: ACTIONS.SET_ERROR, payload: error.response?.data?.message || "Invalid email or password" })
//       throw error
//     }
//   }

//   // Register user
//   const register = async (name, email, password) => {
//     try {
//       dispatch({ type: ACTIONS.SET_LOADING, payload: true })
//       const { data } = await axios.post(`${API_URL}/users/register`, { name, email, password })
//       localStorage.setItem("buyitnow-token", data.token)
//       dispatch({ type: ACTIONS.SET_USER, payload: data.user })
//       return data
//     } catch (error) {
//       dispatch({ type: ACTIONS.SET_ERROR, payload: error.response?.data?.message || "Registration failed" })
//       throw error
//     }
//   }

//   // Logout user
//   const logout = () => {
//     localStorage.removeItem("buyitnow-token")
//     dispatch({ type: ACTIONS.LOGOUT })
//   }

//   // Add to cart
//   const addToCart = (product, quantity, color, storage) => {
//     dispatch({
//       type: ACTIONS.ADD_TO_CART,
//       payload: { product, quantity, color, storage },
//     })
//     toast.success(`${product.name} added to cart`)
//   }

//   // Remove from cart
//   const removeFromCart = (productId) => {
//     dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId })
//     toast.success("Item removed from cart")
//   }

//   // Update cart quantity
//   const updateCartQuantity = (productId, quantity) => {
//     dispatch({
//       type: ACTIONS.UPDATE_CART_QUANTITY,
//       payload: { id: productId, quantity },
//     })
//   }

//   // Clear cart
//   const clearCart = () => {
//     dispatch({ type: ACTIONS.CLEAR_CART })
//   }

//   // Add to wishlist
//   const addToWishlist = (product) => {
//     dispatch({ type: ACTIONS.ADD_TO_WISHLIST, payload: product })
//     toast.success(`${product.name} added to wishlist`)
//   }

//   // Remove from wishlist
//   const removeFromWishlist = (productId) => {
//     dispatch({ type: ACTIONS.REMOVE_FROM_WISHLIST, payload: productId })
//     toast.success("Item removed from wishlist")
//   }

//   // Create order
//   const createOrder = async (orderData) => {
//     try {
//       dispatch({ type: ACTIONS.SET_LOADING, payload: true })

//       if (state.user) {
//         // If user is logged in, save order to database
//         const config = {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("buyitnow-token")}`,
//           },
//         }
//         const { data } = await axios.post(`${API_URL}/orders`, orderData, config)
//         dispatch({ type: ACTIONS.ADD_ORDER, payload: data })
//         return data
//       } else {
//         // If user is not logged in, just add to local state
//         const newOrder = {
//           ...orderData,
//           id: `ORD-${Date.now()}`,
//           date: new Date().toISOString(),
//           status: "pending",
//         }
//         dispatch({ type: ACTIONS.ADD_ORDER, payload: newOrder })
//         return newOrder
//       }
//     } catch (error) {
//       dispatch({ type: ACTIONS.SET_ERROR, payload: error.response?.data?.message || "Failed to create order" })
//       throw error
//     }
//   }

//   return (
//     <StoreContext.Provider
//       value={{
//         ...state,
//         cartTotal,
//         cartCount,
//         login,
//         register,
//         logout,
//         addToCart,
//         removeFromCart,
//         updateCartQuantity,
//         clearCart,
//         addToWishlist,
//         removeFromWishlist,
//         createOrder,
//       }}
//     >
//       {children}
//     </StoreContext.Provider>
//   )
// }

// export const useStore = () => {
//   const context = useContext(StoreContext)
//   if (context === undefined) {
//     throw new Error("useStore must be used within a StoreProvider")
//   }
//   return context
// }
