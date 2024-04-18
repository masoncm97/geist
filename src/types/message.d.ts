export interface MessageProps {
  className?: string;
  loading?: boolean;
  outbound?: boolean;
  handleUpdate?: () => void;
  skipUpdate?: boolean;
  message?: string;
  currentTheme?: ThemeType;
  reference?: RefObject<HTMLDivElement>;
  setChatRef?: (node: HTMLDivElement | null, id: string) => void;
  id: number;
}

export interface ChatProps {
  name: string;
  promptLoading: boolean;
  responseLoading: boolean;
  className?: string;
  prompt?: string;
  response?: string;
  isPrompter?: boolean;
  setChatRef?: (node: HTMLDivElement | null, id: string) => void;
  id: number;
}

export interface Phone {
  name: string;
}

export interface MessageInstance extends MessageProps {}

export type ChatInstance = Pick<ChatProps, "id", "prompt", "response">;

// export interface ChatInstance {
//   id: number;
//   prompt: string;
//   response: string;
// }
