import { z } from 'zod';

export const CreateUserDTO = z.object({
  name: z.string().min(5).trim(),
  passport: z.number().min(1),
  surname: z.string().min(2).trim()
});

export type CreateUserDTOType = z.infer<typeof CreateUserDTO>;