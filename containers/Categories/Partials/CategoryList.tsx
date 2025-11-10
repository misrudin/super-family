import BottomDrawer from '@/components/drawer/BottomDrawer';
import Confirmation from '@/components/drawer/Confirmation';
import { toaster } from '@/components/ui/toaster';
import { IBaseResponse } from '@/interfaces/IBaseResponse';
import { ICategory } from '@/interfaces/ICategory';
import { deleteCategoryFromAPI } from '@/lib/api/categories/categories.api';
import { Box, Flex, HStack, IconButton, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { JSX, memo, useState } from 'react';
import { BiDotsHorizontal } from 'react-icons/bi';
import { FaPen } from 'react-icons/fa6';
import { FiArrowDown, FiArrowUp, FiTrash2 } from 'react-icons/fi';

interface ICategoryListProps {
    categories: ICategory[];
    onEdit: (category: ICategory) => void;
}

const CategoryList: React.FC<ICategoryListProps> = ({ categories, onEdit }): JSX.Element => {
    const queryClient = useQueryClient();
    const [selected, setSelected] = useState<ICategory | null>(null);
    const { open: isOpenMoreMenu, onOpen: onOpenMoreMenu, onClose: onCloseMoreMenu } = useDisclosure();
    const { open: isOpenDeleteConfirmation, onOpen: onOpenDeleteConfirmation, onClose: onCloseDeleteConfirmation } = useDisclosure();

    const { mutate: deleteCategory, isPending: deleting } = useMutation({
        mutationFn: (id: string) => deleteCategoryFromAPI({ id }),
        onSuccess: () => {
            toaster.create({
                title: "Kategori berhasil dihapus",
                type: "success",
                closable: true,
            });
            queryClient.refetchQueries({ queryKey: ['categories'] });
            onCloseDeleteConfirmation();
        },
        onError: (error: AxiosError<IBaseResponse<unknown>>) => {
            toaster.create({
                title: "Kategori gagal dihapus",
                description: error?.response?.data?.message,
                type: "error",
                closable: true,
            });
        },
    });

    const handleDelete = (category: ICategory) => {
        deleteCategory(category.id);
    };

    return (
        <VStack gap='3' px='4' align='stretch'>
            {categories.map((category) => (
                <Box
                    key={category.id}
                    p='3'
                    rounded='lg'
                    bg='white'
                    shadow='md'
                >
                    <HStack justify='space-between' align='center'>
                        <HStack>
                            <Flex boxSize='30px' borderWidth='1px'
                                borderColor='border'
                                rounded='full' align='center'
                                justify='center' mr='2' color={category.type === 'income' ? 'green.500' : 'red.500'}>
                                {category.type === 'income' ? <FiArrowUp /> : <FiArrowDown />}
                            </Flex>
                            <Box>
                                <Text fontWeight='medium' fontSize='sm'>{category.name}</Text>
                                <Text fontSize='xs' color='gray.500'>{category?.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</Text>
                            </Box>
                        </HStack>
                        <HStack gap='2'>
                            <IconButton
                                colorPalette='gray'
                                variant='ghost'
                                size='xs'
                                onClick={() => {
                                    onOpenMoreMenu();
                                    setSelected(category);
                                }}
                            >
                                <BiDotsHorizontal />
                            </IconButton>
                        </HStack>
                    </HStack>
                </Box>
            ))}

            <BottomDrawer
                isOpen={isOpenMoreMenu}
                onClose={onCloseMoreMenu}
                title="Pilih Aksi"
            >
                <VStack gap='2' align='stretch' pb='4'>
                    <HStack gap='4' onClick={() => {
                        onCloseMoreMenu();
                        onEdit(selected);
                    }} pb='2'>
                        <FaPen />
                        <Text>Edit Kategori</Text>
                    </HStack>
                    <HStack gap='4' onClick={() => {
                        onCloseMoreMenu();
                        onOpenDeleteConfirmation();
                    }} py='2' color='red.500'>
                        <FiTrash2 />
                        <Text>Hapus Kategori</Text>
                    </HStack>
                </VStack>
            </BottomDrawer>

            <Confirmation
                title="Konfirmasi"
                isOpen={isOpenDeleteConfirmation}
                onClose={onCloseDeleteConfirmation}
                onConfirm={() => handleDelete(selected)}
                isLoading={deleting}
                danger
            >
                <Text>Apakah Anda yakin ingin menghapus kategori &quot;{selected?.name}&quot;?</Text>
            </Confirmation>
        </VStack>
    )
}

export default memo(CategoryList)

