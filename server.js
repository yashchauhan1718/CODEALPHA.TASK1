const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/Images", express.static(path.join(__dirname, "Images")));
app.use(express.static(path.join(__dirname, "public", "images")));

let databaseProducts = [
    { id: 1, name: "Premium Wireless Headphones", price: "₹7,999", image: "headphones.jpg" },
    { id: 2, name: "Minimalist Smart Watch", price: "₹11,999", image: "watch.jpg" },
    { id: 3, name: "Ergonomic Gaming Mouse", price: "₹3,999", image: "gaming mouse.jpg" },
    { id: 4, name: "Mechanical Keyboard RGB", price: "₹6,999", image: "keyboard.jpg" },
    { id: 5, name: "UltraWide Gaming Monitor", price: "₹24,999", image: "monitor.jpg" }
];

let usersDatabase = [
    { email: "yash@gmail.com", password: "123" }
];

app.get("/api/products", (req, res) => {
    res.json(databaseProducts);
});

app.post("/api/register", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required!" });
    }
    const userExists = usersDatabase.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ success: false, message: "Email already registered!" });
    }
    usersDatabase.push({ email, password });
    res.json({ success: true, message: "Registration successful! Now you can login." });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const user = usersDatabase.find(u => u.email === email && u.password === password);
    if (user) {
        res.json({ success: true, message: `Login successful! Welcome ${email}`, userEmail: email });
    } else {
        res.status(401).json({ success: false, message: "Wrong email or password!" });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
XXXX
