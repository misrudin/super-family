import { Box, VStack } from '@chakra-ui/react';
import { JSX, memo } from 'react';
import { FiBox, FiFileText, FiLock, FiLogOut, FiUser } from 'react-icons/fi';
import MenuItem from './MenuItem';

const Menu: React.FC = (): JSX.Element => {
    return (
        <Box px='4'>
            <VStack
                align='stretch'
                w='full'
                bg='bg'
                rounded='md'
                gap='0'
                py='2'
            >
                <MenuItem icon={<FiUser />} name="Pengaturan Akun" link="/item-1" />
                <MenuItem icon={<FiLock />} name="Ubah Password" link="/item-1" />
                <MenuItem icon={<FiBox />} name="Kategori Transaksi" link="/item-1" />
                <MenuItem icon={<FiFileText />} name="Laporan Transaksi" link="/item-1" />
                <MenuItem icon={<FiLogOut />} name="Keluar" link="/logout" color='red.500' />
            </VStack>
        </Box>
    )
}

export default memo(Menu)