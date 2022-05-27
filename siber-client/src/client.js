import { io } from "socket.io-client";


let socket = null
const useSocket = () => {
    socket = socket || io('http://localhost:3003')
    return socket
}


export default useSocket