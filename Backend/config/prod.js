module.exports = {
    // MONGOURL: "mongodb+srv://tushar:95F1yUqLbEEYSh1k@cluster0.8djpo.mongodb.net/?retryWrites=true&w=majority",
    // JWT_SECRET: "ZJISDGNOISNG"
    MONGOURL:process.env.MONGOURL,
    JWT_SECRET:process.env.JWT_SEC,
    SENDGRID_API:process.env.SENDGRID_API,
    EMAIL:process.env.EMAIL
}