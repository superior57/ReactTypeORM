/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:24:58
 * @modify date 2020-05-17 18:24:58
 * @desc [description]
 */
import { User } from "../entity/User";

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    getUser: async (_: any, args: any) => {
      const { id } = args;

      return await User.findOne({
        where: {
          id: id
        }
      });
    }
  },
  Mutation: {
    addUser: async (_: any, args: any) => {
      const { username, lastName, age } = args;
      try {
        const user = User.create({ username, lastName, age });

        await user.save();

        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
