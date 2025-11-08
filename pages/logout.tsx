import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { clearCookies } from '@/helpers/credentials';
import { logoutFromAPI } from '@/lib/api/account/account.api';
import { useAuth } from '@/providers/useAuth';
import { useMutation } from '@tanstack/react-query';

const Logout: NextPage = () => {
  const { token, resetProfile } = useAuth();
  const router = useRouter();
  const { mutate: logoutMutation } = useMutation({
    mutationFn: () => logoutFromAPI(),
    onSuccess: () => {
      resetAllCredentials();
    },
    onError: () => {
      resetAllCredentials();
    },
  });

  useEffect(() => {
    if (token) {
      logoutMutation()
    } else {
      resetAllCredentials();
    }
  }, []);

  const resetAllCredentials = async () => {
    resetProfile();
    clearCookies();
    router.push('/login');
  };

  return (
    <Box position="relative" h="100vh" bg="bg.footer">
      <Box
        position="relative"
        background="white"
        boxShadow="0px 6px 12px rgba(46, 67, 77, 0.2)"
        h="100vh"
      >
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%)"
          zIndex="9"
        >
          <Flex
            bg="bg.disabled"
            px="4"
            py="1"
            borderRadius="25px"
            align="center"
            justify="center"
          >
            <Spinner size="sm" color="blue.solid" />
            <Text ml="2" color="font.pencil">
              Processing logout...
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Logout;
