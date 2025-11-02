import { Box } from '@chakra-ui/react';
import { JSX, memo } from 'react';
import { HeroSection, Wrapper } from './Partials';

const Dashboard: React.FC = (): JSX.Element => {
    return (
        <Box>
            <HeroSection />
            <Wrapper />
        </Box>
    )
}

export default memo(Dashboard)