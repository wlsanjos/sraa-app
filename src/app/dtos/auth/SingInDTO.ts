import { z } from 'zod';

const LoginDTO = z.object({
  username: z.string().min(5),
  password: z.string().min(4).trim(),
});

type LoginDTOType = z.infer<typeof LoginDTO>;

export { LoginDTOType, LoginDTO };