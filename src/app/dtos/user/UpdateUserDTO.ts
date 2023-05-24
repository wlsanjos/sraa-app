import { z } from 'zod';

export const UpdateUserDTO = z.object({
  name: z.string().min(5).trim(),
  surname: z.string().min(2).trim()
});

export type UpdateUserDTOType = z.infer<typeof UpdateUserDTO>;