const createToken = require("../../utils/createToken");
const { hashData, verifyHashedData } = require("../../utils/hashData");
const User = require("./model");

const authenticateUser = async (data) => {
    try {
        const { email, password } = data
        const userData =await User.findOne({ email })
        if (!userData) {
            throw Error("invalid credentials")
        }

        // if user exists compare password
        const hashedPassword = userData.password
        const passMatch = await verifyHashedData(password, hashedPassword)
        if (!passMatch) {
            throw Error("Wrong password")
        }

        // creating token
        try {
            const tokenData = { userId: userData._id, email }
            const token = await createToken(tokenData)
            userData.token = token
            return userData
        } catch (error) {
            throw error
        }

    } catch (error) {
        throw error
    }
}
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

module.exports = { createUser, authenticateUser }