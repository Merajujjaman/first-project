// getting-started.js
// const mongoose = require('mongoose');
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

// main().catch(err => console.log(err));
// config.database_url as string

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
