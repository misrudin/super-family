import { Box, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';

interface FooterProps {
  showLinks?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ showLinks = true }) => {
  return (
    <Box mt={8} pt={6} borderTopWidth="1px" borderColor="gray.200">
      <Text
        textAlign="center"
        color="gray.500"
        fontSize="sm"
        mb={showLinks ? 4 : 0}
      >
        © {new Date().getFullYear()} Super Family. All rights reserved.
      </Text>

      {showLinks && (
        <Flex
          gap={4}
          justify="center"
          fontSize="sm"
        >
          <Link color="blue.500" href="/privacy">
            Privacy Policy
          </Link>
          <Link color="blue.500" href="/terms">
            Terms of Service
          </Link>
        </Flex>
      )}
    </Box>
  );
};
