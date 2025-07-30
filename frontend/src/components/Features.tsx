import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  Mic, 
  MessageSquare, 
  Shield, 
  Brain,
  Smartphone,
  Chrome,
  Mail,
  Calendar,
  ArrowRight
} from "lucide-react";

const Features = () => {
  const coreModules = [
    {
      icon: <Database className="w-8 h-8" />,
      title: "Personal Context Collector",
      description: "Chrome Extension, WhatsApp Bot, Mobile App capture your digital life",
      features: ["Notes, emails, chats", "Search & browsing history", "Liked, saved, shared media"],
      color: "text-primary"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Memory Engine",
      description: "Semantic database stores and retrieves your personal context",
      features: ["Vector search similarity", "Short/long-term memory", "Privacy-first local storage"],
      color: "text-accent"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Personalized LLM",
      description: "Local AI fine-tuned on your communication patterns",
      features: ["Responds in your tone", "Personalized summaries", "Your writing style"],
      color: "text-success"
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Voice Assistant Layer",
      description: "Like Siri, but trained on your life and preferences",
      features: ["Voice-powered commands", "Context-aware responses", "Natural conversations"],
      color: "text-primary"
    }
  ];

  const features = [
    {
      icon: <Chrome className="w-6 h-6" />,
      title: "Smart WhatsApp Responder",
      description: "Auto-replies with your permission in your style"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Call Screener & Picker",
      description: "Android permission-based call management"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Mail Summarizer & Drafter",
      description: "Contextual email responses and summaries"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Contextual Reminders",
      description: "\"You liked this post last week. Want to revisit?\""
    }
  ];

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Core Modules
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Five powerful components working together to create your perfect AI twin
          </p>
        </div>

        {/* Core Modules Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {coreModules.map((module, index) => (
            <Card key={index} className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-neural group">
              <div className={`${module.color} mb-6 group-hover:animate-neural-pulse`}>
                {module.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{module.title}</h3>
              <p className="text-muted-foreground mb-6">{module.description}</p>
              <ul className="space-y-2">
                {module.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Key Features */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-6">Powerful Features</h3>
          <p className="text-muted-foreground mb-8">Real-world automation that actually works for you</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-card/30 border-border/50 hover:bg-card/50 transition-neural group">
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h4 className="font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Privacy Callout */}
        <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 text-center">
          <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Privacy-First Architecture</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            All data lives on your device. No cloud lock-in, no data selling, no compromises. 
            Your AI twin knows you completely while keeping everything completely private.
          </p>
            <a href="/privacy">
              <Button variant="neural" className="group">
                Learn About Our Privacy
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
        </Card>
      </div>
    </section>
  );
};

export default Features;