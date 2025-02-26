const bcrypt = require("bcrypt")

// verify the hashed data
const verifyHashedData= async(unHashed, hashed)=>{
    try {
        const match = await bcrypt.compare(unHashed, hashed)
        return match
    } catch (error) {
        throw error
    }
}
// Make hashed data(password)
const hashData = async(data, saltRound = 10)=>{
    try {
        const hashedData = await bcrypt.hash(data, saltRound)
        return hashedData
    } catch (error) {
        throw error
    }
}

module.exports= {hashData, verifyHashedData}