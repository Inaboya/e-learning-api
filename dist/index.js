"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./models/User");
require("./models/Class");
require("./models/Quiz");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const teacherRoutes_1 = __importDefault(require("./routes/teacherRoutes"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const requiresAuth_1 = __importDefault(require("./middleware/requiresAuth"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(authRoutes_1.default);
app.use(adminRoutes_1.default);
app.use(teacherRoutes_1.default);
app.use(studentRoutes_1.default);
const mongoUri = 'mongodb+srv://inaboya:1234567890@week9.jatjx.mongodb.net/e-learning?retryWrites=true';
if (!mongoUri) {
    throw new Error(`MongoURI was not supplied.`);
}
mongoose_1.default.connect(mongoUri, {
    // @ts-ignore
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
mongoose_1.default.connection.on("connected", () => {
    console.log("Connected to mongo instance");
});
mongoose_1.default.connection.on("error", (err) => {
    console.error("Error connecting to mongo", err);
});
app.get("/", requiresAuth_1.default, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});
app.listen(5000, () => {
    console.log("Listening on port 5000");
});
