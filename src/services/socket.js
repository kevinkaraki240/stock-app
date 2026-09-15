import { io } from "socket.io-client"

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"

// Tạo 1 instance duy nhất, dùng chung cho cả app thay vì mỗi component tự connect
export const socket = io(SOCKET_URL, {
  autoConnect: true,
})