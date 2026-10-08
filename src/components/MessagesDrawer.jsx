import React, { useState } from "react";
import { X, Send, CheckCheck, Smile, Paperclip, Circle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const MessagesDrawer = ({ isOpen, onClose }) => {
  const { userProfile, currentUser, role } = useAuth();
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Aetherial Labs",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
      text: "Hi Alex! We were very impressed by your DeFi analytics proposal. Are you available for a brief sync tomorrow at 10 AM EST?",
      time: "10:14 AM",
      isMe: false
    },
    {
      id: 2,
      sender: "Me",
      avatar: userProfile?.photoURL || currentUser?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      text: "Hello! Absolutely. 10 AM EST works great for me. I can show a quick demo of the subgraph data pipeline as well.",
      time: "10:18 AM",
      isMe: true
    },
    {
      id: 3,
      sender: "Aetherial Labs",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
      text: "Awesome! I'll fund Milestone #1 into the smart escrow right before our call. Talk soon!",
      time: "10:22 AM",
      isMe: false
    }
  ]);

  const [input, setInput] = useState("");

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: userProfile?.displayName || "Me",
      avatar: userProfile?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      text: input,
      time: "Just now",
      isMe: true
    };

    setMessages([...messages, newMsg]);
    setInput("");

    // Simulate smart auto-reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "Aetherial Labs",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
          text: "Thanks for the update! Looking forward to delivering this together.",
          time: "Just now",
          isMe: false
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-[#131926] border-l border-white/[0.1] shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#111724]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
                alt="Chat User"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#131926]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm font-heading">Aetherial Labs</h3>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span>Active Client Conversation</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2.5 ${msg.isMe ? "justify-end" : "justify-start"}`}
            >
              {!msg.isMe && (
                <img
                  src={msg.avatar}
                  alt={msg.sender}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-700 shrink-0"
                />
              )}

              <div
                className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  msg.isMe
                    ? "bg-indigo-600 text-white rounded-br-xs shadow-md shadow-indigo-600/20"
                    : "bg-slate-800/90 text-slate-200 rounded-bl-xs border border-slate-700/70"
                }`}
              >
                <p>{msg.text}</p>
                <div
                  className={`mt-1 flex items-center gap-1 text-[10px] ${
                    msg.isMe ? "text-indigo-200 justify-end" : "text-slate-400 justify-start"
                  }`}
                >
                  <span>{msg.time}</span>
                  {msg.isMe && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-700/70 bg-slate-900/60 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message or milestone question..."
            className="flex-1 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
