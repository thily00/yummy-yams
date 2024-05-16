import { Role } from "../enums/User.enum";
import User, { IUser } from "../models/User";

class UserService {

    createUser = async (name: string, email: string, password: string): Promise<IUser> => {
        const newUser = new User({ name, email, password, role: Role.PLAYER });
        await newUser.save();
        return newUser;
    }

    findByEmail = async (email: string): Promise<IUser | null>  => {
        return await User.findOne({ email: email });
    }

    me = async (id:string): Promise<IUser | null> => {
        return await User.findById(id);
    }

}

export default UserService;