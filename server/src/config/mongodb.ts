import mongoose from "mongoose";

const connectDataBase = async (): Promise<void> => {
  const connectionString = process.env.MONGODB_URL;
  if (!connectionString) {
    console.error("Error: MONGODB_URL is not defined in environment variables");
    process.exit(1);
  }
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ Database connected successfully.");
    });
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ Database connection lost.");
    });
    mongoose.connection.on("error", (error) => {
      if (error instanceof Error) {
        console.error("❌ Database connection error:", error.message);
      } else {
        console.error(
          "❌ An unknown error occured during database connection:",
          error.message,
        );
      }
    });
    await mongoose.connect(connectionString, {
      dbName: "e-commerce",
    });
    console.log("🚀 Database connection established!");
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Failed to connect to the database: ", error.message);
    } else {
      console.error("❌ An unknown error occured: ", error);
    }
    process.exit(1);
  }
};

export default connectDataBase;
