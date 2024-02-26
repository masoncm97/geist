import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

export interface MessageProps {
  className?: string;
  outbound: boolean;
  message: string;
}
export interface MessageInstance extends MessageProps {}

export default function Message({
  className,
  outbound,
  message,
}: MessageProps) {
  const initial = useRef(true);
  const [delivered, setDelivered] = useState(false);
  useEffect(() => {
    if (outbound) {
      let intervalId: NodeJS.Timeout;
      if (initial) {
        initial.current = false;
        intervalId = setInterval(() => {
          console.log("delivered");
          setDelivered(true);
        }, 1000);
        if (delivered) {
          clearInterval(intervalId);
        }
      }
      return () => clearInterval(intervalId);
    }
  }, [delivered]);

  return (
    <div
      key={`${delivered}`}
      className={classNames(
        className,
        outbound ? "place-self-end" : "place-self-start",
        "max-w-[80%] mb-3 mx-1"
      )}
    >
      <div
        className={classNames(
          outbound
            ? "bg-royalBlue text-white"
            : "bg-opacity-5 bg-black text-gray-400",
          "rounded-3xl py-3 px-3"
        )}
      >
        {message}
      </div>
      {outbound && delivered && (
        <p className="text-xs text-end mr-1 mt-1 text-gray-400">Delivered</p>
      )}
    </div>
  );
}
