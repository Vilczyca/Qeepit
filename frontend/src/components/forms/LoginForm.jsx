import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../contexts/LoginContext";
import axios from "axios";
import "../../styles/forms.css";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async (type) => {
    setErrors({});
    setInfoMessage("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (type === "register") {
        // Rejestracja
        await axios.post(
          `${backendURL}/auth/register`,
          {
            email: formData.email,
            password: formData.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setInfoMessage("Registration successful. You can now sign in.");
      } else {
        // Logowanie
        const params = new URLSearchParams();
        params.append("username", formData.email);
        params.append("password", formData.password);

        const response = await axios.post(
          `${backendURL}/auth/login`,
          params.toString(),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        login(response.data.access_token);
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ form: error.response.data.detail || "Operation failed" });
      } else {
        setErrors({ form: "Network error" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Sign In</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAuth("login");
        }}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
            placeholder="Enter your email"
            autoComplete="email"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "input-error" : ""}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>
        {errors.form && <div className="error-message form-error">{errors.form}</div>}
        {infoMessage && <div className="info-message">{infoMessage}</div>}
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button
            type="submit"
            className="primary-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
          <button
            type="button"
            className="secondary-button"
            disabled={isSubmitting}
            onClick={() => handleAuth("register")}
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
}
