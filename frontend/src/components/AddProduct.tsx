import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Input, InputNumber, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createProduct, getProducts } from "../store/slices/productSlice";
import type { UploadFile } from "antd/es/upload/interface";
import type { AppDispatch } from "../store/store";

const { TextArea } = Input;

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price.toString());
      formData.append("weight", values.weight.toString());
      formData.append("quantity", values.quantity.toString());
      if (fileList[0]?.originFileObj) {
        formData.append("picture", fileList[0].originFileObj);
      }

      await dispatch(createProduct(formData)).unwrap();
      await dispatch(getProducts());
      message.success("Product added successfully!");
      navigate("/");
    } catch (error) {
      message.error("Failed to add product");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="form-card">
      <h1 className="form-title">Add New Product</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ quantity: 1 }}
      >
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            { required: true, message: "Please enter product name" },
            {
              pattern: /^[a-zA-Z\s]*$/,
              message: "Only English letters are allowed",
            },
          ]}
        >
          <Input size="large" placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: "Please enter price" },
            { type: "number", min: 0, message: "Price must be positive" },
          ]}
        >
          <InputNumber
            size="large"
            style={{ width: "100%" }}
            placeholder="Enter price"
            prefix="$"
            precision={2}
          />
        </Form.Item>

        <Form.Item
          name="weight"
          label="Weight (kg)"
          rules={[
            { required: true, message: "Please enter weight" },
            { type: "number", min: 0, message: "Weight must be positive" },
          ]}
        >
          <InputNumber
            size="large"
            style={{ width: "100%" }}
            placeholder="Enter weight"
            precision={2}
          />
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Inventory"
          rules={[
            { required: true, message: "Please enter quantity" },
            { type: "number", min: 1, message: "Quantity must be positive" },
          ]}
        >
          <InputNumber
            size="large"
            style={{ width: "100%" }}
            placeholder="Enter quantity"
            min={1}
          />
        </Form.Item>

        <Form.Item
          name="picture"
          label="Product Image"
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            beforeUpload={() => false}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            className="upload-image"
          >
            {fileList.length < 1 && (
              <Button
                style={{
                  border: "none",
                  background: "none",
                  width: "100%",
                  height: "100%",
                }}
              >
                +
              </Button>
            )}
          </Upload>
        </Form.Item>

        <div className="form-actions">
          <Button onClick={handleCancel} className="cancel-btn" size="large">
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="add-btn"
          >
            Add Product
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;
