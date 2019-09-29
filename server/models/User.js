const   MONGOOSE    = require("mongoose");

const user_schema = new MONGOOSE.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    Date: { type: String, required: false, default: new Date() }
});


const User = MONGOOSE.model("User", user_schema);


module.exports = User;