import { deleteQuiz, getQuizById, quizAdd } from "../controllers/teacher-controller";
import { Router } from "express";
import requiresAuth from "../middleware/requiresAuth";
;

const router = Router();

////////////////        ADD QUIZ        /////////////////

router.post("/quiz/add", requiresAuth, quizAdd);

////////////////        GET QUIZ DETAILS        /////////////////

router.get("/quiz/:id", requiresAuth, getQuizById);

////////////////        DELETE QUIZ       /////////////////

router.delete("/quiz/:id", requiresAuth, deleteQuiz);

// module.exports = router;

export default router;
