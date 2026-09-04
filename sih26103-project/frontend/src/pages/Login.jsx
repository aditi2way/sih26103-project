import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Login attempted:", {
      email,
      password,
    });

    alert("Login button working!");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">
              PM
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-800">
            Project Monitor
          </h1>

          <p className="mt-2 text-slate-500">
            Integrated Project-Monitoring Platform
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-2xl font-bold text-slate-800">
            Welcome Back
          </h2>

          <p className="text-sm text-slate-500 mt-1 mb-6">
            Sign in to access the monitoring dashboard
          </p>

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg
                outline-none focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 transition"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg
                outline-none focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 transition"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700
              text-white font-semibold py-3 rounded-lg
              transition duration-200 shadow-md"
            >
              Sign In
            </button>

          </form>

          {/* Demo information */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 font-medium">
              SIH 26103 Prototype
            </p>

            <p className="text-xs text-blue-600 mt-1">
              Web-Based Integrated Project-Monitoring Platform
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