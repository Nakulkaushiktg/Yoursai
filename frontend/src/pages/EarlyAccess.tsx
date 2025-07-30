import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, ArrowLeft, Globe, IndianRupee } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const EarlyAccess = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user, requireAuth } = useAuth();
  const { toast } = useToast();

  const features = [
    "3-day exclusive access to YoursAI prototype",
    "Priority support during preview period",
    "Personalized AI assistant setup",
    "Early feedback opportunity",
    "Community access with other early adopters"
  ];

const handlePayment = async () => {
  if (!user?.email) {
    toast({ title: "Auth Required", description: "Please log in first.", variant: "destructive" });
    requireAuth(() => handlePayment());
    return;
  }

  setIsLoading(true);
  try {
    console.log("🔑 User email:", user.email);

    // ✅ FIXED: Only send email and amount (in rupees if backend multiplies)
    const res = await fetch("http://localhost:5000/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        amount: 119, // 💡 send 119 if backend multiplies by 100
      }),
    });

    if (!res.ok) throw new Error("Failed to create order");

    const data = await res.json();

    // ✅ Check if order exists
    if (!data?.order?.id || !data?.key) {
      throw new Error("Invalid response from server");
    }

    const options = {
      key: data.key,
      amount: data.order.amount, // Razorpay expects amount in paise
      currency: data.order.currency || "INR",
      name: "YoursAI",
      description: "Early Access Pass",
      order_id: data.order.id,
      handler(response: any) {
        navigate(`/payment-success?order_id=${response.razorpay_order_id}`);
      },
      prefill: {
        email: user.email,
      },
      theme: {
        color: "#6366F1",
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error("❌ Payment error:", error);
    toast({
      title: "Payment Error",
      description: "Unable to process payment. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};



  return (
    <div className="min-h-screen bg-gradient-deep p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          <div className="text-center space-y-4">
            <Badge variant="secondary" className="text-primary border-primary/50">
              <Star className="w-4 h-4 mr-1" />
              Limited Time Offer
            </Badge>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get Early Access
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Be among the first to experience the future of personalized AI. 
              Get exclusive 3-day access to our prototype for just ₹119.
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="border-primary/50 shadow-neural">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Early Access Pass</CardTitle>
              <CardDescription>3-day exclusive preview</CardDescription>

              <div className="flex items-center justify-center gap-2 pt-4">
                <div className="flex items-center text-3xl font-bold text-primary">
                  <IndianRupee className="w-6 h-6" />
                  119
                </div>
                <div className="text-sm text-muted-foreground">
                  INR (India Price)
                </div>
              </div>

              <Badge variant="outline" className="mx-auto mt-2">
                <Globe className="w-3 h-3 mr-1" />
                Available in India
              </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  What's Included
                </h4>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-border/50">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Secure payment powered by Razorpay
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Access link expires after 3 days
                  </p>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full h-12 text-lg shadow-neural"
                  variant="neural"
                >
                  {isLoading ? "Processing..." : "Get Early Access Now"}
                </Button>

                {!user && (
                  <p className="text-xs text-center text-muted-foreground">
                    You'll be prompted to sign in before payment
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center space-y-4">
          <h3 className="text-lg font-semibold">Why Early Access?</h3>
          <div className="max-w-2xl mx-auto text-muted-foreground space-y-2">
            <p>
              Our AI is still in development, and we want to perfect it with feedback from early users like you. 
              This exclusive preview gives you a chance to shape the future of YoursAI.
            </p>
            <p className="text-sm">
              Your early access includes direct feedback channels to our development team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccess;
