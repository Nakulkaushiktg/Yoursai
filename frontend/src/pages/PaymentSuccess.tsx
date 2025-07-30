import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  ExternalLink,
  Copy,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PaymentSuccess = () => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [projectLink] = useState("https://yoursai-demo-preview.lovable.app");
  const { toast } = useToast();

  useEffect(() => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft("Access Expired");
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(projectLink);
    toast({
      title: "Link Copied!",
      description: "Project link has been copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-deep p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Success Card */}
        <Card className="border-success/50 shadow-neural">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <CheckCircle className="w-16 h-16 text-success animate-neural-pulse" />
            </div>
            <CardTitle className="text-3xl text-success">
              Payment Successful!
            </CardTitle>
            <CardDescription className="text-lg">
              Welcome to YoursAI Early Access Program
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Access Countdown */}
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-semibold">Access Time Remaining</span>
              </div>
              <div className="text-2xl font-mono text-primary font-bold">
                {timeLeft}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Your exclusive access expires in 3 days
              </p>
            </div>

            {/* Project Link */}
            <div className="space-y-4">
              <h3 className="font-semibold text-center">
                Your Exclusive Project Link
              </h3>

              <div className="flex items-center gap-2 p-3 bg-card border rounded-lg">
                <div className="flex-1 text-sm font-mono break-all">
                  {projectLink}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="flex-shrink-0"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  asChild
                  className="flex-1 shadow-neural"
                  variant="neural"
                >
                  <a href={projectLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Project
                  </a>
                </Button>
                <Button variant="outline" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* What's Next */}
            <div className="space-y-4 pt-6 border-t border-border/50">
              <h3 className="font-semibold">What's Next?</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="text-xs">1</Badge>
                  <span>
                    Click the link above to access your YoursAI early preview
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="text-xs">2</Badge>
                  <span>
                    Explore AI tools and features. Share your feedback inside the app
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="text-xs">3</Badge>
                  <span>
                    Join our Discord to chat with other early adopters
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="text-xs">4</Badge>
                  <span>
                    Your input helps shape YoursAI for public release
                  </span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Important Notes:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Save this link – it won't be sent by email</li>
                <li>• Link auto-expires after 3 days</li>
                <li>• Prototype build – testing only</li>
                <li>• We truly value your feedback</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Need help? Have questions about your early access?
          </p>
          <Link to="/contact">
            <Button variant="outline">Contact Support</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
