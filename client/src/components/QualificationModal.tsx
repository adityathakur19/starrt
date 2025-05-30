"use client"

import type React from "react"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import ThankYouPage from "@/components/ThankYouPage"


declare global {
  interface Window {
    fbq: (action: string, event: string, data?: any) => void;
  }
}

  const PIXEL_ID = '1573133173292370';


const qualificationSchema = z.object({
  businessDescription: z.enum(["coach_consultant", "service_business", "working_professional", "student_fresher"], {
    required_error: "Please select what best describes you",
  }),
  businessYears: z.enum(["less_than_1", "1_to_2", "2_to_5", "5_plus"], {
    required_error: "Please select your business experience",
  }),
  annualRevenue: z.enum(["5_to_10_lakhs", "10_to_25_lakhs", "25_lakhs_plus"], {
    required_error: "Please select your annual revenue",
  }),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  biggestChallenge: z.string().min(1, "Please select your biggest challenge"),
  openToContact: z.boolean(),
})

type QualificationFormData = z.infer<typeof qualificationSchema>

interface QualificationModalProps {
  children: React.ReactNode
}

export function QualificationModal({ children }: QualificationModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showThankYou, setShowThankYou] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    trigger,
  } = useForm<QualificationFormData>({
    resolver: zodResolver(qualificationSchema),
    defaultValues: {
      openToContact: true,
    },
  })





const initializeMetaPixel = () => {
  const script = document.createElement('script');
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window,document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${PIXEL_ID}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);
};

const onSubmit = async (data: QualificationFormData) => {
  setIsSubmitting(true)

  try {
    // Check if this is a student/fresher with less than 1 year experience
    const isTargetUser = data.businessDescription === "student_fresher" && data.businessYears === "less_than_1"

    if (isTargetUser) {
      console.log("🎯 TARGET USER DETECTED:", {
        name: data.name,
        email: data.email,
        businessDescription: data.businessDescription,
        businessYears: data.businessYears,
      })
    }

    // Save data to Google Sheets - Updated to use Netlify Functions
    const response = await fetch("/.netlify/functions/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to save data")
    }

    const result = await response.json()

    if (result.success) {
      // Initialize Meta Pixel and track the successful form submission
      initializeMetaPixel();
      
      // Track the form submission event
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'Qualification Form Submission',
            content_category: 'Form',
            value: 1,
            currency: 'INR'
          });
        }
      }, 1000);

      toast({
        title: "Thank You!",
        description: "Your information has been submitted successfully. We'll be in touch soon!",
      })
      setShowThankYou(true)
    } else {
      throw new Error(result.message || "Failed to save data")
    }
  } catch (error) {
    console.error("Submission error:", error)
    toast({
      title: "Submission Failed",
      description: "There was an error processing your form. Please try again.",
      variant: "destructive",
    })
  } finally {
    setIsSubmitting(false)
  }
}

  const nextStep = async () => {
    let fieldsToValidate: (keyof QualificationFormData)[] = []

    if (currentStep === 1) {
      fieldsToValidate = ["businessDescription"]
    } else if (currentStep === 2) {
      fieldsToValidate = ["businessYears"]
    } else if (currentStep === 3) {
      fieldsToValidate = ["annualRevenue"]
    } else if (currentStep === 4) {
      fieldsToValidate = ["name", "phone", "email"]
    } else if (currentStep === 5) {
      fieldsToValidate = ["biggestChallenge"]
    }

    const isValid = await trigger(fieldsToValidate)
    if (isValid && currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleClose = () => {
    setIsOpen(false)
    reset()
    setCurrentStep(1)
    setShowThankYou(false)
  }

  const handleThankYouClose = () => {
    setShowThankYou(false)
    handleClose()
  }

  const businessDescription = watch("businessDescription")
  const businessYears = watch("businessYears")
  const annualRevenue = watch("annualRevenue")

  if (showThankYou) {
    return <ThankYouPage onClose={handleThankYouClose} />
  }

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {children}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex justify-between items-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-black">Book Your Clarity Call</h2>
                <Button variant="ghost" size="sm" onClick={handleClose}>
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                {/* Step 1: Business Description */}
                {currentStep === 1 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <h3 className="text-xl sm:text-2xl font-semibold text-black mb-3 sm:mb-4">
                        What best describes you?
                      </h3>
                      <p className="text-black/70 text-sm sm:text-base">
                        Please select the option that best fits your situation
                      </p>
                    </div>

                    <RadioGroup
                      value={businessDescription}
                      onValueChange={(value) => setValue("businessDescription", value as any)}
                      className="space-y-3 sm:space-y-4"
                    >
                      <div className="glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="coach_consultant"
                            id="coach_consultant"
                            className="border-black text-black"
                          />
                          <label
                            htmlFor="coach_consultant"
                            className="font-medium text-black cursor-pointer flex-1 text-sm sm:text-base"
                          >
                            I'm a coach/consultant running my own business
                          </label>
                        </div>
                      </div>

                      <div className="glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="service_business"
                            id="service_business"
                            className="border-bright-pink text-bright-pink"
                          />
                          <label
                            htmlFor="service_business"
                            className="font-medium text-black cursor-pointer flex-1 text-sm sm:text-base"
                          >
                            I run a service-based business
                          </label>
                        </div>
                      </div>

                      <div className="glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="working_professional"
                            id="working_professional"
                            className="border-bright-pink text-bright-pink"
                          />
                          <label
                            htmlFor="working_professional"
                            className="font-medium text-black cursor-pointer flex-1 text-sm sm:text-base"
                          >
                            I'm a working professional exploring sales coaching
                          </label>
                        </div>
                      </div>

                      <div className="glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="student_fresher"
                            id="student_fresher"
                            className="border-bright-pink text-bright-pink"
                          />
                          <label
                            htmlFor="student_fresher"
                            className="font-medium text-black cursor-pointer flex-1 text-sm sm:text-base"
                          >
                            I'm a student/fresher
                          </label>
                        </div>
                      </div>
                    </RadioGroup>

                    {errors.businessDescription && (
                      <p className="text-red-600 text-sm mt-2">{errors.businessDescription.message}</p>
                    )}
                  </div>
                )}

                {/* Step 2: Business Years */}
                {currentStep === 2 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <h3 className="text-xl sm:text-2xl font-semibold text-black mb-3 sm:mb-4">
                        How many years have you been running your business?
                      </h3>
                    </div>

                    <RadioGroup
                      value={businessYears}
                      onValueChange={(value) => setValue("businessYears", value as any)}
                      className="space-y-3 sm:space-y-4"
                    >
                      <div className="glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="less_than_1"
                            id="less_than_1"
                            className="border-bright-pink text-bright-pink"
                          />
                          <label
                            htmlFor="less_than_1"
                            className="font-medium text-black cursor-pointer flex-1 text-sm sm:text-base"
                          >
                            Less than 1 year
                          </label>
                        </div>
                      </div>

                      <div className="glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="1_to_2" id="1_to_2" className="border-bright-pink text-bright-pink" />
                          <label
                            htmlFor="1_to_2"
                            className="font-medium text-black cursor-pointer flex-1 text-sm sm:text-base"
                          >
                            1–2 years
                          </label>
                        </div>
                      </div>

                      <div className="glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="2_to_5" id="2_to_5" className="border-bright-pink text-bright-pink" />
                          <label
                            htmlFor="2_to_5"
                            className="font-medium text-black cursor-pointer flex-1 text-sm sm:text-base"
                          >
                            2–5 years
                          </label>
                        </div>
                      </div>

                      <div className="glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="5_plus" id="5_plus" className="border-bright-pink text-bright-pink" />
                          <label
                            htmlFor="5_plus"
                            className="font-medium text-black cursor-pointer flex-1 text-sm sm:text-base"
                          >
                            5+ years
                          </label>
                        </div>
                      </div>
                    </RadioGroup>

                    {errors.businessYears && (
                      <p className="text-red-600 text-sm mt-2">{errors.businessYears.message}</p>
                    )}
                  </div>
                )}

                {/* Step 3: Annual Revenue */}
                {currentStep === 3 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <h3 className="text-xl sm:text-2xl font-semibold text-black mb-3 sm:mb-4">
                        What is your current annual revenue?
                      </h3>
                    </div>

                    <RadioGroup
                      value={annualRevenue}
                      onValueChange={(value) => setValue("annualRevenue", value as any)}
                      className="space-y-3 sm:space-y-4"
                    >
                      <div className="glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="5_to_10_lakhs"
                            id="5_to_10_lakhs"
                            className="border-bright-pink text-bright-pink"
                          />
                          <label
                            htmlFor="5_to_10_lakhs"
                            className="font-medium text-black cursor-pointer flex-1 text-sm sm:text-base"
                          >
                            ₹5–10 lakhs
                          </label>
                        </div>
                      </div>

                      <div className="glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="10_to_25_lakhs"
                            id="10_to_25_lakhs"
                            className="border-bright-pink text-bright-pink"
                          />
                          <label
                            htmlFor="10_to_25_lakhs"
                            className="font-medium text-black cursor-pointer flex-1 text-sm sm:text-base"
                          >
                            ₹10–25 lakhs
                          </label>
                        </div>
                      </div>

                      <div className="glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="25_lakhs_plus"
                            id="25_lakhs_plus"
                            className="border-bright-pink text-bright-pink"
                          />
                          <label
                            htmlFor="25_lakhs_plus"
                            className="font-medium text-black cursor-pointer flex-1 text-sm sm:text-base"
                          >
                            ₹25 lakhs+
                          </label>
                        </div>
                      </div>
                    </RadioGroup>

                    {errors.annualRevenue && (
                      <p className="text-red-600 text-sm mt-2">{errors.annualRevenue.message}</p>
                    )}
                  </div>
                )}

                {/* Step 4: Contact Information */}
                {currentStep === 4 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <h3 className="text-xl sm:text-2xl font-semibold text-black mb-3 sm:mb-4">Contact Information</h3>
                    </div>

                    <div>
                      <Label htmlFor="name" className="text-black font-medium text-sm sm:text-base">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        {...register("name")}
                        className="mt-2 border-bright-pink/30 focus:border-bright-pink text-sm sm:text-base"
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-black font-medium text-sm sm:text-base">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className="mt-2 border-bright-pink/30 focus:border-bright-pink text-sm sm:text-base"
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-black font-medium text-sm sm:text-base">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="mt-2 border-bright-pink/30 focus:border-bright-pink text-sm sm:text-base"
                        placeholder="Enter your email address"
                      />
                      {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                )}

                {/* Step 5: Biggest Challenge */}
                {currentStep === 5 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <h3 className="text-xl sm:text-2xl font-semibold text-black mb-3 sm:mb-4">
                        What's your biggest challenge in growing your business right now?
                      </h3>
                    </div>

                    <RadioGroup
                      value={watch("biggestChallenge")}
                      onValueChange={(value) => setValue("biggestChallenge", value)}
                      className="space-y-3 sm:space-y-4"
                    >
                      <div className="glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="lead_qualification"
                            id="lead_qualification"
                            className="border-bright-pink text-bright-pink"
                          />
                          <label
                            htmlFor="lead_qualification"
                            className="font-medium text-black cursor-pointer flex-1 text-sm sm:text-base"
                          >
                            Lead Qualification
                          </label>
                        </div>
                      </div>

                      <div className="glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="lead_nurturing"
                            id="lead_nurturing"
                            className="border-bright-pink text-bright-pink"
                          />
                          <label
                            htmlFor="lead_nurturing"
                            className="font-medium text-black cursor-pointer flex-1 text-sm sm:text-base"
                          >
                            Lead Nurturing
                          </label>
                        </div>
                      </div>

                      <div className="glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="objection_handling"
                            id="objection_handling"
                            className="border-bright-pink text-bright-pink"
                          />
                          <label
                            htmlFor="objection_handling"
                            className="font-medium text-black cursor-pointer flex-1 text-sm sm:text-base"
                          >
                            Objection Handling
                          </label>
                        </div>
                      </div>

                      <div className="glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="one_on_one_sales_closing"
                            id="one_on_one_sales_closing"
                            className="border-bright-pink text-bright-pink"
                          />
                          <label
                            htmlFor="one_on_one_sales_closing"
                            className="font-medium text-black cursor-pointer flex-1 text-sm sm:text-base"
                          >
                            1:1 Sales Closing
                          </label>
                        </div>
                      </div>

                      <div className="glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="other" id="other" className="border-bright-pink text-bright-pink" />
                          <label
                            htmlFor="other"
                            className="font-medium text-black cursor-pointer flex-1 text-sm sm:text-base"
                          >
                            Other
                          </label>
                        </div>
                      </div>
                    </RadioGroup>

                    {errors.biggestChallenge && (
                      <p className="text-red-600 text-sm mt-2">{errors.biggestChallenge.message}</p>
                    )}
                  </div>
                )}

                {/* Step 6: Final Confirmation */}
                {currentStep === 6 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8">
                      <h3 className="text-xl sm:text-2xl font-semibold text-black mb-3 sm:mb-4">Final Step</h3>
                      <p className="text-black/70 text-sm sm:text-base">
                        If you're a good fit, are you open to being contacted for a free Sales Growth clarity call?
                      </p>
                    </div>

                    <RadioGroup
                      value={watch("openToContact") ? "yes" : "no"}
                      onValueChange={(value) => setValue("openToContact", value === "yes")}
                      className="space-y-3 sm:space-y-4"
                    >
                      <div className="glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="yes" id="yes" className="border-bright-pink text-bright-pink" />
                          <label
                            htmlFor="yes"
                            className="font-medium text-black cursor-pointer flex-1 text-sm sm:text-base"
                          >
                            Yes, I'm open to being contacted
                          </label>
                        </div>
                      </div>

                      <div className="glass-effect rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="no" id="no" className="border-bright-pink text-bright-pink" />
                          <label
                            htmlFor="no"
                            className="font-medium text-black cursor-pointer flex-1 text-sm sm:text-base"
                          >
                            No, not at this time
                          </label>
                        </div>
                      </div>
                    </RadioGroup>

                    <p className="text-xs sm:text-sm text-black/60 text-center">
                      This gives us explicit permission for follow-up regarding your clarity call.
                    </p>
                  </div>
                )}

                {/* Form Navigation */}
                <div className="flex justify-between items-center pt-6 sm:pt-8 border-t border-white/20">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className={`${currentStep === 1 ? "invisible" : ""} border-bright-pink text-bright-pink hover:bg-bright-pink hover:text-white text-sm sm:text-base px-3 sm:px-4 py-2`}
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Previous
                  </Button>

                  <div className="flex space-x-1 sm:space-x-2">
                    {[1, 2, 3, 4, 5, 6].map((step) => (
                      <div
                        key={step}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                          step <= currentStep ? "bg-bright-pink" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex space-x-2 sm:space-x-4">
                    {currentStep < 6 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-button-gradient text-white font-semibold px-4 sm:px-6 text-sm sm:text-base py-2"
                      >
                        Next
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-button-gradient text-white font-semibold px-6 sm:px-8 text-sm sm:text-base py-2"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default QualificationModal
