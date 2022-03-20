const http = require("http");
const app = require("./app");
const Contract = require("./models/contract");
const testNotif = require("./routes/notification");
require("dotenv").config();

// set the application port
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Define an error handler
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// create a server
const server = http.createServer(app);

// set the error handler and a event listener
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
  // var io = require("socket.io")(server, {
  //   cors: {
  //     origin: "*",
  //   },
  // });
  
  // io.on("connection",  function (socket)  {
  //    console.log("socket connected");
  //   socket.emit("test event", testNotif());
  // });
  testNotiff()
setInterval(() => {
  testNotiff()
},5000 );
});

// make server listen on port
server.listen(port);

let Arr =[];
async function testNotiff(){
  const moment = require("moment");
  const Contract = require("./models/contract");
  let currentDate = new Date();
  Contract.find({},async (err, contracts) =>  {
   Arr= contracts
 });
 let i =0;
 for (let contract of Arr){
   let ContractExpires_at = moment(contract["expires_at"]).format("YYYY-MM-DD");
   if (new Date(ContractExpires_at).getFullYear()-currentDate.getFullYear() == 0)
   {
     if(new Date(ContractExpires_at).getMonth()-currentDate.getMonth()<=2){
       i++;
       console.log(i)
        console.log("sending notification")
        Arr.splice(contract)
         //mail.sendNotification(contract);
     }
   }
 }
 
}
