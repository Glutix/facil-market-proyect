import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
} from "sequelize-typescript";
import Product from "./Product"; // Importa el modelo Producto

@Table({ tableName: "reviews" })
class Review extends Model {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	id!: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	userID!: string;


	@ForeignKey(() => Product) // Agrega esta línea para establecer la clave externa
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	productID!: number; // Cambia el nombre de la columna a productoID o el nombre de tu elección

	@BelongsTo(() => Product) // Agrega esta línea para definir la asociación con Producto
	product!: Product;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	text!: string;

	@Column({
		type: DataType.FLOAT,
		allowNull: false,
	})
	rating?: number;
}

export default Review;
