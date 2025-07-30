import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, Server, Users, FileText } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="w-12 h-12 text-success" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-success bg-clip-text text-transparent">
                Privacy First
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Your data is yours. We build with privacy as our foundation, not an afterthought.
            </p>
          </div>

          {/* Privacy Principles */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-6 bg-success/5 border-success/20">
              <Lock className="w-8 h-8 text-success mb-4" />
              <h3 className="text-xl font-bold mb-3">Local-First Architecture</h3>
              <p className="text-muted-foreground">
                All your personal data, conversations, and AI models run locally on your device. 
                We never store your personal information on our servers.
              </p>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <Eye className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Full Transparency</h3>
              <p className="text-muted-foreground">
                You can see exactly what data is collected, how it's processed, 
                and have complete control over your digital twin's behavior.
              </p>
            </Card>
          </div>

          {/* Data Handling */}
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Server className="w-6 h-6 text-accent" />
              How We Handle Your Data
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">What We Store Locally</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Your conversation history and patterns</li>
                  <li>Voice recordings and processing models</li>
                  <li>Email and message templates you create</li>
                  <li>Calendar and contact integration preferences</li>
                  <li>Custom automation rules and workflows</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">What We Never Access</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Personal messages or email content</li>
                  <li>Voice recordings in identifiable form</li>
                  <li>Contact information or calendar events</li>
                  <li>Financial or sensitive personal data</li>
                  <li>Location data beyond timezone preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Minimal Cloud Services</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Account authentication (email/password only)</li>
                  <li>Software updates and security patches</li>
                  <li>Anonymous usage analytics (opt-out available)</li>
                  <li>Memory marketplace (optional, encrypted)</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* User Rights */}
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-primary" />
              Your Rights and Control
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Data Ownership</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You own 100% of your data. Export it anytime in standard formats.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Right to Delete</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Delete all data instantly from your device and our systems.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Granular Control</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Control exactly what your AI learns and what it can access.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Open Source Core</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Core privacy components are open source for full transparency.
                </p>
              </div>
            </div>
          </Card>

          {/* Contact */}
          <Card className="p-6 bg-card/50 border-border/50 text-center">
            <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Questions About Privacy?</h3>
            <p className="text-muted-foreground mb-4">
              We're committed to transparency. Reach out with any privacy concerns.
            </p>
            <p className="text-sm text-muted-foreground">
              Email: contact.yourai@gmail.com | Last updated: July 2025
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;