import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About BuyItNow</h3>
            <p className="text-gray-600 mb-4">
              No1 Ib City Gadget Shop that sells in wholesales and pieces too. We offer the best prices on quality
              gadgets and electronics.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-600 hover:text-purple-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="text-gray-600 hover:text-purple-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link to="#" className="text-gray-600 hover:text-purple-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link to="#" className="text-gray-600 hover:text-purple-600">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-purple-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/category/all" className="text-gray-600 hover:text-purple-600">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-purple-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-purple-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-purple-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/phones-tablets" className="text-gray-600 hover:text-purple-600">
                  Phones & Tablets
                </Link>
              </li>
              <li>
                <Link to="/category/laptops" className="text-gray-600 hover:text-purple-600">
                  Laptops
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="text-gray-600 hover:text-purple-600">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/category/watches" className="text-gray-600 hover:text-purple-600">
                  Watches
                </Link>
              </li>
              <li>
                <Link to="/category/electronics" className="text-gray-600 hover:text-purple-600">
                  Electronics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">123 Main Street, Ibadan, Nigeria</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0" />
                <span className="text-gray-600">+234 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0" />
                <span className="text-gray-600">info@buyitnow.ng</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} BuyItNow. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy-policy" className="text-gray-600 hover:text-purple-600 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-600 hover:text-purple-600 text-sm">
                Terms of Service
              </Link>
              <Link to="/shipping-policy" className="text-gray-600 hover:text-purple-600 text-sm">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
