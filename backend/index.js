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
const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");
const crypto = require("crypto");

dotenv.config();
const app = express();

// -------------------- DATABASE --------------------
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// -------------------- MAILER --------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// -------------------- MIDDLEWARE --------------------
app.use(cors({
  origin: [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://192.168.5.32:8080",
    "https://yoursai-6.onrender.com" // ✅ Your frontend hosted on Render
  ],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// -------------------- RAZORPAY --------------------
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/api/payment/create-order", async (req, res) => {
  try {
    const { email, amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    await pool.query(
      "INSERT INTO payments (order_id, email, amount, status) VALUES ($1, $2, $3, $4)",
      [order.id, email, amount, "created"]
    );

    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
});

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

// -------------------- EMAIL ROUTES --------------------
app.post("/api/demo", async (req, res) => {
  const { name, email, phone, company, message, date, time } = req.body;

  try {
    await transporter.sendMail({
      from: `"Demo Request" <${process.env.EMAIL}>`,
      to: process.env.NOTIFY_EMAIL,
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
    });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("❌ Email error:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.post("/api/fulldemo", async (req, res) => {
  try {
    const { name, email, date, time, selectedDateTime, message } = req.body;
    if (!email) return res.status(400).json({ message: "User email missing" });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      cc: process.env.NOTIFY_EMAIL,
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
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Full Demo Email Error:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.NOTIFY_EMAIL,
      subject: `Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    });
    res.status(200).json({ message: "Contact message sent successfully" });
  } catch (error) {
    console.error("Error sending contact message:", error);
    res.status(500).json({ message: "Failed to send contact message" });
  }
});

const upload = multer({ storage: multer.memoryStorage() });
app.post("/api/apply", upload.single("resume"), async (req, res) => {
  const { name, email, phone, cgpa, experience, position } = req.body;
  const resume = req.file;

  if (!name || !email || !resume || !position) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await transporter.sendMail({
      from: `"Job Application" <${process.env.EMAIL}>`,
      to: process.env.NOTIFY_EMAIL,
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
    });
    res.status(200).json({ message: "Application sent successfully!" });
  } catch (error) {
    console.error("Error sending application email:", error);
    res.status(500).json({ message: "Failed to send application email" });
  }
});

// -------------------- JWT HELPERS --------------------
const generateToken = (user) =>
  jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

const authenticateToken = (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// -------------------- PASSPORT GOOGLE --------------------
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;

        let user = (
          await pool.query("SELECT * FROM users WHERE email = $1", [email])
        ).rows[0];
        if (!user) {
          user = (
            await pool.query(
              "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
              [name, email]
            )
          ).rows[0];
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.email));
passport.deserializeUser(async (email, done) => {
  try {
    const user = (
      await pool.query("SELECT * FROM users WHERE email = $1", [email])
    ).rows[0];
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// -------------------- AUTH ROUTES --------------------
app.post("/signup", async (req, res) => {
  const { name, email, password, phone = null } = req.body;
  try {
    const exists = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Incorrect password" });

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400000,
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/auth/user", authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;
    const user = (
      await pool.query(
        "SELECT id, name, email, phone FROM users WHERE email = $1",
        [email]
      )
    ).rows[0];

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error("Fetch user error:", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

app.get("/api/auth/logout", (req, res) => {
  res.clearCookie("token");
  req.logout(() => {
    res.status(200).json({ message: "Logged out" });
  });
});

app.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = generateToken(req.user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 86400000,
    });
    res.redirect(`http://192.168.5.32:8080/auth?token=${token}`);
  }
);

// -------------------- SERVER --------------------
app.get("/", (req, res) => res.send("✅ Auth Backend Working"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Auth server running at http://localhost:${PORT}`)
);
