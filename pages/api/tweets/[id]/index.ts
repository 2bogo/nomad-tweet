import client from "@/lib/server/client";
import withHandler from "@/lib/server/withHandler";
import withApiSession from "@/lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id },
        session: { user },
    } = req;
    const tweet = await client.tweet.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avator: true,
                },
            },
        },
    });
    const isLiked = Boolean(
        await client.like.findFirst({
            where: {
                tweetId: tweet?.id,
                userId: user?.id,
            },
            select: {
                id: true,
            },
        })
    );
    res.json({
        ok: true,
        tweet,
        isLiked,
    });
}

export default withApiSession(
    withHandler({
        methods: ["GET"],
        handler,
    })
);
