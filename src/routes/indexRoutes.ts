import { Request, Response, Router } from "express";

const router = Router()

router.get("/", async(req: Request, res: Response) => {
    return res.json({
        message: 'LMS Server is Running.'
    });
})

router.get("/error", async(req, res) => {
    return res.json({
        message: 'Something went wrong on server side.'
    });
})

// module.exports = router;
export default router;