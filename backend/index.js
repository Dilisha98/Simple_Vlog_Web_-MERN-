const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const Post = require('./models/Post.js')
const cookieParser = require('cookie-parser');
const User = require('./models/User.js');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/'});
const fs = require('fs');


const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json());

const SECRET_KEY = "your_jwt_secret_key"; // Change this to a strong secret key

mongoose.connect('mongodb+srv://dilishaother98:DB8MLILuFZYp1vXn@cluster0.ihx30.mongodb.net/Vlog_app?retryWrites=true&w=majority&appName=Cluster0');

// User Registration Route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const saltRounds = 4; // Recommended security level
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userDoc = await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully", user: userDoc });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// User Login Route with Cookie
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({ username });
        if (!userDoc) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, userDoc.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: userDoc._id, username: userDoc.username }, SECRET_KEY, {
            expiresIn: "1h", // Token expires in 1 hour
        });

        // Set the token in an HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true, // Prevents JavaScript access for security
            secure: true,   // Ensures cookie is sent over HTTPS (use false for development)
            sameSite: "strict", // Prevents CSRF attacks
            maxAge: 3600000, // 1 hour expiry in milliseconds
        });

        res.json({ message: "Login successful", user: userDoc });
    } catch (e) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
  
    if (!token) {
      return res.json({ username: null }); // No token, return null
    }
  
    jwt.verify(token, SECRET_KEY, {}, (err, userInfo) => {
      if (err) {
        return res.json({ username: null }); // Token expired or invalid, return null
      }
      res.json(userInfo); // Return user info if token is valid
    });
  });
  ;
  

// Logout Route (to clear the cookie)
app.post("/logout", (req, res) => {
    res.clearCookie("token"); // Clear the token cookie on logout
    res.sendStatus(200); // Respond with success
  });
  

  app.post('/post', uploadMiddleware.single('image'), async (req,res) =>{
    const {originalname} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  

  const {title,description} = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover:newPath

  });
  
   
  });



 
// Middleware to Verify Token
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ error: "Access denied. No token provided." });

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        req.user = verified; // Attach user data to request
        next();
    } catch (e) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
};



app.listen(5000, () => {
    console.log("Server running on port 5000");
});
