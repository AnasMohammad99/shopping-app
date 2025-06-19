import database from "../prisma.js";

//-------------- Get all products ----------------------
export const getProducts = async (req, res) => {
  try {
    const products = await database.product.findMany();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

//--------------get product----------------------------
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await database.product.findUnique({
      where: { id: +id },
    });
    console.log(product);

    return res
      .status(200)
      .json({ message: "Product got successfully!", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//-------------- Add new product ----------------------
export const addProduct = async (req, res) => {
  try {
    const picture = req.file ? req.file.path : null;
    const { name, weight, price, quantity } = req.body;

    const newProduct = await database.product.create({
      data: {
        name,
        weight: +weight,
        price: +price,
        quantity: +quantity,
        picture: picture,
      },
    });

    return res
      .status(201)
      .json({ message: "Product added successfully!", newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//----------------- Update product -------------------
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const picture = req.file ? req.file.path : undefined;
    const { name, weight, price, quantity } = req.body;

    // Check if product exists
    const existingProduct = await database.product.findUnique({
      where: { id: +id },
    });

    if (!existingProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const updateData = {
      ...(name && { name }),
      ...(weight && { weight: +weight }),
      ...(price && { price: +price }),
      ...(quantity && { quantity: +quantity }),
      ...(picture && { picture }),
    };

    const updatedProduct = await database.product.update({
      where: { id: +id },
      data: updateData,
    });

    return res
      .status(200)
      .json({ message: "Product updated successfully!", updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ... existing code ...

//---------------- Delete product --------------------
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const existingProduct = await database.product.findUnique({
      where: { id: +id },
    });

    if (!existingProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const deletedProduct = await database.product.delete({
      where: { id: +id },
    });

    return res
      .status(200)
      .json({ message: "Product deleted successfully!", deletedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
