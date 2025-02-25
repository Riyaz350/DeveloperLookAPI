const { hashData } = require("../../utils/hashData");
const User = require("./model");

const createUser = async (data) => {
    try {
        const { email, password } = data;
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw Error("User with this email already exist");
        }
        const hashedPassword = await hashData(password);
        const newUser = new User({
            email, password: hashedPassword
        })
        const createdUser = await newUser.save()
        return createdUser;
    }
    catch (error) {
        throw error
    }
}

module.exports= {createUser}