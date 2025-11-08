import { toaster } from "@/components/ui/toaster";
import { saveCredentials } from "@/helpers/credentials";
import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { ILoginResponse } from "@/interfaces/IUser";
import { submitLoginFromAPI } from "@/lib/api/auth/auth.api";
import { loginSchema } from "@/validations/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import z from "zod";

type LoginFormValues = z.infer<typeof loginSchema>;

export const useAction = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "all",
    });

    const { mutate: loginMutation, isPending: loadingSubmit } = useMutation({
        mutationFn: (values: LoginFormValues) => submitLoginFromAPI(values),
        onSuccess: (response: AxiosResponse<IBaseResponse<ILoginResponse>>) => {
            if (response.data.success) {
                toaster.create({
                    title: "Login Successful",
                    description: response.data.message,
                    type: "success",
                    closable: true,
                })

                saveCredentials(response.data.data);

                const redirect = router.query.redirect as string;
                if (redirect) {
                    router.push(redirect);
                } else {
                    router.push("/dashboard");
                }
            } else {
                toaster.create({
                    title: "Login Failed",
                    description: response.data.message,
                    type: "error",
                    closable: true,
                })
            }
        },
        onError: (error: AxiosError<IBaseResponse<unknown>>) => {
            toaster.create({
                title: "Login Failed",
                description: error?.response?.data?.message,
                type: "error",
                closable: true,
            })
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        loginMutation(values);
    };

    return {
        onSubmit,
        register,
        handleSubmit,
        errors,
        loadingSubmit,
        isValid,
        isDirty,
    }
}