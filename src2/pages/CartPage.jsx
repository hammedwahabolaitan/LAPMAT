"use client"
import { Link, useNavigate } from "react-router-dom"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { useStore } from "../context/StoreContext"

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, user } = useStore()
  const navigate = useNavigate()

  const shipping = cartTotal > 50000 ? 0 : 2000 // Free shipping over ₦50,000
  const total = cartTotal + shipping

  const handleRemoveItem = (id) => {
    removeFromCart(id)
  }

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return
    updateCartQuantity(id, quantity)
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      return
    }

    // If user is not logged in, redirect to login page
    if (!user) {
      navigate("/login", { state: { from: "/checkout" } })
      return
    }

    navigate("/checkout")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>

      {cart.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Cart Items ({cart.length})</h2>
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden">
                          <img
                            src={item.image || "/placeholder.jpg"}
                            alt={item.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">
                              {item.color}
                              {item.storage && `, ${item.storage}`}
                              {item.specs && `, ${item.specs}`}
                            </p>
                          </div>
                          <div className="text-right mt-2 sm:mt-0">
                            <div className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</div>
                            <div className="text-sm text-gray-500">₦{item.price.toLocaleString()} each</div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center border rounded-md">
                            <button
                              className="h-8 w-8 flex items-center justify-center"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease quantity</span>
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              className="h-8 w-8 flex items-center justify-center"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase quantity</span>
                            </button>
                          </div>
                          <button
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded flex items-center"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <Link to="/category/all" className="text-purple-600 hover:text-purple-800 font-medium">
                Continue Shopping
              </Link>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
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
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-md transition-colors"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Apply Coupon Code</h3>
                <div className="flex">
                  <input placeholder="Enter coupon code" className="flex-1 border rounded-l-md px-3 py-2" />
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-md transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-lg border p-6">
              <h3 className="font-medium mb-4">We Accept</h3>
              <div className="flex flex-wrap gap-2">
                <div className="h-8 w-12 bg-gray-200 rounded flex items-center justify-center text-xs">Visa</div>
                <div className="h-8 w-12 bg-gray-200 rounded flex items-center justify-center text-xs">MC</div>
                <div className="h-8 w-12 bg-gray-200 rounded flex items-center justify-center text-xs">PayPal</div>
                <div className="h-8 w-12 bg-gray-200 rounded flex items-center justify-center text-xs">Transfer</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <ShoppingCart className="h-8 w-8 text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/category/all"
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md inline-block transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  )
}
