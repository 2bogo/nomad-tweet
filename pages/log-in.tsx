import useMutation from "@/lib/client/useMutation";
import useUser from "@/lib/client/useUser";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface LoginForm {
    email: string;
}

export default function LogIn() {
    const router = useRouter();
    const { user, isLoading } = useUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();
    const [mutate, { loading, data, error }] = useMutation("/api/users/login");
    const onRegisterValid = (validForm: LoginForm) => {
        mutate(validForm);
    };
    useEffect(() => {
        if (data?.ok) {
            router.push("/");
        }
    }, [data, router]);

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user]);
    return (
        <div className="flex h-screen items-center flex-col space-y-10 py-40">
            <h1 className="text-3xl">Log in</h1>
            <form
                onSubmit={handleSubmit(onRegisterValid)}
                className="flex flex-col space-y-3"
            >
                <input
                    {...register("email", {
                        required: "Please enter your email.",
                    })}
                    className="w-72 p-4 border-2 border-gray-400 rounded-2xl"
                    type="email"
                    placeholder="Your email"
                />
                {errors.email ? (
                    <span className="px-2 text-red-500">
                        {errors.email?.message}
                    </span>
                ) : null}
                <button className="w-72 p-2 bg-gray-300 rounded-2xl hover:bg-gray-600 hover:text-white">
                    Login
                </button>
            </form>
            <button
                onClick={() => router.push("/create-account")}
                className="underline hover:text-lg hover:text-gray-400"
            >
                Create Account
            </button>
        </div>
    );
}
