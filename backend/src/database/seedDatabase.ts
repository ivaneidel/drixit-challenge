// WARNING: Running the seed function will clear the database

const dotenv = require("dotenv");
import { connect, connection, disconnect } from "mongoose";
import seedUsers from "./seedUsers.json";
import { User } from "./schema";

dotenv.config();

async function executeSeed() {
  console.log('Starting seeding process');
  
  
  const dbURI = process.env.DB_URI;

  if (dbURI) {
    await connect(dbURI);

    // Drop the database to make sure there's no documents left over from previous iterations
    await connection.dropDatabase();

    for (const user of seedUsers) {
      const dbUser = new User({ ...user });
      await dbUser.save();

      console.log(`User ${dbUser.name} ${dbUser.surname} created`);
    }

    await disconnect();
  }

  console.log('Seeding process finished');
}

executeSeed();
