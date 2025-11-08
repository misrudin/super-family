import { CloseButton, Drawer, DrawerRootProps, Portal } from "@chakra-ui/react";
import { FC } from "react";

interface IBottomDrawerProps extends DrawerRootProps {
    title: string;
    onClose: () => void;
    isOpen: boolean;
    footer?: React.ReactNode;
}

const BottomDrawer: FC<IBottomDrawerProps> = ({ title, children, onClose, isOpen, footer, ...props }) => {
    return (
        <Drawer.Root placement='bottom' {...props} open={isOpen} onOpenChange={onClose}>
            <Portal>
                <Drawer.Backdrop maxW='lg' transform='translateX(-50%)' left='50%' />
                <Drawer.Positioner>
                    <Drawer.Content
                        roundedTop='lg'
                        bg='cardBg'
                        maxW='lg'
                        mx='auto'
                    >
                        <Drawer.Header px='4'>
                            <Drawer.Title>{title}</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body px='4'>
                            {children}
                        </Drawer.Body>
                        {footer && <Drawer.Footer px='4' pt='4'>{footer}</Drawer.Footer>}
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}

export default BottomDrawer;