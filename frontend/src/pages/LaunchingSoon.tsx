import { ArrowLeft, Sparkles, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LaunchingSoon = () => {
  return (
    <div className="min-h-screen bg-gradient-deep flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div className="animate-float">
            <Sparkles className="w-24 h-24 mx-auto text-primary animate-glow" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-neural-pulse">
              Launching Soon
            </h1>
            <p className="text-2xl text-muted-foreground">
              Something amazing is coming...
            </p>
          </div>

          <div className="space-y-6 max-w-lg mx-auto">
            <p className="text-lg text-muted-foreground">
              We're working hard to bring you an incredible experience. 
              Stay tuned for updates and be the first to know when we launch!
            </p>
            
            <div className="flex items-center justify-center gap-2 text-accent">
              <Mail className="w-5 h-5" />
              <span className="text-sm">Follow us for updates</span>
            </div>
          </div>

          {/* Get Early Access */}
          <div className="pt-8">
            <Link to="/early-access">
              <Button variant="neural" size="lg" className="shadow-neural">
                Get Early Access
              </Button>
            </Link>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LaunchingSoon;