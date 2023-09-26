require("./models/User");
require("./models/Class");
require("./models/Quiz");
import { Request, Response} from "express";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import teacherRoutes from "./routes/teacherRoutes";
import studentRoutes from "./routes/studentRoutes";
import requireAuth from "./middleware/requiresAuth";

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authRoutes);
app.use(adminRoutes);
app.use(teacherRoutes);
app.use(studentRoutes);

const mongoUri = 'mongodb+srv://inaboya:1234567890@week9.jatjx.mongodb.net/e-learning?retryWrites=true';
if (!mongoUri) {
  throw new Error(`MongoURI was not supplied.`);
}
mongoose.connect(mongoUri, {
  // @ts-ignore
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req: Request, res: Response) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
