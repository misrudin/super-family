import { Box, Button, HStack, Spinner, Text } from "@chakra-ui/react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { getDashboardStatisticsFromAPI } from "@/lib/api/dashboard/dashboard.api";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/helpers/string";
import { memo } from "react";

const WaveCard = () => {
    const { data: statistics, isLoading } = useQuery({
        queryKey: ['dashboard-statistics'],
        queryFn: () => getDashboardStatisticsFromAPI(),
        select: (data) => data.data?.data,
        refetchInterval: 30000, // Refetch every 30 seconds
    });

    const totalBalance = statistics?.total_balance || 0;
    const incomeThisMonth = statistics?.income_this_month || 0;
    const expenseThisMonth = statistics?.expense_this_month || 0;
    const netThisMonth = incomeThisMonth - expenseThisMonth;
    const percentageChange = incomeThisMonth > 0 
        ? ((netThisMonth / incomeThisMonth) * 100).toFixed(1)
        : '0.0';

    return (
        <Box
            w="full"
            p="4"
            rounded="md"
            color="white"
            position="relative"
            overflow="hidden"
            bg="#1F1F22"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            backdropFilter="blur(14px)"
            borderWidth='1px'
            borderColor="rgba(255,255,255,0.15)"
        >
            <Box
                position="absolute"
                inset="0"
                bgGradient={`
          radial-gradient(circle at 20% 30%, rgba(255,255,255,0.12), transparent 60%),
          radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08), transparent 65%),
          radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06), transparent 70%)
        `}
            />
            <Box position="relative">
                <Text fontSize='sm' color='gray.300'>Ringkasan aktivitas keuangan Anda.</Text>
                {isLoading ? (
                    <Spinner size="sm" color="white" mt="2" />
                ) : (
                    <>
                        <Text fontSize='2xl' fontWeight='bold'>{formatCurrency(totalBalance)}</Text>
                        <HStack justify='space-between' align='center' mt='2'>
                            <HStack color={netThisMonth >= 0 ? 'green.300' : 'red.300'}>
                                {netThisMonth >= 0 ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
                                <Text fontSize='sm'>
                                    {netThisMonth >= 0 ? '+' : ''}{formatCurrency(Math.abs(netThisMonth))} bulan ini
                                </Text>
                            </HStack>
                        </HStack>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default memo(WaveCard);
