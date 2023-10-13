import React, { useState } from "react";
import axios from "axios";
import '../index.css';

const AdminEditProduct = ({selectedProduct}) => {
  const [editedProduct, setEditedProduct] = useState({
    name: selectedProduct.name,
    category: selectedProduct.category,
    animal:selectedProduct.animal,
    imageUrl: selectedProduct.imageUrl,
    description: selectedProduct.description,
    price: selectedProduct.price,
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditedProduct({ ...editedProduct, [name]: value });
    console.log(editedProduct);
  };

  const handleImage = (e) => {
    const file = e.target.files[0]
    setEditedProduct({ ...editedProduct, imageUrl: file })

  }



  const EditProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editedProduct.name);
      formData.append("category", editedProduct.category);
      formData.append("animal", editedProduct.animal);
      formData.append("imageUrl", editedProduct.imageUrl);
      formData.append("description", editedProduct.description);
      formData.append("price", editedProduct.price);

      // Replace 'productId' with the actual product ID you want to edit
      const productId = selectedProduct.id

      await axios.put(
        `http://localhost:3000/api/product/${productId}`,
        formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error(
        "Error Editing product:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await EditProduct();
  };
  

  return (
    <div id="editProductModal" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="modal-box">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={selectedProduct.name}
              onChange={handleInputChange}
              
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              placeholder={selectedProduct.category}
              onChange={handleInputChange}
            >
              <option value="Food">Food</option>
              <option value="Toy">Toy</option>
              <option value="Upholstery">Upholstery</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="animal">Animal:</label>
            <select
              id="animal"
              name="animal"
              placeholder={selectedProduct.animal}
              onChange={handleInputChange}
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              id="imageUrl"
              name="imageUrl"
              type='file'
              placeholder={selectedProduct.imageUrl}
              onChange={handleImage}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              placeholder={selectedProduct.description}
              onChange={handleInputChange}
              
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder={selectedProduct.price}
              onChange={handleInputChange}
              
            />
          </div>
          <button type="submit">Edit Product</button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProduct;