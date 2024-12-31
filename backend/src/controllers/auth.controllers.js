import User from "../models/user.model.js";

export const signup = async(req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if(password.length < 6){
        return res.status(400).json({message:"Password must be at least 6 characters long"})
    }
    const user = await User.findOne({email});
    if(user) return res.status(400).json({message:"User already exists"});

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
    const newUser = new User(
        {
            fullName:fullName, 
            email:email, 
            password:hashPassword
        }
    );

    if(newUser){
        generateToken(newUser._id,res);
        await newUser.save();
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilePic:newUser.profilePic,
        });
    }
    else{
        console.log("User not created",error.message);
        res.status(400).json({message:"User not created"});
    }


  } catch (error) {}
};

export const Login = (req, res) => {
  res.send("login");
};

export const Logout = (req, res) => {
  res.send("logout");
};
