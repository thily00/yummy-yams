import User, { IUser } from "../models/User";

class UserService {

    createUser = async (name: string, email: string, password: string): Promise<IUser> => {
        const newUser = new User({ name, email, password });
        await newUser.save();
        return newUser;
    }

    findByEmail = async (email: string): Promise<IUser | null>  => {
        return await User.findOne({ email: email });
    }

}

export default UserService;