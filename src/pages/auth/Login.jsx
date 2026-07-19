import { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data.data);
      toast.success("Login Successful");

      if (res.data.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F1E9] flex">
      {/* Left */}

      <div className="hidden lg:flex w-1/2 bg-[#5C4033] rounded-r-[70px] items-center justify-center relative overflow-hidden">
        <div className="absolute w-80 h-80 rounded-full bg-[#708238]/20 -top-20 -left-20"></div>

        <div className="absolute w-60 h-60 rounded-full bg-white/10 bottom-10 right-10"></div>

        <div className="relative z-10 px-14">
          <h1 className="text-6xl font-bold text-white">EditFlow</h1>

          <p className="text-white/80 mt-6 leading-8 text-lg">
            Manage appointments, schedules and video editing workflow with one
            premium dashboard.
          </p>
        </div>
      </div>

      {/* Right */}

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white shadow-2xl rounded-[35px] w-full max-w-md p-10">
          <h2 className="text-4xl font-bold text-[#5C4033]">Welcome Back</h2>

          <p className="text-gray-500 mt-2">Login to continue</p>

          <div className="mt-8 space-y-5">
            {/* Email */}

            <div className="bg-[#F6F1E9] rounded-xl flex items-center px-4">
              <FiMail className="text-[#708238]" />

              <input
                ref={emailRef}
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent outline-none p-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    passwordRef.current.focus();
                  }
                }}
              />
            </div>

            {/* Password */}

            <div className="bg-[#F6F1E9] rounded-xl flex items-center px-4">
              <FiLock className="text-[#708238]" />

              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-transparent outline-none p-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="text-xl text-gray-500" />
                ) : (
                  <FiEye className="text-xl text-gray-500" />
                )}
              </button>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#708238] hover:bg-[#5C4033] transition text-white py-4 rounded-xl font-semibold"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

            <p className="text-center text-gray-600">
              Don't have an account?
              <Link
                to="/register"
                className="ml-2 font-semibold text-[#708238]"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
