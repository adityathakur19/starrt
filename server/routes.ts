import express from "express"
import { z } from "zod"

const app = express()

// Enable JSON body parsing for incoming requests
app.use(express.json())

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend!" })
})

app.post("/api/save-to-sheets", async (req, res) => {
  try {
    // Create a more flexible schema for the sheets endpoint
    const sheetsSchema = z.object({
      businessDescription: z.string(),
      businessYears: z.string(),
      annualRevenue: z.string().optional().default("not_specified"),
      name: z.string(),
      phone: z.string(),
      email: z.string().email(),
      biggestChallenge: z.string().optional().default(""),
      openToContact: z.boolean().optional().default(true),
    })

    const validatedData = sheetsSchema.parse(req.body)

    // Check if this is the specific combination that should be rejected
    const shouldRejectSubmission = 
      validatedData.businessDescription === "student_fresher" &&
      validatedData.businessYears === "less_than_1" &&
      validatedData.annualRevenue === "5_to_10_lakhs" &&
      validatedData.openToContact === false

    if (shouldRejectSubmission) {
      console.log("Submission rejected for specific criteria:", {
        businessDescription: validatedData.businessDescription,
        businessYears: validatedData.businessYears,
        annualRevenue: validatedData.annualRevenue,
        openToContact: validatedData.openToContact,
        name: validatedData.name,
        email: validatedData.email,
      })

      return res.status(400).json({
        success: false,
        message: "Thank you for your interest. Unfortunately, this program may not be the right fit for your current situation.",
      })
    }

    // Check if this is a student/fresher with less than 1 year experience
    const isTargetUser =
      validatedData.businessDescription === "student_fresher" && validatedData.businessYears === "less_than_1"

    console.log("Form submission received:", {
      businessDescription: validatedData.businessDescription,
      businessYears: validatedData.businessYears,
      isTargetUser,
      name: validatedData.name,
      email: validatedData.email,
    })

    // TODO: Implement Google Sheets API integration here
    // For now, just return a success message
    return res.status(200).json({
      success: true,
      message: "Data saved successfully!",
      data: validatedData,
    })
  } catch (error: any) {
    console.error("Error saving data to sheets:", error)

    if (error instanceof z.ZodError) {
      // Handle Zod validation errors
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      })
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      message: "Failed to save data to sheets",
      error: error.message,
    })
  }
})

export default app