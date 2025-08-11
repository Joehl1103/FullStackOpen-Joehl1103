const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    mongoose.Schema({
      _id: { type: mongoose.ObjectId, auto: true },
      content: String,
      date: Date,
      blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      likes: Number
    })
  ]
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
