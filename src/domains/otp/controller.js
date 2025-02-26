const createOTP = require("../../utils/createOTP")
const { hashData, verifyHashedData } = require("../../utils/hashData")
const sendEmail = require("../../utils/sendEmail")
const OTP = require("./model")
const { AUTH_EMAIL } = process.env
const sendOtp = async ({ email, subject, message, duration = 1 }) => {
    try {
        if (!email && !subject && !message) {
            throw Error("Provide email, subject & message")
        }

        // clear previous otp
        await OTP.deleteOne({ email })

        // making OTP
        const createdOTP = await createOTP()


        // sending email
        const mailOptions =
        {
            from: AUTH_EMAIL,
            to: email,
            subject: subject,
            html: `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
            <table width="100%" cellpadding="0" cellSpacing="0" border="0" align="center">
                <tr>
                    <td align="center">
                        <table width="500px" bgColor="#ffffff" cellpadding="20" cellSpacing="0" border="0" style="border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                            <tr>
                                <td align="center" style="background-color: #007bff; color: #ffffff; font-size: 24px; padding: 15px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                                    OTP Verification
                                </td>
                            </tr>
                            <tr>
                                <td style="color: #333333; font-size: 16px; text-align: left;">
                                    <p style="margin: 0 0 10px;">Hello,</p>
                                    <p style="margin: 0 0 10px;">${message}</p>
                                    <p style="margin: 0 0 10px;"><strong>Your OTP:</strong> <span style="font-size: 20px; color: #007bff;">${createdOTP}</span></p>
                                    <p style="margin: 0 0 10px;">This OTP is valid for <strong>${duration}</strong> minutessss.</p>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding-top: 10px;">
                                    <p style="color: #888888; font-size: 12px;">If you did not request this, please ignore this email.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>`,
        }


        await sendEmail(mailOptions)

        const hashedOTP = await hashData(createdOTP)
        const newOTP = await new OTP({
            email,
            otp: hashedOTP,
            created: Date.now(),
            expires: Date.now() + 120000 * +duration
        });

        const createdOTPRecord = await newOTP.save()
        return createdOTPRecord;


    } catch (error) {
        throw error
    }
}

const verifyOTP = async ({ email, userOTP }) => {
    try {
        const currentUser = await OTP.findOne({ email })
        const hashedOTP = currentUser.otp
        // const expired = 
        const hashData = await verifyHashedData(userOTP, hashedOTP)
        const result = {OPTMatch : hashData, OTPExpired:currentUser.expires >= Date.now()}
        return result
    } catch (error) {
        throw error
    }

}

module.exports = { sendOtp, verifyOTP }