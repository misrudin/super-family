import { dateTimeFormat } from '@/helpers/date';
import { formatCurrency } from '@/helpers/string';
import { ITransaction } from '@/interfaces/ITransaction';
import { getFamilyDetailFromAPI } from '@/lib/api/families/families.api';
import { getTransactionsFromAPI } from '@/lib/api/transactions/transactions.api';
import { useAuth } from '@/providers/useAuth';
import { Avatar, Box, Button, ButtonGroup, defineStyle, EmptyState, Flex, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { JSX, memo } from 'react';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { HiColorSwatch } from 'react-icons/hi';

const ringCss = defineStyle({
    outlineWidth: "2px",
    outlineColor: "colorPalette.500",
    outlineOffset: "2px",
    outlineStyle: "solid",
})

const Wrapper: React.FC = (): JSX.Element => {
    const { profile } = useAuth();
    const familyId = profile?.family?.id;

    const { data: transactions, isLoading: loadingTransactions } = useQuery({
        queryKey: ['dashboard-transactions', familyId],
        queryFn: () => getTransactionsFromAPI({ limit: 5, page: 1 }),
        select: (data) => data.data?.data || [],
        enabled: !!familyId,
    });

    const { data: familyDetail, isLoading: loadingFamily } = useQuery({
        queryKey: ['dashboard-family', familyId],
        queryFn: () => getFamilyDetailFromAPI({ id: familyId! }),
        select: (data) => data.data?.data,
        enabled: !!familyId,
    });

    const members = familyDetail?.members || [];

    return (
        <Box
            roundedTop='xl'
            bg="white"
            boxShadow="0 -4px 5px rgba(0,0,0,0.06)"
            backdropFilter='blur(10px)  '
            mt='-40px'
            py='4'
        >
            {
                loadingFamily && (
                    <Flex justify='center' py='8'>
                        <Spinner size="lg" />
                    </Flex>
                )
            }
            {!loadingFamily && members.length > 0 && (
                <Box>
                    <HStack gap="4" px='4' overflowX='auto' py='2'>
                        {members.slice(0, 5).map((member, index) => {
                            const colors = ['pink', 'green', 'blue', 'purple', 'orange'];
                            return (
                                <Avatar.Root key={member.id} css={ringCss} colorPalette={colors[index % colors.length]}>
                                    <Avatar.Fallback name={member.name || ''} />
                                </Avatar.Root>
                            );
                        })}
                    </HStack>
                </Box>
            )}
            <Box px='4' mt='3'>
                {loadingTransactions ? (
                    <Flex justify='center' py='8'>
                        <Spinner size="lg" />
                    </Flex>
                ) : !transactions || transactions.length === 0 ? (
                    <EmptyState.Root>
                        <EmptyState.Content>
                            <EmptyState.Indicator>
                                <HiColorSwatch />
                            </EmptyState.Indicator>
                            <VStack textAlign="center">
                                <EmptyState.Title>Belum ada transaksi</EmptyState.Title>
                                <EmptyState.Description>
                                    Mulai catatan keuanganmu dengan membuat transaksi baru.
                                </EmptyState.Description>
                            </VStack>
                            <ButtonGroup>
                                <Link href="/transaction">
                                    <Button colorPalette='orange' variant='surface'>Tambah Transaksi</Button>
                                </Link>
                            </ButtonGroup>
                        </EmptyState.Content>
                    </EmptyState.Root>
                ) : (
                    <VStack gap="4">
                        {transactions.map((transaction: ITransaction) => {
                            const isIncome = transaction.category.type === 'income';
                            return (
                                <HStack key={transaction.id} gap='1' align='start' w="full" p="3" rounded="md" borderWidth='1px' borderColor='border'>
                                    <Flex boxSize='30px' borderWidth='1px'
                                        borderColor='border'
                                        rounded='full' align='center'
                                        justify='center' mr='2' color={isIncome ? 'green.500' : 'red.500'}>
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
                                    </Box>
                                </HStack>
                            );
                        })}
                        <Link href="/transaction" style={{ width: '100%' }}>
                            <Button w='full' colorPalette='orange' variant='outline' size='sm'>
                                Lihat Semua Transaksi
                            </Button>
                        </Link>
                    </VStack>
                )}
            </Box>
        </Box>
    )
}

export default memo(Wrapper)