import { EnhancedButton } from "@/components/ui/enhanced-button";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Zap, Shield, TrendingUp, Users, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: ShoppingCart,
      title: "Smart POS System",
      description: "Lightning-fast checkout with intelligent inventory management"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time insights and comprehensive business reports"
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Build lasting relationships with powerful CRM tools"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Bank-grade security with 99.9% uptime guarantee"
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="container-fluid min-h-screen flex items-center justify-center">
        <div className="text-center space-y-8 max-w-4xl mx-auto animate-fade-in">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-bounce-slow">
              <Zap className="h-4 w-4" />
              Next-Generation POS Technology
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                POS System
              </span>
              <br />
              <span className="text-foreground">Pro Edition</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transform your business with our intelligent Point of Sale system. 
              Streamline operations, boost sales, and delight customers.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <EnhancedButton 
              variant="gradient" 
              size="xl" 
              onClick={() => navigate("/login")}
              className="min-w-[200px]"
            >
              Get Started
            </EnhancedButton>
            <EnhancedButton 
              variant="outline" 
              size="xl" 
              onClick={() => navigate("/signup")}
              className="min-w-[200px]"
            >
              Create Account
            </EnhancedButton>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container-fluid py-24 bg-muted/30">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold tracking-tight">
            Why Choose Our POS System?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to grow your business and enhance customer experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "card-premium p-8 text-center space-y-4 group hover:scale-105 transition-all duration-500 animate-slide-up",
                `stagger-${index + 1}`
              )}
            >
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
