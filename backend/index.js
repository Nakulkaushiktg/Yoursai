// auth-server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

dotenv.config();
const app = express();
const nodemailer = require("nodemailer");
// --- DATABASE ---
// --- DATABASE ---
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
const path = require('path');
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.use(cors({
  origin: ["http://localhost:8080", "http://127.0.0.1:8080", "http://192.168.5.32:8080"],
  credentials: true,
}));
app.use(express.json()); // ✅ MOVE THIS ABOVE THE ROUTE
const Razorpay = require("razorpay");
// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create Razorpay Order
app.post("/api/payment/create-order", async (req, res) => {
  try {
    const { email, amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    await pool.query(
      "INSERT INTO payments (order_id, email, amount, status) VALUES ($1, $2, $3, $4)",
      [order.id, email, amount, "created"]
    );

    res.json({
      success: true,
      order, // ✅ frontend expects order.id, order.amount, etc.
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
});


// ✅ Razorpay Webhook
app.post(
  "/api/payment/webhook",
  express.json({ verify: verifyRazorpaySignature }),
  async (req, res) => {
    const event = req.body;

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      try {
        await pool.query(
          "UPDATE payments SET status = $1 WHERE order_id = $2",
          ["paid", payment.order_id]
        );
        console.log("✅ Payment captured and updated in DB");
      } catch (err) {
        console.error("❌ DB update failed:", err);
      }
    }

    res.json({ status: "ok" });
  }
);

// ✅ Verify Razorpay Webhook Signature
function verifyRazorpaySignature(req, res, buf) {
  const expectedSignature = req.headers["x-razorpay-signature"];
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(buf)
    .digest("hex");

  if (generatedSignature !== expectedSignature) {
    throw new Error("❌ Invalid webhook signature");
  }
}

app.use(cookieParser());

app.post("/api/demo", async (req, res) => {
  console.log("Demo Request received:", req.body); // log fields
  const { name, email, phone, company, message, date, time } = req.body;

  try {
    const mailOptions = {
      from: `"Demo Request" <${process.env.EMAIL}>`,
      to: "nakulkaushik777@gmail.com", // use direct email for testing
      subject: "New Demo Scheduled",
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${name || "N/A"}</p>
        <p><strong>Email:</strong> ${email || "N/A"}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Date:</strong> ${date || "N/A"}</p>
        <p><strong>Time:</strong> ${time || "N/A"}</p>
        <p><strong>Message:</strong><br/>${message || "N/A"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("❌ Email error:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.post("/api/fulldemo", async (req, res) => {
  console.log("API HIT ✅");
  console.log("Body:", req.body);
  try {
    const { name, email, date, time, selectedDateTime, message } = req.body;

    if (!email) {
      console.log("❌ Email missing in request body");
      return res.status(400).json({ message: "User email missing" });
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: email, // main user
      cc: "contact.yoursai@gmail.com", // ✅ your own email in CC
      subject: "Full Demo Scheduled ✔️",
      text: `
Hi ${name || "there"},

Your full demo has been scheduled successfully.

🗓️ Date: ${date}
⏰ Time: ${time}
📌 Combined: ${selectedDateTime}

We'll follow up with you shortly.

Thanks,  
Your Company Name
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to:", email, " | CC:", process.env.ADMIN_EMAIL);
    res.status(200).json({ message: "Email sent to user and admin successfully" });
  } catch (error) {
    console.error("❌ Full Demo Email Error:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});




// auth-server.js or wherever your routes are
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: 'nakulkaushik777@gmail.com', // Your receiving email
    subject: `Contact Form: ${subject}`,
    text: `
You have received a new contact message:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message:
${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Contact message sent successfully" });
  } catch (error) {
    console.error("Error sending contact message:", error);
    res.status(500).json({ message: "Failed to send contact message" });
  }
});


app.post("/api/apply", upload.single("resume"), async (req, res) => {
  const { name, email, phone, cgpa, experience, position } = req.body;
  const resume = req.file;

  if (!name || !email || !resume || !position) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const mailOptions = {
    from: `"Job Application" <${process.env.EMAIL}>`,
    to: process.env.NOTIFY_EMAIL || "your-email@gmail.com",
    subject: `New Application for ${position}`,
    html: `
      <h2>Application for ${position}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>CGPA:</strong> ${cgpa}</p>
      <p><strong>Experience:</strong> ${experience}</p>
    `,
    attachments: [
      {
        filename: resume.originalname,
        content: resume.buffer,
        contentType: resume.mimetype,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Application sent successfully!" });
  } catch (error) {
    console.error("Error sending application email:", error);
    res.status(500).json({ message: "Failed to send application email" });
  }
});


// --- MIDDLEWARE ---
app.use(cors({
  origin: ["http://localhost:8080","http://127.0.0.1:8080", "http://192.168.5.32:8080"],
  credentials: true,
}));



app.use(session({
  secret: process.env.SESSION_SECRET || process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());



// --- JWT HELPERS ---
const generateToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || (req.headers["authorization"]?.split(" ")[1]);
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// --- PASSPORT GOOGLE STRATEGY ---
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
callbackURL: "https://c13b2eb9fd3e.ngrok-free.app/auth/google/callback",

}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    const name = profile.displayName;

    let user = (await pool.query("SELECT * FROM users WHERE email = $1", [email])).rows[0];
    if (!user) {
      user = (await pool.query(
        "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
        [name, email]
      )).rows[0];
    }

    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user.email));
passport.deserializeUser(async (email, done) => {
  try {
    const user = (await pool.query("SELECT * FROM users WHERE email = $1", [email])).rows[0];
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// --- ROUTES ---

// ✅ SIGNUP
app.post("/signup", async (req, res) => {
  const { name, email, password, phone = null } = req.body;

  try {
    const exists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (exists.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (name, email, password, phone) VALUES ($1, $2, $3, $4)",
      [name, email, hash, phone]
    );

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed" });
  }
});

// ✅ LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Incorrect password" });

    const token = generateToken(user);

    // ✅ Set cookie (optional)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400000,
    });

    // ✅ Return token in response too
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET CURRENT USER
app.get("/api/auth/user", authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;
    const user = (await pool.query(
      "SELECT id, name, email, phone FROM users WHERE email = $1",
      [email]
    )).rows[0];

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error("Fetch user error:", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

// ✅ LOGOUT
app.get("/api/auth/logout", (req, res) => {
  res.clearCookie("token");
  req.logout(() => {
    res.status(200).json({ message: "Logged out" });
  });
});

// ✅ GOOGLE AUTH
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = generateToken(req.user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 86400000,
    });

    // Optionally redirect with token in URL (for client to pick it up)
    res.redirect(`http://192.168.5.32:8080/auth?token=${token}`);
  }
);

// ✅ HOME
app.get("/", (req, res) => res.send("✅ Auth Backend Working"));

// ✅ SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Auth server running at http://localhost:${PORT}`)
);
