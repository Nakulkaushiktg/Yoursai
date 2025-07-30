import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Personal",
      price: "₹199",
      period: "/month",
      description: "Perfect for individuals wanting an AI twin",
      features: [
        "Unlimited memory storage",
        "Voice assistant layer",
        "WhatsApp auto-responder",
        "Email summarizer & drafter",
        "Local-first privacy",
        "Basic automation",
        "Chrome extension",
        "Mobile app access"
      ],
      popular: false,
      variant: "hero" as const
    },
    {
      name: "Business",
      price: "₹499",
      period: "/month",
      description: "Advanced automation for professionals",
      features: [
        "Everything in Personal",
        "Advanced decision learning",
        "Multi-platform automation",
        "Calendar integration",
        "Call screening & management",
        "Priority voice processing",
        "Custom memory packs",
        "API access",
        "Team collaboration",
        "Advanced analytics"
      ],
      popular: true,
      variant: "neural" as const
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For organizations scaling AI automation",
      features: [
        "Everything in Business",
        "Custom LLM fine-tuning",
        "On-premise deployment",
        "Advanced security controls",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantees",
        "Compliance certifications"
      ],
      popular: false,
      variant: "accent" as const
    }
  ];

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Choose Your AI Twin
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start with our freemium tier, upgrade for deeper automation and unlimited memory
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative p-8 cursor-pointer transform transition-all duration-300 ease-out ${
                plan.popular 
                  ? 'border-primary shadow-neural scale-105' 
                  : 'border-border/50'
              } bg-card/50 backdrop-blur-sm hover:shadow-glow hover:scale-105 hover:border-primary/50 hover:-translate-y-2`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.variant} 
                className="w-full"
                size="lg"
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </Button>
            </Card>
          ))}
        </div>


        {/* Free Tier Callout */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Start with our <strong>free tier</strong> featuring limited memory and basic automation — currently inactive and will be available after the product launch.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;