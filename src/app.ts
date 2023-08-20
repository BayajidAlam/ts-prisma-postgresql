import express, { Application } from "express";
import cors from "cors";
import { userRoute } from "./modules/user/user.route";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/users',userRoute)
export default app;
