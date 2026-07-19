import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import api from "../../services/api";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const rules = {
    length: formData.password.length >= 8,
    upper: /[A-Z]/.test(formData.password),
    lower: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[@$!%*?#&]/.test(formData.password),
    match:
      formData.password !== "" &&
      formData.password === formData.confirmPassword,
  };

  const handleRegister = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (!rules.match) {
      toast.error("Passwords do not match");
      return;
    }

    if (
      !rules.length ||
      !rules.upper ||
      !rules.lower ||
      !rules.number ||
      !rules.special
    ) {
      toast.error("Password does not satisfy all rules");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      toast.success("Registration Successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F1E9] flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-[#5C4033] rounded-r-[70px] items-center justify-center relative overflow-hidden">
        <div className="absolute w-80 h-80 bg-[#708238]/20 rounded-full -top-20 -left-20"></div>
        <div className="absolute w-64 h-64 bg-white/10 rounded-full bottom-10 right-10"></div>

        <div className="relative z-10 px-14">
          <h1 className="text-6xl font-bold text-white">EditFlow</h1>

          <p className="text-white/80 text-lg leading-8 mt-6">
            Create your account and manage appointments professionally.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="flex-1 flex justify-center items-center p-8">
        <div className="bg-white w-full max-w-xl rounded-[35px] shadow-2xl p-10">
          <h2 className="text-4xl font-bold text-[#5C4033]">Create Account</h2>

          <p className="text-gray-500 mt-2">Register to continue</p>

          <div className="space-y-5 mt-8">
            {/* NAME */}

            <div className="bg-[#F6F1E9] rounded-xl flex items-center px-4">
              <FiUser className="text-[#708238] text-xl" />

              <input
                ref={nameRef}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full bg-transparent outline-none p-4"
                onKeyDown={(e) => {
                  if (e.key === "Enter") emailRef.current.focus();
                }}
              />
            </div>

            {/* EMAIL */}

            <div className="bg-[#F6F1E9] rounded-xl flex items-center px-4">
              <FiMail className="text-[#708238] text-xl" />

              <input
                ref={emailRef}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full bg-transparent outline-none p-4"
                onKeyDown={(e) => {
                  if (e.key === "Enter") roleRef.current.focus();
                }}
              />
            </div>

            {/* ROLE */}

            <select
              ref={roleRef}
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-[#F6F1E9] rounded-xl p-4 outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") passwordRef.current.focus();
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {/* PASSWORD */}

            <div className="bg-[#F6F1E9] rounded-xl flex items-center px-4">
              <FiLock className="text-[#708238] text-xl" />

              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent outline-none p-4"
                onKeyDown={(e) => {
                  if (e.key === "Enter") confirmPasswordRef.current.focus();
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#708238]"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* CONFIRM PASSWORD */}

            <div className="bg-[#F6F1E9] rounded-xl flex items-center px-4">
              <FiLock className="text-[#708238] text-xl" />

              <input
                ref={confirmPasswordRef}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-transparent outline-none p-4"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRegister();
                }}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-[#708238]"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* PASSWORD RULES */}

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <p className={rules.length ? "text-green-600" : "text-red-500"}>
                {rules.length ? "✔" : "✖"} 8+ Characters
              </p>

              <p className={rules.upper ? "text-green-600" : "text-red-500"}>
                {rules.upper ? "✔" : "✖"} Uppercase
              </p>

              <p className={rules.lower ? "text-green-600" : "text-red-500"}>
                {rules.lower ? "✔" : "✖"} Lowercase
              </p>

              <p className={rules.number ? "text-green-600" : "text-red-500"}>
                {rules.number ? "✔" : "✖"} Number
              </p>

              <p className={rules.special ? "text-green-600" : "text-red-500"}>
                {rules.special ? "✔" : "✖"} Special Character
              </p>

              <p className={rules.match ? "text-green-600" : "text-red-500"}>
                {rules.match ? "✔" : "✖"} Password Match
              </p>
            </div>

            {/* REGISTER BUTTON */}

            <button
              type="button"
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-[#708238] hover:bg-[#5C4033] text-white py-4 rounded-xl font-semibold transition"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center text-gray-600">
              Already have an account?
              <Link to="/login" className="ml-2 text-[#708238] font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
