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
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading,setLoading] = useState(false);
  const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://housiegame-61ai.onrender.com";

  const sendOtp = async () => {
    setErrors({})
    setLoading(true)
    try {
      const res = await axios.post(`${BASE_URL}/send-otp`,
        // "https://housiegame-production.up.railway.app/send-otp", 
        {
        login,
      });
      
      alert(res.data.message);
      setStep(2);
      // setErrors({"OTP sent to your email"}); // store email from backend
    } catch (err) {
    //  alert(err.response?.data?.message || "Error sending OTP");
    setErrors({
      server: err.response?.data?.message || "Error sending OTP"
    });
    }
    finally{
      setLoading(false);
    }
    // }
  };


  const verifyOtp = async () => {
    setErrors({});
    setLoading(true)
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
      setErrors({
      server: err.response?.data?.message || "Invalid OTP"
    });
    //  alert(err.response?.data?.message || "Invalid OTP");
    }
    finally{
      setLoading(false);
    }
  // }
  };

  const resetPassword = async () => {
    setErrors({});
    setSuccess("")
    setLoading(true)
    let newErrors = {};
    try {
      // Password pattern validation
    //   if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,20}$/.test(
    //     newPassword))
    //   {
    //     setErrors({server:"Password must contain uppercase, lowercase, number and special character (8-20 characters)"});
    //     setStep(3);
    // }

      if (newPassword !== confirmPassword) {
        // alert("password do not match")
        setErrors({server:"Passwords do not match"});            
      }

      const res = await axios.post(`${BASE_URL}/reset-password`,
        // "https://housiegame-production.up.railway.app/reset-password",
         {
        login,
        newPassword,
        confirmPassword,
      });
      setSuccess(res.data.message);
      // alert(res.data.message);
      setStep(1);
      setLogin("");
      setEmail("");
      setOtp("");
      setNewPassword("");
      setErrors({});
      setConfirmPassword("");
      navigate("/");
    } catch (err) {
      // alert(err.response.data.message);
      setErrors({
      server: err.response?.data?.message || "Error resetting password"
    });
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="forgot">
    <div className="forgot-card" style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Forgot Password</h2>
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
          <button onClick={sendOtp} disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}</button>
          <p className="error"> {errors.server}</p>
          <p className="error">{success}</p>
        </div>
      )}
      {step === 2 && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{position:"relative",zIndex:20}}
            required
          />
          <br /><br />
          <button onClick={verifyOtp} disabled={loading}>
            {loading ? "Verifing OTP..." : "Verify OTP"}
          </button>
              <p className="error"> {errors.server}</p>
              <p className="error">{success}</p>
        </div>
      )}
      {step === 3 && (
        <div>
        <div className="password-box">
          <input
            className="password"
          // type="password"
          type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={6}
            // style={{position:"relative",zIndex:20}}
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
          {/* <p className="error">{errors.newPassword}</p> */}
          <br />
          <input className="password"
          // type="password"
          type={showPass ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={6}
            // style={{position:"relative",zIndex:20}}
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
            {/* <p className="error">{errors.confirmPassword}</p> */}
          <br />
          <button onClick={resetPassword} disabled={loading}>
            {loading ? "Password Changing..." : "Password Change"}
          </button>
          <p className="error"> {errors.server}</p>
          <p className="error"> {success}</p>
        </div>
        </div>
      )}
    </div>
    
    </div>
  );
}
export default Forgot;