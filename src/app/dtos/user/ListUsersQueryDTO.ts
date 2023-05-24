import { z } from 'zod';

const ListUsersQueryDTO = z.object({
  role: z.string().optional(),
  status: z.string().optional(),
});

type ListUsersQueryType = z.infer<typeof ListUsersQueryDTO>;

export { ListUsersQueryDTO, ListUsersQueryType };
