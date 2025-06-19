import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Layout, Button, Badge, Typography } from "antd";
import { Provider, useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { store } from "./store/store";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import type { RootState } from "./store/store";
import "./App.css";

const { Header, Content } = Layout;
const { Title } = Typography;

const HeaderContent = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { total } = useSelector((state: RootState) => state.cart);
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.cartQuantity,
    0
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div className="logo">
        <img
          src="/logo_with_text.svg"
          alt="Shopping List Logo"
          style={{ height: 36 }}
        />
      </div>
      <div className="desktop-cart-button">
        <Badge count={totalItems}>
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => navigate("/cart")}
          >
            Cart
          </Button>
        </Badge>
        <Title className="cart-total-desktop" level={4}>
          PAY {total.toFixed(2)} EGP
        </Title>
      </div>
    </div>
  );
};

const MobileCartButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { total } = useSelector((state: RootState) => state.cart);
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.cartQuantity,
    0
  );

  // Only show on the main page
  if (location.pathname !== "/") {
    return null;
  }

  return (
    <div className="mobile-cart-button">
      <Badge count={totalItems}>
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={() => navigate("/cart")}
          size="large"
        >
          Cart
        </Button>
      </Badge>
      <Title className="cart-total" level={4}>
        PAY {total.toFixed(2)} EGP
      </Title>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout className="layout">
          <Header className="header">
            <HeaderContent />
          </Header>
          <Content className="content">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
            </Routes>
          </Content>
          <MobileCartButton />
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
