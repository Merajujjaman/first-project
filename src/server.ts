// getting-started.js
// const mongoose = require('mongoose');
import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { Server } from "http";

// main().catch(err => console.log(err));
// config.database_url as string

let server : Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`Unhandled Rejection is detected. Server is shutting down...`);
  if(server){
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () => {
  console.log(`Uncaught exception is detected. Server is shutting down...`);
  process.exit(1)
})
