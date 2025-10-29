import { Box } from '@chakra-ui/react';
import React from 'react';
import { Footer, Header } from './Partials';

interface PublicLayoutProps {
    children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    return (
        <Box
            as="main"
            minH="100vh"
            bg="gray.100"
        >
            <Box maxW='lg' bg='white' shadow='xs' minH='100vh' mx='auto'>
                <Header title="Super Family" subtitle="Kelola keuangan keluarga dengan mudah" />
                <Box>
                    {children}
                </Box>
                <Footer showLinks />
            </Box>
        </Box>
    );
};
