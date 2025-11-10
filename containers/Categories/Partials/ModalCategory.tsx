import { BottomDrawer } from "@/components/drawer";
import { toaster } from "@/components/ui/toaster";
import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { IBasicModal } from "@/interfaces/IBasicModal";
import { ICategory } from "@/interfaces/ICategory";
import { createCategoryFromAPI, updateCategoryFromAPI } from "@/lib/api/categories/categories.api";
import { IParamCreateCategory, IParamUpdateCategory } from "@/lib/api/categories/categories.types";
import { createCategorySchema, updateCategorySchema } from "@/validations/categories";
import { Button, Field, Fieldset, HStack, Input, Select, createListCollection } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { FC, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

interface IModalCategoryProps extends IBasicModal {
    selected?: ICategory;
}

type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;
type UpdateCategoryFormValues = z.infer<typeof updateCategorySchema>;

const ModalCategory: FC<IModalCategoryProps> = ({ isOpen, onClose, selected }) => {
    const queryClient = useQueryClient()
    const isEdit = !!selected;

    const { register, handleSubmit, reset, control, formState: { errors, isValid, isDirty } } = useForm<CreateCategoryFormValues | UpdateCategoryFormValues>({
        resolver: zodResolver(isEdit ? updateCategorySchema : createCategorySchema),
        defaultValues: {
            name: selected?.name || "",
            type: selected?.type || "expense",
        },
        mode: "all",
    });

    useEffect(() => {
        if (selected) {
            reset({
                name: selected.name,
                type: selected.type,
            });
        } else {
            reset({
                name: "",
                type: "expense",
            });
        }
    }, [selected, reset]);

    const { mutate: createCategoryMutation, isPending: loadingCreate } = useMutation({
        mutationFn: (data: IParamCreateCategory) => createCategoryFromAPI(data),
        onSuccess: (response: AxiosResponse<IBaseResponse<ICategory>>) => {
            if (response.data.success) {
                toaster.create({
                    title: "Kategori berhasil dibuat",
                    description: response.data.message,
                    type: "success",
                    closable: true,
                })
                onClose()
                reset()
                queryClient.refetchQueries({ queryKey: ['categories'] })
            }
        },
        onError: (error: AxiosError<IBaseResponse<unknown>>) => {
            toaster.create({
                title: "Kategori gagal dibuat",
                description: error?.response?.data?.message,
                type: "error",
                closable: true,
            });
        },
    })

    const { mutate: updateCategoryMutation, isPending: loadingUpdate } = useMutation({
        mutationFn: (data: IParamUpdateCategory) => {
            if (!selected?.id) {
                throw new Error("Category ID is required");
            }
            return updateCategoryFromAPI({ ...data, id: selected.id });
        },
        onSuccess: (response: AxiosResponse<IBaseResponse<ICategory>>) => {
            if (response.data.success) {
                toaster.create({
                    title: "Kategori berhasil diupdate",
                    description: response.data.message,
                    type: "success",
                    closable: true,
                })
                onClose()
                reset()
                queryClient.refetchQueries({ queryKey: ['categories'] })
            }
        },
        onError: (error: AxiosError<IBaseResponse<unknown>>) => {
            toaster.create({
                title: "Kategori gagal diupdate",
                description: error?.response?.data?.message,
                type: "error",
                closable: true,
            });
        },
    })

    const typeCollection = useMemo(() => {
        return createListCollection({
            items: [
                { value: "income", label: "Pemasukan" },
                { value: "expense", label: "Pengeluaran" },
            ],
            itemToString: (item: { value: string; label: string }) => item.label,
            itemToValue: (item: { value: string; label: string }) => item.value,
        });
    }, []);

    const onSubmit = (data: CreateCategoryFormValues | UpdateCategoryFormValues) => {
        if (selected) {
            updateCategoryMutation(data as IParamUpdateCategory);
        } else {
            createCategoryMutation(data as IParamCreateCategory);
        }
    }

    return (
        <BottomDrawer
            title={selected ? "Edit Kategori" : "Buat Kategori"}
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
                        form="form-category"
                        disabled={!isValid || !isDirty}
                        loading={loadingCreate || loadingUpdate}
                    >
                        Simpan
                    </Button>
                </HStack>
            }>
            <form onSubmit={handleSubmit(onSubmit)} id="form-category">
                <Fieldset.Root size="lg">
                    <Fieldset.Content>
                        <Field.Root invalid={!!errors.type}>
                            <Field.Label>Tipe</Field.Label>
                            <Controller
                                control={control}
                                name="type"
                                render={({ field }) => (
                                    <Select.Root
                                        collection={typeCollection}
                                        value={field.value ? [field.value] : []}
                                        onValueChange={(e) => {
                                            const value = e.value[0] as "income" | "expense";
                                            field.onChange(value || "expense");
                                        }}
                                        size="lg"
                                        onInteractOutside={() => field.onBlur()}
                                    >
                                        <Select.HiddenSelect />
                                        <Select.Control>
                                            <Select.Trigger rounded="xl">
                                                <Select.ValueText placeholder="Pilih tipe" />
                                            </Select.Trigger>
                                            <Select.IndicatorGroup>
                                                <Select.Indicator />
                                            </Select.IndicatorGroup>
                                        </Select.Control>
                                        <Select.Positioner>
                                            <Select.Content>
                                                {typeCollection.items.map((item) => (
                                                    <Select.Item key={item.value} item={item}>
                                                        {item.label}
                                                        <Select.ItemIndicator />
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Select.Root>
                                )}
                            />
                            <Field.ErrorText>{errors.type?.message}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.name}>
                            <Field.Label>Nama Kategori</Field.Label>
                            <Input
                                {...register("name")}
                                rounded='xl'
                                size='xl'
                                name="name"
                                type="text"
                                placeholder='Masukan nama kategori'
                                _placeholder={{ fontSize: 'sm' }}
                            />
                            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                        </Field.Root>

                    </Fieldset.Content>
                </Fieldset.Root>
            </form>
        </BottomDrawer>
    )
}

export default ModalCategory;

