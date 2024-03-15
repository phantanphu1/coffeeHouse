import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import * as dotenv from "dotenv";
import { services } from "./services";
import configLoginWithGoogle from "./services/social/facebook/controller";
import { configPassport } from "./config";
const app = express();
const swaggerUi = require("swagger-ui-express");
const documentation = require("./libs/swagger/rule.json");


app.use("/docs", swaggerUi.serve, swaggerUi.setup(documentation));

createConnection()
  .then(async (connection) => {
    dotenv.config();
    app.use(bodyParser.json());

    app.use(cors({
      origin: '*',
      methods: '*',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    }));
    app.use(cors());
    app.use("/api", services);
    app.use(express.json());
    // app.listen(process.env.PORT);

    //socket.io
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });

    var server = app.listen(process.env.PORT);
    const { Server } = require("socket.io");
    const io = new Server(server);

    io.on("connection", (socket) => {
      console.log(`User Connected:`, socket.id);
      socket.on('on-chat', data => {
        io.emit('user-chat', data)
      })
      socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
      });
      // thong bao khi co tin nhan
      socket.on("message", (message) => {
        console.log("vào", message);

        socket.to(message.receiver_id.toString()).emit("message", message);
      })

    });

    console.log("DSC backend server has started. PORT: ", process.env.PORT);
    configPassport();
    configLoginWithGoogle();
  })
  .catch((error: any) => console.log("lỗi", error));
