import { AppError } from "../../helpers/errors/AppError";
import User from "../../models/User";
import { UpdateUser, User as IUser } from "../../models/User/types";
import bcrypt from "bcryptjs";
const updateUserService = async (
  userFields: UpdateUser,
  id: string
): Promise<IUser> => {
  try {
    const userUpdated = await User.findOneAndUpdate(
      { _id: id },
      {
        ...userFields,
        ...(userFields.password && {
          password: bcrypt.hashSync(userFields.password, 10),
        }),
      },
      {
        new: true,
      }
    );

    if (!userUpdated) {
      throw new AppError("User not found");
    }

    return userUpdated;
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      throw new AppError(error.message, error.statusCode);
    }
    throw new AppError("An error occurred while updating a user");
  }
};

export default updateUserService;
