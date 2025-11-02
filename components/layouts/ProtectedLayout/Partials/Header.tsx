import { Box, HStack, IconButton, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { JSX, memo } from 'react';
import { FiChevronLeft } from 'react-icons/fi';

const Header: React.FC = (): JSX.Element => {
    const router = useRouter();
    return (
        <Box
            bg='cardBg'
            px={4}
            borderBottomWidth='1px'
            position='sticky'
            top={0}
            zIndex={100}
            w='full'
            h='60px'
        >
            <HStack h='full' align='center' justify='space-between'>
                <Box flex='0.5'>
                    <IconButton onClick={router.back} aria-label="Back" variant='subtle'>
                        <FiChevronLeft />
                    </IconButton>
                </Box>
                <Image src='/next.svg' alt='Super Family' width={100} objectFit='contain' />
                <Box flex='0.5' />
            </HStack>
        </Box>
    )
}

export default memo(Header)