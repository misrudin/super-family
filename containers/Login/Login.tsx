import { PasswordInput } from '@/components/ui/password-input';
import { loginSchema } from '@/validations/users';
import { Box, Button, Field, Fieldset, HStack, Input, InputGroup, Stack, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { JSX, memo } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { FiLock, FiMail } from 'react-icons/fi';
import z from 'zod';

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = (): JSX.Element => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "all",
    });


    return (
        <Fieldset.Root size="lg" px='4' py='4'>
            <Stack>
                <Fieldset.Legend mt='2' fontSize='2xl' fontWeight='bold'>Masuk</Fieldset.Legend>
                <Fieldset.HelperText>
                    Dengan masuk, kamu menyetujui <strong>syarat & ketentuan</strong> yang berlaku.
                </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
                <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <InputGroup startElement={<FiMail />}>
                        <Input rounded='xl' size='xl' name="email" type="email" placeholder='Masukan email kamu' _placeholder={{ fontSize: 'sm' }} />
                    </InputGroup>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Password</Field.Label>
                    <InputGroup startElement={<FiLock />}>
                        <PasswordInput rounded='xl' name="password" type="password" size='xl' placeholder='Masukan password kamu' _placeholder={{ fontSize: 'sm' }} />
                    </InputGroup>
                </Field.Root>
            </Fieldset.Content>

            <Button rounded='xl' type="submit" w='full' mt='6' size='xl' variant='solid' colorPalette='orange'>
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
    )
}

export default memo(Login)