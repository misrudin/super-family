import { PasswordInput } from "@/components/ui/password-input";
import { registerSchema } from "@/validations/users";
import { Box, Button, Field, Fieldset, HStack, Input, InputGroup, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FiLock, FiMail, FiPhone, FiUser } from "react-icons/fi";
import { z } from "zod";


type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirm_password: "",
        },
        mode: "all",
    });

    const { mutate: registerMutation } = useMutation({
        mutationFn: async (values: RegisterFormValues) => {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
        },
        onSuccess: (response) => {
            console.log(response);
        },
        onError: (error) => {
            console.error("Register error:", error);
        },
    });

    const onSubmit = async (values: RegisterFormValues) => {
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const result = await response.json();

            if (!response.ok || !result?.success) {
                throw new Error(result?.error || result?.message || "Pendaftaran gagal");
            }

            reset();
        } catch (error) {
            console.error("Register error:", error);
        }
    };

    return (
        <Fieldset.Root size="lg" px='4' py='4'>
            <Stack>
                <Fieldset.Legend mt='2' fontSize='2xl' fontWeight='bold'>Daftar</Fieldset.Legend>
                <Fieldset.HelperText>
                    Dengan mendaftar, kamu menyetujui <strong>syarat & ketentuan</strong> yang berlaku.
                </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
                <Field.Root>
                    <Field.Label>Nama Lengkap</Field.Label>
                    <InputGroup startElement={<FiUser />}>
                        <Input rounded='xl' size='xl' name="name" type="text" placeholder='Masukan nama lengkap kamu' _placeholder={{ fontSize: 'sm' }} />
                    </InputGroup>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <InputGroup startElement={<FiMail />}>
                        <Input rounded='xl' size='xl' name="email" type="email" placeholder='Masukan email kamu' _placeholder={{ fontSize: 'sm' }} />
                    </InputGroup>
                </Field.Root>

                <Field.Root>
                    <Field.Label>No. Telepon</Field.Label>
                    <InputGroup startElement={<FiPhone />}>
                        <Input rounded='xl' size='xl' name="phone" type="tel" placeholder='Masukan nomor telepon kamu' _placeholder={{ fontSize: 'sm' }} />
                    </InputGroup>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Password</Field.Label>
                    <InputGroup startElement={<FiLock />}>
                        <PasswordInput rounded='xl' name="password" type="password" size='xl' placeholder='Masukan password kamu' _placeholder={{ fontSize: 'sm' }} />
                    </InputGroup>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Konfirmasi Password</Field.Label>
                    <InputGroup startElement={<FiLock />}>
                        <PasswordInput rounded='xl' name="confirm_password" type="password" size='xl' placeholder='Masukan konfirmasi password kamu' _placeholder={{ fontSize: 'sm' }} />
                    </InputGroup>
                </Field.Root>
            </Fieldset.Content>

            <Button rounded='xl' type="submit" w='full' mt='6' size='xl' variant='solid' colorPalette='orange'>
                Daftar
            </Button>

            <HStack justify='center' mt='4' gap='0'>
                <Text fontSize='sm'>
                    Sudah punya akun? <Link href='/login'>
                        <Text as='span' color='orange.500' _hover={{ textDecor: 'underline' }}>Masuk disini</Text>
                    </Link>
                </Text>
            </HStack>

            <HStack justify='center' mt='4' gap='2' align='center'>
                <Box h='1px' w='full' bg='border' />
                <Text fontSize='xs' color='gray.500'>Atau</Text>
                <Box h='1px' w='full' bg='border' />
            </HStack>

            <Button rounded='xl' w='full' fontSize='sm' fontWeight='medium' mt='6' size='xl' variant='outline'>
                <FcGoogle /> Daftar dengan Google
            </Button>
        </Fieldset.Root>
    )
}

export default Register;