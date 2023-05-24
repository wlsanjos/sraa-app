import { z } from 'zod';

const CreateAccountDTO = z.object({
  name: z.string().min(5).trim(),
  passport: z.number().min(1),
  //login
  username: z.string().min(5).trim(),
  password: z.string().min(4),
  confirmPassword: z.string().min(4),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "As senhas não correspondem"
    });
  }
});

type CreateAccountDTOType = z.infer<typeof CreateAccountDTO>;

export { CreateAccountDTOType, CreateAccountDTO };