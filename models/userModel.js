import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("user", User);
