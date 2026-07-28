import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function Register() {
  const [form, setForm] = useState({
    username: "",
    phone: "",
    email: "",
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

const handleSubmit = async (e) => {
  e.preventDefault();
if (!validate()) return;
  try {
    const response = await axios.post(
      `http://localhost:5000/register`,
      form
    );

    alert(response.data.message);
    setForm({
      username: "",
      phone: "",
      email: "",
      password: "",
    });

    setErrors({});

  } 
  catch (error) {
  console.log(error);
  console.log(error.response);
  console.log(error.response?.data);

  if (error.response?.data?.field) {
    setErrors((prev) => ({
      ...prev,
      [error.response.data.field]: error.response.data.message,
    }));
  } else {
    alert(error.response?.data?.message || "Something went wrong");
  }
}
  // catch (error) {
  //   if (error.response && error.response.data.field) {
  //     setErrors((prev) => ({
  //       ...prev,
  //       [error.response.data.field]: error.response.data.message,
  //     }));
  //   } else {
  //     alert("Something went wrong");
  //   }
  //   // alert(error.response.data.message);
  // }
};

  const validate = () => {
    let newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    }else if (!/^[A-Za-z][A-Za-z0-9_@.#*]{5,19}$/.test(form.username)) {
    newErrors.username ="Username must be 6-20 characters and contain only letters, numbers, and underscore";
  }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter valid 10-digit phone number";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter valid email";
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,20}$/.test(
      form.password
    )
  ) {
    newErrors.password =
      "Password must contain uppercase, lowercase, number and special character";
  }
    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
  <div className="register-page">
    <div className="register-card">
      <h2>🎮 Game Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <span className="error">{errors.username}</span>

        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />
        <span className="error">{errors.phone}</span>

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />
        <span className="error">{errors.email}</span>

        <br /><br />

        <input  className="password"
          // type="password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
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
        <span className="error">{errors.password}</span>

        <button className="register-btn" type="submit">
          Register
        </button>
      </form>
    </div>
  </div>
);

  // return (
  //   <div style={{ maxWidth: "400px", margin: "40px auto" }}>
  //     <h2>Register</h2>

  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         name="username"
  //         placeholder="Username"
  //         value={form.username}
  //         onChange={handleChange}
  //         required
  //       />
  //       <br />
  //       <span style={{ color: "red" }}>{errors.username}</span>

  //       <br /><br />

  //       <input
  //         type="text"
  //         name="phone"
  //         placeholder="Phone Number"
  //         value={form.phone}
  //         onChange={handleChange}
  //         required
  //       />
  //       <br />
  //       <span style={{ color: "red" }}>{errors.phone}</span>

  //       <br /><br />

  //       <input
  //         type="email"
  //         name="email"
  //         placeholder="Email"
  //         value={form.email}
  //         onChange={handleChange}
  //         required
  //       />
  //       <br />
  //       <span style={{ color: "red" }}>{errors.email}</span>

  //       <br /><br />

  //       <input
  //         type="password"
  //         name="password"
  //         placeholder="Password"
  //         value={form.password}
  //         onChange={handleChange}
  //         required
  //       />
  //       <br />
  //       <span style={{ color: "red" }}>{errors.password}</span>

  //       <br /><br />

  //       <button type="submit">Register</button>
  //     </form>
  //   </div>
  // );
}

export default Register;