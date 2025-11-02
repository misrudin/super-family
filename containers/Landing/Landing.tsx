import {
    Box,
    Button,
    Container,
    Flex,
    HStack,
    Heading,
    Icon,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import {
    FiCheckCircle,
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
            {/* Navbar */}
            <Box
                as="nav"
                bg="cardBg"
                borderBottomWidth="1px"
                borderColor="border"
                position="sticky"
                top={0}
                zIndex={1000}
                shadow="sm"
            >
                <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                    <Flex
                        h="70px"
                        align="center"
                        justify="space-between"
                        gap={4}
                    >
                        <Heading size="lg" color="primary">
                            Super Family
                        </Heading>

                        <HStack
                            display={{ base: 'none', md: 'flex' }}
                            gap={6}
                        >
                            <Text
                                as="a"
                                color="subtext"
                                _hover={{ color: 'primary' }}
                                cursor="pointer"
                                fontWeight="medium"
                            >
                                Features
                            </Text>
                            <Text
                                as="a"
                                color="subtext"
                                _hover={{ color: 'primary' }}
                                cursor="pointer"
                                fontWeight="medium"
                            >
                                How it Works
                            </Text>
                            <Text
                                as="a"
                                color="subtext"
                                _hover={{ color: 'primary' }}
                                cursor="pointer"
                                fontWeight="medium"
                            >
                                Testimonials
                            </Text>
                        </HStack>

                        <Link href="/register">
                            <Button colorPalette="blue" size="md">
                                Coba Gratis
                            </Button>
                        </Link>
                    </Flex>
                </Container>
            </Box>

            {/* Hero Section */}
            <Box py={{ base: 12, md: 20 }} bg="cardBg">
                <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                    <Flex
                        direction={{ base: 'column', lg: 'row' }}
                        align="center"
                        gap={12}
                    >
                        <VStack
                            flex={1}
                            align={{ base: 'center', lg: 'flex-start' }}
                            gap={6}
                            textAlign={{ base: 'center', lg: 'left' }}
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
                                    fontSize={{ base: 'lg', md: 'xl' }}
                                    color="subtext"
                                    maxW="600px"
                                >
                                    Pantau pemasukan & pengeluaran keluarga
                                    secara bersama-sama dalam satu aplikasi.
                                    Gratis tanpa batas fitur.
                                </Text>
                            </Box>

                            <HStack
                                gap={4}
                                flexWrap="wrap"
                                justify={{ base: 'center', lg: 'flex-start' }}
                            >
                                <Link href="/register">
                                    <Button
                                        colorPalette="blue"
                                        size="lg"
                                    >
                                        Coba Sekarang (Gratis)
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    colorPalette="blue"
                                >
                                    Lihat Demo
                                </Button>
                            </HStack>
                        </VStack>

                        <Box
                            flex={1}
                            maxW={{ base: '100%', lg: '500px' }}
                            w="full"
                        >
                            <Box
                                bgGradient="linear(to-br, brand.50, brand.100)"
                                borderRadius="2xl"
                                p={8}
                                position="relative"
                                overflow="hidden"
                            >
                                <Box
                                    as="img"
                                    w="100%"
                                    h="auto"
                                    borderRadius="lg"
                                    objectFit="cover"
                                />
                            </Box>
                        </Box>
                    </Flex>
                </Container>
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
                            columns={{ base: 1, md: 2, lg: 4 }}
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
                <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
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

                        <SimpleGrid
                            columns={{ base: 1, md: 2, lg: 4 }}
                            gap={8}
                            w="full"
                        >
                            {[
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
                                <VStack
                                    key={index}
                                    gap={4}
                                    align="center"
                                    textAlign="center"
                                    position="relative"
                                >
                                    <Box
                                        bg="brand.500"
                                        color="white"
                                        borderRadius="full"
                                        w={16}
                                        h={16}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        fontSize="xl"
                                        fontWeight="bold"
                                        mb={2}
                                    >
                                        {item.step}
                                    </Box>
                                    <Box
                                        bg="brand.50"
                                        p={4}
                                        borderRadius="lg"
                                        color="brand.600"
                                        mb={2}
                                    >
                                        <Icon as={item.icon} boxSize={6} />
                                    </Box>
                                    <Heading size="md" color="text">
                                        {item.title}
                                    </Heading>
                                    <Text color="subtext">
                                        {item.description}
                                    </Text>
                                </VStack>
                            ))}
                        </SimpleGrid>
                    </VStack>
                </Container>
            </Box>

            {/* Why Super Family Section */}
            <Box py={16} bg="bg">
                <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                    <VStack gap={12} align="center">
                        <Box textAlign="center" maxW="2xl">
                            <Heading size="xl" color="text" mb={4}>
                                Kenapa Super Family?
                            </Heading>
                        </Box>

                        <SimpleGrid
                            columns={{ base: 1, md: 3 }}
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

            {/* Testimonials Section */}
            <Box py={16} id="testimonials" bg="cardBg">
                <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                    <VStack gap={12} align="center">
                        <Box textAlign="center" maxW="2xl">
                            <Heading size="xl" color="text" mb={4}>
                                Kata Pengguna Super Family
                            </Heading>
                            <Text fontSize="lg" color="subtext">
                                Lihat bagaimana Super Family membantu keluarga
                                lainnya
                            </Text>
                        </Box>

                        <SimpleGrid
                            columns={{ base: 1, md: 3 }}
                            gap={6}
                            w="full"
                        >
                            {[
                                {
                                    name: 'Budi Santoso',
                                    role: 'Kepala Keluarga',
                                    quote:
                                        'Super Family sangat membantu kami mengatur keuangan. Yang paling penting, gratis dan mudah digunakan!',
                                },
                                {
                                    name: 'Siti Nurhaliza',
                                    role: 'Ibu Rumah Tangga',
                                    quote:
                                        'Sekarang semua anggota keluarga bisa ikut mencatat pengeluaran. Lebih transparan dan terorganisir.',
                                },
                                {
                                    name: 'Ahmad Hidayat',
                                    role: 'Ayah dari 2 anak',
                                    quote:
                                        'Laporan bulanan otomatisnya sangat membantu untuk evaluasi. Recommended banget!',
                                },
                            ].map((testimonial, index) => (
                                <Box
                                    key={index}
                                    bg="cardBg"
                                    p={6}
                                    borderRadius="lg"
                                    shadow="sm"
                                    borderWidth="1px"
                                    borderColor="border"
                                >
                                    <VStack align="flex-start" gap={4}>
                                        <HStack gap={2} color="warning.500">
                                            {[...Array(5)].map((_, i) => (
                                                <Icon
                                                    key={i}
                                                    as={FiCheckCircle}
                                                    boxSize={4}
                                                />
                                            ))}
                                        </HStack>
                                        <Text color="subtext" fontSize="sm">
                                            {testimonial.quote}
                                        </Text>
                                        <VStack align="flex-start" gap={1}>
                                            <Text
                                                fontWeight="semibold"
                                                color="text"
                                            >
                                                {testimonial.name}
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="subtext"
                                            >
                                                {testimonial.role}
                                            </Text>
                                        </VStack>
                                    </VStack>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </VStack>
                </Container>
            </Box>

            {/* Final CTA Section */}
            <Box py={20} bg="brand.500">
                <Container maxW="container.lg" px={{ base: 4, md: 6 }}>
                    <VStack gap={8} align="center" textAlign="center">
                        <Heading
                            size="xl"
                            color="white"
                            maxW="2xl"
                            lineHeight="1.3"
                        >
                            Mulai hari ini, buat keuangan keluarga lebih sehat.
                        </Heading>
                        <Text
                            fontSize={{ base: 'lg', md: 'xl' }}
                            color="brand.100"
                            maxW="xl"
                        >
                            Bergabung dengan ribuan keluarga yang sudah
                            mempercayai Super Family untuk mengelola keuangan
                            mereka. Gratis selamanya!
                        </Text>
                        <Link href="/register">
                            <Button
                                colorPalette="white"
                                size="lg"
                            >
                                Gunakan Sekarang (Gratis)
                            </Button>
                        </Link>
                    </VStack>
                </Container>
            </Box>

            {/* Footer */}
            <Box py={8} bg="cardBg" borderTopWidth="1px" borderColor="border">
                <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                    <Flex
                        direction={{ base: 'column', md: 'row' }}
                        align="center"
                        justify="space-between"
                        gap={4}
                    >
                        <Text color="subtext" fontSize="sm">
                            © Super Family 2025
                        </Text>
                        <HStack gap={6}>
                            <Text
                                as="a"
                                color="subtext"
                                fontSize="sm"
                                _hover={{ color: 'primary' }}
                                cursor="pointer"
                            >
                                Features
                            </Text>
                            <Text
                                as="a"
                                color="subtext"
                                fontSize="sm"
                                _hover={{ color: 'primary' }}
                                cursor="pointer"
                            >
                                How it Works
                            </Text>
                            <Text
                                as="a"
                                color="subtext"
                                fontSize="sm"
                                _hover={{ color: 'primary' }}
                                cursor="pointer"
                            >
                                Testimonials
                            </Text>
                        </HStack>
                    </Flex>
                </Container>
            </Box>
        </Box>
    );
};

