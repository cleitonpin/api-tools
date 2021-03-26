import { Request, Response } from "express";

export default {
    index (req: Request, res: Response) {
        return res.json({
            endpoints: {
                GET: [
                    "/tools",
                    "/tools/1",
                    "/tools?tag=node",
                    "/user",
                    "/user/1",
                    "/user/profile",
                ],
                POST: [
                    "/tools",
                    "/user",
                    "/login",
                ],
                DELETE: [
                    "/tools/1",
                    "/user/1",
                ]
            }
        })
    }
}