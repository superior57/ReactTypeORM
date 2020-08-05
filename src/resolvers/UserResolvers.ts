/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:24:58
 * @modify date 2020-05-17 18:24:58
 * @desc [description]
 */
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
} from "type-graphql";
import { compare } from "bcryptjs";

import { med_user as User } from "../entity/med_user";
import { sign } from "jsonwebtoken";
import config from '../config/config';

// Provide resolver functions for your schema fields
// export const resolvers = {
//   Query: {
//     getUser: async (_: any, args: any) => {
//       const { user } = args;

//       return await User.findOne({
//         where: [{login: user},{email:user}]
//       });
//     }
//   },
//   // Mutation: {
//   //   addUser: async (_: any, args: any) => {
//   //     const { username, lastName, age } = args;
//   //     try {
//   //       const user = User.create({ username, lastName, age });

//   //       await user.save();

//   //       return true;
//   //     } catch (error) {
//   //       return false;
//   //     }
//   //   }
//   // }
// };

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolvers {
  @Query(() => [User])
  Users() {
    return User.find();
  }

  @Mutation(() => LoginResponse)
  async login( @Arg("email") email: string, @Arg("password") password: string   ): Promise<LoginResponse> {
    const user = await User.findOne({ where: [{ email }, { login: email }] });
    if (!user) {
      throw new Error("No se encontro el usuario");
    }
    const valid = await compare(password, user.password_hash);
    if (!valid) {
      throw new Error("Contrasena incorrecta");
    }

    // login successFull 
    
    return { accessToken: sign({ userId: user.id, email: user.email }, config.jwtSecret, { expiresIn: '24h' }) };
  }

  // getUser async (_: any, args: any) => {
  //   const { user } = args;

  //   return await User.findOne({
  //     where: [{login: user},{email:user}]
  //   });
  // }
}
