import { Server as SocketIOServer } from "socket.io"
function initializeSocket(server) {
  const io = new SocketIOServer(server)
  const namespace1 = io.of("/test");
  namespace1.on("connection", (socket) => {
    socket.on("connectToSocket", (connectonId) => {
      console.log(connectonId);
      socket.join(`${connectonId}`)
    })
    socket.on("studentUpdateTest", (updateData) => {
      console.log(updateData);
      namespace1.to(`${updateData.testId}`).emit(`${updateData.action}`, updateData)
    })
    socket.on("teacherUpdateTest", (updateData) => {
      console.log(updateData);
      namespace1.to(`${updateData.testId}`).emit(`${updateData.action}`, updateData)
    })
  })
}
export { initializeSocket };
