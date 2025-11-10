import { BottomDrawer } from "@/components/drawer";
import { toaster } from "@/components/ui/toaster";
import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { IBasicModal } from "@/interfaces/IBasicModal";
import { IUser } from "@/interfaces/IUser";
import { updateProfileFromAPI } from "@/lib/api/account/account.api";
import { useAuth } from "@/providers/useAuth";
import { Button, Field, Fieldset, HStack, Input, InputGroup } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiPhone, FiUser } from "react-icons/fi";
import { z } from "zod";

const updateProfileSchema = z.object({
    name: z.string().min(1, "Nama harus diisi").max(100, "Nama maksimal 100 karakter").optional(),
    phone: z.string().max(20, "Nomor telepon maksimal 20 karakter").optional().nullable(),
});

type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

const ModalUpdateProfile: FC<IBasicModal> = ({ isOpen, onClose }) => {
    const { profile, reFetch } = useAuth();

    const { register, handleSubmit, reset, formState: { errors, isValid, isDirty } } = useForm<UpdateProfileFormValues>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: profile?.name || "",
            phone: profile?.phone || "",
        },
        mode: "all",
    });

    useEffect(() => {
        if (profile) {
            reset({
                name: profile.name || "",
                phone: profile.phone || "",
            });
        }
    }, [profile, reset]);

    const { mutate: updateProfileMutation, isPending: loadingUpdateProfile } = useMutation({
        mutationFn: (data: UpdateProfileFormValues) => updateProfileFromAPI(data),
        onSuccess: (response: AxiosResponse<IBaseResponse<IUser>>) => {
            if (response.data.success) {
                toaster.create({
                    title: "Profil berhasil diupdate",
                    description: response.data.message,
                    type: "success",
                    closable: true,
                })
                onClose()
                reFetch()
            }
        },
        onError: (error: AxiosError<IBaseResponse<unknown>>) => {
            toaster.create({
                title: "Profil gagal diupdate",
                description: error?.response?.data?.message,
                type: "error",
                closable: true,
            });
        },
    })

    const onSubmit = (data: UpdateProfileFormValues) => {
        updateProfileMutation(data);
    }

    return (
        <BottomDrawer
            title="Pengaturan Akun"
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
                        form="form-update-profile"
                        disabled={!isValid || !isDirty}
                        loading={loadingUpdateProfile}
                    >
                        Simpan
                    </Button>
                </HStack>
            }>
            <form onSubmit={handleSubmit(onSubmit)} id="form-update-profile">
                <Fieldset.Root size="lg">
                    <Fieldset.Content>
                        <Field.Root invalid={!!errors.name}>
                            <Field.Label>Nama</Field.Label>
                            <InputGroup startElement={<FiUser />}>
                                <Input
                                    {...register("name")}
                                    rounded='xl'
                                    size='xl'
                                    name="name"
                                    type="text"
                                    placeholder='Masukan nama lengkap'
                                    _placeholder={{ fontSize: 'sm' }}
                                />
                            </InputGroup>
                            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.phone}>
                            <Field.Label>Nomor Telepon</Field.Label>
                            <InputGroup startElement={<FiPhone />}>
                                <Input
                                    {...register("phone")}
                                    rounded='xl'
                                    size='xl'
                                    name="phone"
                                    type="tel"
                                    placeholder='Masukan nomor telepon'
                                    _placeholder={{ fontSize: 'sm' }}
                                />
                            </InputGroup>
                            <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Email</Field.Label>
                            <InputGroup startElement={<FiUser />}>
                                <Input
                                    rounded='xl'
                                    size='xl'
                                    value={profile?.email || ''}
                                    readOnly
                                    _placeholder={{ fontSize: 'sm' }}
                                />
                            </InputGroup>
                            <Field.HelperText>Email tidak dapat diubah</Field.HelperText>
                        </Field.Root>
                    </Fieldset.Content>
                </Fieldset.Root>
            </form>
        </BottomDrawer>
    )
}

export default ModalUpdateProfile;

