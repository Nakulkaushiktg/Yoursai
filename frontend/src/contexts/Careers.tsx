import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, Code, Brain, Zap, Heart, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import ApplyModal from "@/components/ApplyModal";

const Careers = () => {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<any | null>(null);

  const handleApply = (position: any) => {
    setSelectedPosition(position);
    setModalOpen(true);
  };

  const positions = [
    {
      title: "ML/AI Mentor",
      type: "Senior Level",
      department: "Engineering",
      icon: Brain,
      description:
        "Guide our AI development strategy and mentor junior engineers in machine learning and AI implementation.",
      requirements: [
        "5+ years experience in ML/AI",
        "Experience with LLMs and neural networks",
        "Proven track record of shipping AI products",
        "Strong mentorship and leadership skills",
      ],
    },
    {
      title: "Full Stack Intern",
      type: "Internship",
      department: "Engineering",
      icon: Code,
      description:
        "Build the core platform that powers YoursAI's personalized AI experiences.",
      requirements: [
        "Currently pursuing degree in CS/Engineering",
        "Basic knowledge of React, TypeScript, Node.js",
        "Passion for learning new technologies",
        "Understanding of web development fundamentals",
      ],
    },
    {
      title: "ML/AI Intern",
      type: "Internship",
      department: "Research",
      icon: Zap,
      description:
        "Work on cutting-edge AI research and help build the next generation of personalized AI.",
      requirements: [
        "Currently pursuing degree in CS/ML/AI",
        "Experience with Python, TensorFlow/PyTorch",
        "Understanding of transformer architectures",
        "Passion for privacy-preserving AI",
      ],
    },
  ];

  const benefits = [
    "Competitive salary and equity",
    "Remote-first culture",
    "Learning & development budget",
    "Health & wellness benefits",
    "Flexible working hours",
    "Latest tech equipment",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Briefcase className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Join YoursAI
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Help us build the future of personalized AI. We're looking for passionate individuals
              who believe in privacy-first technology and want to revolutionize how humans interact with AI.
            </p>
          </div>

          {/* Company Culture */}
          <Card className="p-8 mb-16 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <div className="flex items-center gap-4 mb-6">
              <Heart className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Why Work With Us?</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Our Mission</h3>
                <p className="text-muted-foreground">
                  We're building AI that truly understands and serves individuals while respecting their privacy.
                  Every team member directly impacts millions of users' digital lives.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Our Culture</h3>
                <p className="text-muted-foreground">
                  Fast-paced, innovative, and privacy-conscious. We believe in ownership, continuous learning,
                  and building technology that empowers rather than exploits.
                </p>
              </div>
            </div>
          </Card>

          {/* Open Positions */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
            <div className="grid gap-6">
              {positions.map((position, index) => (
                <Card
                  key={index}
                  className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-neural"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 gradient-neural rounded-lg flex items-center justify-center">
                        <position.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{position.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{position.type}</span>
                          <span>•</span>
                          <span>{position.department}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="neural" onClick={() => handleApply(position)}>
                      Apply Now
                    </Button>
                  </div>

                  <p className="text-muted-foreground mb-4">{position.description}</p>

                  <div>
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {position.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-accent" />
              Benefits & Perks
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/30"
                >
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Don't See Your Role?</h3>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented individuals. Send us your resume and tell us how you'd like to contribute.
            </p>
            <Button
              variant="hero"
              size="lg"
              onClick={() =>
                window.open(
                  "mailto:contact.yoursai@gmail.com?subject=General Job Application&body=Hi YoursAI Team,%0D%0A%0D%0AI’d like to apply for a role at YoursAI.%0D%0A%0D%0AThanks!"
                )
              }
            >
              Send General Application
            </Button>
          </div>
        </div>
      </main>

      {/* Application Modal */}
      {selectedPosition && (
        <ApplyModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          positionTitle={selectedPosition.title}
        />
      )}

      <Footer />
    </div>
  );
};

export default Careers;
