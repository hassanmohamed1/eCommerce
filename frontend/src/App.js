import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";
import CartScreen from "./components/screens/CartScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import ShippingScreen from "./components/screens/ShippingScreen";
import PaymentScreen from "./components/screens/PaymentScreen";
import PlaceorderScreen from "./components/screens/PlaceorderScreen";
import OrderScreen from "./components/screens/OrderScreen";
import UserListScreen from "./components/screens/UserListScreen";
import UserEditScreen from "./components/screens/UserEditScreen";
import ProductListScreen from "./components/screens/ProductListScreen";
import ProductEditScreen from "./components/screens/ProductEditScreen";
import OrderListScreen from "./components/screens/OrderListScreen";
import { Container } from "react-bootstrap"

function App() {
  return (
    <Router>
    <Header />

    <main>
      <Container className="py-3">
        <Routes>
          <Route path="/page/:pageNumber" element={<HomeScreen />}/>
          <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />}/>
          <Route path="/" element={<HomeScreen />}/>
          <Route path="/search/:keyword" element={<HomeScreen />}/>
          <Route path="/product/:id" element={<ProductScreen />}/>
          <Route path="/cart/:id" element={<CartScreen />}/>
          <Route path="/cart" element={<CartScreen />}/>
          <Route path="/login" element={<LoginScreen />}/>
          <Route path="/register" element={<RegisterScreen />}/>
          <Route path="/profile" element={<ProfileScreen />}/>
          <Route path="/shipping" element={<ShippingScreen />}/>
          <Route path="/payment" element={<PaymentScreen />}/>
          <Route path="/placeorder" element={<PlaceorderScreen />}/>
          <Route path="/order/:id" element={<OrderScreen />}/>
          <Route path="/admin/userlist" element={<UserListScreen />}/>
          <Route path="/admin/user/:id/edit" element={<UserEditScreen />}/>
          <Route path="/admin/product/:id/edit" element={<ProductEditScreen />}/>
          <Route path="/admin/productlist" element={<ProductListScreen />}/>
          <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen />}/>
          <Route path="/admin/orderlist" element={<OrderListScreen />}/>
        </Routes>
      </Container>
    </main>

    <Footer />

    </Router>
  );
}

export default App;
