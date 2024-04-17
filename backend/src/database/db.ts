import { connect } from "mongoose";

const initDB = () => {
  const dbURI = process.env.DB_URI ?? "";

  connect(dbURI)
    .then(() => console.log("MongoDB connection established"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));
};

export { initDB };
