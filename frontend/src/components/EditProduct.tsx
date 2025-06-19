import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, InputNumber, Button, message, Upload, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getProduct, updateProduct } from "../store/slices/productSlice";
import { updateCartItem } from "../store/slices/cartSlice";
import type { UploadFile } from "antd/es/upload/interface";
import type { Product } from "../types/product";

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.products);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const loading = useAppSelector((state) => state.products.loading);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.picture) {
      setFileList([
        {
          uid: "-1",
          name: "product-image",
          status: "done",
          url: product.picture,
        },
      ]);
    }
  }, [product]);

  const handleSubmit = async (values: any) => {
    try {
      console.log("Form values:", values); // Add this line
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price.toString());
      formData.append("weight", values.weight.toString());
      formData.append("quantity", values.quantity.toString());
      if (fileList[0]?.originFileObj) {
        formData.append("picture", fileList[0].originFileObj);
      }
      // Add these lines to debug form data
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      await dispatch(
        updateProduct({
          id: Number(id),
          product: formData as unknown as Partial<Product>,
        })
      );

      const updatedProduct: Product = {
        id: Number(id),
        name: values.name,
        price: values.price,
        weight: values.weight,
        quantity: values.quantity,
        picture: product?.picture || "",
        createdAt: product?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dispatch(updateCartItem(updatedProduct));
      message.success("Product updated successfully!");
      navigate("/");
    } catch (error) {
      console.log(error.message);

      message.error("Failed to update product");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Spin spinning={loading} tip="Saving...">
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "24px" }}>
        <h1>Edit Product</h1>
        <Form
          initialValues={{
            name: product.name,
            price: product.price,
            weight: product.weight,
            quantity: product.quantity,
          }}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please input the product name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="weight"
            label="Weight"
            rules={[{ required: true, message: "Please input the weight!" }]}
          >
            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: "Please input the quantity!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Picture">
            <Upload
              listType="picture"
              maxCount={1}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Upload Picture</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default EditProduct;
