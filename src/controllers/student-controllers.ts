import Quiz from "../model/Quiz";
import { Request, Response} from "express"
import { CustomRequests } from "../utils";


export const quizAttempts = async (req: CustomRequests, res: Response) => {
    const { quizId, studentId, score } = req.body;
  
    if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
      return res.status(422).send({ error: "Access Denied" });
    }
  
    try {
      const result = await Quiz.updateOne(
        { _id: quizId },
        { $push: { attemptedBy: { student: studentId, score: score } } },
        { new: true }
      );
      res.send(result);
    } catch (err: any) {
      console.log(err);
      return res.status(422).json({ error: err.message });
    }
  }