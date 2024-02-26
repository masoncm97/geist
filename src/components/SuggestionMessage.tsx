import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export interface SuggestionMessageProps {
  message: string;
  handleSubmit: (e, message) => Promise<void>;
  setInput: Dispatch<SetStateAction<string>>;
}

export default function SuggestionMessage({
  message,
  handleSubmit,
  setInput,
}: SuggestionMessageProps) {
  return (
    <div className="border-[1.5px] border-royalBlue w-[95%] m-auto h-[90%] p-2 rounded-2xl relative">
      <p className="text-royalBlue text-base mb-2">{message}</p>
      <button
        className={"absolute bottom-2 right-2"}
        type="submit"
        onClick={(e) => handleSubmit(e, message)}
      >
        <Image
          src="/transparent-arrow.png"
          alt="profile"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}
