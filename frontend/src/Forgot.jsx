import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Forgot() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [login, setLogin] = useState(""); // email or phone
  const [email, setEmail] = useState(""); // actual email from backend
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [showPass, setShowPass] = useState(false)
  // const [errors, setErrors] = useState({});
  // const [loading,setLoading] = useState(false);
  const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://housiegame-61ai.onrender.com";

  // STEP 1 - SEND OTP
  // const urls = [
  // `http://localhost:5000/send-otp`,
  // `https://housiegame-production.up.railway.app/send-otp`
  // ];
  const sendOtp = async () => {
    // for (const url of urls) {
    // setErrors({})
    // setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/send-otp`,
        // "https://housiegame-production.up.railway.app/send-otp", 
        {
        login,
      });
      
      alert(res.data.message);
      setStep(2);
    //   setEmail(res.data.email); // store email from backend
    //   alert(res.data.message);
    //   setStep(2);
    } catch (err) {
      // alert(err.response.data.message);
  //     setErrors({
  //   server: err.response?.data?.message || "Something went wrong"
  // });
     alert(err.response?.data?.message || "Error sending OTP");
    }
    // }
  };

  // STEP 2 - VERIFY OTP
  // const urls1 = [
  // `http://localhost:5000/verify-otp`,
  // `https://housiegame-production.up.railway.app/verify-otp`
  // ];
  const verifyOtp = async () => {
    // for (const url of urls1) {
    // setErrors({})
    try {
      const res = await axios.post(`${BASE_URL}/verify-otp`,
        // "https://housiegame-production.up.railway.app/verify-otp", 
        {
        login,
        otp,
      });

      alert(res.data.message);
      setStep(3);
    } catch (err) {
      // alert(err.response.data.message);
  //     setErrors({
  //   server: err.response?.data?.message || "Invalid OTP"
  // });

     alert(err.response?.data?.message || "Invalid OTP");
    }
  // }
  };

  // const urls2 = [
  // `http://localhost:5000/reset-password`,
  // `https://housiegame-production.up.railway.app/reset-password`
  // ];

  // STEP 3 - RESET PASSWORD
  const resetPassword = async () => {
    // setErrors({})
    // let newErrors = {};
    // for (const url of urls2) {
    try {
      // Password pattern validation
    //   if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,20}$/.test(
    //     newPassword
    //   )) 
    //   {
    //   newErrors.newPassword=
    //     "Password must contain uppercase, lowercase, number and special character (8-20 characters)"
    // }

      if (newPassword !== confirmPassword) {
        alert("password do not match")
            
      }
      // setErrors(newErrors);
      // Stop API call if validation fails
      
      const res = await axios.post(`${BASE_URL}/reset-password`,
        // "https://housiegame-production.up.railway.app/reset-password",
         {
        login,
        newPassword,
        confirmPassword,
      });

      alert(res.data.message);
      setStep(1);
      setLogin("");
      setEmail("");
      setOtp("");
      setNewPassword("");
      setErrors({});
      setConfirmPassword("");
      navigate("/");
    } catch (err) {
      alert(err.response.data.message);
    //   setErrors({
    //   server: err.response?.data?.message || "Error resetting password"
    // });

    //  alert(err.response?.data?.message || "Error resetting password");
    }
  // }
  };

  return (
    <div className="forgot">
    <div className="forgot-card" style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Forgot Password</h2>

      {/* STEP 1 */}
      {step === 1 && (
        <div>
          <input
            type="text"
            placeholder="Enter Email or Phone"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <br /><br />
          <button onClick={sendOtp}>Send OTP</button>
          {/* <span className="error"> {errors.server}</span> */}
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <br /><br />
          <button onClick={verifyOtp}>Verify OTP</button>
              {/* <span className="error"> {errors.server}</span> */}
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div>
          <input
            className="password"
          // type="password"
          type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      paddingRight:"30px",
      right: "12px",
      paddingTop: "55px",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#38bdf8",
      fontSize: "18px"
    }}
  >
    {showPassword ? "🙈" : "👁️"}
  </span>
          <br />
          {/* <span className="error">{errors.newPassword}</span> */}
          <br />

          <input
            className="password"
          // type="password"
          type={showPass ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
           onClick={() => setShowPass(!showPass)}
           style={{
      position: "absolute",
      paddingRight:"30px",
      right: "12px",
      paddingTop: "55px",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#38bdf8",
      fontSize: "18px"
    }}
  >
    {showPass ? "🙈" : "👁️"}
  </span>
          <br />
            {/* <span className="error">{errors.confirmPassword}</span> */}
          <br />

          <button onClick={resetPassword}>Reset Password</button>
          {/* <span className="error"> {errors.server}</span> */}
        </div>
      )}
    </div>
    </div>
  );
}

export default Forgot;