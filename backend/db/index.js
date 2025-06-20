const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL || "mongodb://localhost:27017/storage",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log(`MongoDB error: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
