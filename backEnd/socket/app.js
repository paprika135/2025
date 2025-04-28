import { Server } from "socket.io";

const io = new Server({
    cors:{
        origin:"http://localhost:5173",
    },
});

let onlineUser = [];

const addUser = (userId,socketId) =>{
    //找用户是否在线
    const userExits = onlineUser.find((user) => user.userId === userId);
    if(!userExits){//如果不在在线
        onlineUser.push({userId,socketId});//将用户id和socket连接的idpush到数组当中
    };

};

const removeUser = (socketId) =>{
    onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return onlineUser.find((user) =>user.userId === userId);
};

io.on("connection",(socket)=>{
    socket.on("newUser",(userId)=>{
        addUser(userId,socket.id);
    });

    socket.on("addMessage",({receiverId,data})=>{
        const receiver = getUser(receiverId);
        io.to(receiver.socketId).emit("getMessage",data);
    });


    socket.on("disconnect",()=>{
        removeUser(socket.id);
    });
});

io.listen("4000");