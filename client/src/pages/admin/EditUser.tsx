import { useState, useEffect, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../services/userServices";
import { user } from "../../utils/interfaces";

const EditUser = () => {
	const { id } = useParams();

	const [user, setUser] = useState<user>({
		id: String(id),
		fullName: "",
		email: "",
		password: "",
		image: "",
	});

	const [loading, setLoading] = useState(false);
	const [updating, setUpdating] = useState(false);

	useEffect(() => {
		setLoading(true);
		const fetchUsers = async () => {
			try {
				const res = await getUserById(id);

				setUser({
					...res,
					password: "",
				});
			} catch (error) {
				console.log(error);
			}
		};
		fetchUsers();
		setLoading(false);
	}, [id]);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setUpdating(true);
		try {
			const res = await updateUser(String(id), user);
			console.log(res);

			setUser({ ...res.user, password: "" });
		} catch (error) {
			console.log(error);
		}
		setUpdating(false);
		alert("Perfil actualizado");
	};

	return (
		<div className="editUser">
			<div className="editUser-container">
				{loading ? (
					<p>Loading...</p>
				) : (
					<form onSubmit={handleSubmit} className="editUser-form">
						<h2>User profile</h2>

						<label htmlFor="fullName">FullName:</label>
						<input
							type="text"
							id="fullName"
							value={user.fullName}
							onChange={(e) => setUser({ ...user, fullName: e.target.value })}
						/>

						<label htmlFor="email">Email:</label>
						<input
							type="text"
							id="email"
							value={user.email}
							onChange={(e) => setUser({ ...user, email: e.target.value })}
						/>

						<label htmlFor="password">Password:</label>
						<input
							type="text"
							id="password"
							value={user.password}
							onChange={(e) => setUser({ ...user, password: e.target.value })}
						/>

						<button type="submit">
							{updating ? "actualizando..." : "actualizar"}
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default EditUser;
