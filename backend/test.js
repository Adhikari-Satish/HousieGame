const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
// require("dotenv").config({ path: path.resolve(__dirname, ".env") });
require("dotenv").config();

// const PORT = 5000 || process.env.PORT;
const app = express();

app.use(cors({
    origin:[
      // "https://rare-encouragement-production-bd05.up.railway.app",
        "http://localhost:5173",
        "https://housiegame-1-yfid.onrender.com"
    ],
    credentials:true
}

));
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  // user: "postgres",
  // host: "localhost",
  // database: "gaming_db",   
  // password: "sqlgpm",
  // port: 5432,
  user: process.env.PGUSER,

  host: process.env.PGHOST,

  database: process.env.PGDATABASE,

  password: process.env.PGPASSWORD,

  port: process.env.PGPORT,

  ssl: process.env.NODE_ENV === "production" ? {
    rejectUnauthorized:false
  }: false,
});

pool.connect()
  .then(() => console.log("PostgreSQL Connected"))
  .catch((err) => console.log(err));

/* =========================
   REGISTER API
========================= */
app.post("/register", async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;
    // const userCheck = await pool.query(
    //   "SELECT * FROM humans WHERE username = $1",
    //   [username]
    // );
    // if (userCheck.rows.length > 0) {
    //   return res.status(400).json({
    //     field: "username",
    //     message: "Usename already exists"
    //   });
    // }
    const emailCheck = await pool.query(
      "SELECT * FROM humans WHERE email = $1",
      [email]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({
        field: "email",
        message: "Email already exists",
      });
    }

    const phoneCheck = await pool.query(
      "SELECT * FROM humans WHERE phone = $1",
      [phone]
    );

    if (phoneCheck.rows.length > 0) {
      return res.status(400).json({
        field: "phone",
  
        message: "Phone number already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    await pool.query(
      "INSERT INTO humans(username, phone, email, password) VALUES($1,$2,$3,$4)",
      [username, phone, email, hashedPassword]
    );

    // res.status(201).json({
    //   message: "Registration Successful"
    // });
    res.json({
      message: "Registration Successful",
    });

  } 
  catch (err) {
  console.error("Registration Error:");
  console.error(err);
  console.error(err.message);
  console.error(err.stack);
  console.log(req.body);

  res.status(500).json({
    message: err.message
  });
}
  // catch (err) {
  //   console.log(err);
  //   res.status(500).json({
  //     message: "Server Error"
  //   });
  // }
});

/* =========================
   LOGIN API
========================= */
app.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;

    // find user by email or phone
    const result = await pool.query(
      "SELECT * FROM humans WHERE email=$1 OR phone=$1",
      [login]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const user = result.rows[0];

    // compare password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    res.status(200).json({
      message: "Login Successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

// const apikey = process.env.API_KEY;
const nodemailer = require("nodemailer");
// const { Resend } = require("resend");

// const resend = new Resend("REMOVED_SECRET");
let otpStore = {};
const axios = require("axios");
// const { json } = require("stream/consumers");
const gmailUser = process.env.GMAIL_USER;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailUser,
    pass: gmailAppPassword
  }
});

// const twilio = require("twilio");

// const client = twilio(
//     process.env.TWILIO_ACCOUNT_SID,
//     process.env.TWILIO_AUTH_TOKEN
// );
app.post("/send-otp", async (req, res) => {
  try {
    const { login } = req.body;
    const user = await pool.query(
      "SELECT * FROM humans WHERE email=$1 OR phone=$1",
      [login]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const dbUser = user.rows[0];

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[login] = {otp,expiresAt: Date.now() + 5 * 60 * 1000};
    // console.log("Generated OTP:", otp);
    // const isEmail = login.includes("@");
    // if (isEmail) {
    try {
      await transporter.sendMail({
        from: gmailUser,
        to: dbUser.email,
        subject: "OTP Verification",
        // text: `Your OTP is ${otp}`
         html: `
        <h2>OTP Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>Valid for 5 minutes</p>`
      });
      // console.log("Email OTP sent")
      return res.json({
        message: "OTP sent to email successfully"
      });
    }
    catch (mailErr) {
      // console.log("Email Error:", mailErr.message);
      return res.status(500).json({
        message: "Failed to send OTP. Check Gmail."
      });
    }
  // else{
  //   // SMS otp sending using Fast2SMS
  //   try {
  //     await axios.post(
  //       "https://www.fast2sms.com/dev/bulkV2",
  //       {
  //         route: "q",
  //         message: `Your OTP is ${otp}`,
  //         language: "english",
  //         numbers: String(dbUser.phone)
  //       },
  //       {
  //         headers: {
  //           // authorization: "a2IWsP6L74TKbVtqiYVMCR3RwbphmHBKQEl2YoDELDnjycr1weEFk0v6wi4C",
  //           authorization: process.env.FAST2SMS_API_KEY,
  //           "Content-Type": "application/json"
  //         }
  //       }
  //     );
  //     console.log("SMS OTP sent");
  //     return res.json({
  //         message:"OTP sent to email successfully"
  //       });
  //   }    
  //   catch (smsErr) {
  //     console.log("SMS failed:", smsErr.message);
  //     return res.status(500).json({
  //         message:"Failed to send SMS OTP"
  //       });
  //   }
  // }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error"
    });
  }
});

app.post("/verify-otp", (req, res) => {
  const { login, otp } = req.body;

  const record = otpStore[login];

  if (!record) {
    return res.status(400).json({
      message: "OTP not found"
    });
  }

  if (Date.now() > record.expiresAt) {
    delete otpStore[login];

    return res.status(400).json({
      message: "OTP expired"
    });
  }

  if (record.otp !== otp) {
    return res.status(400).json({
      message: "Invalid OTP"
    });
  }

  res.json({
    message: "OTP Verified"
  });
});

app.post("/reset-password", async (req, res) => {
  try {
    const {
      login,
      newPassword,
      confirmPassword
    } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match"
      });
    }

    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    await pool.query(
      `UPDATE humans
       SET password=$1
       WHERE email=$2 OR phone=$2`,
      [hashedPassword, login]
    );

    delete otpStore[login];

    res.json({
      message: "Password updated successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error"
    });
  }
});
/* =========================
   SERVER START
========================= */


// const PORT = process.env.PORT || 5000;

app.get("/", (req,res)=>{
    res.status(200).json({
        message:"Housie Backend Running"
    });
});

app.get("/health", (req,res)=>{
    res.json({
        status:"OK"
    });
});

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// "lint": "eslint .",   frontend
// "test": "echo \"Error: no test specified\" && exit 1" backend
