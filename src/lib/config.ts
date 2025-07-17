export const API_BASE_URL = process.env.NEXT_PUBLIC_GEIST_SERVER || "http://localhost:8080";

export const API_ENDPOINTS = {
  chat: `${API_BASE_URL}/chat`,
  latestChat: `${API_BASE_URL}/latest-chat`,
  paginateChat: `${API_BASE_URL}/paginate-chat`,
} as const; 