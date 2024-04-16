import classNames from "classnames";
import { ThemeType } from "@/providers/ThemeProvider";
import { MessageProps } from "@/types/message";

export function Message({
  className,
  outbound,
  message,
  currentTheme,
}: MessageProps) {
  return (
    <>
      <div
        className={classNames(
          outbound
            ? "bg-royalBlue text-white"
            : currentTheme == ThemeType.Dark
            ? "bg-opacity-15 bg-white text-gray-400"
            : "bg-opacity-5 bg-black text-gray-400",
          "rounded-3xl py-3 px-3",
          className
        )}
      >
        {message}
      </div>
      {outbound && (
        <p className="text-xs text-end mr-1 mt-1 text-gray-400 mb-2">
          Delivered
        </p>
      )}
    </>
  );
}
