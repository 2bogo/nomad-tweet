import client from "@/lib/server/client";
import withHandler from "@/lib/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, email } = req.body;
    const user = await client.user.create({
        data: {
            name,
            email,
        },
    });
    return res.json({
        ok: true,
    });
}

export default withHandler({
    methods: ["POST"],
    handler,
});
