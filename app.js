const express = require("express");
const path = require("path")
const app = express();
const rout = require("./router/user.router");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(upload.any());
    
app.use(rout, express.static(path.join(process.cwd(), "public")))
app.set('views', path.join(process.cwd(), 'views'))
app.use(express.static(path.join(process.cwd(), "upload")))
app.set("view engine", "ejs");
app.use("/", rout)
const port = 8423
app.listen(port, "127.0.0.1", () => {
    console.log(`Server is running on http://localhost:${port}`);
})