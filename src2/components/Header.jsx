"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ShoppingCart, User, Menu, X, ChevronDown, Search, Heart } from "lucide-react"
// import { useStore } from "../context/StoreContext"

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { cartCount, user, logout } = useStore()
  const location = useLocation()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button className="md:hidden mr-2" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </button>
            <Link to="/" className="flex items-center gap-2 mr-6">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <div className="flex h-full w-full items-center justify-center bg-purple-600 text-white font-bold text-xl">
                  B
                </div>
              </div>
              <span className="hidden font-bold text-xl sm:inline-block">
                <span className="text-purple-600">BuyIt</span>Now
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.title} className="relative group">
                    <button
                      className={`flex items-center gap-1 h-auto px-2 text-sm font-medium ${
                        location.pathname.startsWith(item.href) ? "text-purple-600" : ""
                      }`}
                    >
                      {item.title} <ChevronDown className="h-4 w-4" />
                    </button>
                    <div className="absolute left-0 top-full mt-1 w-48 bg-white shadow-md rounded-md hidden group-hover:block">
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          to={child.href}
                          className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                            location.pathname === child.href ? "text-purple-600" : ""
                          }`}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.title}
                    to={item.href}
                    className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                      location.pathname === item.href ? "text-purple-600" : ""
                    }`}
                  >
                    {item.title}
                  </Link>
                ),
              )}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {isSearchOpen ? (
              <div className="flex items-center">
                <input
                  type="search"
                  placeholder="Search products..."
                  className="w-full md:w-[200px] lg:w-[300px] border rounded-md px-3 py-1"
                />
                <button className="ml-2" onClick={() => setIsSearchOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </button>
            )}
            <Link to="/wishlist">
              <button className="relative">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </button>
            </Link>
            <Link to="/cart">
              <button className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-1">
                  <User className="h-5 w-5" />
                  <span className="sr-only md:not-sr-only md:ml-2 text-sm">{user.name}</span>
                </button>
                <div className="absolute right-0 top-full mt-1 w-48 bg-white shadow-md rounded-md hidden group-hover:block">
                  <Link to="/account" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    My Account
                  </Link>
                  <Link to="/account/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    My Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <button className="flex items-center gap-1">
                  <User className="h-5 w-5" />
                  <span className="sr-only md:not-sr-only md:ml-2 text-sm">Login</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-white h-full w-[300px] p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <Link to="/" className="flex items-center gap-2" onClick={toggleMobileMenu}>
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <div className="flex h-full w-full items-center justify-center bg-purple-600 text-white font-bold text-xl">
                    B
                  </div>
                </div>
                <span className="font-bold text-xl">
                  <span className="text-purple-600">BuyIt</span>Now
                </span>
              </Link>
              <button onClick={toggleMobileMenu}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <div key={item.title}>
                  {item.children ? (
                    <div className="mb-2">
                      <div className="font-medium mb-2">{item.title}</div>
                      <div className="pl-4 flex flex-col gap-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            to={child.href}
                            className="text-sm hover:text-purple-600"
                            onClick={toggleMobileMenu}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link to={item.href} className="font-medium hover:text-purple-600" onClick={toggleMobileMenu}>
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
              {user ? (
                <>
                  <Link to="/account" className="font-medium hover:text-purple-600" onClick={toggleMobileMenu}>
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      toggleMobileMenu()
                    }}
                    className="text-left font-medium text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="font-medium hover:text-purple-600" onClick={toggleMobileMenu}>
                  Login / Register
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

const navItems = [
  {
    title: "Phones/Tablets",
    href: "/category/phones-tablets",
    children: [
      { title: "iPhones", href: "/category/phones-tablets/iphones" },
      { title: "Samsung", href: "/category/phones-tablets/samsung" },
      { title: "Tablets", href: "/category/phones-tablets/tablets" },
      { title: "Other Brands", href: "/category/phones-tablets/other" },
    ],
  },
  {
    title: "Laptops",
    href: "/category/laptops",
    children: [
      { title: "MacBooks", href: "/category/laptops/macbooks" },
      { title: "Windows", href: "/category/laptops/windows" },
      { title: "Gaming", href: "/category/laptops/gaming" },
    ],
  },
  {
    title: "Accessories",
    href: "/category/accessories",
    children: [
      { title: "Phone Cases", href: "/category/accessories/phone-cases" },
      { title: "Chargers", href: "/category/accessories/chargers" },
      { title: "Headphones", href: "/category/accessories/headphones" },
    ],
  },
  { title: "Watches", href: "/category/watches" },
  {
    title: "Electronics",
    href: "/category/electronics",
    children: [
      { title: "TVs", href: "/category/electronics/tvs" },
      { title: "Audio", href: "/category/electronics/audio" },
      { title: "Cameras", href: "/category/electronics/cameras" },
    ],
  },
  { title: "Blog", href: "/blog" },
  { title: "About Us", href: "/about" },
]

export default Header
