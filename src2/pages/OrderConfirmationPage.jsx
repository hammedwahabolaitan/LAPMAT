"use client"

import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { CheckCircle } from "lucide-react"
import { useStore } from "../context/StoreContext"

export default function OrderConfirmationPage() {
  const { orders } = useStore()
  const location = useLocation()
  const navigate = useNavigate()

  // Get order from location state or from the latest order in the store
  const order = location.state?.order || (orders.length > 0 ? orders[orders.length - 1] : null)

  // Redirect if no order
  useEffect(() => {
    if (!order) {
      navigate("/")
    }
  }, [order, navigate])

  if (!order) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your order has been placed successfully. We've sent a confirmation to your email.
        </p>

        <div className="bg-white rounded-lg border p-6 mb-8 text-left">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{new Date(order.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-medium">
                ₦{order.totalAmount?.toLocaleString() || order.total?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium capitalize">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium capitalize">{order.status}</span>
            </div>
          </div>

          <h3 className="font-semibold mt-6 mb-2">Shipping Address</h3>
          <p className="text-gray-600">
            {order.shippingAddress.fullName}
            <br />
            {order.shippingAddress.streetAddress}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            <br />
            {order.shippingAddress.country}
            <br />
            Phone: {order.shippingAddress.phone}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/account/orders"
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md inline-block transition-colors"
          >
            View My Orders
          </Link>
          <Link
            to="/"
            className="border border-purple-600 text-purple-600 hover:bg-purple-50 py-2 px-6 rounded-md inline-block transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
