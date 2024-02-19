"use client";

import { useState } from "react";
import Message, { MessageInstance } from "@/components/Message";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<MessageInstance[]>([]);

  const handleSubmit = async (e) => {
    console.log(input);
    e.preventDefault();
    setMessages((prevState) => [
      ...prevState,
      { outbound: true, message: input },
    ]);
    setInput("");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="border border-black w-96 h-96 rounded-xl">
        {messages?.map((message, index) => (
          <Message
            key={index}
            outbound={message.outbound}
            message={message.message}
          />
        ))}
      </div>
      <form className="grid" onSubmit={handleSubmit}>
        <textarea
          value={input}
          placeholder="The artist is in..."
          className={"grid"}
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "The artist is in...")}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button className={"grid"} type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
