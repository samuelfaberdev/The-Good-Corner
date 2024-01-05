import Cookies from "cookies";
import jwt from "jsonwebtoken";
import { AuthChecker } from "type-graphql";
import { User } from "./entities/User";

export type ContextType = {
  req: any;
  res: any;
  user?: User;
};

export const customAuthChecker: AuthChecker<ContextType> = async ({
  root,
  args,
  context,
  info,
}) => {
  const cookie = new Cookies(context.req, context.res);
  const token = cookie.get("token");

  if (!token) {
    console.error("Missing token!");
    return false;
  }

  try {
    const payload = jwt.verify(token, "jwtsecret");

    if (typeof payload === "object" && "userId" in payload.data) {
      const user = await User.findOneBy({ id: payload.data.userId });

      if (user !== null) {
        context.user = Object.assign(user, { hashedPassword: undefined });
        console.info("Authorized!");
        return true;
      } else {
        console.error("User not found!");
        return false;
      }
    } else {
      console.error("Invalid token, user missing!");
      return false;
    }
  } catch {
    console.error("Invalid token!");
    return false;
  }
};
