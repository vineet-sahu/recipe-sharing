import User from "../models/User";

interface User {
    _id?: string;
    email: string;
    password: string;
  }
  
  const authenticate = async (email: string, password: string) => {
    const user = await User.findOne({email, password});
    return user || null;
  };

  const createUser = async ( {email, password, name}: {email: string, password: string, name: string}) => {

    const existing = await User.findOne({ email });
    if (existing) {
      throw new Error("DUPLICATE_EMAIL");
    }

    const newUser = new User({ email, password, name });
    await newUser.save();
    return newUser;
  };
  
  export default { authenticate, createUser };
  