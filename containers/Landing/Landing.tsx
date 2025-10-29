import { Box, Button, Container, Flex, HStack, Heading, Icon, Tag, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { FiArrowRight, FiShield, FiSmile, FiZap } from 'react-icons/fi';

export const Landing: React.FC = () => {
    const layerRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const onScroll = () => setOffset(window.scrollY * 0.2);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <Container maxW='lg' px='4' py='8'>
            <VStack gap={6} align="stretch">
                <Tag.Root colorPalette="green" w="fit-content" borderRadius="full">
                    <Tag.Label>Free to use</Tag.Label>
                </Tag.Root>

                <Heading size="md" color="gray.800">
                    Atur pengeluaran, catat pemasukan, dan capai tujuan keluarga Anda
                </Heading>

                <Text color="gray.600">
                    Aplikasi ringkas, cepat, dan fokus pada kebutuhan keluarga. Tidak ada biaya berlangganan, tidak ada iklan mengganggu.
                </Text>

                <HStack gap={3}>
                    <Icon as={FiShield} color="green.500" />
                    <Text color="gray.700">Privasi terjaga, data dipegang oleh Anda.</Text>
                </HStack>
                <HStack gap={3}>
                    <Icon as={FiZap} color="yellow.500" />
                    <Text color="gray.700">Cepat, ringan, dan mudah digunakan.</Text>
                </HStack>
                <HStack gap={3}>
                    <Icon as={FiSmile} color="blue.500" />
                    <Text color="gray.700">Didesain untuk kebahagiaan finansial keluarga.</Text>
                </HStack>

                <Button colorPalette="blue" size="lg" w="full">
                    <HStack gap={2} justify="center" w="full">
                        <Text>Mulai Sekarang</Text>
                        <Icon as={FiArrowRight} />
                    </HStack>
                </Button>

                <Box
                    ref={layerRef}
                    mt={4}
                    h="120px"
                    bgGradient="linear(to-r, blue.50, purple.50)"
                    borderRadius="md"
                    overflow="hidden"
                    position="relative"
                >
                    <Flex
                        position="absolute"
                        top={0}
                        left={`${offset}px`}
                        right={0}
                        bottom={0}
                        align="center"
                        justify="center"
                        transition="left 0.2s ease-out"
                    >
                        <Text color="purple.500" fontWeight="semibold">Smooth Parallax</Text>
                    </Flex>
                </Box>
            </VStack>
        </Container>
    );
};

