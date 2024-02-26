import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

export interface MessageProps {
  className?: string;
  loading?: boolean;
  outbound?: boolean;
  message?: string;
}
export interface MessageInstance extends MessageProps {}

export default function Message({
  className,
  loading,
  outbound,
  message,
}: MessageProps) {
  const initial = useRef(true);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let delay = outbound ? 1000 : 2000;
    if (initial) {
      initial.current = false;
      intervalId = setInterval(() => {
        console.log("delivered");
        setUpdated(true);
      }, delay);
      if (updated) {
        clearInterval(intervalId);
      }
      return () => clearInterval(intervalId);
    }
  }, [updated]);

  return (
    <div
      key={`${updated}`}
      className={classNames(
        className,
        outbound ? "place-self-end" : "place-self-start",
        "max-w-[80%] mb-3 mx-1"
      )}
    >
      {loading && updated && <p>loading</p>}
      {message && (
        <>
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
          {outbound && updated && (
            <p className="text-xs text-end mr-1 mt-1 text-gray-400">
              Delivered
            </p>
          )}
        </>
      )}
    </div>
  );
}
