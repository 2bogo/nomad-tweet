import useMutation from "@/lib/client/useMutation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface RegisterForm {
    name: string;
    email: string;
}

export default function CreateAccount() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>();
    const [mutate, { loading, data, error }] = useMutation("/api/users/create");
    const onRegisterValid = (validForm: RegisterForm) => {
        mutate(validForm);
        router.push("/log-in");
    };
    return (
        <div className="flex h-screen items-center flex-col space-y-10 py-40">
            <h1 className="text-3xl">Create Account</h1>
            <form
                onSubmit={handleSubmit(onRegisterValid)}
                className="flex flex-col space-y-3"
            >
                <div className="flex flex-col pb-2">
                    <input
                        {...register("name", {
                            required: "Please tell me your name.",
                            minLength: {
                                value: 5,
                                message: "Please enter at least 5 characters.",
                            },
                        })}
                        className="w-72 p-4 border-2 border-gray-400 rounded-2xl"
                        type="text"
                        placeholder="Your Name"
                    />
                    {errors.name ? (
                        <span className="px-2 text-red-500">
                            {errors.name?.message}
                        </span>
                    ) : null}
                </div>

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
                    Create
                </button>
            </form>
        </div>
    );
}
