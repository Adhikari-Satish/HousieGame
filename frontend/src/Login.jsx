import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import './index.css'

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    login: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false)

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.login.trim()) {
      newErrors.login = "Email or Phone Number is required";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
if (!validate()) return;
  try {
    const response = await axios.post(
      // `http://localhost:5000/login`,
      `https://housiegame-production.up.railway.app/login`,
      form
    );

    alert(response.data.message);

    console.log(response.data.user);
    navigate("/");

  } catch (error) {
    alert(error.response.data.message);
  }
};


  return (
    <div className="login-container">
    <div className="login-card">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          
          name="login"
          placeholder="Email or Phone Number"
          value={form.login}
          onChange={handleChange}
          required
        /> 
        <br />
        
        <span style={{ color: "red" }}>{errors.login}</span>

        <br /><br />

        <input className="password"
          // type="password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
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
        <span style={{ color: "red" }}>{errors.password}</span>

        <br /><br />

        <button className="login-btn" type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}

export default Login;