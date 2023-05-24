import { z } from 'zod';

const IdParamsDTO = z.object({
  id: z.string(),
});

type IdParamsDTOType = z.infer<typeof IdParamsDTO>;

export { IdParamsDTO, IdParamsDTOType };