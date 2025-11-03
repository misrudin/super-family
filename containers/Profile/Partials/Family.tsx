import { Avatar, AvatarGroup, Box, HStack, Text } from '@chakra-ui/react';
import { JSX, memo } from 'react';
import { FiArrowRight } from 'react-icons/fi';

const Family: React.FC = (): JSX.Element => {
    return (
        <Box px='4'>
            <Box bg='bgCard' p='3' rounded='lg' boxShadow='sm'>
                <Text fontSize='sm' fontWeight='semibold'>Keluarga</Text>
                <HStack p='3' bg='orange.50'
                    justify='space-between'
                    align='center'
                    borderWidth='1px'
                    borderColor='orange.100'
                    rounded='md'
                    mt='2'
                    color="orange.600"
                    cursor='pointer'
                >
                    <Text fontWeight='medium' fontSize='sm'>Super Family</Text>
                    <FiArrowRight />
                </HStack>
                <HStack gap="4" overflowX='auto' py='2' mt='2'>
                    <AvatarGroup gap="0" spaceX="-3" size="lg" stacking="first-on-top">
                        <Avatar.Root colorPalette="pink">
                            <Avatar.Fallback name="Random" />
                            <Avatar.Image src="https://randomuser.me/api/portraits/men/70.jpg" />
                        </Avatar.Root>
                        <Avatar.Root colorPalette="green">
                            <Avatar.Fallback name="Random" />
                            <Avatar.Image src="https://randomuser.me/api/portraits/men/54.jpg" />
                        </Avatar.Root>
                        <Avatar.Root colorPalette="blue">
                            <Avatar.Fallback name="Random" />
                            <Avatar.Image src="https://randomuser.me/api/portraits/men/42.jpg" />
                        </Avatar.Root>
                        <Avatar.Root>
                            <Avatar.Fallback fontSize='xs'>+3</Avatar.Fallback>
                        </Avatar.Root>
                    </AvatarGroup>
                </HStack>
            </Box>
        </Box>
    )
}

export default memo(Family)