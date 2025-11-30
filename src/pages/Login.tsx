import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import campusBg from "@/assets/campus-bg.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/classes");
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-background">
      {/* Background Image - Right Side */}
      <div className="absolute inset-0 z-0">
        <img 
          src={campusBg} 
          alt="Campus" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-background/50" />
      </div>

      {/* School Logo - Top Right */}
      <div className="absolute top-6 right-8 z-20">
        <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-soft">
          <GraduationCap className="w-8 h-8 text-primary" />
          <span className="font-bold text-foreground">EduMonitor</span>
        </div>
      </div>

      {/* Curved Login Card - Left Side */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-xl flex items-center justify-center p-8"
      >
        {/* Organic Blob Shape */}
        <div className="relative">
          {/* Outer blob shadow */}
          <svg 
            viewBox="0 0 500 600" 
            className="absolute -inset-4 w-[520px] h-[620px] opacity-20 blur-xl"
          >
            <path 
              d="M50,100 Q20,250 80,400 Q120,520 250,550 Q400,580 450,450 Q490,300 450,150 Q400,30 250,20 Q100,10 50,100 Z"
              fill="hsl(var(--primary))"
            />
          </svg>
          
          {/* Main blob shape */}
          <svg 
            viewBox="0 0 500 600" 
            className="absolute inset-0 w-[500px] h-[600px]"
            style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.15))" }}
          >
            <defs>
              <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--card))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
              <filter id="innerShadow">
                <feOffset dx="0" dy="4" />
                <feGaussianBlur stdDeviation="8" result="offset-blur" />
                <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                <feFlood floodColor="black" floodOpacity="0.1" result="color" />
                <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                <feComposite operator="over" in="shadow" in2="SourceGraphic" />
              </filter>
            </defs>
            <path 
              d="M50,100 Q20,250 80,400 Q120,520 250,550 Q400,580 450,450 Q490,300 450,150 Q400,30 250,20 Q100,10 50,100 Z"
              fill="url(#blobGradient)"
              filter="url(#innerShadow)"
            />
          </svg>

          {/* Login Form Content */}
          <div className="relative z-10 w-[500px] h-[600px] flex items-center justify-center">
            <div className="w-full max-w-xs px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">School Login</h1>
                  <p className="text-muted-foreground text-sm">Enter your credentials to continue</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">School Login ID</label>
                    <Input
                      type="text"
                      placeholder="Enter your school ID"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      className="bg-background/60"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-background/60 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" variant="gradient" size="lg" className="w-full">
                    Login
                  </Button>
                </form>

                <div className="mt-6 text-center space-y-3">
                  <Link 
                    to="/teacher-login" 
                    className="block text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Login as Teacher
                  </Link>
                  <Link 
                    to="#" 
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="mt-10 text-center">
                  <p className="text-xs text-muted-foreground">
                    Powered by <span className="font-semibold">EduTech Solutions</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
