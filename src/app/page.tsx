"use client";

import { useState } from "react";
import Message, { MessageInstance } from "@/components/Message";
import axios from "axios";

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

    const response = await axios
      .post(
        `${process.env.NEXT_PUBLIC_GEIST_SERVER}/chat`,

        { prompt: input }
      )
      .then((data) => {
        setMessages((prevState) => [
          ...prevState,
          { outbound: false, message: data.data.response },
        ]);
      });
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
