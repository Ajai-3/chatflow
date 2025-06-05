import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import app from "./app.js";
import { initSocket } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer(app);
initSocket(server, process.env.CLIENT_URL);

connectDB().then(() => {
  server.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Server running on http://localhost:${PORT}`);
    }
  });
});
