import './App.css'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import {BrowserRouter , Routes,Route} from "react-router-dom";
import Home from './pages/Home.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Chat from './components/Chat.jsx';
import ProductList from './pages/ProductList.jsx';
import { useSelector } from 'react-redux';
function App() {

  const {user} = useSelector(state=>state.auth);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<ProtectedRoute role="OWNER"><Dashboard user_id={user?.user?._id} /></ProtectedRoute>} />
        <Route path='/chat' element={ <Chat /> } />
        <Route path='/products' element={ <ProductList /> } />
        <Route path='/add-product' element={ <ProtectedRoute role="OWNER"><AddProduct /></ProtectedRoute>} />
        <Route path="/unauthorized" element={<p>Access Denied</p>} />
      </Routes>
    </BrowserRouter>
  );
}
    

export default App;
