import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Input, message, Row, Col, Modal } from "antd";
import {
  PlusOutlined,
  ShoppingCartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getProducts, deleteProduct } from "../store/slices/productSlice";
import { addToCart, removeFromCart } from "../store/slices/cartSlice";
import type { RootState, AppDispatch } from "../store/store";
import type { Product } from "../types";

const { Search } = Input;

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items: products = [], loading } = useSelector(
    (state: RootState) => state.products
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    console.log("Fetching products...");
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log("Products updated:", products);
  }, [products]);

  const handleAddToCart = (product: Product) => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    if (cartItem && cartItem.cartQuantity >= product.quantity) {
      message.error("Not enough items in stock!");
      return;
    }
    dispatch(addToCart(product));
    message.success("Added to cart!");
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value.toLowerCase());
  };
  // console.log("Products:", products, typeof products);
  const sortedProducts = products
    ? [...products].sort((a, b) => a.id - b.id)
    : [];

  const filteredProducts = sortedProducts.filter((product: Product) =>
    (product?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setProductToDelete(product);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        await dispatch(deleteProduct(productToDelete.id)).unwrap();
        dispatch(removeFromCart(productToDelete.id));
        message.success("Product deleted successfully!");
      } catch (error) {
        message.error("Failed to delete product");
      }
    }
    setDeleteModalVisible(false);
    setProductToDelete(null);
  };

  if (loading) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        Loading products...
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Search
          placeholder="Search products..."
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/add-product")}
        >
          Add Product
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {filteredProducts.map((product: Product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              className="product-card"
              cover={
                <img
                  alt={product.name}
                  src={`http://localhost:5000/${product.picture}`}
                  className="product-image"
                  style={{ height: 200, objectFit: "cover" }}
                />
              }
              onClick={() => navigate(`/edit-product/${product.id}`)}
            >
              <Card.Meta
                title={product.name}
                description={
                  <>
                    <p>Price: ${product.price}</p>
                    <p>Weight: {product.weight}kg</p>
                    <p>Available: {product.quantity}</p>
                  </>
                }
              />
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  disabled={product.quantity === 0}
                >
                  Add to Cart
                </Button>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={(e) => handleDeleteClick(e, product)}
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Delete Product"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => {
          setDeleteModalVisible(false);
          setProductToDelete(null);
        }}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete "{productToDelete?.name}"?</p>
        <p>This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default ProductList;
