import { z } from 'zod'

export const JobTypeSchema = z.enum([
  'frontendDeveloper',
  'backendDeveloper',
  'uxDesigner',
  'uiDesigner',
  'productDesigner',
  'uxResearcher',
  'productOwner',
  'productManager',
])

export type JobType = z.infer<typeof JobTypeSchema>

export const JobSchema = z.object({
  id: z.string(),
  type: JobTypeSchema,
  company: z.string(),
  location: z.string(),
  contact: z.string(),
  description: z.string(),
  skills: z.array(z.string()),
  date: z.coerce.date(),
  active: z.boolean(),
  experience: z.number(),
})

export const JobsSchema = z.array(JobSchema)

export type Job = z.infer<typeof JobSchema>
export type Jobs = z.infer<typeof JobsSchema>

export const JobSearchSchema = z
  .object({
    types: z.array(JobTypeSchema).min(1, 'Select at least one job type'),
    location: z.string().optional(),
    active: z.boolean(),
    experienceMin: z.number().min(0).max(9),
    experienceMax: z.number().min(1).max(10),
  })
  .superRefine(({ experienceMin, experienceMax }, ctx) => {
    if (experienceMin > experienceMax) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must be lower than max years of experience',
        path: ['experienceMin'],
      })
    }

    if (experienceMax < experienceMin) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must be greater than min years of experience',
        path: ['experienceMax'],
      })
    }
  })

export type JobSearch = z.infer<typeof JobSearchSchema>

export const jobSearchDefault: JobSearch = {
  types: JobTypeSchema.options,
  location: 'FR',
  active: true,
  experienceMin: 0,
  experienceMax: 10,
}
