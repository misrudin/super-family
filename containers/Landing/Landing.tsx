import {
    Box,
    Button,
    Container,
    Heading,
    Icon,
    SimpleGrid,
    Text,
    Timeline,
    VStack
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import {
    FiArrowRight,
    FiDollarSign,
    FiFileText,
    FiHeart,
    FiHome,
    FiLock,
    FiMonitor,
    FiTrendingUp,
    FiUsers
} from 'react-icons/fi';

export const Landing: React.FC = () => {
    return (
        <Box bg="bg" minH="100vh">
            {/* Hero Section */}
            <Box px='4' py='8' bg="cardBg">
                <VStack
                    flex={1}
                    align='stretch'
                    gap={6}
                    textAlign={{ base: 'center' }}
                >
                    <Box>
                        <Heading
                            size="2xl"
                            color="text"
                            mb={4}
                            lineHeight="1.2"
                        >
                            Atur Keuangan Keluarga Dengan Lebih Mudah
                        </Heading>
                        <Text
                            fontSize='md'
                            color="subtext"
                            maxW="600px"
                        >
                            Pantau pemasukan & pengeluaran keluarga
                            secara bersama-sama dalam satu aplikasi.
                            Gratis tanpa batas fitur.
                        </Text>
                    </Box>

                    <Link href="/register">
                        <Button
                            colorPalette="orange"
                            size="xl"
                            w='full'
                            rounded='xl'
                        >
                            Gunakan Sekarang (Gratis)
                            <FiArrowRight />
                        </Button>
                    </Link>
                </VStack>
            </Box>

            {/* Features Section */}
            <Box py={16} id="features" bg="bg">
                <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                    <VStack gap={12} align="center">
                        <Box textAlign="center" maxW="2xl">
                            <Heading size="xl" color="text" mb={4}>
                                Fitur Lengkap untuk Keluarga
                            </Heading>
                            <Text fontSize="lg" color="subtext">
                                Semua fitur tersedia gratis untuk membantu Anda
                                mengatur keuangan keluarga dengan lebih baik
                            </Text>
                        </Box>

                        <SimpleGrid
                            columns={1}
                            gap={6}
                            w="full"
                        >
                            <Box
                                bg="cardBg"
                                p={6}
                                borderRadius="lg"
                                shadow="sm"
                                _hover={{ shadow: 'md', transform: 'translateY(-4px)' }}
                                transition="all 0.3s"
                            >
                                <VStack align="flex-start" gap={4}>
                                    <Box
                                        bg="brand.50"
                                        p={3}
                                        borderRadius="lg"
                                        color="brand.600"
                                    >
                                        <Icon as={FiHome} boxSize={6} />
                                    </Box>
                                    <Heading size="md" color="text">
                                        Dashboard Keuangan Keluarga
                                    </Heading>
                                    <Text color="subtext">
                                        Lihat ringkasan keuangan keluarga secara
                                        real-time dalam satu dashboard yang mudah
                                        dipahami
                                    </Text>
                                </VStack>
                            </Box>

                            <Box
                                bg="cardBg"
                                p={6}
                                borderRadius="lg"
                                shadow="sm"
                                _hover={{ shadow: 'md', transform: 'translateY(-4px)' }}
                                transition="all 0.3s"
                            >
                                <VStack align="flex-start" gap={4}>
                                    <Box
                                        bg="success.50"
                                        p={3}
                                        borderRadius="lg"
                                        color="success.500"
                                    >
                                        <Icon as={FiDollarSign} boxSize={6} />
                                    </Box>
                                    <Heading size="md" color="text">
                                        Catat Pemasukan & Pengeluaran
                                    </Heading>
                                    <Text color="subtext">
                                        Catat setiap transaksi dengan mudah dan
                                        cepat, dilengkapi kategori untuk analisis
                                        yang lebih baik
                                    </Text>
                                </VStack>
                            </Box>

                            <Box
                                bg="cardBg"
                                p={6}
                                borderRadius="lg"
                                shadow="sm"
                                _hover={{ shadow: 'md', transform: 'translateY(-4px)' }}
                                transition="all 0.3s"
                            >
                                <VStack align="flex-start" gap={4}>
                                    <Box
                                        bg="warning.50"
                                        p={3}
                                        borderRadius="lg"
                                        color="warning.500"
                                    >
                                        <Icon as={FiUsers} boxSize={6} />
                                    </Box>
                                    <Heading size="md" color="text">
                                        Multi Anggota Keluarga
                                    </Heading>
                                    <Text color="subtext">
                                        Tambahkan anggota keluarga dan pantau
                                        keuangan bersama dalam satu aplikasi
                                    </Text>
                                </VStack>
                            </Box>

                            <Box
                                bg="cardBg"
                                p={6}
                                borderRadius="lg"
                                shadow="sm"
                                _hover={{ shadow: 'md', transform: 'translateY(-4px)' }}
                                transition="all 0.3s"
                            >
                                <VStack align="flex-start" gap={4}>
                                    <Box
                                        bg="brand.50"
                                        p={3}
                                        borderRadius="lg"
                                        color="brand.600"
                                    >
                                        <Icon as={FiTrendingUp} boxSize={6} />
                                    </Box>
                                    <Heading size="md" color="text">
                                        Laporan Bulanan Otomatis
                                    </Heading>
                                    <Text color="subtext">
                                        Dapatkan laporan keuangan bulanan secara
                                        otomatis untuk evaluasi yang lebih baik
                                    </Text>
                                </VStack>
                            </Box>
                        </SimpleGrid>
                    </VStack>
                </Container>
            </Box>

            {/* How It Works Section */}
            <Box py={16} id="how-it-works" bg="cardBg">
                <Container maxW="container.xl" px={{ base: 4 }}>
                    <VStack gap={12} align="center">
                        <Box textAlign="center" maxW="2xl">
                            <Heading size="xl" color="text" mb={4}>
                                Cara Kerja Super Family
                            </Heading>
                            <Text fontSize="lg" color="subtext">
                                Mulai mengatur keuangan keluarga Anda dalam 4
                                langkah mudah
                            </Text>
                        </Box>

                        <Timeline.Root size='xl'>
                            {
                                [
                                    {
                                        step: '1',
                                        icon: FiHome,
                                        title: 'Buat Keluarga',
                                        description:
                                            'Daftar dan buat akun keluarga Anda dengan mudah dan gratis',
                                    },
                                    {
                                        step: '2',
                                        icon: FiUsers,
                                        title: 'Tambah Anggota',
                                        description:
                                            'Undang anggota keluarga untuk bergabung dan mengelola keuangan bersama',
                                    },
                                    {
                                        step: '3',
                                        icon: FiFileText,
                                        title: 'Catat Keuangan',
                                        description:
                                            'Mulai mencatat pemasukan dan pengeluaran keluarga setiap hari',
                                    },
                                    {
                                        step: '4',
                                        icon: FiTrendingUp,
                                        title: 'Pantau Bersama',
                                        description:
                                            'Lihat dashboard dan laporan keuangan untuk membuat keputusan yang lebih baik',
                                    },
                                ].map((item, index) => (
                                    <Timeline.Item key={`timeline-item-${index}`}>
                                        <Timeline.Connector>
                                            <Timeline.Separator />
                                            <Timeline.Indicator>
                                                <Icon as={item.icon} />
                                            </Timeline.Indicator>
                                        </Timeline.Connector>
                                        <Timeline.Content>
                                            <Timeline.Title>{item.title}</Timeline.Title>
                                            <Timeline.Description>{item.description}</Timeline.Description>
                                        </Timeline.Content>
                                    </Timeline.Item>
                                ))}
                        </Timeline.Root>
                    </VStack>
                </Container>
            </Box>

            {/* Why Super Family Section */}
            <Box py={16} bg="bg">
                <Container maxW="container.xl" px={{ base: 4 }}>
                    <VStack gap={12} align="center">
                        <Box textAlign="center" maxW="2xl">
                            <Heading size="xl" color="text" mb={4}>
                                Kenapa Super Family?
                            </Heading>
                        </Box>

                        <SimpleGrid
                            columns={{ base: 1 }}
                            gap={8}
                            w="full"
                        >
                            <VStack gap={4} align="center" textAlign="center">
                                <Box
                                    bg="success.50"
                                    p={4}
                                    borderRadius="lg"
                                    color="success.500"
                                >
                                    <Icon as={FiLock} boxSize={8} />
                                </Box>
                                <Heading size="md" color="text">
                                    Privat & Aman
                                </Heading>
                                <Text color="subtext">
                                    Data keuangan keluarga Anda terjaga dengan
                                    baik dan hanya bisa diakses oleh anggota
                                    keluarga yang terdaftar
                                </Text>
                            </VStack>

                            <VStack gap={4} align="center" textAlign="center">
                                <Box
                                    bg="brand.50"
                                    p={4}
                                    borderRadius="lg"
                                    color="brand.600"
                                >
                                    <Icon as={FiMonitor} boxSize={8} />
                                </Box>
                                <Heading size="md" color="text">
                                    Multi-device
                                </Heading>
                                <Text color="subtext">
                                    Akses dari mana saja menggunakan smartphone,
                                    tablet, atau komputer Anda
                                </Text>
                            </VStack>

                            <VStack gap={4} align="center" textAlign="center">
                                <Box
                                    bg="warning.50"
                                    p={4}
                                    borderRadius="lg"
                                    color="warning.500"
                                >
                                    <Icon as={FiHeart} boxSize={8} />
                                </Box>
                                <Heading size="md" color="text">
                                    100% Gratis Selamanya
                                </Heading>
                                <Text color="subtext">
                                    Tidak ada biaya tersembunyi, tidak ada
                                    batasan fitur. Semua gratis untuk selamanya
                                </Text>
                            </VStack>
                        </SimpleGrid>
                    </VStack>
                </Container>
            </Box>

            {/* Final CTA Section */}
            <Box py={8} bg="brand.500">
                <Container maxW="container.lg" px={{ base: 4 }}>
                    <VStack gap={8} align="stretch" textAlign="center">
                        <Heading
                            size="xl"
                            color="white"
                            maxW="2xl"
                            lineHeight="1.3"
                        >
                            Mulai hari ini, buat keuangan keluarga lebih sehat.
                        </Heading>
                        <Text
                            fontSize='sm'
                            color="brand.100"
                            maxW="xl"
                        >
                            Bergabung dengan ribuan keluarga yang sudah
                            mempercayai Super Family untuk mengelola keuangan
                            mereka. Gratis selamanya!
                        </Text>
                        <Link href="/register">
                            <Button
                                colorPalette="orange"
                                size="xl"
                                w='full'
                                rounded='xl'
                            >
                                Gunakan Sekarang (Gratis)
                                <FiArrowRight />
                            </Button>
                        </Link>
                    </VStack>
                </Container>
            </Box>
        </Box>
    );
};

