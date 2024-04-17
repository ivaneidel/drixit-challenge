// WARNING: Running the seed function will clear the database

const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
import { connect, connection, disconnect } from "mongoose";
import seedUsers from "./seedUsers.json";
import { User } from "./schema";

dotenv.config();

async function executeSeed() {
  console.log("Starting seeding process");

  const dbURI = process.env.DB_URI;

  if (dbURI) {
    await connect(dbURI);

    // Drop the database to make sure there's no documents left over from previous iterations
    await connection.dropDatabase();

    /*
    Create a new Salt to hash passwords and JWT secret to sign tokens
    every time we seed the database as a security measure to avoid
    reuse in case of leakage.
    */
    const newSalt = await bcrypt.genSalt(10);
    const newJWTSecret = await bcrypt.genSalt(10);

    // Store the salt in the environment to use in the pre save hook in the next step
    process.env.HASH_SALT = newSalt;

    for (const user of seedUsers) {
      const dbUser = new User({ ...user });
      await dbUser.save();

      console.log(`User ${dbUser.name} ${dbUser.surname} created`);
    }

    console.log(`
Save the new Salt and JWT Secret in the .env file under the keys 'HASH_SALT' and 'JWT_SECRET' respectively
----------------------------------------
HASH_SALT=${newSalt}
JWT_SECRET=${newJWTSecret}
----------------------------------------
`);

    await disconnect();
  }

  console.log("Seeding process finished");
}

executeSeed();
