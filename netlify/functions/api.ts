import { Handler } from "@netlify/functions"
import { z } from "zod"

const sheetsSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  businessName: z.string().min(1),
  businessDescription: z.enum([
    "student_fresher",
    "less_than_1_year",
    "1_to_3_years",
    "3_to_5_years",
    "5_to_10_years",
    "10_plus_years",
  ]),
  businessYears: z.enum([
    "less_than_1",
    "1_to_3",
    "3_to_5",
    "5_to_10",
    "10_plus",
  ]),
  annualRevenue: z.enum([
    "less_than_5_lakhs",
    "5_to_10_lakhs",
    "10_to_25_lakhs",
    "25_to_50_lakhs",
    "50_lakhs_to_1_crore",
    "1_to_5_crores",
    "5_to_10_crores",
    "10_to_25_crores",
    "25_to_50_crores",
    "50_to_100_crores",
    "more_than_100_crores",
  ]),
  openToContact: z.boolean(),
})

export const handler: Handler = async (event, context) => {
  // Handle CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  }

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    }
  }

  // Only handle POST requests to /save-to-sheets
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: "Method not allowed" }),
    }
  }

  try {
    // Parse the request body
    const body = JSON.parse(event.body || "{}")
    const validatedData = sheetsSchema.parse(body)

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

      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Thank you for your interest. Unfortunately, this program may not be the right fit for your current situation.",
        }),
      }
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Form submission received",
      }),
    }
  } catch (error) {
    console.error("Form submission error:", error)

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: "Internal server error" }),
    }
  }
}