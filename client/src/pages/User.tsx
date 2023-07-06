import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import { BiLogOut, BiSolidDashboard } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBagCheck, BsCartCheck } from "react-icons/bs";

interface UserProps {
	handleLogOut: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const User = ({ handleLogOut }: UserProps) => {
	const [profileOpen, setProfileOpen] = useState<boolean | null>(false);
	const { userLogin } = useSelector((state: RootState) => state.user);

	const handleMouseEnter = () => {
		setProfileOpen(true);
	};

	const handleMouseLeave = () => {
		setProfileOpen(false);
	};

	return (
		<>
			<div className="profile">
				<div onMouseEnter={handleMouseEnter} className="profile-user-image">
					<img src={userLogin.user.image} alt="user image" />
				</div>

				{profileOpen && (
					<div
						className="openProfile boxItems"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<div className="image">
							<div>
								<img src={userLogin.user.image} alt="user image" />
							</div>

							<div className="openProfile-name">
								<h4>{userLogin.user.fullName}</h4>
							</div>
						</div>
						<Link to="/profile">
							<div className="box">
								<IoSettingsOutline className="icon" />
								<h4>Mi Perfil</h4>
							</div>
						</Link>
						<div className="box">
							<BsBagCheck className="icon" />
							<h4>
								<Link to="/ventas">Mis Productos</Link>
							</h4>
						</div>
						<div className="box">
							<BsCartCheck className="icon" />
							<h4>
								<Link to="/compras">Mis Compras</Link>
							</h4>
						</div>
						<div onClick={(event) => handleLogOut(event)} className="box">
							<BiLogOut className="icon" />
							<h4>Cerrar sesión</h4>
						</div>
						{userLogin.user.admin && (
							<div className="box">
								<BiSolidDashboard className="icon" />
								<h4>
									<Link to="/admin/summary">Dashboard</Link>
								</h4>
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default User;
