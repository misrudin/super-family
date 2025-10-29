import { registerSchema } from "@/validations/users";
import { Box, Button, Container, HStack, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
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
        <Container maxW='lg' px='4' py='8'>
            <VStack gap={6} align="stretch">
                <Heading size="md" color="gray.800">
                    Daftar Super Family
                </Heading>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <VStack align="stretch" gap={4}>
                        <Box>
                            <Text mb={1}>Nama Lengkap</Text>
                            <Input placeholder="Nama lengkap" {...register("name")} />
                            {errors.name && (
                                <Text color="red.500" fontSize="sm" mt={1}>{errors.name.message}</Text>
                            )}
                        </Box>

                        <Box>
                            <Text mb={1}>Email</Text>
                            <Input type="email" placeholder="email@contoh.com" {...register("email")} />
                            {errors.email && (
                                <Text color="red.500" fontSize="sm" mt={1}>{errors.email.message}</Text>
                            )}
                        </Box>

                        <Box>
                            <Text mb={1}>No. HP (opsional)</Text>
                            <Input type="tel" placeholder="08xxxxxxxxxx" {...register("phone")} />
                            {errors.phone && (
                                <Text color="red.500" fontSize="sm" mt={1}>{errors.phone.message}</Text>
                            )}
                        </Box>

                        <Box>
                            <Text mb={1}>Password</Text>
                            <Input type="password" placeholder="Minimal 6 karakter" {...register("password")} />
                            {errors.password && (
                                <Text color="red.500" fontSize="sm" mt={1}>{errors.password.message}</Text>
                            )}
                        </Box>

                        <Box>
                            <Text mb={1}>Konfirmasi Password</Text>
                            <Input type="password" placeholder="Ulangi password" {...register("confirm_password")} />
                            {errors.confirm_password && (
                                <Text color="red.500" fontSize="sm" mt={1}>{errors.confirm_password.message}</Text>
                            )}
                        </Box>

                        <Button type="submit" colorScheme="blue" loading={isSubmitting} loadingText="Mendaftar">
                            Daftar
                        </Button>

                        <Box borderTopWidth="1px" borderColor="gray.200" />

                        <HStack justify="center">
                            <Text fontSize="sm" color="gray.600">
                                Sudah punya akun?
                            </Text>
                            <Button variant="plain" colorScheme="blue" size="sm">
                                Masuk di sini
                            </Button>
                        </HStack>
                    </VStack>
                </form>
            </VStack>
        </Container>
    )
}

export default Register;