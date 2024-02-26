import classNames from "classnames";
import { useContext, useEffect, useRef, useState } from "react";
import MessageLoad from "./MessageLoad";
import { skip } from "node:test";
import { ThemeContext, ThemeType } from "@/providers/ThemeProvider";

export interface MessageProps {
  className?: string;
  loading?: boolean;
  outbound?: boolean;
  handleUpdate?: () => void;
  skipUpdate?: boolean;
  message?: string;
}
export interface MessageInstance extends MessageProps {}

export default function Message({
  className,
  loading,
  outbound,
  handleUpdate,
  skipUpdate = false,
  message,
}: MessageProps) {
  const [updated, setUpdated] = useState(false);
  const theme = useContext(ThemeContext);
  const currentTheme = theme?.themeType;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let delay = outbound || skipUpdate ? 1000 : 2000;
    intervalId = setInterval(() => {
      setUpdated(true);
      if (handleUpdate) handleUpdate();
    }, delay);
    if (updated) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [updated]);

  return (
    <div
      className={classNames(
        className,
        outbound ? "place-self-end" : "place-self-start",
        "max-w-[80%] mx-1"
      )}
    >
      {loading && updated && <MessageLoad />}
      {message && (
        <>
          <div
            className={classNames(
              outbound
                ? "bg-royalBlue text-white"
                : currentTheme == ThemeType.Dark
                ? "bg-opacity-15 bg-white text-gray-400"
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
