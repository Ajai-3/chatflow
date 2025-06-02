import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next(); 
  this.password = bcrypt.hash(this.password, 10); 
  next();
});


const userModel = mongoose.model("user", userSchema);

export default userModel;
