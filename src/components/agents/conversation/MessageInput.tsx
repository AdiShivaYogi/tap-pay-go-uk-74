
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Mic } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  isListening: boolean;
}

export const MessageInput = ({ onSendMessage, isListening }: MessageInputProps) => {
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput("");
  };

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage();
      }}
      className="flex items-center gap-2"
    >
      <Button
        type="button"
        size="icon"
        variant="outline"
        className={`shrink-0 ${isListening ? 'bg-red-100 text-red-600 border-red-300' : ''}`}
        disabled={true} // Butonul e dezactivat pentru demo
      >
        <Mic className="h-4 w-4" />
      </Button>
      
      <Textarea 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Scrie un mesaj sau vorbește folosind butonul de ascultare..."
        className="min-h-[44px] flex-1 resize-none"
        disabled={isListening}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      
      <Button
        type="submit"
        size="icon"
        className="shrink-0"
        disabled={isListening || !input.trim()}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
