import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

import { 
  MessageSquare, 
  Mic, 
  Mail, 
  Calendar,
  Play,
  Pause,
  Volume2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Demo = () => {
  const navigate = useNavigate();
  const { requireAuth } = useAuth();
  const [activeDemo, setActiveDemo] = useState("chat");
  const [isPlaying, setIsPlaying] = useState(false);

  const demoData = {
    chat: {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Smart Chat Assistant",
      messages: [
        { type: "user", text: "Draft a reply to Sarah about the weekend plans" },
        { type: "ai", text: "Hey Sarah! Totally up for the hiking trip this weekend. I can bring snacks and my camera like last time. What time were you thinking? 😊", typing: true },
        { type: "user", text: "Make it more casual" },
        { type: "ai", text: "hey! weekend hike sounds perfect 👌 I'll grab snacks again. what time?", typing: true }
      ]
    },
    voice: {
      icon: <Mic className="w-5 h-5" />,
      title: "Voice Commands",
      transcript: "Send email to Nakul about yesterday's meeting...",
      response: "I'll draft an email to Nakul Kaushik about yesterday's meeting. Here's what I'm sending: 'Hi Nakul, Following up on our discussion yesterday about the Q4 roadmap...'"
    },
    email: {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Assistant",
      summary: "3 new emails requiring attention",
      emails: [
        { from: "team@company.com", subject: "Project Update Required", priority: "high", ai_summary: "Team needs your input on Q4 deliverables by Friday" },
        { from: "nikkikaushik41@gmail.com", subject: "Coffee this week?", priority: "medium", ai_summary: "Sarah wants to catch up over coffee, suggests Thursday afternoon" }
      ]
    }
  };

  return (
    <section id="demo" className="py-24 px-6 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            Experience YoursAI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            See how your AI twin learns your style and automates your digital life
          </p>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm text-accent font-medium">Live Demo Environment</span>
          </div>
        </div>

        <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
          <TabsList className="grid w-full md:w-fit md:mx-auto grid-cols-3 mb-8 bg-card/50 backdrop-blur-sm">
            <TabsTrigger 
              value="chat" 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setActiveDemo("chat")}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Chat Assistant</span>
            </TabsTrigger>
            <TabsTrigger 
              value="voice" 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setActiveDemo("voice")}
            >
              <Mic className="w-4 h-4" />
              <span className="hidden sm:inline">Voice Commands</span>
            </TabsTrigger>
            <TabsTrigger 
              value="email" 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setActiveDemo("email")}
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Email Assistant</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 gradient-neural rounded-lg flex items-center justify-center">
                  {demoData.chat.icon}
                </div>
                <h3 className="text-xl font-bold">{demoData.chat.title}</h3>
                <div className="ml-auto flex items-center gap-2 text-sm text-success">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  Learning your style...
                </div>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {demoData.chat.messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-xl ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted border border-border'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      {message.typing && (
                        <div className="flex items-center gap-1 mt-2">
                          <div className="text-xs text-muted-foreground">Personalizing response...</div>
                          <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="voice">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 gradient-neural rounded-lg flex items-center justify-center">
                  {demoData.voice.icon}
                </div>
                <h3 className="text-xl font-bold">{demoData.voice.title}</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="ml-auto"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Volume2 className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">You said:</span>
                  </div>
                  <p className="text-sm italic">"{demoData.voice.transcript}"</p>
                  
                  {isPlaying && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex gap-1">
                        {[...Array(12)].map((_, i) => (
                          <div 
                            key={i} 
                            className="w-1 bg-accent rounded-full animate-pulse"
                            style={{ 
                              height: `${Math.random() * 20 + 10}px`,
                              animationDelay: `${i * 0.1}s` 
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 gradient-neural rounded-full"></div>
                    <span className="text-sm font-medium">YoursAI responds:</span>
                  </div>
                  <p className="text-sm">{demoData.voice.response}</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="email">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 gradient-neural rounded-lg flex items-center justify-center">
                  {demoData.email.icon}
                </div>
                <h3 className="text-xl font-bold">{demoData.email.title}</h3>
                <div className="ml-auto bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">
                  {demoData.email.summary}
                </div>
              </div>
              
              <div className="space-y-4">
                {demoData.email.emails.map((email, index) => (
                  <div key={index} className="p-4 border border-border/50 rounded-lg hover:bg-muted/20 transition-neural">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{email.subject}</h4>
                        <p className="text-sm text-muted-foreground">{email.from}</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        email.priority === 'high' ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'
                      }`}>
                        {email.priority}
                      </div>
                    </div>
                    <div className="bg-accent/10 p-3 rounded border-l-2 border-accent">
                      <p className="text-sm"><strong>AI Summary:</strong> {email.ai_summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
<Button 
  variant="neural" 
  size="xl" 
  className="group"
  onClick={() => requireAuth(() => {
    console.log("Full demo accessed");
    navigate("/full-demo"); // ✅ navigate to the route
  })}
>
  Try Full Demo
  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
</Button>
        </div>
      </div>
    </section>
  );
};

export default Demo;