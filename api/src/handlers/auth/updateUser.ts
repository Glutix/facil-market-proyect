import { Request, Response } from "express";
import { changeUser } from "../../controllers/authControllers";
import User from "../../models/User";

const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updates = req.body;

  try {
    const response = await changeUser(userId, updates);

    if (response) {
      const updateUser = await User.findByPk(userId);
      return res.status(200).json({
        message: "Usuario actualizado correctamente",
        user: updateUser,
      });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

export default updateUser;
