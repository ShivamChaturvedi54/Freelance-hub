import React, { useState } from "react";

export const PricingSection = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState("annual"); // 'monthly' | 'annual'

  const plans = [
    {
      id: "starter",
      name: "Starter",
      tagline: "Essential tools for independent freelancers & first-time clients.",
      priceMonthly: 0,
      priceAnnual: 0,
      badge: null,
      isPopular: false,
      features: [
        "Standard 5% platform escrow fee",
        "Secure milestone escrow protection",
        "Unlimited proposals & job applications",
        "Direct client in-app messaging",
        "Standard payout release (48 hours)",
        "Community & email support"
      ],
      ctaText: "Get Started Free",
      ctaStyle: "bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1]"
    },
    {
      id: "pro",
      name: "Professional",
      tagline: "Accelerate your pipeline with reduced fees and verified badges.",
      priceMonthly: 29,
      priceAnnual: 24,
      badge: "Most Popular",
      isPopular: true,
      features: [
        "Reduced 3% platform escrow fee",
        "Verified Talent badge & profile boost",
        "Fast-track payout release (under 24 hours)",
        "Direct video calls & document collaboration",
        "Automated contract & invoice generation",
        "Priority 24/7 specialized support",
        "Featured proposal placement"
      ],
      ctaText: "Choose Professional",
      ctaStyle: "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-600/30"
    },
    {
      id: "enterprise",
      name: "Enterprise",
      tagline: "Custom workflow orchestration for high-volume teams and agencies.",
      priceMonthly: 99,
      priceAnnual: 79,
      badge: "Team Scale",
      isPopular: false,
      features: [
        "1.5% custom enterprise escrow fee",
        "Instant automated milestone withdrawals",
        "Dedicated account manager & talent concierge",
        "Custom MSA contracts & security compliance",
        "Multi-seat team management & role permissions",
        "Consolidated monthly invoicing",
        "SLA guaranteed 1-hour response"
      ],
      ctaText: "Contact Enterprise",
      ctaStyle: "bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1]"
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-2.5 inline-block">
          Plans & Pricing
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-heading">
          Transparent, Predictable Plans
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
          Fair platform rates with zero hidden deductions. Upgrade, downgrade, or pause anytime.
        </p>

        {/* Billing Toggle (Monthly / Annual) */}
        <div className="mt-5 inline-flex items-center p-1 rounded-xl bg-[#111726] border border-white/[0.08] text-xs">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              billingCycle === "monthly"
                ? "bg-indigo-600 text-white font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("annual")}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              billingCycle === "annual"
                ? "bg-indigo-600 text-white font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>Annual Billing</span>
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* 3 Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {plans.map((plan) => {
          const price = billingCycle === "annual" ? plan.priceAnnual : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                plan.isPopular
                  ? "bg-[#141C2E] border border-indigo-500/50 shadow-2xl shadow-indigo-500/15 sm:-translate-y-1"
                  : "bg-[#111724]/90 border border-white/[0.08] hover:border-white/[0.15] hover:bg-[#131926] shadow-card"
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    plan.isPopular 
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40" 
                      : "bg-[#1C2538] text-slate-300 border border-white/10"
                  }`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs sm:text-sm font-bold text-indigo-400 uppercase tracking-wider font-mono">
                    {plan.name}
                  </span>
                </div>

                {/* Price Display */}
                <div className="my-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      / month
                    </span>
                  </div>
                  {billingCycle === "annual" && price > 0 && (
                    <span className="text-[11px] text-emerald-400 font-medium block mt-0.5">
                      Billed annually (${price * 12}/year)
                    </span>
                  )}
                  {price === 0 && (
                    <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                      Free forever, pay as you contract
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                  {plan.tagline}
                </p>

                {/* Features List */}
                <div className="pt-4 border-t border-white/[0.07] space-y-2.5 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => onSelectPlan && onSelectPlan(plan)}
                  className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs flex items-center justify-center transition-all cursor-pointer ${plan.ctaStyle}`}
                >
                  <span>{plan.ctaText}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>


    </div>
  );
};
