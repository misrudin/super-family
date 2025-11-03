import { Box, Spacer } from '@chakra-ui/react';
import { JSX, memo } from 'react';
import { Account, Family, Menu } from './Partials';

const Profile: React.FC = (): JSX.Element => {
    return (
        <Box py='4'>
            <Account />
            <Spacer h='6' />
            <Family />
            <Spacer h='6' />
            <Menu />
        </Box>
    )
}

export default memo(Profile)