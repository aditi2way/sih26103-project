import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  UserRound,
  Lock,
  Mail,
  ArrowRight,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: email,
        role: role,
      })
    );

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-7">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <ShieldCheck className="text-white" size={34} />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-800">
            Project Monitor
          </h1>

          <p className="mt-2 text-slate-500 text-sm">
            Integrated Project-Monitoring Platform
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Welcome Back
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Sign in to access your monitoring dashboard
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Select Role
            </label>

            <div className="grid grid-cols-2 gap-3">

              {/* Admin */}
              <button
                type="button"
                onClick={() => setRole("Admin")}
                className={
                  role === "Admin"
                    ? "p-3 rounded-xl border-2 border-blue-600 bg-blue-50 text-blue-700 transition flex items-center justify-center gap-2"
                    : "p-3 rounded-xl border-2 border-slate-200 text-slate-600 hover:border-slate-300 transition flex items-center justify-center gap-2"
                }
              >
                <ShieldCheck size={18} />
                <span className="font-medium">Admin</span>
              </button>

              {/* Project Officer */}
              <button
                type="button"
                onClick={() => setRole("Project Officer")}
                className={
                  role === "Project Officer"
                    ? "p-3 rounded-xl border-2 border-blue-600 bg-blue-50 text-blue-700 transition flex items-center justify-center gap-2"
                    : "p-3 rounded-xl border-2 border-slate-200 text-slate-600 hover:border-slate-300 transition flex items-center justify-center gap-2"
                }
              >
                <UserRound size={18} />
                <span className="font-medium">Officer</span>
              </button>

            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight size={18} />
            </button>

          </form>

          {/* Demo Information */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-xs text-blue-700 font-semibold">
              SIH 26103 • Prototype Demo
            </p>

            <p className="text-xs text-blue-600 mt-2">
              Demo credentials: enter any valid email and password.
            </p>

            <p className="text-xs text-blue-600 mt-1">
              Selected role: <strong>{role}</strong>
            </p>
          </div>

        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Smart India Hackathon 2026
        </p>

      </div>
    </div>
  );
}

export default Login;