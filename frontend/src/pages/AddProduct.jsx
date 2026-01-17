import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import {
  productStart,
  productSuccess,
  productFail,
  resetProduct,
} from "../features/product/productSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.product
  );

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(productStart());

      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("image", image);

      await api.post("/products/create", formData);

      dispatch(productSuccess());
    } catch (err) {
      dispatch(
        productFail(
          err.response?.data?.message || "Product creation failed"
        )
      );
    }
  };

  useEffect(() => {
    if (success) {
      alert("Product created successfully");
      setTitle("");
      setPrice("");
      setImage(null);
      dispatch(resetProduct());
    }
  }, [success, dispatch]);

  return (
    <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f6f8",
    }}
  >
  <form
    onSubmit={handleSubmit}
    style={{
      width: "380px",
      padding: "25px",
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    }}
  >
    <h2
      style={{
        textAlign: "center",
        marginBottom: "20px",
        color: "#333",
      }}
    >
      Create Product
    </h2>

    {/* Product Name */}
    <div style={{ marginBottom: "15px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "5px",
          fontWeight: "500",
        }}
      >
        Product title
      </label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter product title"
        required
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />
    </div>

    {/* Price */}
    <div style={{ marginBottom: "15px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "5px",
          fontWeight: "500",
        }}
      >
        Price
      </label>
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter price"
        type="number"
        required
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />
    </div>

    {/* Image */}
    <div style={{ marginBottom: "20px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "5px",
          fontWeight: "500",
        }}
      >
        Product Image
      </label>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        required
        style={{
          width: "100%",
        }}
      />
    </div>

    {/* Button */}
    <button
      disabled={loading}
      style={{
        width: "100%",
        padding: "10px",
        background: loading ? "#aaa" : "#4f46e5",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: loading ? "not-allowed" : "pointer",
        fontSize: "16px",
      }}
    >
      {loading ? "Creating..." : "Create Product"}
    </button>

    {/* Error */}
    {error && (
      <p
        style={{
          color: "red",
          marginTop: "15px",
          textAlign: "center",
        }}
      >
        {error}
      </p>
    )}
  </form>
</div>

  );
};

export default AddProduct;
