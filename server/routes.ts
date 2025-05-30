import express, { type Request, type Response } from "express"
import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"
import { z } from "zod"
import dotenv from "dotenv"
import { createServer } from "http"

dotenv.config()

export function registerRoutes(app: express.Express) {
  app.post("/api/save-to-sheets", async (req: Request, res: Response) => {
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

      // Check if this user should be excluded from saving
      const shouldExcludeUser =
        validatedData.businessDescription === "student_fresher" &&
        validatedData.businessYears === "less_than_1" &&
        validatedData.annualRevenue === "5_to_10_lakhs" &&
        validatedData.openToContact === false

      // Check if this is a student/fresher with less than 1 year experience
      const isTargetUser =
        validatedData.businessDescription === "student_fresher" && validatedData.businessYears === "less_than_1"

      console.log("Form submission received:", {
        businessDescription: validatedData.businessDescription,
        businessYears: validatedData.businessYears,
        annualRevenue: validatedData.annualRevenue,
        openToContact: validatedData.openToContact,
        isTargetUser,
        shouldExcludeUser,
        name: validatedData.name,
        email: validatedData.email,
      })

      // If user should be excluded, return success without saving
      if (shouldExcludeUser) {
        console.log("User excluded from saving:", {
          name: validatedData.name,
          email: validatedData.email,
          reason: "student_fresher + less_than_1 + 5_to_10_lakhs + not_open_to_contact",
        })

        return res.json({
          success: true,
          message: "Thank you for your submission",
          dataSaved: false,
          isTargetUser,
        })
      }

      // Check if Google Sheets is configured
      if (
        !process.env.GOOGLE_SHEETS_CLIENT_EMAIL ||
        !process.env.GOOGLE_SHEETS_PRIVATE_KEY ||
        !process.env.GOOGLE_SHEET_ID
      ) {
        console.log("Google Sheets not configured. Required environment variables:")
        console.log("- GOOGLE_SHEETS_CLIENT_EMAIL:", !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL)
        console.log("- GOOGLE_SHEETS_PRIVATE_KEY:", !!process.env.GOOGLE_SHEETS_PRIVATE_KEY)
        console.log("- GOOGLE_SHEET_ID:", !!process.env.GOOGLE_SHEET_ID)
        console.log("Data that would be saved:", validatedData)

        return res.json({
          success: true,
          message: "Data logged (Google Sheets not configured)",
          dataSaved: false,
        })
      }

      try {
        // Initialize Google Sheets
        const serviceAccountAuth = new JWT({
          email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
          key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        })

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth)
        await doc.loadInfo()

        const sheet = doc.sheetsByIndex[0]

        // Prepare row data
        const rowData = {
          "Business Description": validatedData.businessDescription,
          "Business Years": validatedData.businessYears,
          "Annual Revenue": validatedData.annualRevenue,
          Name: validatedData.name,
          Phone: validatedData.phone,
          Email: validatedData.email,
          "Biggest Challenge": validatedData.biggestChallenge,
          "Open to Contact": validatedData.openToContact ? "Yes" : "No",
          "Is Target User": isTargetUser ? "YES" : "NO",
          "Submitted At": new Date().toISOString(),
        }

        // Add row to Google Sheets
        await sheet.addRow(rowData)

        if (isTargetUser) {
          console.log("🎯 TARGET USER SAVED:", {
            name: validatedData.name,
            email: validatedData.email,
            businessDescription: validatedData.businessDescription,
            businessYears: validatedData.businessYears,
          })
        }

        console.log("Data successfully saved to Google Sheets")
        res.json({
          success: true,
          message: "Data saved successfully",
          dataSaved: true,
          isTargetUser,
        })
      } catch (sheetsError) {
        console.error("Google Sheets API error:", sheetsError)
        res.status(500).json({
          success: false,
          message: "Failed to save to Google Sheets",
          error: sheetsError instanceof Error ? sheetsError.message : String(sheetsError),
        })
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors)
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        })
      } else {
        console.error("Unexpected error:", error)
        res.status(500).json({
          success: false,
          message: "Internal server error",
        })
      }
    }
  })

  // Return the HTTP server instance
  return createServer(app)
}
