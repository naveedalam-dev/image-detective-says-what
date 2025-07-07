import { EnhancedButton } from "@/components/ui/enhanced-button";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Zap, Shield, TrendingUp, Users, BarChart3, ArrowRight, Star, CheckCircle, Play, Award, Globe, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: ShoppingCart,
      title: "Smart POS System",
      description: "Lightning-fast checkout with intelligent inventory management and real-time analytics",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time insights with AI-powered forecasting and comprehensive business intelligence",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Build lasting relationships with powerful CRM tools and loyalty programs",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with 99.9% uptime guarantee and SOC 2 compliance",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users", icon: Users },
    { number: "99.9%", label: "Uptime", icon: Shield },
    { number: "24/7", label: "Support", icon: Star },
    { number: "150+", label: "Countries", icon: Globe }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Pharmacy Owner",
      company: "HealthCare Plus",
      content: "This POS system transformed our business operations. Sales increased by 40% in just 3 months!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Operations Manager",
      company: "MediStore Chain",
      content: "The analytics and reporting features are incredible. We can make data-driven decisions instantly.",
      rating: 5
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Chief Pharmacist",
      company: "Community Pharmacy",
      content: "User-friendly interface and powerful features. Our staff learned it in just one day!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container-fluid flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg">
              <ShoppingCart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              POS Pro
            </span>
          </div>
          <div className="flex items-center gap-4">
            <EnhancedButton 
              variant="ghost" 
              onClick={() => navigate("/login")}
              className="hidden sm:flex"
            >
              Sign In
            </EnhancedButton>
            <EnhancedButton 
              variant="gradient" 
              onClick={() => navigate("/signup")}
            >
              Get Started
            </EnhancedButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-primary rounded-full opacity-10 blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-success rounded-full opacity-10 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container-fluid relative">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary text-sm font-medium animate-bounce-slow border border-primary/20">
              <Zap className="h-4 w-4" />
              <span>Trusted by 50,000+ businesses worldwide</span>
              <Award className="h-4 w-4" />
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="block">The Future of</span>
                <span className="bg-gradient-primary bg-clip-text text-transparent block">
                  Point of Sale
                </span>
                <span className="block text-foreground">is Here</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Transform your business with our AI-powered POS system. 
                Streamline operations, boost sales by 40%, and delight customers 
                with the most advanced retail technology.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <EnhancedButton 
                variant="gradient" 
                size="xl" 
                onClick={() => navigate("/signup")}
                className="min-w-[220px] group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </EnhancedButton>
              <EnhancedButton 
                variant="outline" 
                size="xl" 
                className="min-w-[220px] group"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </EnhancedButton>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8">
              <p className="text-sm text-muted-foreground mb-6">Trusted by leading businesses</p>
              <div className="flex items-center justify-center gap-8 opacity-60">
                {['Microsoft', 'Google', 'Amazon', 'Apple', 'Meta'].map((company, index) => (
                  <div key={index} className="text-lg font-semibold">
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container-fluid">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={cn(
                  "text-center space-y-3 animate-slide-up",
                  `stagger-${index + 1}`
                )}
              >
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg">
                  <stat.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container-fluid">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Star className="h-4 w-4" />
              Premium Features
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Why Choose Our POS System?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful features designed to accelerate your business growth and enhance customer experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={cn(
                  "group relative p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slide-up",
                  `stagger-${index + 1}`
                )}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                     style={{ backgroundImage: `linear-gradient(135deg, var(--primary), var(--primary-foreground))` }}></div>
                
                <div className="relative space-y-6">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300",
                    feature.color
                  )}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/30">
        <div className="container-fluid">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Users className="h-4 w-4" />
              Customer Stories
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Loved by Businesses Worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how our POS system is transforming businesses across the globe
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={cn(
                  "card-premium p-8 space-y-6 hover:scale-105 transition-all duration-500 animate-slide-up",
                  `stagger-${index + 1}`
                )}
              >
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
        <div className="container-fluid relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of successful businesses using our POS system. 
              Start your free trial today and see the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <EnhancedButton 
                variant="gradient" 
                size="xl" 
                onClick={() => navigate("/signup")}
                className="min-w-[220px] group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </EnhancedButton>
              <EnhancedButton 
                variant="outline" 
                size="xl" 
                onClick={() => navigate("/login")}
                className="min-w-[220px]"
              >
                Sign In
              </EnhancedButton>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 bg-muted/30">
        <div className="container-fluid">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <ShoppingCart className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                POS Pro
              </span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <span>© 2024 POS Pro. All rights reserved.</span>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
                <a href="#" className="hover:text-primary transition-colors">Support</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;