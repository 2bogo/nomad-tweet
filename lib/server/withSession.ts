import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
    interface IronSessionData {
        user?: {
            id: number;
        };
    }
}

const cookieOptions = {
    cookieName: "user",
    password: "20w8yg00alz3UBMI2p0Eb6NR7eXCYYrNBCWNrnny",
};

export default function withApiSession(fn: any) {
    return withIronSessionApiRoute(fn, cookieOptions);
}
