import useMutation from "@/lib/client/useMutation";
import { cls } from "@/lib/client/utils";
import { Tweet, User } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";

interface TweetWithUser extends Tweet {
    user: User;
}

interface TweetDetailResponse {
    ok: boolean;
    tweet: TweetWithUser;
    isLiked: boolean;
}

export default function Detail() {
    const router = useRouter();
    const onClick = () => {
        router.back();
    };
    const { data, mutate } = useSWR<TweetDetailResponse>(
        router.query.id ? `/api/tweets/${router.query.id}` : null
    );
    const [toggleLike] = useMutation(`/api/tweets/${router.query.id}/like`);
    const onLikeClick = () => {
        if (!data) return;
        mutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
        toggleLike({});
    };
    return (
        <div>
            <div className="bg-white w-full h-12 max-w-xl justify-center text-lg px-10 font-medium  fixed text-gray-800 border-b top-0  flex items-center">
                <button onClick={onClick} className="absolute left-4">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        ></path>
                    </svg>
                </button>
                <span className="mx-auto font-extrabold text-xl">Detail</span>
            </div>
            <div className="flex py-3 border-t border-b items-center space-x-3 mt-36 p-5">
                <div className="w-14 h-14 rounded-full bg-blue-200"></div>
                <p className="font-semibold">{data?.tweet?.user.name}</p>
            </div>
            <div className="border-b px-5 py-11 bg-slate-100 rounded-md">
                <p>{data?.tweet.description}</p>
            </div>
            <div className="flex items-center justify-end space-x-2 py-1">
                <button
                    onClick={onLikeClick}
                    className={cls(
                        "p-3 rounded-md flex items-center hover:bg-gray-100 justify-center",
                        data?.isLiked
                            ? "text-red-500  hover:text-red-600"
                            : "text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    )}
                >
                    {data?.isLiked ? (
                        <svg
                            className="h-6 w-6 "
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                        </svg>
                    ) : (
                        <svg
                            className="h-6 w-6 "
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
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
