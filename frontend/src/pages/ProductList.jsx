import { useEffect, useState } from "react";
import api from "../services/api";
import "./ProductList.css";
import {useNavigate} from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.products || res.data);
      } catch (error) {
        console.error("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading products...</h2>;
  }

  const handleChatOpen = (productId, ownerId) => () => {
     navigate(`/chat?productId=${productId}&ownerId=${ownerId}`);
  }

  return (
    <div className="product-page">
      <h2 className="page-title">🛒 Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.title}
            />

            <div className="product-info">
              <h3>{product.title}</h3>
              <p className="price">₹{product.price}</p>

              <button
                onClick={handleChatOpen(product._id, product.owner)}
              >
                Chat with Owner
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
