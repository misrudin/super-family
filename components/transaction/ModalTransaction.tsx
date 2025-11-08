import { BottomDrawer } from "@/components/drawer";
import { toaster } from "@/components/ui/toaster";
import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { IBasicModal } from "@/interfaces/IBasicModal";
import { ICategory } from "@/interfaces/ICategory";
import { ITransaction } from "@/interfaces/ITransaction";
import { getCategoriesFromAPI } from "@/lib/api/categories/categories.api";
import { createTransactionFromAPI, updateTransactionFromAPI } from "@/lib/api/transactions/transactions.api";
import { IParamCreateTransaction, IParamUpdateTransaction } from "@/lib/api/transactions/transactions.types";
import { useAuth } from "@/providers/useAuth";
import { transactionSchema } from "@/validations/transactions";
import { Button, Field, Fieldset, HStack, Input, Select, Spinner, Textarea, createListCollection } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { FC, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

interface IModalTransactionProps extends IBasicModal {
    selected?: ITransaction | null;
}

type TransactionFormValues = z.infer<typeof transactionSchema>;

const ModalTransaction: FC<IModalTransactionProps> = ({ isOpen, onClose, selected }) => {
    const { reFetch } = useAuth()
    const queryClient = useQueryClient()
    const { control, register, handleSubmit, reset, formState: { errors, isValid, isDirty } } = useForm<TransactionFormValues>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            amount: selected?.amount || 0,
            category_id: selected?.category?.id || "",
            note: selected?.note || "",
        },
        mode: "all",
    });

    const { mutate: createTransactionMutation, isPending: loadingCreateTransaction } = useMutation({
        mutationFn: (data: IParamCreateTransaction) => createTransactionFromAPI(data),
        onSuccess: (response: AxiosResponse<IBaseResponse<ITransaction>>) => {
            if (response.data.success) {
                toaster.create({
                    title: "Transaksi berhasil dibuat",
                    description: response.data.message,
                    type: "success",
                    closable: true,
                })
                onClose()
                reset()
                reFetch()
                queryClient.refetchQueries({ queryKey: ['transactions'] })
            }
        },
        onError: (error: AxiosError<IBaseResponse<unknown>>) => {
            toaster.create({
                title: "Transaksi gagal dibuat",
                description: error?.response?.data?.message,
                type: "error",
                closable: true,
            });
        },
    })

    const { mutate: updateTransactionMutation, isPending: loadingUpdateTransaction } = useMutation({
        mutationFn: (data: IParamUpdateTransaction) => updateTransactionFromAPI({ ...data, id: selected?.id }),
        onSuccess: (response: AxiosResponse<IBaseResponse<ITransaction>>) => {
            if (response.data.success) {
                toaster.create({
                    title: "Transaksi berhasil diupdate",
                    description: response.data.message,
                    type: "success",
                    closable: true,
                })
            }
        },
        onError: (error: AxiosError<IBaseResponse<unknown>>) => {
            toaster.create({
                title: "Transaksi gagal diupdate",
                description: error?.response?.data?.message,
                type: "error",
                closable: true,
            });
        },
    })

    const onSubmit = (data: TransactionFormValues) => {
        if (selected) {
            updateTransactionMutation(data);
        } else {
            createTransactionMutation(data);
        }
    }

    const { data: categories, isLoading: loadingCategories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategoriesFromAPI(),
        select: (data) => data.data?.data ?? [],
    });

    const collection = useMemo(() => {
        return createListCollection({
            items: categories ?? [],
            itemToString: (category: ICategory) => category.name,
            itemToValue: (category: ICategory) => category.id,
        })
    }, [categories])

    return (
        <BottomDrawer
            title={selected ? "Edit Transaksi" : "Buat Transaksi"}
            isOpen={isOpen}
            onClose={() => {
                onClose()
                reset()
            }}
            footer={
                <HStack justify='end'>
                    <Button colorPalette='gray' variant='subtle' onClick={onClose}>Batal</Button>
                    <Button colorPalette='orange' variant='solid' type="submit" form="form-family" disabled={!isValid || !isDirty}
                        loading={loadingCreateTransaction || loadingUpdateTransaction}>Simpan</Button>
                </HStack>
            }>

            <form onSubmit={handleSubmit(onSubmit)} id="form-transaction">
                <Fieldset.Root size="lg" as='form'>
                    <Fieldset.Content>
                        <Field.Root invalid={!!errors.category_id}>
                            <Field.Label>Kategori</Field.Label>
                            <Controller
                                control={control}
                                name="category_id"
                                render={({ field }) => (
                                    <Select.Root
                                        name={field.name}
                                        value={field.value ? [field.value] : []}
                                        onValueChange={({ value }) => field.onChange(value)}
                                        onInteractOutside={() => field.onBlur()}
                                        collection={collection}
                                        size="lg"
                                    >
                                        <Select.HiddenSelect />
                                        <Select.Control>
                                            <Select.Trigger rounded="lg">
                                                <Select.ValueText placeholder="Pilih kategori" />
                                            </Select.Trigger>
                                            <Select.IndicatorGroup>
                                                {loadingCategories && (
                                                    <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />
                                                )}
                                                <Select.Indicator />
                                            </Select.IndicatorGroup>
                                        </Select.Control>
                                        <Select.Positioner>
                                            <Select.Content>
                                                {collection?.items.map((category) => (
                                                    <Select.Item item={category} key={category.id}>
                                                        {category.name}
                                                        <Select.ItemIndicator />
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Select.Root>
                                )}
                            />
                            <Field.ErrorText>{errors.category_id?.message}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.amount}>
                            <Field.Label>Jumlah Transaksi</Field.Label>
                            <Input {...register("amount")} rounded='xl' size='xl' name="amount" type="text" placeholder='Masukan jumlah transaksi' _placeholder={{ fontSize: 'sm' }} />
                            <Field.ErrorText>{errors.amount?.message}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.note}>
                            <Field.Label>Keterangan</Field.Label>
                            <Textarea {...register("note")} rounded='xl' size='xl' name="note" placeholder='Masukan keterangan' _placeholder={{ fontSize: 'sm' }} />
                            <Field.ErrorText>{errors.note?.message}</Field.ErrorText>
                        </Field.Root>
                    </Fieldset.Content>
                </Fieldset.Root>
            </form>
        </BottomDrawer>
    )
}

export default ModalTransaction;