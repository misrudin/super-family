import { BottomDrawer } from "@/components/drawer";
import { toaster } from "@/components/ui/toaster";
import { formatRupiahInput, parseRupiah } from "@/helpers/string";
import { IBaseResponse } from "@/interfaces/IBaseResponse";
import { IBasicModal } from "@/interfaces/IBasicModal";
import { ICategory } from "@/interfaces/ICategory";
import { ITransaction } from "@/interfaces/ITransaction";
import { getCategoriesFromAPI } from "@/lib/api/categories/categories.api";
import { createTransactionFromAPI, updateTransactionFromAPI } from "@/lib/api/transactions/transactions.api";
import { IParamCreateTransaction, IParamUpdateTransaction } from "@/lib/api/transactions/transactions.types";
import { useAuth } from "@/providers/useAuth";
import { transactionSchema } from "@/validations/transactions";
import { Button, Combobox, Field, Fieldset, HStack, Input, InputGroup, Spinner, Textarea, useFilter, useListCollection } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import React, { FC } from "react";
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

    // Reset form when selected transaction changes
    React.useEffect(() => {
        if (selected) {
            reset({
                amount: selected.amount || 0,
                category_id: selected.category?.id || "",
                note: selected.note || "",
            });
        } else {
            reset({
                amount: 0,
                category_id: "",
                note: "",
            });
        }
    }, [selected, reset]);

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
        // Ensure amount is a number and positive
        const amountValue = typeof data.amount === 'string' ? parseRupiah(data.amount) : Number(data.amount);

        if (amountValue <= 0) {
            toaster.create({
                title: "Jumlah tidak valid",
                description: "Jumlah transaksi harus lebih dari 0",
                type: "error",
                closable: true,
            });
            return;
        }

        const submitData = {
            ...data,
            amount: amountValue,
        };

        if (selected) {
            updateTransactionMutation(submitData);
        } else {
            createTransactionMutation(submitData);
        }
    }

    const { data: categories, isLoading: loadingCategories, refetch: refetchCategories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategoriesFromAPI(),
        select: (data) => data.data?.data ?? [],
        staleTime: 0, // Always fetch fresh data
        refetchOnMount: true, // Refetch when component mounts
    });

    // Refetch categories when modal opens
    React.useEffect(() => {
        if (isOpen) {
            refetchCategories();
        }
    }, [isOpen, refetchCategories]);

    const { startsWith } = useFilter({ sensitivity: "base" })
    const { collection: categoryCollection, filter: filterCategory, reset: resetCombobox } = useListCollection({
        initialItems: categories,
        filter: startsWith,
        limit: 10,
        itemToString: (item: ICategory) => item.name,
        itemToValue: (item: ICategory) => item.id,
    })

    return (
        <BottomDrawer
            title={selected ? "Edit Transaksi" : "Tambah Transaksi"}
            isOpen={isOpen}
            onClose={() => {
                onClose()
                reset()
            }}
            footer={
                <HStack justify='end'>
                    <Button colorPalette='gray' variant='subtle' onClick={onClose}>Batal</Button>
                    <Button colorPalette='orange' variant='solid' type="submit" form="form-transaction" disabled={!isValid || !isDirty}
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
                                    <Combobox.Root
                                        collection={categoryCollection}
                                        value={field.value ? [field.value] : []}
                                        onValueChange={(e) => {
                                            const value = e.value[0] as string;
                                            if (value) {
                                                field.onChange(value);
                                            }
                                        }}
                                        size="lg"
                                        openOnClick
                                        onInputValueChange={(e) => filterCategory(e.inputValue)}
                                    >
                                        <Combobox.Control>
                                            <Combobox.Input
                                                rounded="xl"
                                                placeholder="Cari atau pilih kategori"
                                                _placeholder={{ fontSize: 'sm' }}
                                            />
                                            <Combobox.IndicatorGroup>
                                                {loadingCategories && (
                                                    <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />
                                                )}
                                                <Combobox.Trigger onClick={() => resetCombobox()} />
                                            </Combobox.IndicatorGroup>
                                        </Combobox.Control>
                                        <Combobox.Positioner>
                                            <Combobox.Content>
                                                {categoryCollection?.items.length === 0 ? (
                                                    <Combobox.Empty>Tidak ada kategori ditemukan</Combobox.Empty>
                                                ) : (
                                                    categoryCollection?.items.map((category) => (
                                                        <Combobox.Item key={category.id} item={category}>
                                                            <Combobox.ItemText>
                                                                {category.name}
                                                            </Combobox.ItemText>
                                                            <Combobox.ItemIndicator />
                                                        </Combobox.Item>
                                                    ))
                                                )}
                                            </Combobox.Content>
                                        </Combobox.Positioner>
                                    </Combobox.Root>
                                )}
                            />
                            <Field.ErrorText>{errors.category_id?.message}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.amount}>
                            <Field.Label>Jumlah Transaksi</Field.Label>
                            <Controller
                                control={control}
                                name="amount"
                                render={({ field }) => {
                                    const displayValue = formatRupiahInput(field.value || '');
                                    return (
                                        <InputGroup startElement="Rp">
                                            <Input
                                                rounded='xl'
                                                size='xl'
                                                type="text"
                                                placeholder='Masukan jumlah transaksi'
                                                _placeholder={{ fontSize: 'sm' }}
                                                value={displayValue}
                                                onChange={(e) => {
                                                    const inputValue = e.target.value;
                                                    // Allow empty input
                                                    if (inputValue === '') {
                                                        field.onChange(0);
                                                        return;
                                                    }
                                                    // Parse the input to get the numeric value
                                                    const parsed = parseRupiah(inputValue);
                                                    // Update the field with the numeric value
                                                    field.onChange(parsed);
                                                }}
                                                onBlur={field.onBlur}
                                            />
                                        </InputGroup>
                                    );
                                }}
                            />
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