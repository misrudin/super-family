import { BottomDrawer } from "@/components/drawer";
import { toaster } from "@/components/ui/toaster";
import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { IBasicModal } from "@/interfaces/IBasicModal";
import { changePasswordFromAPI } from "@/lib/api/account/account.api";
import { Button, Field, Fieldset, HStack, Input, InputGroup } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FiLock } from "react-icons/fi";
import { z } from "zod";

const changePasswordSchema = z.object({
    current_password: z.string().min(1, "Password lama harus diisi"),
    new_password: z.string().min(6, "Password baru minimal 6 karakter"),
    confirm_password: z.string().min(1, "Konfirmasi password harus diisi"),
}).refine((data) => data.new_password === data.confirm_password, {
    message: "Password baru dan konfirmasi password tidak sama",
    path: ["confirm_password"],
});

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

const ModalChangePassword: FC<IBasicModal> = ({ isOpen, onClose }) => {
    const { register, handleSubmit, reset, formState: { errors, isValid, isDirty } } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            current_password: "",
            new_password: "",
            confirm_password: "",
        },
        mode: "all",
    });

    const { mutate: changePasswordMutation, isPending: loadingChangePassword } = useMutation({
        mutationFn: (data: ChangePasswordFormValues) => changePasswordFromAPI(data),
        onSuccess: (response: AxiosResponse<IBaseResponse<null>>) => {
            if (response.data.success) {
                toaster.create({
                    title: "Password berhasil diubah",
                    description: response.data.message,
                    type: "success",
                    closable: true,
                })
                onClose()
                reset()
            }
        },
        onError: (error: AxiosError<IBaseResponse<unknown>>) => {
            toaster.create({
                title: "Password gagal diubah",
                description: error?.response?.data?.message,
                type: "error",
                closable: true,
            });
        },
    })

    const onSubmit = (data: ChangePasswordFormValues) => {
        changePasswordMutation(data);
    }

    return (
        <BottomDrawer
            title="Ubah Password"
            isOpen={isOpen}
            onClose={() => {
                onClose()
                reset()
            }}
            footer={
                <HStack justify='end'>
                    <Button colorPalette='gray' variant='subtle' onClick={onClose}>Batal</Button>
                    <Button 
                        colorPalette='orange' 
                        variant='solid' 
                        type="submit" 
                        form="form-change-password" 
                        disabled={!isValid || !isDirty}
                        loading={loadingChangePassword}
                    >
                        Simpan
                    </Button>
                </HStack>
            }>
            <form onSubmit={handleSubmit(onSubmit)} id="form-change-password">
                <Fieldset.Root size="lg">
                    <Fieldset.Content>
                        <Field.Root invalid={!!errors.current_password}>
                            <Field.Label>Password Lama</Field.Label>
                            <InputGroup startElement={<FiLock />}>
                                <Input 
                                    {...register("current_password")} 
                                    rounded='xl' 
                                    size='xl' 
                                    name="current_password" 
                                    type="password" 
                                    placeholder='Masukan password lama' 
                                    _placeholder={{ fontSize: 'sm' }} 
                                />
                            </InputGroup>
                            <Field.ErrorText>{errors.current_password?.message}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.new_password}>
                            <Field.Label>Password Baru</Field.Label>
                            <InputGroup startElement={<FiLock />}>
                                <Input 
                                    {...register("new_password")} 
                                    rounded='xl' 
                                    size='xl' 
                                    name="new_password" 
                                    type="password" 
                                    placeholder='Masukan password baru' 
                                    _placeholder={{ fontSize: 'sm' }} 
                                />
                            </InputGroup>
                            <Field.ErrorText>{errors.new_password?.message}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.confirm_password}>
                            <Field.Label>Konfirmasi Password Baru</Field.Label>
                            <InputGroup startElement={<FiLock />}>
                                <Input 
                                    {...register("confirm_password")} 
                                    rounded='xl' 
                                    size='xl' 
                                    name="confirm_password" 
                                    type="password" 
                                    placeholder='Konfirmasi password baru' 
                                    _placeholder={{ fontSize: 'sm' }} 
                                />
                            </InputGroup>
                            <Field.ErrorText>{errors.confirm_password?.message}</Field.ErrorText>
                        </Field.Root>
                    </Fieldset.Content>
                </Fieldset.Root>
            </form>
        </BottomDrawer>
    )
}

export default ModalChangePassword;

