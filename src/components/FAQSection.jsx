import React, { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How does milestone escrow protection work?",
      answer: "Before any contract work begins, the client safely funds the agreed milestone into our secure escrow. Freelancers deliver the work knowing payment is already guaranteed, and funds are only released to the freelancer once the client reviews and approves the submitted deliverable."
    },
    {
      question: "What are the platform service fees?",
      answer: "FreelanceHub charges a transparent, flat 5% service fee on completed contracts. Clients pay zero deposit fees, and freelancers keep 95% of their hard-earned milestone payments with no hidden deductions."
    },
    {
      question: "How do freelancers get verified on the platform?",
      answer: "Every verified freelancer undergoes an identity check, portfolio authenticity review, and technical skill screening. Once approved, they receive a verified badge and priority placement in client project searches."
    },
    {
      question: "When and how are payments released to freelancers?",
      answer: "Once a client marks a project milestone as approved, funds are automatically unlocked from escrow. Freelancers can withdraw directly to their bank account, PayPal, Stripe, or crypto wallet within 24 to 48 hours."
    },
    {
      question: "Can I hire internationally or work with global clients?",
      answer: "Yes, FreelanceHub operates globally across 120+ countries. Contracts and payments support multiple fiat currencies and global payouts with automated currency conversion."
    },
    {
      question: "What happens if there is a disagreement on deliverables?",
      answer: "Our dedicated Escrow Dispute Team steps in to review contract specifications, submitted work, and chat records. Escrow funds remain protected until a fair resolution or refund is mutually established."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-3xl mx-auto animate-in fade-in duration-200">
      {/* Section Header */}
      <div className="text-center">
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-2.5 inline-block">
          Frequently Asked Questions
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-heading">
          Everything You Need to Know
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed max-w-lg mx-auto">
          Common answers about escrow security, hiring processes, payments, and collaboration.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl transition-all duration-200 border ${
                isOpen 
                  ? "bg-[#131926] border-indigo-500/30 shadow-card" 
                  : "bg-[#111724]/80 hover:bg-[#131926] border-white/[0.07] hover:border-white/[0.12]"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <span className={`text-xs sm:text-sm font-semibold transition-colors ${
                  isOpen ? "text-indigo-300 font-bold" : "text-white"
                }`}>
                  {faq.question}
                </span>
                <span className={`p-1.5 rounded-lg shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180 bg-indigo-500/15 text-indigo-400" : "bg-white/[0.04] text-slate-400"
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.05] mt-1 pt-3 animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Need more help snippet */}
      <div className="text-center pt-2">
        <p className="text-xs text-slate-400">
          Still have questions?{" "}
          <a
            href="#contact"
            className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4 transition-colors"
          >
            Send us a message above
          </a>
        </p>
      </div>
    </div>
  );
};
