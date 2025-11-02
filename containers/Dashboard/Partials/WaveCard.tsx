import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { FaArrowTrendUp } from "react-icons/fa6";

const WaveCard = () => {
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
                <Text fontSize='sm' color='gray.300'>Here’s a summary of your financial activity.</Text>
                <Text fontSize='2xl' fontWeight='bold'>Rp500.0000.000</Text>
                <HStack justify='space-between' align='center' mt='2'>
                    <HStack color='green.300'>
                        <FaArrowTrendUp />
                        <Text fontSize='sm'>+5.4% since last month</Text>
                    </HStack>
                    <Button size='xs' colorPalette='gray' variant='surface'>View Details</Button>
                </HStack>
            </Box>
        </Box>
    );
};

export default WaveCard;
