import useUser from "@/lib/client/useUser";
import { Tweet } from "@prisma/client";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";

interface TweetWithCount extends Tweet {
    _count: { Like: number };
    user: { name: string };
}

interface TweetsResponse {
    ok: boolean;
    tweets: TweetWithCount[];
}

export default function Home() {
    const { user, isLoading } = useUser();
    const { data } = useSWR<TweetsResponse>("/api/tweets");

    useEffect(() => {}, [user]);
    return (
        <div className="space-y-10">
            <div className="bg-white w-full h-12 max-w-xl justify-center text-lg px-10 font-medium  fixed text-gray-800 border-b top-0  flex items-center">
                <span className="font-extrabold text-xl">Tweet</span>
            </div>
            {/* tweet */}
            <div className="py-10 space-y-7">
                {data?.tweets?.map((tweet) => (
                    <Link
                        href={`/tweets/${tweet.id}`}
                        className="w-full p-5 bg-gray-100 grid grid-cols-8 rounded-xl"
                    >
                        <div className="col-span-1 flex justify-center">
                            <div className="w-14 h-14 rounded-full bg-blue-200"></div>
                        </div>
                        <div className="flex flex-col col-span-7 pl-3 space-y-2">
                            <p className="font-semibold">{tweet.user.name}</p>
                            <p className="text-sm">{tweet.description}</p>
                            <div className="flex space-x-2 items-end justify-end">
                                <div className="flex space-x-0.5 items-center text-sm text-gray-600">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        ></path>
                                    </svg>
                                    <span>{tweet._count.Like}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <Link
                href={"/tweets/create"}
                className="fixed hover:bg-blue-400 border-0 aspect-square border-transparent transition-colors cursor-pointer  bottom-24 right-5 shadow-xl bg-blue-200 rounded-full w-14 flex items-center justify-center text-white"
            >
                <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
            </Link>
        </div>
    );
}
