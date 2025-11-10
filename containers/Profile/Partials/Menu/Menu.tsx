import { Box, VStack } from '@chakra-ui/react';
import { JSX, memo, useState } from 'react';
import { FiBox, FiFileText, FiLock, FiLogOut, FiUser } from 'react-icons/fi';
import ModalChangePassword from '../ModalChangePassword';
import ModalUpdateProfile from '../ModalUpdateProfile';
import MenuItem from './MenuItem';

const Menu: React.FC = (): JSX.Element => {
    const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    return (
        <>
            <Box px='4'>
                <VStack
                    align='stretch'
                    w='full'
                    bg='bg'
                    rounded='md'
                    gap='0'
                    py='2'
                >
                    <MenuItem
                        icon={<FiUser />}
                        name="Pengaturan Akun"
                        onClick={() => setIsUpdateProfileOpen(true)}
                    />
                    <MenuItem
                        icon={<FiLock />}
                        name="Ubah Password"
                        onClick={() => setIsChangePasswordOpen(true)}
                    />
                    <MenuItem icon={<FiBox />} name="Kategori Transaksi" link="/categories" />
                    <MenuItem icon={<FiFileText />} name="Laporan Transaksi" link="/transaction" />
                    <MenuItem icon={<FiLogOut />} name="Keluar" link="/logout" color='red.500' />
                </VStack>
            </Box>

            <ModalUpdateProfile
                isOpen={isUpdateProfileOpen}
                onClose={() => setIsUpdateProfileOpen(false)}
            />

            <ModalChangePassword
                isOpen={isChangePasswordOpen}
                onClose={() => setIsChangePasswordOpen(false)}
            />
        </>
    )
}

export default memo(Menu)