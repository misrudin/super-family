import { ColorModeButton } from "@/components/ui/color-mode";
import { Box, HStack, Image } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Box
      bg='cardBg'
      px={4}
      borderBottomWidth='1px'
      position='sticky'
      top={0}
      zIndex={100}
      w='full'
      h='60px'
    >
      <HStack h='full' align='center' justify='space-between'>
        <Image src='/next.svg' alt='Super Family' width={100} objectFit='contain' />
        <HStack>
          <ColorModeButton />
        </HStack>
      </HStack>
    </Box>
  )
}
