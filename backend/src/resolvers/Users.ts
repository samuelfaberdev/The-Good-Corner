import { validate } from "class-validator";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User, UserInput } from "../entities/User";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import { ContextType } from "../auth";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsers() {
    const Users = await User.find();
    return Users;
  }

  @Query(() => User)
  async getUserById(@Arg("id") id: number): Promise<User> {
    const user = await User.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error("Pas de User avec cette 'id'");
    }
    return user;
  }

  @Mutation(() => User)
  async signUp(@Arg("data", () => UserInput) data: UserInput): Promise<User> {
    const errors = await validate(data);

    const existingUser = await User.findOne({ where: { email: data.email } });

    const newUser = new User();

    if (errors.length === 0) {
      if (!existingUser) {
        const hashedPassword = await argon2.hash(data.password);
        Object.assign(newUser, { email: data.email, hashedPassword });
        await newUser.save();
        return newUser;
      }
    } else {
      throw new Error(`Validation failed!`);
    }
    throw new Error(`User already exist!`);
  }

  @Mutation(() => User)
  async signIn(
    @Ctx() context: { req: any; res: any },
    @Arg("email")
    email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      const verifyPassword = await argon2.verify(
        existingUser.hashedPassword,
        password
      );
      if (verifyPassword) {
        let token = jwt.sign(
          { data: { userId: existingUser.id, email } },
          "jwtsecret",
          {
            expiresIn: "2h",
          }
        );
        console.log("Token JWT =>", token);

        const cookie = new Cookies(context.req, context.res);
        cookie.set("token", token, {
          httpOnly: true,
          secure: false,
          maxAge: 1000 * 60 * 60 * 24,
        });

        return existingUser;
      }
    }
    throw new Error(`Wrong email or password!`);
  }

  @Mutation(() => Boolean)
  async signOut(@Ctx() context: { req: any; res: any }): Promise<Boolean> {
    const cookie = new Cookies(context.req, context.res);
    cookie.set("token", "", {
      httpOnly: true,
      secure: false,
      maxAge: 0,
    });
    return true;
  }

  @Authorized()
  @Query(() => User)
  async me(@Ctx() context: ContextType): Promise<User> {
    return context.user as User;
  }
}
