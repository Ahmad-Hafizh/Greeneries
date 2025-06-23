import z from 'zod';

export const signupSchema = z.object({
  name: z.string().min(4, { message: 'must be more than 4 characters' }).max(150, { message: 'must be less than 150 characters' }),
  email: z.string().email({ message: 'email is not correct' }),
});

export const signInSchema = z.object({
  email: z.string().email({ message: 'email is not correct' }),
  password: z
    .string()
    .min(8, { message: 'Must be more than 8 character' })
    .max(50, { message: 'must be less than 50 character' })
    .regex(/^(?=.*[a-z])/, {
      message: 'Must contain at least one lowercase letter',
    })
    .regex(/^(?=.*[A-Z])/, {
      message: 'Must contain at least one uppercase letter',
    })
    .regex(/^(?=.*[0-9])/, {
      message: 'Must contain at least one number',
    }),
});

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Must be more than 8 character' })
    .max(50, { message: 'must be less than 50 character' })
    .regex(/^(?=.*[a-z])/, {
      message: 'Must contain at least one lowercase letter',
    })
    .regex(/^(?=.*[A-Z])/, {
      message: 'Must contain at least one uppercase letter',
    })
    .regex(/^(?=.*[0-9])/, {
      message: 'Must contain at least one number',
    }),
  confirmPassword: z.string(),
});
