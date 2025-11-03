import { Avatar, Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { JSX, memo } from 'react';
import { BsGearFill } from 'react-icons/bs';
import { FiMail, FiPhone } from 'react-icons/fi';

const Account: React.FC = (): JSX.Element => {
    return (
        <Box px='4'>
            <HStack
                justify='space-between'
                align='start'
            >
                <HStack align='start'>
                    <Avatar.Root colorPalette='orange' size='2xl' rounded='sm'>
                        <Avatar.Fallback name="Eka Nurcahyati" />
                    </Avatar.Root>
                    <Box>
                        <Text fontSize='sm' fontWeight='semibold'>Eka Nurcahyati</Text>
                        <VStack mt='1' gap='1' align='stretch'>
                            <HStack align='center' color='gray.600' gap='2' fontSize='xs'>
                                <FiMail />
                                <Text fontSize='xs'>ekanurcahyati@gmail.com</Text>
                            </HStack>
                            <HStack align='center' color='gray.600' gap='2' fontSize='xs'>
                                <FiPhone />
                                <Text fontSize='xs'>62 812-3456-7890</Text>
                            </HStack>
                        </VStack>
                    </Box>
                </HStack>
                <IconButton rounded='full' colorPalette="orange" variant="surface" size='xs'>
                    <BsGearFill />
                </IconButton>
            </HStack>
        </Box>
    )
}

export default memo(Account)