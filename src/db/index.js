import mongoose from "mongoose";
require('dotenv').config();

const db_host = "localhost";
const db_port = 27017;
const db_password = process.env.DB_PASSWORD;
const db_user = process.env.DB_USER;
const db_database = process.env.DB_NAME;
// const mongoURI = `mongodb:\/\/${db_port}:${db_port}/${db_database}`;
// const mongoURI = `mongodb:\/\/${db_host}:${db_port}/${db_database}`;
// const mongoURI = `mongodb://${db_user}:${db_password}@localhost:${db_port}/${db_database}`;
const mongoURI = `mongodb+srv://${db_user}:${db_password}@cluster0.y9rs75c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/${db_database}`;
// const mongoURI = 'mongodb://root:password@localhost:27017/aulaDB';

mongoose.connect(mongoURI);

export const db = mongoose.connection;