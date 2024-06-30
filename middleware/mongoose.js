import mongoose from "mongoose";

const connectdb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }

  await mongoose.connect(process.env.Mongo_URI);
  return handler(req, res);
};

export default connectdb;
