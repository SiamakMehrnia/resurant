import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const CORRECT_CODE = "12345";

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const expiry = localStorage.getItem("authExpiry");

    if (isAuthenticated && expiry) {
      const now = new Date().getTime();
      if (now < Number(expiry)) {
        router.push("/admin");
      } else {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("authExpiry");
      }
    }
  }, [router]);

  const handleLogin = () => {
    if (code === CORRECT_CODE) {
      const expiryTime = new Date().getTime() + 3 * 60 * 60 * 1000; // 3 ساعت
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("authExpiry", expiryTime.toString());
      router.push("/admin");
    } else {
      setError("Incorrect code. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter Admin Code"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
