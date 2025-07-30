import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Brain, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-neural.jpg";
import { useAuth } from "@/contexts/AuthContext";

const Hero = () => {
  const { requireAuth } = useAuth();
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-deep"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8 animate-neural-pulse">
          <Brain className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">The Ultimate Personalized AI Twin</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
          YoursAI
        </h1>
        
        <p className="text-2xl md:text-3xl mb-4 text-muted-foreground max-w-4xl mx-auto">
          Privacy-first AI that learns your tone, behavior, and decisions
        </p>
        
        <p className="text-lg mb-8 text-muted-foreground max-w-3xl mx-auto">
          Like having ChatGPT + Siri + Notion + your personal memory graph — all running locally, 
          never leaving your device. Your AI twin that thinks, speaks, and acts like you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button 
            variant="neural" 
            size="xl" 
            className="group"
            onClick={() => requireAuth(() => {
              // Scroll to demo section when user is authenticated
              document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
            })}
          >
            Experience the Demo
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="hero" 
                size="xl"
                onClick={(e) => {
                  requireAuth(() => {
                    // Dialog will open automatically if authenticated
                  });
                }}
              >
                Watch Vision Video
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full max-h-[80vh] p-0">
              <div className="relative aspect-video w-full bg-black rounded-lg overflow-hidden">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  preload="metadata"
                >
                  <source src="/Vision-video.mp4" type="video/mp4" />
                  <p className="text-white p-4">
                    Your browser doesn't support video playback. 
                    <a href="/Vision-video.mp4" className="text-primary underline ml-1">
                      Download the video
                    </a>
                  </p>
                </video>
              </div>
            </DialogContent>
          </Dialog>
        </div>



        {/* Key features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-glow transition-neural">
            <Shield className="w-8 h-8 text-primary mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Privacy-First</h3>
            <p className="text-sm text-muted-foreground">All data stays on your device. No cloud, no tracking, no compromise.</p>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-glow transition-neural">
            <Brain className="w-8 h-8 text-accent mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Learns You</h3>
            <p className="text-sm text-muted-foreground">Captures your writing style, decisions, and preferences automatically.</p>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-glow transition-neural">
            <Zap className="w-8 h-8 text-success mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Acts for You</h3>
            <p className="text-sm text-muted-foreground">Automates replies, emails, and decisions with your permission.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;