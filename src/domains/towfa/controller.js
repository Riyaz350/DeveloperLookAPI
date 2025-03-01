const speakeasy = require("speakeasy")
const qrcode = require('qrcode')
const createOTP = require("../../utils/createOTP")
const User = require("../user/model")

const createQRcode = async ({ email }) => {
    const secret = speakeasy.generateSecret({
        name: "DeveloperLook"
    });

    await User.updateOne({ email }, { $set: { twoFAascii: secret.ascii } });


    const coded = qrcode.toDataURL(secret.otpauth_url)
    return coded
}

const verifyQR = async (code) => {
    try {
        const { email, twoFA } = code
        const currentUser = await User.findOne({ email })
        const verified = speakeasy.totp.verify({
            secret: currentUser.twoFAsecret,
            encoding: "ascii",
            token: twoFA
        });

        console.log(currentUser, verified)
        return code
    } catch (error) {
        throw error
    }
}

module.exports = { createQRcode, verifyQR }