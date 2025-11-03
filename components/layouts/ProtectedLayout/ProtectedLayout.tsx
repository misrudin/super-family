import { Box, IconButton } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { Header } from "./Partials";

interface ProtectedLayoutProps {
    children: React.ReactNode;
    isShowHeader?: boolean;
}

export const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children, isShowHeader = true }) => {
    return (
        <Box
            as="main"
            minH="100vh"
            bg="gray.100"
        >
            <Box maxW='lg' bg='white' shadow='xs' minH='100vh' mx='auto'>
                {isShowHeader && <Header />}
                <Box>
                    {children}
                </Box>
                <IconButton
                    aria-label="Tambah Transaksi"
                    size='xl'
                    rounded="full"
                    colorPalette='orange'
                    shadow='0 0 30px rgb(249 115 22 / 0.4)'
                    pos='fixed'
                    bottom={6}
                    right={6}
                    zIndex={1000}
                >
                    <FiPlus />
                </IconButton>
            </Box>
        </Box>
    );
};
