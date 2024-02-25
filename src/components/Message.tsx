import classNames from "classnames";

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
  console.log(message);
  return (
    <div
      className={classNames(
        className,
        outbound
          ? "bg-royalBlue text-white place-self-end"
          : "bg-opacity-5 bg-black text-gray-400 place-self-start",
        "rounded-3xl max-w-[80%] py-3 px-3 mb-3 mx-1"
      )}
    >
      {message}
    </div>
  );
}
