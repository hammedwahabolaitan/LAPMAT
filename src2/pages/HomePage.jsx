"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight, Smartphone, Laptop, Watch, Headphones, Tv, Speaker } from "lucide-react"
// import { ProductCard } from "../components/ProductCard"
import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeTab, setActiveTab] = useState("all")
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newProducts, setNewProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${API_URL}/products/featured`)
        setFeaturedProducts(data)

        const { data: newProductsData } = await axios.get(`${API_URL}/products/new`)
        setNewProducts(newProductsData)
      } catch (error) {
        console.error("Error fetching products:", error)
        // Use fallback data if API fails
        setFeaturedProducts(fallbackFeaturedProducts)
        setNewProducts(fallbackNewProducts)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const filteredProducts =
    activeTab === "all"
      ? featuredProducts
      : featuredProducts.filter((product) => product.category.toLowerCase() === activeTab)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Carousel */}
      <div className="relative overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full relative">
              <div className="aspect-[21/9] relative">
                <img src={slide.image || "/placeholder.jpg"} alt={slide.title} className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-12 lg:p-16">
                  <div className="max-w-lg">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">{slide.title}</h2>
                    <p className="text-white text-sm md:text-base mb-6">{slide.description}</p>
                    <Link
                      to={slide.buttonLink}
                      className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md inline-block transition-colors"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 bg-white/70 hover:bg-white/90 rounded-full flex items-center justify-center opacity-70 hover:opacity-100"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
          <span className="sr-only">Previous slide</span>
        </button>

        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 bg-white/70 hover:bg-white/90 rounded-full flex items-center justify-center opacity-70 hover:opacity-100"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
          <span className="sr-only">Next slide</span>
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
              onClick={() => setCurrentSlide(index)}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Welcome Section */}
      <section className="my-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">Welcome to Buyitnow Gadget Shop</h1>
        <p className="text-lg max-w-3xl mx-auto text-gray-700">
          No1 Ib City Gadget Shop that sells in wholesales and pieces too. At Buyitnow gadget shop, you can get New & Uk
          gadgets like iPhone, Samsung, Laptop, Accessories and other Electronics.
        </p>
        <p className="mt-4 text-lg font-medium">...our customer's satisfaction is our priority.</p>
      </section>

      {/* Featured Products */}
      <section className="my-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/category/all" className="text-purple-600 hover:underline">
            View All
          </Link>
        </div>
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === "all" ? "bg-purple-600 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === "phones/tablets" ? "bg-purple-600 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("phones/tablets")}
            >
              Phones & Tablets
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === "laptops" ? "bg-purple-600 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("laptops")}
            >
              Laptops
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === "watches" ? "bg-purple-600 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("watches")}
            >
              Watches
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === "accessories" ? "bg-purple-600 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("accessories")}
            >
              Accessories
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading
              ? // Loading skeleton
                Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="border rounded-lg p-4 shadow-sm">
                      <div className="aspect-square bg-gray-200 animate-pulse mb-4"></div>
                      <div className="h-4 bg-gray-200 animate-pulse mb-2 w-2/3"></div>
                      <div className="h-4 bg-gray-200 animate-pulse mb-4 w-full"></div>
                      <div className="h-4 bg-gray-200 animate-pulse w-1/3"></div>
                    </div>
                  ))
              : filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.name} to={category.href} className="group">
              <div className="overflow-hidden border rounded-lg transition-all hover:shadow-lg">
                <div className="p-4">
                  <div className="aspect-square relative mb-3 bg-gray-100 rounded-md flex items-center justify-center">
                    <category.icon className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-center group-hover:text-purple-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="my-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <Link to="/category/new" className="text-purple-600 hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? // Loading skeleton
              Array(4)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="border rounded-lg p-4 shadow-sm">
                    <div className="aspect-square bg-gray-200 animate-pulse mb-4"></div>
                    <div className="h-4 bg-gray-200 animate-pulse mb-2 w-2/3"></div>
                    <div className="h-4 bg-gray-200 animate-pulse mb-4 w-full"></div>
                    <div className="h-4 bg-gray-200 animate-pulse w-1/3"></div>
                  </div>
                ))
            : newProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* Newsletter */}
      <section className="my-12 bg-purple-50 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600">Get the latest updates on new products and special promotions.</p>
          </div>
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-md transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Carousel slides
const slides = [
  {
    image: "/placeholder.jpg",
    title: "New iPhone 15 Collection",
    description: "Experience the latest innovation from Apple with amazing features and performance.",
    buttonText: "Shop Now",
    buttonLink: "/category/phones-tablets/iphones",
  },
  {
    image: "/placeholder.jpg",
    title: "Premium Laptops",
    description: "Powerful laptops for work, gaming, and creativity. Find your perfect match today.",
    buttonText: "Explore",
    buttonLink: "/category/laptops",
  },
  {
    image: "/placeholder.jpg",
    title: "Smart Watches",
    description: "Stay connected and track your fitness with our collection of smart watches.",
    buttonText: "View Collection",
    buttonLink: "/category/watches",
  },
]

// Categories
const categories = [
  { name: "Phones/Tablets", href: "/category/phones-tablets", icon: Smartphone },
  { name: "Laptops", href: "/category/laptops", icon: Laptop },
  { name: "Watches", href: "/category/watches", icon: Watch },
  { name: "Accessories", href: "/category/accessories", icon: Headphones },
  { name: "Electronics", href: "/category/electronics", icon: Tv },
  { name: "Audio", href: "/category/audio", icon: Speaker },
]

// Fallback data in case API fails
const fallbackFeaturedProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1299.99,
    image: "/placeholder.jpg",
    category: "Phones/Tablets",
    rating: 4.9,
    isNew: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 1199.99,
    image: "/placeholder.jpg",
    category: "Phones/Tablets",
    rating: 4.8,
    discount: 10,
  },
  {
    id: 3,
    name: "MacBook Pro 16",
    price: 2499.99,
    image: "/placeholder.jpg",
    category: "Laptops",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Apple Watch Series 9",
    price: 399.99,
    image: "/placeholder.jpg",
    category: "Watches",
    rating: 4.7,
    discount: 15,
  },
  {
    id: 5,
    name: "Dell XPS 15",
    price: 1899.99,
    image: "/placeholder.jpg",
    category: "Laptops",
    rating: 4.6,
  },
  {
    id: 6,
    name: "AirPods Pro 2",
    price: 249.99,
    image: "/placeholder.jpg",
    category: "Accessories",
    rating: 4.8,
    isNew: true,
  },
  {
    id: 7,
    name: "Samsung Galaxy Watch 6",
    price: 299.99,
    image: "/placeholder.jpg",
    category: "Watches",
    rating: 4.5,
  },
  {
    id: 8,
    name: "iPad Pro 12.9",
    price: 1099.99,
    image: "/placeholder.jpg",
    category: "Phones/Tablets",
    rating: 4.9,
    discount: 5,
  },
]

const fallbackNewProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1299.99,
    image: "/placeholder.jpg",
    category: "Phones/Tablets",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 1199.99,
    image: "/placeholder.jpg",
    category: "Phones/Tablets",
    rating: 4.8,
  },
  {
    id: 3,
    name: "MacBook Pro 16",
    price: 2499.99,
    image: "/placeholder.jpg",
    category: "Laptops",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Apple Watch Series 9",
    price: 399.99,
    image: "/placeholder.jpg",
    category: "Watches",
    rating: 4.7,
  },
]
