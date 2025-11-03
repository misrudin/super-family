import { Avatar, Box, Button, ButtonGroup, defineStyle, EmptyState, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { JSX, memo } from 'react';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { HiColorSwatch } from 'react-icons/hi';

const ringCss = defineStyle({
    outlineWidth: "2px",
    outlineColor: "colorPalette.500",
    outlineOffset: "2px",
    outlineStyle: "solid",
})


const Wrapper: React.FC = (): JSX.Element => {
    return (
        <Box
            roundedTop='xl'
            bg="white"
            boxShadow="0 -4px 5px rgba(0,0,0,0.06)"
            backdropFilter='blur(10px)  '
            mt='-40px'
            py='4'
        >
            <Box>
                <HStack gap="4" px='4' overflowX='auto' py='2'>
                    <Avatar.Root css={ringCss} colorPalette="pink">
                        <Avatar.Fallback name="Random" />
                        <Avatar.Image src="https://randomuser.me/api/portraits/men/70.jpg" />
                    </Avatar.Root>
                    <Avatar.Root css={ringCss} colorPalette="green">
                        <Avatar.Fallback name="Random" />
                        <Avatar.Image src="https://randomuser.me/api/portraits/men/54.jpg" />
                    </Avatar.Root>
                    <Avatar.Root css={ringCss} colorPalette="blue">
                        <Avatar.Fallback name="Random" />
                        <Avatar.Image src="https://randomuser.me/api/portraits/men/42.jpg" />
                    </Avatar.Root>
                </HStack>
            </Box>
            <Box px='4' mt='3'>
                <EmptyState.Root>
                    <EmptyState.Content>
                        <EmptyState.Indicator>
                            <HiColorSwatch />
                        </EmptyState.Indicator>
                        <VStack textAlign="center">
                            <EmptyState.Title>Belum ada transaksi</EmptyState.Title>
                            <EmptyState.Description>
                                Mulai catatan keuanganmu dengan membuat transaksi baru.
                            </EmptyState.Description>
                        </VStack>
                        <ButtonGroup>
                            <Button colorPalette='orange' variant='surface'>Tambah Transaksi</Button>
                        </ButtonGroup>
                    </EmptyState.Content>
                </EmptyState.Root>
                <VStack gap="4">
                    <HStack gap='1' align='start' w="full" p="3" rounded="md" borderWidth='1px' borderColor='border'>
                        <Flex boxSize='30px' borderWidth='1px'
                            borderColor='border'
                            rounded='full' align='center'
                            justify='center' mr='2' color='red.500'>
                            <FiArrowDown />
                        </Flex>
                        <Box flex='1'>
                            <HStack justify='space-between' align='center'>
                                <Text fontSize='xs' color='gray.500'>20 Des 2025, 09:00</Text>
                                <Text fontSize='sm' fontWeight='semibold' color='red.500'>-Rp150.000</Text>
                            </HStack>
                            <Text fontSize='sm' fontWeight='semibold'>Belanja Bulanan</Text>
                            <Text fontSize='xs' color='gray.500'>Beli sayur</Text>
                        </Box>
                    </HStack>

                    <HStack gap='1' align='start' w="full" p="3" rounded="md" borderWidth='1px' borderColor='border'>
                        <Flex boxSize='30px' borderWidth='1px'
                            borderColor='border'
                            rounded='full' align='center'
                            justify='center' mr='2' color='green'>
                            <FiArrowUp />
                        </Flex>
                        <Box flex='1'>
                            <HStack justify='space-between' align='center'>
                                <Text fontSize='xs' color='gray.500'>20 Des 2025, 09:00</Text>
                                <Text fontSize='sm' fontWeight='semibold' color='green.500'>+Rp10.000.000</Text>
                            </HStack>
                            <Text fontSize='sm' fontWeight='semibold'>Belanja Bulanan</Text>
                            <Text fontSize='xs' color='gray.500'>Beli sayur</Text>
                        </Box>
                    </HStack>
                </VStack>
            </Box>
        </Box>
    )
}

export default memo(Wrapper)