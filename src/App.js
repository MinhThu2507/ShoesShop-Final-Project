import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import AllProducts from './pages/AllProducts/AllProducts';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';



function App() {
  return (
    <Routes>
      <Route  element={<HomeTemplate />}>
        <Route path='home' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='cart' element={<Cart />} />
        <Route path='profile' element={<Profile />} />
        <Route path='product/:id' element={<ProductDetail />} />
        <Route path='products' element={<AllProducts />} />
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='*' element={<Navigate to='/' />} />

      </Route>
    </Routes>
  );
}

export default App;
