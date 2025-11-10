import { Box, VStack } from '@chakra-ui/react';
import { JSX, memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategoriesFromAPI } from '@/lib/api/categories/categories.api';
import { ICategory } from '@/interfaces/ICategory';
import Select from 'react-select';

interface ITransactionFiltersProps {
    filters: {
        category_id?: string;
        type?: 'income' | 'expense';
        page?: number;
        limit?: number;
    };
    onFilterChange: (filters: any) => void;
}

const typeOptions = [
    { value: "income", label: "Pemasukan" },
    { value: "expense", label: "Pengeluaran" },
];

const TransactionFilters: React.FC<ITransactionFiltersProps> = ({ filters, onFilterChange }): JSX.Element => {
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategoriesFromAPI(),
        select: (data) => data.data?.data || [],
    });

    const categoryOptions = (categories || []).map((category: ICategory) => ({
        value: category.id,
        label: category.name,
    }));

    const handleCategoryChange = (option: { value: string; label: string } | null) => {
        onFilterChange({
            ...filters,
            category_id: option?.value || undefined,
            page: 1,
        });
    };

    const handleTypeChange = (option: { value: string; label: string } | null) => {
        onFilterChange({
            ...filters,
            type: option?.value ? (option.value as 'income' | 'expense') : undefined,
            page: 1,
        });
    };

    return (
        <Box px='4' mb='4'>
            <VStack gap='2' align='stretch'>
                <Select
                    value={typeOptions.find(opt => opt.value === filters.type) || null}
                    onChange={handleTypeChange}
                    options={typeOptions}
                    placeholder="Filter Tipe"
                    isClearable
                    styles={{
                        control: (base) => ({
                            ...base,
                            borderRadius: '8px',
                            minHeight: '40px',
                        }),
                        placeholder: (base) => ({
                            ...base,
                            fontSize: '14px',
                        }),
                    }}
                />

                <Select
                    value={categoryOptions.find(opt => opt.value === filters.category_id) || null}
                    onChange={handleCategoryChange}
                    options={categoryOptions}
                    placeholder="Filter Kategori"
                    isClearable
                    styles={{
                        control: (base) => ({
                            ...base,
                            borderRadius: '8px',
                            minHeight: '40px',
                        }),
                        placeholder: (base) => ({
                            ...base,
                            fontSize: '14px',
                        }),
                    }}
                />
            </VStack>
        </Box>
    )
}

export default memo(TransactionFilters)

