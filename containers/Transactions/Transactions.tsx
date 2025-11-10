import ModalTransaction from '@/components/transaction/ModalTransaction';
import { ITransaction } from '@/interfaces/ITransaction';
import { Box, Button, HStack, Text } from '@chakra-ui/react';
import { JSX, memo, useState } from 'react';
import TransactionFilters from './Partials/TransactionFilters';
import TransactionList from './Partials/TransactionList';

const Transactions: React.FC = (): JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);
    const [filters, setFilters] = useState<{
        category_id?: string;
        type?: 'income' | 'expense';
        page?: number;
        limit?: number;
    }>({
        page: 1,
        limit: 10,
    });

    const handleOpenModal = (transaction?: ITransaction) => {
        setSelectedTransaction(transaction || null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTransaction(null);
    };

    return (
        <Box py='4'>
            <HStack justify='space-between' align='center' px='4' mb='4'>
                <Text fontSize='xl' fontWeight='bold'>Laporan Transaksi</Text>
                <Button
                    colorPalette='orange'
                    variant='solid'
                    size='sm'
                    onClick={() => handleOpenModal()}
                >
                    Tambah Transaksi
                </Button>
            </HStack>

            <TransactionFilters
                filters={filters}
                onFilterChange={setFilters}
            />

            <TransactionList
                filters={filters}
                onEdit={(transaction) => handleOpenModal(transaction)}
            />

            <ModalTransaction
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                selected={selectedTransaction || undefined}
            />
        </Box>
    )
}

export default memo(Transactions)

