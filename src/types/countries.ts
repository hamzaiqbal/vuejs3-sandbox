import { z } from 'zod'

export const countriesSchema = z.record(z.string())

export type Countries = z.infer<typeof countriesSchema>
