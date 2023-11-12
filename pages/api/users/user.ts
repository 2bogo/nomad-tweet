import client from "@/lib/server/client";
import withHandler from "@/lib/server/withHandler";
import withApiSession from "@/lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const profile = await client.user.findUnique({
        where: { id: req.session.user?.id },
    });
    res.json({
        ok: true,
        profile,
    });
}

export default withApiSession(
    withHandler({
        methods: ["GET"],
        handler,
    })
);
