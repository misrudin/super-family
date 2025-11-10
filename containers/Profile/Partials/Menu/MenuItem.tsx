import { HStack, StackProps, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { JSX, memo, ReactNode } from 'react';
import { FiChevronRight } from 'react-icons/fi';

interface IProps extends StackProps {
    icon: ReactNode
    name: string
    link?: string
    onClick?: () => void
    color?: string
}
const MenuItem: React.FC<IProps> = ({ icon, name, link, onClick, color, ...props }): JSX.Element => {
    const content = (
        <HStack 
            cursor='pointer' 
            px='4' 
            py='3'
            _hover={{
                color: color || 'orange.500'
            }}
            justify='space-between' 
            align='center' 
            w='full' 
            onClick={onClick}
            color={color}
            {...props}
        >
            {icon}
            <Text flex='1' fontSize='sm'>{name}</Text>
            <FiChevronRight />
        </HStack>
    );

    if (link && !onClick) {
        return (
            <Link href={link}>
                {content}
            </Link>
        );
    }

    return content;
}

export default memo(MenuItem)