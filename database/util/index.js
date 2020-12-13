const mongoose = require("mongoose");

module.exports.connection = async () => {
  try {
    mongoose.set("debug", true);
    await mongoose.connect(
      process.env.MONGO_DB_URI || FALLBACK_LOCAL_MONGO_DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};