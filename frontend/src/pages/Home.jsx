import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const  {user}  = useSelector((state) => state.auth);
  // console.log(user.user.role,'USERDATAHOME')

  return (
    <>
      {user ? <p>Hello {user.user.username}</p> : <p>Please Login</p>}
      <div>
        <h1>Welcome to the Home Page</h1>
         {user?.user?.role === "OWNER" && (
          <Link to="/add-product">
            <button>Add Product</button>
          </Link>
        )}
         {user?.user?.role === "OWNER" && (
          <Link to="/dashboard">
            <button>Owner Dashboard</button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Home;
