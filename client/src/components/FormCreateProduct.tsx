import React, { useState } from "react";
import { FormCreateProduct } from "../utils/interfaces";
import { validate } from "../utils/FormProductValidation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { postProduct } from "../services/productServices";
import { useNavigate } from "react-router-dom";

const FormCreateProduct: React.FC = () => {
	//? Estado Global
	const { categories, idLogin } = useSelector((state: RootState) => ({
		categories: state.category.value,
		idLogin: state.user.userLogin.id,
	}));

	//? hooks
	const navigate = useNavigate();

	//? Estado Local
	const [errors, setErrors] = useState<Partial<FormCreateProduct>>({});
	const [formData, setFormData] = useState<FormCreateProduct>({
		userID: Number(idLogin),
		categoryID: 0,
		name: "",
		location: "",
		description: "",
		stock: 1,
		image: "",
		price: 0,
		rating: 0,
	});

	//? HandleChanges
	const handleChange = (
		event: React.ChangeEvent<
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

	

	console.log(formData);
	//? HandleSubmit
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		//? Si no tengo errores
		if (!Object.keys(errors).length) {
			//? Parseo de info
			formData.stock = Number(formData.stock);
			formData.price = Number(formData.stock)
			formData.categoryID = Number(formData.categoryID);

			//? Creo el producto
			
			postProduct(formData);
			setFormData({
				userID: Number(idLogin),
				categoryID: 0,
				name: "",
				location: "",
				description: "",
				stock: 1,
				image: "",
				price: 1,
				rating: 0,
			});
			setErrors({});
			alert("Producto creado correctamente");
			navigate("/products");
			console.log(formData.price)
		} else {
			alert("Datos incompletos");
			console.log(formData.price)
		}
	};

	return (
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
				Stock:
				<input
					name="stock"
					value={formData.stock}
					onChange={handleChange}
					type="number"
				/>
			</label>

			<label htmlFor="form__input-location">
				imagen:
				<input
					name="image"
					type="text"
					placeholder="URL de tu imagen"
					onChange={handleChange}
					value={formData.image}
				/>
				{errors.image && <p className="error">{errors.image}</p>}
			</label>

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

			<label htmlFor="price">Price:</label>
			<input
				type="number"
				id="price"
				name="price"
				value={formData.price}
				onChange={handleChange}
			/>

			<label htmlFor="form__description">Descripción:</label>
			<textarea
				name="description"
				placeholder="Ingresa una descripción para tu producto"
				value={formData.description}
				onChange={handleChange}
			/>
			{errors.description && <p className="error">{errors.description}</p>}
			<button type="submit">Enviar</button>
		</form>
	);
};

export default FormCreateProduct;
