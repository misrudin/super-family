import { ICategory } from '@/interfaces/ICategory';
import { getCategoriesFromAPI } from '@/lib/api/categories/categories.api';
import { Box, EmptyState, HStack, IconButton, Spinner, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { JSX, memo, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { HiColorSwatch } from 'react-icons/hi';
import CategoryList from './Partials/CategoryList';
import ModalCategory from './Partials/ModalCategory';

const Categories: React.FC = (): JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategoriesFromAPI(),
        select: (data) => data.data?.data || [],
    });

    const handleOpenModal = (category?: ICategory) => {
        setSelectedCategory(category || null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCategory(null);
    };

    return (
        <Box py='4'>
            <HStack justify='space-between' align='center' px='4' mb='4'>
                <Text fontSize='md' fontWeight='bold'>Kategori Transaksi</Text>
                <IconButton
                    onClick={() => handleOpenModal()}
                    rounded='lg'
                    colorPalette='orange'
                    variant='surface'
                    size='sm'
                >
                    <FiPlus />
                </IconButton>
            </HStack>

            {isLoading ? (
                <Box py='8' textAlign='center'>
                    <Spinner size="lg" />
                </Box>
            ) : !categories || categories.length === 0 ? (
                <Box px='4'>
                    <EmptyState.Root>
                        <EmptyState.Content>
                            <EmptyState.Indicator>
                                <HiColorSwatch />
                            </EmptyState.Indicator>
                            <VStack textAlign="center">
                                <EmptyState.Title>Belum ada kategori</EmptyState.Title>
                                <EmptyState.Description>
                                    Mulai dengan membuat kategori transaksi pertama Anda.
                                </EmptyState.Description>
                            </VStack>
                        </EmptyState.Content>
                    </EmptyState.Root>
                </Box>
            ) : (
                <CategoryList
                    categories={categories}
                    onEdit={(category) => handleOpenModal(category)}
                />
            )}

            <ModalCategory
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                selected={selectedCategory || undefined}
            />
        </Box>
    )
}

export default memo(Categories)

