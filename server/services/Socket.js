import io from "socket.io";

class Socket {
  static users = new Set();

  static init(server) {
    this.socket = io(server, {
      cors: {
        origin: "*",
      },
    });
    this.socket.on("connect", this.handleConnect);
  }

  static handleConnect = async (client) => {
    try {
      console.log('connect')
    } catch (e) {}
  };
}

export default Socket;
