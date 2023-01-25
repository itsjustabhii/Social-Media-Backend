import User from "../model/User";
import bcrypt from 'bcryptjs'

export const getAllUsers = async(req, res, next) => {
    let users
    try {
        users = await User.find()
    } catch (err) {
        console.log(err);
    }
    if(!users) {
        return res.status(404).json({message: "No Users Found!"})
    }
    return res.status(200).json({users})
}

export const signup = async(req, res, next) => {
    const {name, email, password} = req.body    //destructuring from frontend


    let existingUser
    try{
        existingUser = await User.findOne({email})
    } catch(err) {
        return console.log(err)
    }
    if(existingUser) {
        return res.status(400).json({message:'User Already Exists! Login Instead'})
    }
    const hashedPassword = bcrypt.hashSync(password)
    
    //Create new user 
    const user = new User({
        name, email, password:hashedPassword,
        blogs:[]
    })
    try{
        await user.save()
    } catch(err) {
        return console.log(err)
    }
    return res.status(201).json({user})

}

//Login Functionality
export const login = async(req, res, next) => {
    const { email, password} = req.body
    let existingUser
    try{
        existingUser = await User.findOne({email})
    } catch(err) {
        return console.log(err)
    }
    if(!existingUser) {
        return res.status(404).json({message:"Couldn't find user by this email!"})
    }
    //Check if passwords are same
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect) {
        return res.status(400).json({messsage:"Incorrect Password"})
    }
    return res.status(200).json({message: "Login Successful!"})
}