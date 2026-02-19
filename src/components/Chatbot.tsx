import { useState, useRef, useEffect } from 'react';
import { X, Send, ChevronRight } from 'lucide-react';
import type { ChatMessage } from '../types';

const quickReplies = [
 'Vehicle Availability',
 'Deposit Structure',
 'Delivery Timeline',
 'Accepted Digital Assets',
 'Inspection Details',
 'Speak with Client Liaison',
];

const botResponses: Record<string, string> = {
 'Vehicle Availability': 'Our current inventory includes Tesla Model 3, Model Y, Model S, Model X, and limited Cybertruck allocations. All vehicles are verified through our sourcing network. Would you like to view our full inventory?',
 'Deposit Structure': 'We require a 7% reservation deposit to secure vehicle allocation. This deposit initiates documentation verification and supplier confirmation. The deposit is applied toward your final purchase.',
 'Delivery Timeline': 'Delivery typically takes 14–28 days region-dependent after reservation confirmation. This includes inspection, documentation review, and logistics coordination.',
 'Accepted Digital Assets': 'We accept USDT (ERC20 & TRC20), Bitcoin (BTC), and Ethereum (ETH). Each transaction receives a unique wallet address for enhanced security.',
 'Inspection Details': 'Every vehicle undergoes a comprehensive multi-point inspection covering structural integrity, battery health, sensor function, and documented history.',
 'Speak with Client Liaison': 'I\'ll connect you with a Client Liaison. Please provide your email address so our team can reach out within one business day.',
};

export default function Chatbot() {
 const [isOpen, setIsOpen] = useState(false);
 const [messages, setMessages] = useState<ChatMessage[]>([
  {
   id: 'welcome',
   type: 'bot',
   content: 'Welcome to Veloré Motors. How may we assist with your vehicle acquisition?',
   timestamp: new Date(),
   quickReplies,
  },
 ]);
 const [inputValue, setInputValue] = useState('');
 const [isTyping, setIsTyping] = useState(false);
 const [awaitingEmail, setAwaitingEmail] = useState(false);
 const messagesEndRef = useRef<HTMLDivElement>(null);
 const inputRef = useRef<HTMLInputElement>(null);

 const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
 };

 useEffect(() => {
  scrollToBottom();
 }, [messages, isOpen]);

 useEffect(() => {
  if (isOpen && inputRef.current) {
   setTimeout(() => inputRef.current?.focus(), 100);
  }
 }, [isOpen]);

 const handleQuickReply = (reply: string) => {
  // Add user message
  const userMessage: ChatMessage = {
   id: Date.now().toString(),
   type: 'user',
   content: reply,
   timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setIsTyping(true);

  // Simulate bot response
  setTimeout(() => {
   const response = botResponses[reply] || 'Thank you for your inquiry. A Client Liaison will follow up with you shortly.';

   const botMessage: ChatMessage = {
    id: (Date.now() + 1).toString(),
    type: 'bot',
    content: response,
    timestamp: new Date(),
    quickReplies: reply === 'Speak with Client Liaison' ? undefined : quickReplies,
   };

   setMessages((prev) => [...prev, botMessage]);
   setIsTyping(false);

   if (reply === 'Speak with Client Liaison') {
    setAwaitingEmail(true);
   }
  }, 800);
 };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!inputValue.trim()) return;

  const userMessage: ChatMessage = {
   id: Date.now().toString(),
   type: 'user',
   content: inputValue,
   timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setInputValue('');
  setIsTyping(true);

  setTimeout(() => {
   let response = 'Thank you for your message. Our Client Liaison team will review your inquiry and respond within one business day.';

   if (awaitingEmail) {
    if (inputValue.includes('@')) {
     response = `Thank you. We've recorded your email (${inputValue}). A Client Liaison will contact you within one business day.`;
     setAwaitingEmail(false);
    } else {
     response = 'Please provide a valid email address so our Client Liaison can reach you.';
    }
   }

   const botMessage: ChatMessage = {
    id: (Date.now() + 1).toString(),
    type: 'bot',
    content: response,
    timestamp: new Date(),
    quickReplies: awaitingEmail ? undefined : quickReplies,
   };

   setMessages((prev) => [...prev, botMessage]);
   setIsTyping(false);
  }, 800);
 };

 return (
  <>
   {/* Chat Button */}
   <button
    onClick={() => setIsOpen(!isOpen)}
    className={`fixed bottom-3 md:bottom-6 right-6 z-50 w-8 h-8 md:w-14 md:h-14 shadow-lg transition-all duration-300 overflow-hidden flex items-center justify-center ${
     isOpen
      ? 'bg-[#111111]'
      : 'bg-[#2F8E92] hover:scale-105'
    }`}
    aria-label={isOpen ? 'Close chat' : 'Open chat'}
   >
    {isOpen ? (
     <X className="w-5 h-5 text-white" strokeWidth={1.5} />
    ) : (
     <img
       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJYryexF2MYIbDz55GzAvLsZOekH3kEzFwHQ&s"
       alt="Chat"
       className="w-full h-full object-cover"
     />
    )}
   </button>

   {/* Chat Window */}
   <div
    className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-white shadow-2xl transition-all duration-500 overflow-hidden ${
     isOpen
      ? 'opacity-100 translate-y-0 pointer-events-auto'
      : 'opacity-0 translate-y-4 pointer-events-none'
    }`}
   >
    {/* Header */}
    <div className="bg-[#111111] text-white px-5 py-4">
     <div className="flex items-center justify-between">
      <div>
       <h4 className="font-medium text-sm">Veloré Client Desk</h4>
       <p className="text-xs text-white/60 mt-0.5">Typically responds within minutes</p>
      </div>
      <div className="w-2 h-2 bg-[#2F8E92]" />
     </div>
    </div>

    {/* Messages */}
    <div className="h-[320px] overflow-y-auto px-4 py-4 bg-[#F6F7F9]">
     {messages.map((message) => (
      <div key={message.id} className="mb-4">
       <div
        className={`flex ${
         message.type === 'user' ? 'justify-end' : 'justify-start'
        }`}
       >
        <div
         className={`max-w-[85%] px-4 py-3 text-sm ${
          message.type === 'user'
           ? 'bg-[#2F8E92] text-white -md'
           : 'bg-white text-[#111111] -md shadow-sm'
         }`}
        >
         {message.content}
        </div>
       </div>

       {/* Quick Replies */}
       {message.quickReplies && message.type === 'bot' && (
        <div className="flex flex-wrap gap-2 mt-3 ml-1">
         {message.quickReplies.map((reply) => (
          <button
           key={reply}
           onClick={() => handleQuickReply(reply)}
           className="flex items-center gap-1 px-3 py-1.5 bg-white border border-[#EAEAEA] text-xs text-[#111111] hover:border-[#2F8E92] hover:text-[#2F8E92] transition-colors"
          >
           {reply}
           <ChevronRight className="w-3 h-3" />
          </button>
         ))}
        </div>
       )}
      </div>
     ))}

     {/* Typing Indicator */}
     {isTyping && (
      <div className="flex justify-start mb-4">
       <div className="bg-white px-4 py-3 -md shadow-sm">
        <div className="flex gap-1">
         <span className="w-1.5 h-1.5 bg-[#6B7280] animate-bounce" style={{ animationDelay: '0ms' }} />
         <span className="w-1.5 h-1.5 bg-[#6B7280] animate-bounce" style={{ animationDelay: '150ms' }} />
         <span className="w-1.5 h-1.5 bg-[#6B7280] animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
       </div>
      </div>
     )}

     <div ref={messagesEndRef} />
    </div>

    {/* Input */}
    <form onSubmit={handleSubmit} className="px-4 py-3 bg-white border-t border-[#EAEAEA]">
     <div className="flex items-center gap-2">
      <input
       ref={inputRef}
       type="text"
       value={inputValue}
       onChange={(e) => setInputValue(e.target.value)}
       placeholder={awaitingEmail ? 'Enter your email...' : 'Type your message...'}
       className="flex-1 px-4 py-2.5 bg-[#F6F7F9] text-sm text-[#111111] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#2F8E92]/20"
      />
      <button
       type="submit"
       disabled={!inputValue.trim()}
       className="flex items-center justify-center w-10 h-10 bg-[#2F8E92] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#267a7d] transition-colors"
      >
       <Send className="w-4 h-4" strokeWidth={1.5} />
      </button>
     </div>
    </form>
   </div>
  </>
 );
}
