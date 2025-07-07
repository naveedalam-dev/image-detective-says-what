import { useState } from "react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { EnhancedInput } from "@/components/ui/enhanced-input";
import { Label } from "@/components/ui/label";
import { EnhancedCard, EnhancedCardContent, EnhancedCardDescription, EnhancedCardHeader, EnhancedCardTitle } from "@/components/ui/enhanced-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, UserCheck, ArrowRight } from "lucide-react";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && role) {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", email.split("@")[0]);
      navigate("/dashboard");
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-scale-in">
        <EnhancedCard variant="premium" size="lg">
          <EnhancedCardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full overflow-hidden shadow-lg border-4 border-white">
              <img 
                src="/Artboard 1.png" 
                alt="Wahab Kidney & General Hospital" 
                className="w-full h-full object-cover"
              />
            </div>
            <EnhancedCardTitle className="text-3xl">Welcome Back</EnhancedCardTitle>
            <EnhancedCardDescription className="text-base">
              Sign in to access Wahab Kidney & General Hospital system
            </EnhancedCardDescription>
          </EnhancedCardHeader>
          <EnhancedCardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="role" className="text-sm font-medium">User Role</Label>
                  <div className="mt-2">
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger className="h-12 rounded-xl border-2 border-border/50 hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="Select your role" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="pharmacist">Pharmacist</SelectItem>
                        <SelectItem value="cashier">Cashier</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <EnhancedInput
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="h-4 w-4" />}
                  variant="premium"
                  inputSize="lg"
                  required
                />
                
                <EnhancedInput
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="h-4 w-4" />}
                  variant="premium"
                  inputSize="lg"
                  required
                />
              </div>
              
              <EnhancedButton 
                type="submit" 
                variant="gradient" 
                size="lg" 
                className="w-full"
                loading={loading}
                disabled={!email || !password || !role}
              >
                {loading ? "Signing In..." : "Sign In"}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </EnhancedButton>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <EnhancedButton 
                    variant="link" 
                    className="p-0 h-auto font-medium text-primary hover:text-primary/80" 
                    onClick={() => navigate("/signup")}
                  >
                    Create one here
                  </EnhancedButton>
                </p>
              </div>
            </form>
          </EnhancedCardContent>
        </EnhancedCard>
      </div>
    </div>
  );
};

export default Login;