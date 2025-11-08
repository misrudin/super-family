import { BottomDrawer } from "@/components/drawer";
import { toaster } from "@/components/ui/toaster";
import { generateSlug } from "@/helpers/string";
import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { IBasicModal } from "@/interfaces/IBasicModal";
import { IFamily } from "@/interfaces/IFamily";
import { joinFamilyFromAPI } from "@/lib/api/account/account.api";
import { createFamilyFromAPI, updateFamilyFromAPI } from "@/lib/api/families/families.api";
import { IParamCreateFamily, IParamUpdateFamily } from "@/lib/api/families/families.types";
import { useAuth } from "@/providers/useAuth";
import { familySchema } from "@/validations/families";
import { Button, Field, Fieldset, HStack, Input, InputGroup } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiHash, FiUser } from "react-icons/fi";
import z from "zod";

interface IModalFamilyProps extends IBasicModal {
    selected?: IFamily;
}

type FamilyFormValues = z.infer<typeof familySchema>;

const ModalFamily: FC<IModalFamilyProps> = ({ isOpen, onClose, selected }) => {
    const { reFetch } = useAuth()
    const queryClient = useQueryClient()
    const { register, handleSubmit, watch, setValue, reset, formState: { errors, isValid, isDirty, dirtyFields } } = useForm<FamilyFormValues>({
        resolver: zodResolver(familySchema),
        defaultValues: {
            name: selected?.name || "",
            slug: selected?.slug || "",
        },
        mode: "all",
    });

    const watchName = watch("name");

    useEffect(() => {
        if (!dirtyFields.slug) {
            setValue("slug", generateSlug(watchName));
        }
    }, [watchName, dirtyFields.slug, setValue]);

    const { mutate: joinFamilyMutation, isPending: loadingJoinFamily } = useMutation({
        mutationFn: (family_id: string) => joinFamilyFromAPI({ family_id }),
    })

    const { mutate: createFamilyMutation, isPending: loadingCreateFamily } = useMutation({
        mutationFn: (data: IParamCreateFamily) => createFamilyFromAPI(data),
        onSuccess: (response: AxiosResponse<IBaseResponse<IFamily>>) => {
            if (response.data.success) {
                toaster.create({
                    title: "Keluarga berhasil dibuat",
                    description: response.data.message,
                    type: "success",
                    closable: true,
                })
                joinFamilyMutation(response.data.data.id)
                onClose()
                reset()
                reFetch()
                queryClient.refetchQueries({ queryKey: ['family-detail'] })
            }
        },
        onError: (error: AxiosError<IBaseResponse<unknown>>) => {
            toaster.create({
                title: "Keluarga gagal dibuat",
                description: error?.response?.data?.message,
                type: "error",
                closable: true,
            });
        },
    })

    const { mutate: updateFamilyMutation, isPending: loadingUpdateFamily } = useMutation({
        mutationFn: (data: IParamUpdateFamily) => updateFamilyFromAPI({ ...data, id: selected?.id }),
        onSuccess: (response: AxiosResponse<IBaseResponse<IFamily>>) => {
            if (response.data.success) {
                toaster.create({
                    title: "Keluarga berhasil diupdate",
                    description: response.data.message,
                    type: "success",
                    closable: true,
                })
            }
        },
        onError: (error: AxiosError<IBaseResponse<unknown>>) => {
            toaster.create({
                title: "Keluarga gagal diupdate",
                description: error?.response?.data?.message,
                type: "error",
                closable: true,
            });
        },
    })

    const onSubmit = (data: FamilyFormValues) => {
        if (selected) {
            updateFamilyMutation(data);
        } else {
            createFamilyMutation(data);
        }
    }
    return (
        <BottomDrawer
            title={selected ? "Edit Keluarga" : "Buat Keluarga"}
            isOpen={isOpen}
            onClose={() => {
                onClose()
                reset()
            }}
            footer={
                <HStack justify='end'>
                    <Button colorPalette='gray' variant='subtle' onClick={onClose}>Batal</Button>
                    <Button colorPalette='orange' variant='solid' type="submit" form="form-family" disabled={!isValid || !isDirty}
                        loading={loadingCreateFamily || loadingJoinFamily || loadingUpdateFamily}>Simpan</Button>
                </HStack>
            }>

            <form onSubmit={handleSubmit(onSubmit)} id="form-family">
                <Fieldset.Root size="lg" as='form'>
                    <Fieldset.Content>
                        <Field.Root invalid={!!errors.name}>
                            <Field.Label>Nama Keluarga</Field.Label>
                            <InputGroup startElement={<FiUser />}>
                                <Input {...register("name")} rounded='xl' size='xl' name="name" type="text" placeholder='Masukan nama lengkap kamu' _placeholder={{ fontSize: 'sm' }} />
                            </InputGroup>
                            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.slug}>
                            <Field.Label>Kode Keluarga</Field.Label>
                            <InputGroup startElement={<FiHash />}>
                                <Input {...register("slug")} rounded='xl' size='xl' name="slug" type="text" placeholder='Kode keluarga akan otomatis terisi' _placeholder={{ fontSize: 'sm' }} />
                            </InputGroup>
                            <Field.ErrorText>{errors.slug?.message}</Field.ErrorText>
                        </Field.Root>
                    </Fieldset.Content>
                </Fieldset.Root>
            </form>
        </BottomDrawer>
    )
}

export default ModalFamily;