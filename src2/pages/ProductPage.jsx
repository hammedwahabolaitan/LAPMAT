"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Star, Truck, ShieldCheck, ArrowLeft, Heart } from "lucide-react"
import { useStore } from "../context/StoreContext"
import { ProductCard } from "../components/ProductCard"
import axios from "axios"
import toast from "react-hot-toast"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart, addToWishlist } = useStore()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("description")
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedStorage, setSelectedStorage] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${API_URL}/products/${id}`)
        setProduct(data)

        // Set default selected options
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0])
        }
        if (data.storage && data.storage.length > 0) {
          setSelectedStorage(data.storage[0])
        }

        // Fetch related products
        const { data: related } = await axios.get(`${API_URL}/products/related/${id}`)
        setRelatedProducts(related)
      } catch (error) {
        console.error("Error fetching product:", error)
        // Use fallback data if API fails
        setProduct(fallbackProduct)
        setRelatedProducts(fallbackRelatedProducts)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
    // Reset state when product ID changes
    return () => {
      setActiveImage(0)
      setQuantity(1)
      setActiveTab("description")
    }
  }, [id])

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedStorage)
    toast.success(`${product.name} added to cart`)
  }

  const handleAddToWishlist = () => {
    addToWishlist(product)
    toast.success(`${product.name} added to wishlist`)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 w-32 bg-gray-200 rounded mb-6"></div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-20 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/category/all"
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md inline-block transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to={`/category/${product.category.toLowerCase().replace("/", "-")}`}
        className="inline-flex items-center text-sm text-gray-500 hover:text-purple-600 mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to {product.category}
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="aspect-square relative border rounded-lg overflow-hidden">
            <img
              src={product.images?.[activeImage] || product.image || "/placeholder.jpg"}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square relative border rounded-lg overflow-hidden cursor-pointer ${
                    activeImage === index ? "ring-2 ring-purple-600" : ""
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image || "/placeholder.jpg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                <span className="ml-2 text-sm text-gray-500">{product.reviews || 0} reviews</span>
              </div>
              {product.stock > 0 ? (
                <span className="text-xs border border-gray-300 rounded-full px-2 py-1">In Stock: {product.stock}</span>
              ) : (
                <span className="text-xs border border-red-300 text-red-500 rounded-full px-2 py-1">Out of Stock</span>
              )}
            </div>
          </div>

          <div className="text-3xl font-bold">₦{product.price.toLocaleString()}</div>

          <div className="space-y-4">
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Color</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`px-4 py-2 rounded-md ${
                        selectedColor === color ? "bg-purple-600 text-white" : "border hover:border-purple-600"
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.storage && product.storage.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Storage</h3>
                <div className="flex space-x-2">
                  {product.storage.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 rounded-md ${
                        selectedStorage === size ? "bg-purple-600 text-white" : "border hover:border-purple-600"
                      }`}
                      onClick={() => setSelectedStorage(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center space-x-2">
                <button
                  className="w-8 h-8 border rounded-md flex items-center justify-center"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  className="w-8 h-8 border rounded-md flex items-center justify-center"
                  onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                  disabled={quantity >= (product.stock || 10)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md transition-colors w-full md:w-auto"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
              </button>
              <button
                className="mt-2 md:ml-2 border border-purple-600 text-purple-600 hover:bg-purple-50 py-2 px-6 rounded-md transition-colors w-full md:w-auto flex items-center justify-center"
                onClick={handleAddToWishlist}
              >
                <Heart className="mr-2 h-4 w-4" />
                Add to Wishlist
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-start">
              <Truck className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">Free Delivery</h4>
                <p className="text-sm text-gray-500">Free delivery on orders over ₦50,000</p>
              </div>
            </div>
            <div className="flex items-start">
              <ShieldCheck className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">1 Year Warranty</h4>
                <p className="text-sm text-gray-500">All products come with a 1-year warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="border-b">
          <div className="flex">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "description"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "specifications"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("specifications")}
            >
              Specifications
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "reviews"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>
        </div>

        <div className="py-6">
          {activeTab === "description" && <p className="text-gray-700 leading-relaxed">{product.description}</p>}

          {activeTab === "specifications" && (
            <div className="grid md:grid-cols-2 gap-4">
              {product.specifications?.map((spec, index) => (
                <div key={index} className="flex border-b pb-2">
                  <div className="w-1/3 font-medium">{spec.name}</div>
                  <div className="w-2/3 text-gray-700">{spec.value}</div>
                </div>
              )) || <p className="text-gray-500">No specifications available for this product.</p>}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              {product.reviewsList?.length > 0 ? (
                product.reviewsList.map((review, index) => (
                  <div key={index} className="border-b pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 mr-3">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{review.name}</div>
                          <div className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="flex">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No reviews yet. Be the first to review this product!</p>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md transition-colors">
                    Write a Review
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">No related products found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

// Fallback data in case API fails
const fallbackProduct = {
  id: 1,
  name: "iPhone 15 Pro Max",
  price: 1299.99,
  images: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
  image: "/placeholder.jpg",
  category: "Phones/Tablets",
  rating: 4.9,
  reviews: 128,
  description:
    "The iPhone 15 Pro Max is Apple's latest flagship smartphone, featuring a powerful A17 Pro chip, a stunning Super Retina XDR display, and an advanced camera system with a 48MP main camera. With its premium design and cutting-edge features, it's the ultimate iPhone experience.",
  specifications: [
    { name: "Display", value: "6.7-inch Super Retina XDR display" },
    { name: "Processor", value: "A17 Pro chip" },
    { name: "Storage", value: "256GB, 512GB, 1TB" },
    { name: "Camera", value: "48MP main, 12MP ultra wide, 12MP telephoto" },
    { name: "Battery", value: "Up to 29 hours video playback" },
    { name: "OS", value: "iOS 17" },
    { name: "Water Resistance", value: "IP68" },
    { name: "Dimensions", value: "159.9 x 76.7 x 8.25 mm" },
    { name: "Weight", value: "221g" },
  ],
  colors: ["Space Black", "Silver", "Gold", "Blue"],
  storage: ["256GB", "512GB", "1TB"],
  stock: 15,
}

const fallbackRelatedProducts = [
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 1199.99,
    image: "/placeholder.jpg",
    category: "Phones/Tablets",
    rating: 4.8,
  },
  {
    id: 9,
    name: "iPhone 15",
    price: 799.99,
    image: "/placeholder.jpg",
    category: "Phones/Tablets",
    rating: 4.7,
  },
  {
    id: 10,
    name: "Google Pixel 8 Pro",
    price: 899.99,
    image: "/placeholder.jpg",
    category: "Phones/Tablets",
    rating: 4.6,
  },
  {
    id: 11,
    name: "Samsung Galaxy Z Fold 5",
    price: 1799.99,
    image: "/placeholder.jpg",
    category: "Phones/Tablets",
    rating: 4.5,
  },
]
