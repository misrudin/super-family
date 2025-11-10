import { IUser } from '@/interfaces/IUser';
import { getFamilyDetailFromAPI } from '@/lib/api/families/families.api';
import { useAuth } from '@/providers/useAuth';
import { Avatar, AvatarGroup, Box, Button, EmptyState, HStack, Skeleton, SkeletonCircle, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { JSX, memo } from 'react';
import { FaUsers } from 'react-icons/fa6';
import { FiArrowRight } from 'react-icons/fi';
import ModalFamily from './ModalFamily';

const Family: React.FC = (): JSX.Element => {
    const { profile } = useAuth()
    const { open: isOpenModalFamily, onOpen: onOpenModalFamily, onClose: onCloseModalFamily } = useDisclosure()


    const { data: familyDetail, isLoading: loadingFamilyDetail } = useQuery({
        queryKey: ['family-detail', profile?.family?.id],
        queryFn: () => getFamilyDetailFromAPI({ id: profile?.family?.id }),
        enabled: !!profile?.family?.id,
        select: (data) => data.data?.data || null,
    })

    return (
        <Box px='4'>
            <Box bg='bgCard' p='3' rounded='lg' boxShadow='sm'>
                <Text fontSize='sm' fontWeight='semibold'>Keluarga</Text>

                {
                    loadingFamilyDetail && (
                        <Stack gap="2" maxW="xs" mt='2'>
                            <Skeleton height="50px" />
                            <HStack width="full">
                                <SkeletonCircle size="10" />
                                <SkeletonCircle size="10" />
                                <SkeletonCircle size="10" />
                                <SkeletonCircle size="10" />
                                <SkeletonCircle size="10" />
                            </HStack>
                        </Stack>
                    )
                }

                {
                    !loadingFamilyDetail && !familyDetail && (
                        <EmptyState.Root>
                            <EmptyState.Content>
                                <EmptyState.Indicator>
                                    <FaUsers />
                                </EmptyState.Indicator>
                                <VStack textAlign="center">
                                    <EmptyState.Title>Belum ada keluarga</EmptyState.Title>
                                    <EmptyState.Description>
                                        Mulai membuat keluarga baru untuk memudahkan pengelolaan keuangan keluarga.
                                    </EmptyState.Description>
                                </VStack>
                                <Button colorPalette='orange' variant='surface' onClick={onOpenModalFamily}>Buat Keluarga</Button>
                            </EmptyState.Content>
                        </EmptyState.Root>
                    )
                }

                {
                    !loadingFamilyDetail && !!familyDetail && (
                        <>
                            <HStack p='3' bg='orange.50'
                                justify='space-between'
                                align='center'
                                borderWidth='1px'
                                borderColor='orange.100'
                                rounded='md'
                                mt='2'
                                color="orange.600"
                                cursor='pointer'
                                onClick={onOpenModalFamily}
                            >
                                <Text fontWeight='medium' fontSize='sm'>{familyDetail?.name}</Text>
                                <FiArrowRight />
                            </HStack>
                            <HStack gap="4" overflowX='auto' py='2' mt='2'>
                                <AvatarGroup gap="0" spaceX="-3" size="lg" stacking="first-on-top">
                                    {familyDetail?.members.slice(0, 5).map((member: IUser) => (
                                        <Avatar.Root key={member.id} colorPalette={member.role === 'admin' ? 'pink' : 'green'}>
                                            <Avatar.Fallback name={member.name} />
                                        </Avatar.Root>
                                    ))}
                                    {
                                        familyDetail?.members.length > 5 && (
                                            <Avatar.Root>
                                                <Avatar.Fallback fontSize='xs'>+{familyDetail?.members.length - 5}</Avatar.Fallback>
                                            </Avatar.Root>
                                        )
                                    }
                                </AvatarGroup>
                            </HStack>
                        </>
                    )
                }
            </Box>

            <ModalFamily
                isOpen={isOpenModalFamily}
                onClose={onCloseModalFamily}
                selected={profile?.family}
            />
        </Box>
    )
}

export default memo(Family)