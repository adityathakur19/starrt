import { z } from "zod"

export const sheetsSchema = z.object({
  businessDescription: z.string(),
  businessYears: z.string(),
  annualRevenue: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  biggestChallenge: z.string(),
  openToContact: z.boolean(),
})

export type SheetsFormData = z.infer<typeof sheetsSchema>
