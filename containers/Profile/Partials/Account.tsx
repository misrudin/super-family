import { useAuth } from '@/providers/useAuth';
import { Avatar, Box, HStack, Text, VStack } from '@chakra-ui/react';
import { JSX, memo } from 'react';
import { FiMail, FiPhone } from 'react-icons/fi';

const Account: React.FC = (): JSX.Element => {
    const { profile } = useAuth()

    const phoneNumber = profile?.phone ? `+62 ${profile?.phone.replace(/^0/, '')}` : '-';
    return (
        <Box px='4'>
            <HStack
                justify='space-between'
                align='start'
            >
                <HStack align='start'>
                    <Avatar.Root colorPalette='orange' size='2xl' rounded='sm'>
                        <Avatar.Fallback name={profile?.name || ''} />
                    </Avatar.Root>
                    <Box>
                        <Text fontSize='sm' fontWeight='semibold'>{profile?.name}</Text>
                        <VStack mt='1' gap='1' align='stretch'>
                            <HStack align='center' color='gray.600' gap='2' fontSize='xs'>
                                <FiMail />
                                <Text fontSize='xs'>{profile?.email || ''}</Text>
                            </HStack>
                            <HStack align='center' color='gray.600' gap='2' fontSize='xs'>
                                <FiPhone />
                                <Text fontSize='xs'>{phoneNumber}</Text>
                            </HStack>
                        </VStack>
                    </Box>
                </HStack>
            </HStack>
        </Box>
    )
}

export default memo(Account)