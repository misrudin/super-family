import { toaster } from "@/components/ui/toaster";
import { saveCredentials } from "@/helpers/credentials";
import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { ILoginResponse } from "@/interfaces/IUser";
import { submitRegisterFromAPI } from "@/lib/api/auth/auth.api";
import { registerSchema } from "@/validations/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import z from "zod";

type RegisterFormValues = z.infer<typeof registerSchema>;

export const useAction = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirm_password: "",
        },
        mode: "all",
    });

    const { mutate: registerMutation, isPending: loadingSubmit } = useMutation({
        mutationFn: (values: RegisterFormValues) => submitRegisterFromAPI(values),
        onSuccess: (response: AxiosResponse<IBaseResponse<ILoginResponse>>) => {
            if (response.data.success) {
                toaster.create({
                    title: "Registration Successful",
                    description: response.data.message,
                    type: "success",
                    closable: true,
                })

                saveCredentials(response.data.data);
                router.push("/dashboard");
            } else {
                toaster.create({
                    title: "Registration Failed",
                    description: response.data.message,
                    type: "error",
                    closable: true,
                })
            }
        },
        onError: (error: AxiosError<IBaseResponse<unknown>>) => {
            toaster.create({
                title: "Registration Failed",
                description: error?.response?.data?.message,
                type: "error",
                closable: true,
            })
        },
    });

    const onSubmit = async (values: RegisterFormValues) => {
        registerMutation(values);
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