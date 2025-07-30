import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import { 
  Target, 
  Lightbulb, 
  Users, 
  TrendingUp,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Vision = () => {
  const { requireAuth } = useAuth();
  const navigate = useNavigate();

  const competitors = [
    {
      name: "Replika",
      description: "Chatbot friend, not utility",
      weakness: "No real-world automation"
    },
    {
      name: "HeyPi",
      description: "Emotionally intelligent, no real-world automation",
      weakness: "Limited practical applications"
    },
    {
      name: "Humane AI / Rabbit R1",
      description: "Hardware-dependent, not local-first",
      weakness: "Cloud lock-in, expensive hardware"
    }
  ];

  return (
    <section id="vision" className="py-24 px-6 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            The Vision
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building the future where AI truly understands and acts like you
          </p>
        </div>

        {/* Main Vision */}
        <Card className="p-8 mb-16 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center gap-4 mb-6">
            <Target className="w-8 h-8 text-primary" />
            <h3 className="text-2xl font-bold">Our Mission</h3>
          </div>
          <p className="text-lg mb-6">
            YoursAI is more than an assistant—it's your digital twin. A privacy-first, hyper-personalized AI that 
            learns your tone, behavior, and decision-making patterns to eventually act on your behalf across 
            WhatsApp, Gmail, Calendar, and beyond.
          </p>
          <div className="bg-card/50 p-4 rounded-lg border border-border/50">
            <p className="text-center font-semibold text-primary">
              🔥 YoursAI = ChatGPT + Siri + Notion + Memory Graph → Your complete digital clone
            </p>
          </div>
        </Card>

        {/* Market Gap */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-4 mb-6">
              <Lightbulb className="w-8 h-8 text-accent" />
              <h3 className="text-xl font-bold">Market Gap</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>Current assistants (Alexa, Siri) are generic, not personal</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>Journaling + Notes apps don't act for you</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>No one creates AI that learns from your actual life</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>Privacy-first approach is missing from the market</span>
              </li>
            </ul>
          </Card>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-4 mb-6">
              <TrendingUp className="w-8 h-8 text-success" />
              <h3 className="text-xl font-bold">YoursAI Advantage</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                <span>No cloud lock-in - everything runs locally</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                <span>Hyper-personalization through life pattern learning</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                <span>Real-world automation across platforms</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                <span>Privacy-first architecture with user control</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Competition Analysis */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Competitive Landscape</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {competitors.map((competitor, index) => (
              <Card key={index} className="p-6 bg-card/30 border-border/50">
                <h4 className="font-bold mb-2">{competitor.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{competitor.description}</p>
                <div className="bg-destructive/10 border border-destructive/20 p-3 rounded">
                  <p className="text-sm text-destructive">❌ {competitor.weakness}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>


        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-6">Join the AI Revolution</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be among the first to experience truly personalized AI. Your memory, your tone, your world—automated.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
<Button 
  variant="neural" 
  size="xl" 
  className="group"
  onClick={() => requireAuth(() => {
    console.log("Early access requested");
    navigate("/auth"); // ya koi aur path jaha le jaana chahte ho
  })}
>
  Get Early Access
  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</Button>

<Button 
  variant="hero" 
  size="xl"
  onClick={() => requireAuth(() => {
    console.log("Demo scheduled");
    navigate("/schedule-demo"); // ← ye le jaayega ScheduleDemo page pe
  })}
>
  Schedule Demo
</Button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;