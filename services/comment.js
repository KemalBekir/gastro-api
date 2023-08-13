const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: ObjectId,
      ref: "User", // Reference to the User model
    },
  },
  { timestamps: true }
);
