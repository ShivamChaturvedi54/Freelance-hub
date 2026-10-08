import React, { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  RotateCcw, 
  ShieldCheck, 
  CreditCard, 
  Briefcase, 
  ChevronRight,
  Maximize2,
  Minimize2
} from "lucide-react";

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I am FreelanceHub's AI Concierge. How can I help you today with finding talent, escrow security, or membership plans?",
      timestamp: "Just now"
    }
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input when opened
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  // Quick prompt questions
  const quickPrompts = [
    { label: "How does escrow work?", icon: ShieldCheck },
    { label: "What are the platform fees?", icon: CreditCard },
    { label: "How do I post a project?", icon: Briefcase },
    { label: "Which plan is best for me?", icon: Sparkles }
  ];

  // Knowledge base matcher for platform answers
  const generateAIResponse = (userText) => {
    const query = userText.toLowerCase().trim();

    if (query.includes("escrow") || query.includes("protect") || query.includes("security") || query.includes("safe")) {
      return "FreelanceHub uses 100% milestone escrow security. Clients deposit funds before work begins, holding them safely in escrow. Funds are only unlocked when deliverables are reviewed and approved by the client, protecting both parties against non-delivery and non-payment.";
    }

    if (query.includes("fee") || query.includes("cost") || query.includes("percentage") || query.includes("take")) {
      return "Our standard platform rate is a transparent flat 5% on completed milestones—meaning freelancers keep 95% of their earnings. For high-volume clients, our Professional and Enterprise tiers reduce fees down to 3% and 1.5% with priority payouts.";
    }

    if (query.includes("plan") || query.includes("pricing") || query.includes("tier") || query.includes("pro") || query.includes("subscription")) {
      return "We offer 3 straightforward plans:\n• Starter (Free): 5% fee, unlimited applications, standard 48h payout.\n• Professional ($24/mo): Reduced 3% fee, verified talent badge, priority 24h payouts.\n• Enterprise ($79/mo): Custom 1.5% fee, instant withdrawals, dedicated concierge, and custom MSA contracts.";
    }

    if (query.includes("post") || query.includes("job") || query.includes("hire") || query.includes("client")) {
      return "To post a project, click the 'Post Project' button in the navigation bar! Specify your title, scope, milestone budget, and required skills. Vetted specialists will review requirements and submit tailored proposals within hours.";
    }

    if (query.includes("apply") || query.includes("proposal") || query.includes("freelancer") || query.includes("work")) {
      return "Freelancers can submit unlimited proposals for active project openings. Include your rate, estimated turnaround, and relevant portfolio links. Once a client accepts, a milestone contract is initiated immediately.";
    }

    if (query.includes("contact") || query.includes("support") || query.includes("help") || query.includes("dispute")) {
      return "Our support team is available 24/7! You can use our 'Direct Inquiries' contact form right on this page or reach out through the in-app dispute resolution center if you need milestone mediation.";
    }

    if (query.includes("hi") || query.includes("hello") || query.includes("hey") || query.includes("who are you")) {
      return "Greetings! I'm your dedicated FreelanceHub AI. I can guide you through platform features, pricing tiers, payment escrow, or project postings. What would you like to explore?";
    }

    // Default intelligent response
    return "Thanks for asking! FreelanceHub connects top-tier independent engineers and designers with ambitious teams under guaranteed milestone protection. You can ask me about our escrow system, pricing tiers, platform fees, or posting a new project.";
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      const aiReplyText = generateAIResponse(text);
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 650);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "ai",
        text: "Chat cleared! How can I assist you with FreelanceHub today?",
        timestamp: "Just now"
      }
    ]);
  };

  return (
    <>
      {/* Small Chat Window in the Bottom Right Corner */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[390px] h-[520px] max-h-[82vh] rounded-3xl bg-[#0F1626]/95 backdrop-blur-xl border border-white/[0.14] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_35px_rgba(99,102,241,0.2)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          role="dialog"
          aria-label="FreelanceHub AI Chatbot"
        >
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-[#141C30]/90 border-b border-white/[0.08] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                  <Bot className="w-5 h-5" />
                </div>
                {/* Active Pulsing Indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#141C30] animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white font-heading">FreelanceHub AI</span>
                  <span className="px-1.5 py-0.2 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-none mt-0.5">Instant platform guidance</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar text-xs">
            {messages.map((msg) => {
              const isAi = msg.sender === "ai";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isAi ? "items-start" : "items-end justify-end"}`}
                >
                  {isAi && (
                    <div className="w-6 h-6 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-sm ${
                      isAi
                        ? "bg-[#162035] border border-white/[0.08] text-slate-200"
                        : "bg-indigo-600 text-white font-medium rounded-br-xs"
                    }`}
                  >
                    <div className="whitespace-pre-line text-xs">{msg.text}</div>
                    <div
                      className={`text-[10px] mt-1 text-right ${
                        isAi ? "text-slate-500" : "text-indigo-200"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 items-start">
                <div className="w-6 h-6 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 rounded-2xl bg-[#162035] border border-white/[0.08] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Pills */}
          <div className="px-3 py-2 bg-[#101726]/60 border-t border-white/[0.05] flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(qp.label)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-indigo-600/20 border border-white/[0.08] hover:border-indigo-500/40 text-[11px] text-slate-300 hover:text-white shrink-0 transition-colors cursor-pointer"
              >
                <qp.icon className="w-3 h-3 text-indigo-400 shrink-0" />
                <span>{qp.label}</span>
              </button>
            ))}
          </div>

          {/* Input Box Footer */}
          <div className="p-3 bg-[#131B2E] border-t border-white/[0.08] shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about escrows, plans, hiring..."
                className="flex-1 bg-[#0B0F19] text-xs text-white placeholder-slate-500 rounded-xl px-3.5 py-2.5 border border-white/[0.1] focus:outline-none focus:border-indigo-500/80 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white flex items-center justify-center shrink-0 transition-all shadow-md shadow-indigo-600/30 cursor-pointer disabled:cursor-not-allowed"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="text-[10px] text-center text-slate-500 mt-1.5">
              Powered by FreelanceHub AI • Escrow Protected
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Trigger Button in the Right Below Corner of the Screen */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 group flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-[0_10px_30px_rgba(99,102,241,0.45)] hover:shadow-[0_12px_35px_rgba(99,102,241,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-white/20"
        aria-label={isOpen ? "Close AI chat" : "Open FreelanceHub AI Chatbot"}
      >
        <div className="relative">
          {isOpen ? (
            <X className="w-5 h-5 transition-transform duration-200" />
          ) : (
            <Bot className="w-5 h-5 transition-transform duration-200 group-hover:rotate-6" />
          )}
          {/* Subtle Online Dot */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0B0F17] animate-pulse" />
          )}
        </div>
      </button>
    </>
  );
};
