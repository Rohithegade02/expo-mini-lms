import z from "zod";

export const registerSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters').toLowerCase(),
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['ADMIN', 'USER']),
});

export const loginSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type RegisterData = z.infer<typeof registerSchema>;

