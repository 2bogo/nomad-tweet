import client from "@/lib/server/client";
import withHandler from "@/lib/server/withHandler";
import withApiSession from "@/lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const tweets = await client.tweet.findMany({
            include: {
                _count: {
                    select: {
                        Like: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        avator: true,
                    },
                },
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        res.json({
            ok: true,
            tweets,
        });
    }
    if (req.method === "POST") {
        const {
            body: { description },
            session: { user },
        } = req;
        const tweet = await client.tweet.create({
            data: {
                description,
                user: {
                    connect: {
                        id: user?.id,
                    },
                },
            },
        });
        res.json({
            ok: true,
            tweet,
        });
    }
}

export default withApiSession(
    withHandler({
        methods: ["GET", "POST"],
        handler,
    })
);
