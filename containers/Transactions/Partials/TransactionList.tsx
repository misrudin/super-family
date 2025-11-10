import { Box, Button, Flex, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { JSX, memo } from 'react';
import { FiArrowDown, FiArrowUp, FiEdit } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { getTransactionsFromAPI } from '@/lib/api/transactions/transactions.api';
import { ITransaction } from '@/interfaces/ITransaction';
import { formatCurrency } from '@/helpers/string';
import { dateTimeFormat } from '@/helpers/date';
import { EmptyState } from '@chakra-ui/react';
import { HiColorSwatch } from 'react-icons/hi';
import { getTransactionDetailFromAPI } from '@/lib/api/transactions/transactions.api';

interface ITransactionListProps {
    filters: {
        category_id?: string;
        type?: 'income' | 'expense';
        page?: number;
        limit?: number;
    };
    onEdit: (transaction: ITransaction) => void;
}

const TransactionList: React.FC<ITransactionListProps> = ({ filters, onEdit }): JSX.Element => {
    const { data: transactionsData, isLoading } = useQuery({
        queryKey: ['transactions', filters],
        queryFn: () => getTransactionsFromAPI({
            page: filters.page || 1,
            limit: filters.limit || 10,
            category_id: filters.category_id,
        }),
        select: (data) => data.data,
    });

    const transactions = transactionsData?.data || [];
    const metadata = transactionsData?.metadata;
    const filteredTransactions = filters.type
        ? transactions.filter((t: ITransaction) => t.category.type === filters.type)
        : transactions;

    if (isLoading) {
        return (
            <Box py='8' textAlign='center'>
                <Spinner size="lg" />
            </Box>
        );
    }

    if (!filteredTransactions || filteredTransactions.length === 0) {
        return (
            <Box px='4'>
                <EmptyState.Root>
                    <EmptyState.Content>
                        <EmptyState.Indicator>
                            <HiColorSwatch />
                        </EmptyState.Indicator>
                        <VStack textAlign="center">
                            <EmptyState.Title>Belum ada transaksi</EmptyState.Title>
                            <EmptyState.Description>
                                Mulai dengan membuat transaksi pertama Anda.
                            </EmptyState.Description>
                        </VStack>
                    </EmptyState.Content>
                </EmptyState.Root>
            </Box>
        );
    }

    return (
        <VStack gap='4' px='4' align='stretch'>
            {filteredTransactions.map((transaction: ITransaction) => {
                const isIncome = transaction.category.type === 'income';
                return (
                    <Box
                        key={transaction.id}
                        p='3'
                        rounded='md'
                        borderWidth='1px'
                        borderColor='border'
                        bg='white'
                        cursor='pointer'
                        _hover={{
                            borderColor: 'orange.500',
                        }}
                        onClick={() => onEdit(transaction)}
                    >
                        <HStack gap='1' align='start' w="full">
                            <Flex 
                                boxSize='30px' 
                                borderWidth='1px'
                                borderColor='border'
                                rounded='full' 
                                align='center'
                                justify='center' 
                                mr='2' 
                                color={isIncome ? 'green.500' : 'red.500'}
                            >
                                {isIncome ? <FiArrowUp /> : <FiArrowDown />}
                            </Flex>
                            <Box flex='1'>
                                <HStack justify='space-between' align='center'>
                                    <Text fontSize='xs' color='gray.500'>
                                        {dateTimeFormat(transaction.transaction_date, 'date-2-time')}
                                    </Text>
                                    <Text fontSize='sm' fontWeight='semibold' color={isIncome ? 'green.500' : 'red.500'}>
                                        {isIncome ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                                    </Text>
                                </HStack>
                                <Text fontSize='sm' fontWeight='semibold'>{transaction.category.name}</Text>
                                {transaction.note && (
                                    <Text fontSize='xs' color='gray.500'>{transaction.note}</Text>
                                )}
                                <Text fontSize='xs' color='gray.400' mt='1'>
                                    {transaction.user.name}
                                </Text>
                            </Box>
                            <Button
                                size='xs'
                                variant='ghost'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(transaction);
                                }}
                            >
                                <FiEdit />
                            </Button>
                        </HStack>
                    </Box>
                );
            })}

            {metadata && metadata.total_pages > 1 && (
                <HStack justify='center' gap='2' mt='4'>
                    <Button
                        size='sm'
                        variant='outline'
                        disabled={metadata.page === 1}
                        onClick={() => {
                            // Handle pagination
                        }}
                    >
                        Sebelumnya
                    </Button>
                    <Text fontSize='sm' color='gray.500'>
                        Halaman {metadata.page} dari {metadata.total_pages}
                    </Text>
                    <Button
                        size='sm'
                        variant='outline'
                        disabled={metadata.page === metadata.total_pages}
                        onClick={() => {
                            // Handle pagination
                        }}
                    >
                        Selanjutnya
                    </Button>
                </HStack>
            )}
        </VStack>
    )
}

export default memo(TransactionList)

