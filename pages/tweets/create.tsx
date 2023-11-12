import useMutation from "@/lib/client/useMutation";
import useUser from "@/lib/client/useUser";
import { Tweet } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreateTweetForm {
    description: string;
}

interface CreateTweetMutation {
    ok: boolean;
    tweet: Tweet;
}

export default function Create() {
    const { user } = useUser();
    const router = useRouter();
    const onClick = () => {
        router.back();
    };
    const { register, handleSubmit } = useForm<CreateTweetForm>();
    const [createTweet, { loading, data }] =
        useMutation<CreateTweetMutation>("/api/tweets");
    const onValid = (data: CreateTweetForm) => {
        if (loading) return;
        createTweet(data);
    };
    useEffect(() => {
        if (data?.ok) {
            router.push(`/tweets/${1}`);
        }
    }, [data, router]);
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
                <span className="mx-auto font-extrabold text-xl">
                    Create Tweet
                </span>
            </div>
            <form
                onSubmit={handleSubmit(onValid)}
                className="p-4 py-11 space-y-2"
            >
                <div>
                    <div className="flex items-center space-x-3 my-11">
                        <div className="w-14 h-14 rounded-full bg-blue-200"></div>
                        <p className="font-semibold">{user?.name}</p>
                    </div>
                    <label
                        className="mb-1 block text-sm font-medium text-gray-700"
                        htmlFor="tweet"
                    >
                        Enter your Tweet
                    </label>
                    <textarea
                        {...register("description", {
                            required: true,
                        })}
                        id="tweet"
                        className="p-5 mt-1 shadow-sm w-full rounded-md border-blue-100 border-2"
                        rows={5}
                        required
                    ></textarea>
                </div>
                <button className="w-full p-2 bg-blue-100 rounded-lg hover:bg-blue-300 hover:text-white">
                    Create
                </button>
            </form>
        </div>
    );
}
