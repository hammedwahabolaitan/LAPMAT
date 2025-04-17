// "use client"

// import { Star } from "lucide-react"
// import { Link } from "react-router-dom"
// import { useStore } from "../context/StoreContext"

// export function ProductCard({ product }) {
//   const { id, name, price, image, category, rating, discount, isNew } = product
//   const { addToCart } = useStore()

//   const handleAddToCart = () => {
//     addToCart(product, 1)
//   }

//   return (
//     <div className="overflow-hidden group border rounded-lg shadow-sm">
//       <Link to={`/product/${id}`} className="relative block">
//         <div className="aspect-square overflow-hidden">
//           <img
//             src={image || "/placeholder.jpg"}
//             alt={name}
//             className="object-cover w-full h-full transition-transform group-hover:scale-105"
//           />
//         </div>
//         {isNew && (
//           <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">New</span>
//         )}
//         {discount && (
//           <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//             -{discount}%
//           </span>
//         )}
//       </Link>
//       <div className="p-4">
//         <div className="text-sm text-gray-500 mb-1">{category}</div>
//         <Link to={`/product/${id}`}>
//           <h3 className="font-medium line-clamp-2 group-hover:text-purple-600 transition-colors mb-1">{name}</h3>
//         </Link>
//         <div className="flex items-center gap-1 mb-2">
//           {Array(5)
//             .fill(null)
//             .map((_, i) => (
//               <Star
//                 key={i}
//                 className={`h-3.5 w-3.5 ${
//                   i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
//                 }`}
//               />
//             ))}
//           <span className="text-xs text-gray-500 ml-1">{rating}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="font-semibold">₦{price.toLocaleString()}</div>
//           {discount && (
//             <div className="text-sm text-gray-500 line-through">
//               ₦{(price / (1 - discount / 100)).toFixed(2).toLocaleString()}
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="p-4 pt-0">
//         <button
//           className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors"
//           onClick={handleAddToCart}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   )
// }
