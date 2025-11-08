import { PasswordInput } from '@/components/ui/password-input';
import { Box, Button, Field, Fieldset, HStack, Input, InputGroup, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { JSX, memo } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiLock, FiMail } from 'react-icons/fi';
import { useAction } from './Login.action';

const Login = (): JSX.Element => {
    const { register, handleSubmit, errors, onSubmit, isDirty, isValid, loadingSubmit } = useAction();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset.Root size="lg" px='4' py='4'>
                <Stack>
                    <Fieldset.Legend mt='2' fontSize='2xl' fontWeight='bold'>Masuk</Fieldset.Legend>
                    <Fieldset.HelperText>
                        Dengan masuk, kamu menyetujui <strong>syarat & ketentuan</strong> yang berlaku.
                    </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                    <Field.Root invalid={!!errors.email}>
                        <Field.Label>Email</Field.Label>
                        <InputGroup startElement={<FiMail />}>
                            <Input {...register("email")} rounded='xl' size='xl' name="email" type="email" placeholder='Masukan email kamu' _placeholder={{ fontSize: 'sm' }} />
                        </InputGroup>
                        <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.password}>
                        <Field.Label>Password</Field.Label>
                        <InputGroup startElement={<FiLock />}>
                            <PasswordInput {...register("password")} rounded='xl' name="password" type="password" size='xl' placeholder='Masukan password kamu' _placeholder={{ fontSize: 'sm' }} />
                        </InputGroup>
                        <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                    </Field.Root>
                </Fieldset.Content>

                <Button rounded='xl' type="submit" w='full' mt='6' size='xl' variant='solid' colorPalette='orange'
                    loading={loadingSubmit}
                    disabled={!(isDirty || isValid)}
                >
                    Masuk
                </Button>

                <HStack justify='center' mt='4' gap='0'>
                    <Text fontSize='sm'>
                        Belum punya akun? <Link href='/register'>
                            <Text as='span' color='orange.500' _hover={{ textDecor: 'underline' }}>Daftar disini</Text>
                        </Link>
                    </Text>
                </HStack>

                <HStack justify='center' mt='4' gap='2' align='center'>
                    <Box h='1px' w='full' bg='border' />
                    <Text fontSize='xs' color='gray.500'>Atau</Text>
                    <Box h='1px' w='full' bg='border' />
                </HStack>

                <Button rounded='xl' w='full' fontSize='sm' fontWeight='medium' mt='6' size='xl' variant='outline'>
                    <FcGoogle /> Masuk dengan Google
                </Button>
            </Fieldset.Root>
        </form>
    )
}

export default memo(Login)