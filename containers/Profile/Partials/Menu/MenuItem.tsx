import { HStack, StackProps, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { JSX, memo, ReactNode } from 'react';
import { FiChevronRight } from 'react-icons/fi';

interface IProps extends StackProps {
    icon: ReactNode
    name: string
    link?: string
    onClick?: () => void
}
const MenuItem: React.FC<IProps> = ({ icon, name, link, onClick, ...props }): JSX.Element => {
    return (
        <Link href={link || '#'}>
            <HStack cursor='pointer' px='4' py='3'
                _hover={{
                    color: 'orange.500'
                }}
                justify='space-between' align='center' w='full' onClick={onClick}
                {...props}>
                {icon}
                <Text flex='1' fontSize='sm'>{name}</Text>
                <FiChevronRight />
            </HStack>
        </Link>
    )
}

export default memo(MenuItem)