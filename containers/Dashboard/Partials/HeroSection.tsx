import { Avatar, Box, Button, HStack, Spacer, Text } from '@chakra-ui/react';
import { JSX, memo } from 'react';
import { FiCalendar } from 'react-icons/fi';
import WaveCard from './WaveCard';

const HeroSection: React.FC = (): JSX.Element => {
    return (
        <Box
            bg='cardBg'
            p={4}
            bgImage="url('/images/bg-dashboard.jpg')"
            bgRepeat='no-repeat'
            bgSize='cover'
            pos='sticky'
            top='0'
            pb='55px'
        >
            <HStack justify='space-between' align='center' rounded='xl'
                bg='rgba(255, 255, 255, 0.6)'
                p={4}
                boxShadow="0 2px 5px rgba(0,0,0,0.05)"
                borderWidth='1px'
                borderColor='rgba(255, 255, 255, 0.25)'
                backdropFilter='blur(10px)'
            >
                <HStack>
                    <Avatar.Root colorPalette='orange' size='xl'>
                        <Avatar.Fallback name="Eka Nurcahyati" />
                    </Avatar.Root>
                    <Box>
                        <Text fontSize='sm' fontWeight='semibold'>Eka Nurcahyati</Text>
                        <Text fontSize='xs' color='gray.500'>Super Family</Text>
                    </Box>
                </HStack>
                <Button rounded='full' colorPalette="orange" variant="surface" size='xs'>
                    <FiCalendar /> Dec 2025
                </Button>
            </HStack>
            <Spacer h='4' />
            <WaveCard />
        </Box>
    )
}

export default memo(HeroSection)