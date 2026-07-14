// Start the server

//will load env variable
//start the server

const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/database");

// load env variables before using them
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

// connect to DB
connectDB();

// start server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server started on PORT: ${PORT}`);
});
