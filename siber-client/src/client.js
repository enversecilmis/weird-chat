import { io } from "socket.io-client";


let socket = null
const useSocket = () => {
    socket = socket || io('http://172.17.9.238:3003')
    return socket
}


export default useSocket