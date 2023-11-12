import client from "@/lib/server/client";
import withHandler from "@/lib/server/withHandler";
import withApiSession from "@/lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id },
        session: { user },
    } = req;
    const alreadyExists = await client.like.findFirst({
        where: {
            tweetId: Number(id),
            userId: user?.id,
        },
    });
    if (alreadyExists) {
        await client.like.delete({
            where: {
                id: alreadyExists.id,
            },
        });
    } else {
        await client.like.create({
            data: {
                user: {
                    connect: {
                        id: user?.id,
                    },
                },
                tweet: {
                    connect: {
                        id: Number(id),
                    },
                },
            },
        });
    }
    res.json({ ok: true });
}

export default withApiSession(
    withHandler({
        methods: ["POST"],
        handler,
    })
);
