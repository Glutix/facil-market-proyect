import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { postProduct } from "../services/productServices";
import axios, { AxiosHeaderValue } from "axios";
import { FormCreateProduct, ErrorsFormProduct } from "../utils/interfaces";
import { validate } from "../utils/FormProductValidation";
import { capitalizeFirstLetter } from "../utils/capitalizerFirstLetter";


const FormCreateProduct: React.FC = () => {
  const categories = useSelector((state: RootState) => state.category.value);
  const userLogin = useSelector((state: RootState) => state.user.userLogin);
  const navigate = useNavigate();
  const { userValidation } = useSelector((state: RootState) => state.user);

  //? Estado Local
  const [errors, setErrors] = useState<Partial<ErrorsFormProduct>>({});
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormCreateProduct>({
    userID: Number(userLogin.user.id),
    categoryID: 0,
    name: "",
    location: "",
    description: "",
    stock: 0,
    image: [],
    price: 0,
    rating: 0,
  });

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setErrors(
      validate({
        ...formData,
        [name]: value,
      })
    );
  };

  const uploadImages = async (files: File[]): Promise<void> => {
    setLoading(true);

    try {
      const uploadPromises = files.map(async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("tags", "codeinfuse, medium, gist");
        formData.append("upload_preset", "facilmarket");
        formData.append("api_key", "711728988333761");

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/facilmarket/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        );

        return res.data.secure_url;
      });

      const uploadedImages = await Promise.all(uploadPromises);
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

	useEffect(() => {
		const savedDescription = localStorage.getItem("productDescription");
		if (savedDescription) {
		  setFormData((prevFormData) => ({
			...prevFormData,
			description: savedDescription,
			
		  }));
		}
	  }, []);
	
	  useEffect(() => {
		localStorage.setItem("productDescription", formData.description);
	  }, [formData.description]);
	





	const imagePreview = () => {
		if (loading === true) {
			return <h3>Cargando Imagenes...</h3>;
		}
		if (loading === false) {
			return (
				<div>
					{images.length <= 0 ? (
						<p>No hay imágenes</p>
					) : (
						images.map((item, index) => (
							<img
								key={index}
								alt="image preview"
								width={60}
								height={60}
								src={item}
							/>
						))
					)}
				</div>
			);
		}
	};

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    try {
      const token = window.localStorage.getItem("token");
      const Headers: Partial<AxiosHeaderValue> = {
        Authorization: `Bearer ${token}`,
      };
      const product = {
        userID: Number(userLogin.user.id),
        categoryID: Number(formData.categoryID),
        name: capitalizeFirstLetter(formData.name),
        location: capitalizeFirstLetter(formData.location),
        description: capitalizeFirstLetter(formData.description),
        stock: Number(formData.stock),
        images: images,
        price: Number(formData.price),
        rating: 0,
      };
      postProduct(product, Headers);
      setErrors({});
      alert("Producto creado correctamente");
      navigate("/products");
    } catch (error: any) {
      console.log(error.message);
      alert("Datos incompletos");
    }
  };

  return (
    <>
      {userValidation ? (
        <form className="form" onSubmit={handleSubmit}>
          <h2>Publica tu Producto</h2>

          <label className="from__input-name">
            Nombre del producto:
            <input
              type="text"
              name="name"
              placeholder="Ingresar un nombre"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </label>

          <label htmlFor="form__input-location">
            Ubicacion:
            <input
              type="text"
              name="location"
              placeholder="Ingresa tu ubicación"
              onChange={handleChange}
              value={formData.location}
            />
            {errors.location && <p className="error">{errors.location}</p>}
          </label>

          <label htmlFor="form__input-stock">
            Unidades:
            <input
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              type="number"
            />
            {errors.stock && <p className="error">{errors.stock}</p>}
          </label>

          <label htmlFor="form__input-image">
            Imagen:
            <Dropzone onDrop={uploadImages}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <span>📂</span>
                  </div>
                </section>
              )}
            </Dropzone>
            {errors.images && <p className="error">{errors.images}</p>}
          </label>
          {imagePreview()}

          <label htmlFor="form__category">Categoría:</label>
          <select
            name="categoryID"
            value={formData.categoryID}
            onChange={handleChange}
          >
            {categories.map((category: any, index: number) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <label htmlFor="price">
            Precio:
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <p className="error">{errors.price}</p>}
          </label>

          <label htmlFor="form__description">Descripción:</label>
          <textarea
            name="description"
            placeholder="Ingresa una descripción para tu producto"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <p className="error">{errors.description}</p>}
          {Object.values(formData).every(
            (value) => Boolean(value) === null || undefined
          ) ? (
            <button disabled>Publicar</button>
          ) : (
            <button type="submit">Publicar</button>
          )}
        </form>
      ) : (
        <div className="form-verification container">
          <div className="form-verification-card">
            <h1 className="form-verification-title">
              ¡Hola! Para vender, ingresá a tu cuenta
            </h1>

            <Link to="/register">
              <button className="form-verification-button">Crear cuenta</button>
            </Link>

            <Link to="/login">
              <h2 className="form-verification-text">Ingresar</h2>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default FormCreateProduct;
