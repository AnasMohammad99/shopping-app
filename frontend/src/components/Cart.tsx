import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Typography } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  removeFromCart,
  decreaseQuantity,
  clearCart,
  addToCart,
} from "../store/slices/cartSlice";
import type { RootState } from "../store/store";

const { Title, Text } = Typography;

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
    message.success("Item removed from cart");
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantity(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    message.success("Cart cleared");
  };

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "48px" }}>
        <Title level={3}>Your cart is empty</Title>
        <Button type="primary" onClick={() => navigate("/")}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Title level={2}>Shopping Cart</Title>
        <Button danger onClick={handleClearCart}>
          Clear Cart
        </Button>
      </div>

      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <img
            src={`http://localhost:5000/${item.picture}`}
            alt={item.name}
            className="cart-item-image"
          />
          <div className="cart-item-details">
            <Title level={4}>{item.name}</Title>
            <Text>Price: ${item.price}</Text>
            <br />
            <Text>Weight: {item.weight}kg</Text>
          </div>
          <div className="cart-item-actions">
            <Button
              icon={<MinusOutlined />}
              onClick={() => handleDecreaseQuantity(item.id)}
              disabled={item.cartQuantity <= 1}
            />
            <Text>{item.cartQuantity}</Text>
            <Button
              icon={<PlusOutlined />}
              onClick={() => handleAddToCart(item)}
              disabled={item.cartQuantity >= item.quantity}
            />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleRemoveFromCart(item.id)}
            />
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <Title level={3}>Total: ${total.toFixed(2)}</Title>
        <div className="cart-actions">
          <Button type="primary">Proceed to Payment</Button>
          <Button type="primary" onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
