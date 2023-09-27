import Quiz from "../model/Quiz";
import { CustomRequests } from "../utils";
import { Response } from "express";

export const quizAdd = async (req: CustomRequests, res: Response) => {
    const { title, questions } = req.body;
    const attemptedBy = [] as any;
  
    if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
      return res.status(422).send({ error: "Access Denied" });
    }
  
    try {
      const quiz = new Quiz({
        title,
        questions,
        attemptedBy,
      });
      await quiz.save();
  
      res.send({
        quiz,
      });
    } catch (err: any) {
      console.log(err);
      return res.status(422).json({ error: err.message });
    }
  }

  export const getQuizById = async (req: CustomRequests, res: Response) => {
    const id = req.params.id;
    if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
      return res.status(422).send({ error: "Access Denied" });
    }
  
    try {
      const result = await Quiz.findOne({ _id: id }).populate(
        "attemptedBy",
        "name"
      );
      res.send({ quiz: result });
    } catch (err: any) {
      console.log(err);
      return res.status(422).json({ error: err.message });
    }
  }

  export const deleteQuiz =  async (req: CustomRequests, res: Response) => {
    const id = req.params.id;
  
    if (req.user.userType !== "admin") {
      return res.status(422).send({ error: "Access Denied" });
    }
  
    try {
      await Quiz.deleteOne({ _id: id });
      res.send({ message: "Quiz deleted Succesfully" });
    } catch (err: any) {
      return res.status(422).send(err.message);
    }
  }