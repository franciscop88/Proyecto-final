import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { createProduct } from '../services/product.service';
import { Uploadfile } from '../components';
import { useCreateProductError } from '../hooks';

export const CreateProduct = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [send, setSend] = useState(false);

  const formSubmit = async (formData) => {
    console.log({ formData });
    setSend(true);
    const respose = await createProduct(formData);
    if (respose.status == 200) {
        Swal.fire({
          icon: 'success',
          title: 'Product created successfully 🚀',
          showConfirmButton: false,
          timer: 1500,
        });
      navigate('/dashboard');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error: No se ha podido guardar el elemento en la base de datos ❌',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setSend(false);
  };

  return (
    <>
      <div className="form-wrap">
        <h1>Create Product</h1>
        <p>Add your product details below.</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="product_container form-group">
            <input
              className="input_product"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register('name', { required: true })}
            />
            <label htmlFor="name" className="custom-placeholder">
              Product Name
            </label>
          </div>
          <div className="description_container form-group">
            <textarea
              className="input_product"
              id="description"
              name="description"
              autoComplete="false"
              {...register('description', { required: true })}
            ></textarea>
            <label htmlFor="description" className="custom-placeholder">
              Product Description
            </label>
          </div>
          <div className="price_container form-group">
            <input
              className="input_product"
              type="number"
              id="price"
              name="price"
              autoComplete="false"
              {...register('price', { required: true })}
            />
            <label htmlFor="price" className="custom-placeholder">
              Product Price
            </label>
          </div>
          <div className="category_container form-group">
            <select
              className="input_product"
              id="category"
              name="category"
              {...register('category', { required: true })}
            >
              <option value="">Select Category</option>
              <option value="vehiculos">Vehiculos</option>
              <option value="electronica">Electronica</option>
              <option value="casa">Casa</option>
              <option value="ropa y complementos">Ropa y Complementos</option>
              <option value="mascotas">Mascotas</option>
              <option value="otros">Otros</option>
            </select>
            <label htmlFor="category" className="custom-placeholder">
              Category
            </label>
          </div>
          <div className="upload_container form-group">
            <input
              className="input_product"
              type="text"
              id="image"
              name="image"
              autoComplete="false"
              {...register('image', { required: true })}
            />
            <label htmlFor="image" className="custom-placeholder">
              Product image URL
            </label>
          </div>
          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? '#fe46c5' : '#ffd819' }}
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
