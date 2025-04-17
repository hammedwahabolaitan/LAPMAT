"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { useStore } from "../context/StoreContext"
import toast from "react-hot-toast"

export default function CheckoutPage() {
  const { cart, cartTotal, createOrder, user } = useStore()
  const navigate = useNavigate()

  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Nigeria",
    phone: "",
  })

  useEffect(() => {
    // Redirect to cart if cart is empty
    if (cart.length === 0) {
      navigate("/cart")
    }

    // Redirect to login if user is not logged in
    if (!user) {
      navigate("/login", { state: { from: "/checkout" } })
    }
  }, [cart, user, navigate])

  const shipping = cartTotal > 50000 ? 0 : 2000 // Free shipping over ₦50,000
  const total = cartTotal + shipping

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setShippingAddress((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    const requiredFields = ["fullName", "streetAddress", "city", "state", "phone"]
    const missingFields = requiredFields.filter((field) => !shippingAddress[field])

    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(", ")}`)
      return
    }

    setIsProcessing(true)

    try {
      // Create order data
      const orderData = {
        items: cart,
        totalAmount: total,
        shippingAddress,
        paymentMethod,
      }

      // Process order
      const order = await createOrder(orderData)

      toast.success("Order placed successfully!")
      navigate("/order-confirmation", { state: { order } })
    } catch (error) {
      toast.error("Error processing order. Please try again.")
      console.error("Order error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-lg border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address *
                </label>
                <input
                  id="streetAddress"
                  name="streetAddress"
                  value={shippingAddress.streetAddress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    id="city"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    id="state"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-100"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="card" className="flex-1 cursor-pointer">
                  Credit/Debit Card
                </label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="paypal" className="flex-1 cursor-pointer">
                  PayPal
                </label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <input
                  type="radio"
                  id="transfer"
                  name="paymentMethod"
                  value="transfer"
                  checked={paymentMethod === "transfer"}
                  onChange={() => setPaymentMethod("transfer")}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="transfer" className="flex-1 cursor-pointer">
                  Bank Transfer
                </label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <input
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="cash" className="flex-1 cursor-pointer">
                  Cash on Delivery
                </label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden">
                      <img
                        src={item.image || "/placeholder.jpg"}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-500">
                      {item.color}
                      {item.storage ? `, ${item.storage}` : ""}
                    </p>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm">x{item.quantity}</span>
                      <span className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center"
              onClick={handleSubmit}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
