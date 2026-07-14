const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.DB_URI)
    .then((con) => {
        console.log(`DB is connected with HOST: ${con.connection.host}`);
    })
    .catch((err) => {
        console.error(`DB connection error: ${err.message}`);
        process.exit(1);
    });
};

module.exports = connectDB;
