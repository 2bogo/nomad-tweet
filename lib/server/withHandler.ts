import { NextApiRequest, NextApiResponse } from "next";

type method = "GET" | "POST" | "DELETE";

interface ConfigType {
    methods: method[];
    handler: (req: NextApiRequest, res: NextApiResponse) => void;
}

export default function withHandler({ methods, handler }: ConfigType) {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        if (req.method && !methods.includes(req.method as any)) {
            return res.status(405).end();
        } else {
            try {
                await handler(req, res);
            } catch (error) {
                return res.status(500).json({ error });
            }
        }
    };
}
