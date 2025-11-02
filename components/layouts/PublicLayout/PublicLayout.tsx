import { Box } from '@chakra-ui/react';
import React from 'react';
import { Footer, Header } from './Partials';

interface PublicLayoutProps {
    children: React.ReactNode;
    isShowHeader?: boolean;
    isShowFooter?: boolean;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children, isShowHeader = true, isShowFooter = true }) => {
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
                {isShowFooter && <Footer showLinks />}
            </Box>
        </Box>
    );
};
