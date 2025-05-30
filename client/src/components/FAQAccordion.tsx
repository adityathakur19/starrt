import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What will be the duration of the call?",
    answer: "45-60min."
  },
  {
    question: "Will it be a recorded call?",
    answer: "Yes, the call will be recorded on Zoom."
  },
  {
    question: "How will the call be scheduled?",
    answer: "Calendly."
  },
  {
    question: "Will it be a phone call?",
    answer: "No, I will be a Zoom call."
  },
  {
    question: "Do I need to be prepared with anything?",
    answer: "No, you just need to know about the current process of your sales, also you can invite people who all involved in decision making of your call."
  },
  {
    question: "What is the Refund Policy?",
    answer: "It’s a FREE clarity call."
  },
  {
    question: "Is there a Social Media Group for This Program?",
    answer: "Yes, it will shared with you post the call."
  }
];

export default function FAQAccordion() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white/30 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20">
          <button
            className="w-full p-6 text-left flex justify-between items-center hover:bg-white/10 transition-colors"
            onClick={() => toggleFAQ(index)}
          >
            <span className="font-semibold text-navy text-lg">{faq.question}</span>
            {expandedFAQ === index ? (
              <ChevronUp className="text-navy w-6 h-6" />
            ) : (
              <ChevronDown className="text-navy w-6 h-6" />
            )}
          </button>
          {expandedFAQ === index && (
            <div className="px-6 pb-6 bg-white/10">
              <p className="text-navy/80 leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
