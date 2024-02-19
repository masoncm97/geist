export interface MessageProps {
  outbound: boolean;
  message: string;
}
export interface MessageInstance extends MessageProps {}

export default function Message({ outbound, message }: MessageProps) {
  console.log(message);
  console.log("fuck");
  return <div>{message}</div>;
}
