import mongoose from "mongoose";
import findOneUserByEmailService from "../services/userServices/findOneUserByEmailService";
import createUserService from "../services/userServices/createUserService";
import { groupPermissionSuperAdmin } from "../permissions/groups";
import createShortenerLinkService from "../services/shortenerLinkServices/createShortenerLinkService";

const MONGO_URL =
  process.env.NODE_ENV === "development"
    ? process.env.MONGO_URL_DEV
    : process.env.MONGO_URL_PROD;

mongoose
  .connect(MONGO_URL as string)
  .then(async () => {
    console.log(`Database connected and ready for ${process.env.NODE_ENV}.`);
    const userExist = await findOneUserByEmailService(
      process.env.PRIMARY_USER_EMAIL || ""
    );
    if (
      !userExist &&
      process.env.PRIMARY_USER_NAME &&
      process.env.PRIMARY_USER_EMAIL &&
      process.env.PRIMARY_USER_PASSWORD &&
      process.env.PRIMARY_USERNAME
    ) {
      const user = await createUserService({
        email: process.env.PRIMARY_USER_EMAIL,
        name: process.env.PRIMARY_USER_NAME,
        password: process.env.PRIMARY_USER_PASSWORD,
        permissions: groupPermissionSuperAdmin,
        username: process.env.PRIMARY_USERNAME,
      });
      console.log("Primary user created successfully!");

      await createShortenerLinkService({
        originalUrl: `${process.env.LINK_USERNAME_ONLINKS as string}/${
          user.username
        }`,
        title: `shortener-link-username-${user.username}`,
        userId: user._id,
        short: user.username,
      });

      console.log("Short user created successfully!");
    }
  })
  .catch((error) => console.log(error));
