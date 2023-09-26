"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbURI = 'mongodb://localhost/your-database-name';
const options = {
    // @ts-ignore
    useNewUrlParser: true,
    useFindAndModify: false,
    // @ts-ignore
    useUnifiedTopology: true, // Workaround to avoid the TypeScript error
};
mongoose_1.default
    .connect(dbURI, options)
    .then(() => {
    console.log('Connected to the MongoDB database');
})
    .catch((error) => {
    console.error('Error connecting to the database:', error);
});
