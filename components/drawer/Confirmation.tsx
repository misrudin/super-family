import { IBasicModal } from "@/interfaces/IBasicModal";
import { Button, HStack } from "@chakra-ui/react";
import { JSX, memo } from "react";
import { BottomDrawer } from ".";

interface IConfirmationProps extends IBasicModal {
    title: string;
    children: React.ReactNode;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    danger?: boolean;
}

const Confirmation: React.FC<IConfirmationProps> = ({ title, children, onConfirm, isOpen, onClose, confirmText = "Konfirmasi", cancelText = "Batal", isLoading = false, danger = false }): JSX.Element => {
    return (
        <BottomDrawer
            title={title}
            isOpen={isOpen}
            onClose={onClose}
            footer={
                <HStack gap='4' justify='end'>
                    <Button colorPalette='gray' variant='subtle' onClick={onClose}>{cancelText}</Button>
                    <Button colorPalette={danger ? 'red' : 'orange'} variant='solid' onClick={onConfirm} loading={isLoading}>{confirmText}</Button>
                </HStack>
            }
        >
            {children}
        </BottomDrawer>
    )
}

export default memo(Confirmation);