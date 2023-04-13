const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema(
  {
   
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    phone_no: {
      type: String,
      required: [true, "Phone Number is Required"],
    },

    panCardNo:String,
    aadharNo:String,
    profilePicture:String,
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
