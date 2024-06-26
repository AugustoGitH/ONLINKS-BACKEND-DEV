import { AppError } from "../../helpers/errors/AppError";
import User from "../../models/User";
import { User as IUser } from "../../models/User/types";
import deleteAllLinkPagesByUserIdService from "../linkPageServices/deleteAllLinkPagesByUserIdService";

const deleteUserByIdService = async (id: string): Promise<IUser> => {
  try {
    const userDeleted = await User.findById(id);
    if (!userDeleted) {
      throw new AppError("User not found", 404);
    }

    await userDeleted.deleteOne();

    await deleteAllLinkPagesByUserIdService(id);

    return userDeleted;
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      throw new AppError(error.message, error.statusCode);
    }
    throw new AppError("An error occurred while deleting user");
  }
};

export default deleteUserByIdService;
