const createToken = require("../../utils/createToken");
const { hashData, verifyHashedData } = require("../../utils/hashData");
const User = require("./model");
const { sendOtp } = require("./../otp/controller")
const authenticateUser = async (data) => {
    try {
        const { email, password } = data
        const userData = await User.findOne({ email })
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
        console.log("Received Data:", data); 

        const { email, password, subject, message, duration } = data;

         

        const existingUser = await User.findOne({ email });

        if (existingUser && !existingUser.verified) {
            const deleteUser = await User.deleteOne({ email });
            console.log("Deleted User:", deleteUser);

            if (deleteUser.acknowledged) {
                return await createNewUser({ email, password, subject, message, duration });
            }
        } else if (existingUser && existingUser.verified) {
            throw Error("User with this email already exists.");
            console.log('not verified')
        } else {
            return await createNewUser({ email, password, subject, message, duration });
        }
    } catch (error) {
        throw error;
    }
};

const createNewUser = async ({ email, password, subject, message, duration }) => {
    try {
        console.log("Creating New User:", email);

        const hashedPassword = await hashData(password);
        const newUser = new User({
            email,
            password: hashedPassword,
            verified: false
        });

        console.log("Sending OTP to:", email);

        const createdOTP = await sendOtp({
            email,
            subject,
            message,
            duration
        });

        const createdUser = await newUser.save();
        console.log("Created User:", createdUser);

        return { createdUser, createdOTP };
    } catch (error) {
        console.error("Error in createNewUser:", error);
        throw error;
    }
};

module.exports = { createUser };


module.exports = { createUser, authenticateUser }