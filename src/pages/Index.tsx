import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">POS System</h1>
        <p className="text-xl text-muted-foreground">Welcome to your Point of Sale Management System</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button variant="outline" onClick={() => navigate("/signup")}>Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
