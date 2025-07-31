import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, MapPin, Code2, Rocket, Users } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const ScheduleDemo = () => {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    time: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for the demo.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("${import.meta.env.VITE_API_BASE_URL}/api/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          date: format(date, "PPP"),
          selectedDateTime: `${format(date, "PPP")} at ${formData.time}`
        })
      });

      if (!res.ok) throw new Error("Server error");

      toast({
        title: "Demo Scheduled!",
        description: "We'll contact you soon to confirm the demo details."
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        time: "",
        message: ""
      });
      setDate(undefined);

      // Redirect after a delay
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Error scheduling demo:", error);
      toast({
        title: "Error",
        description: "Failed to schedule demo. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Schedule Your Personal Demo
            </h1>
            <p className="text-xl text-muted-foreground">
              Get an exclusive look at our AI assistant in development
            </p>
          </div>

          {/* Project Status Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Prototype Stage</h3>
              <p className="text-sm text-muted-foreground">
                Currently in active development with core features being built
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Basic Model</h3>
              <p className="text-sm text-muted-foreground">
                Experience our foundational AI capabilities and interface
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Local Demo</h3>
              <p className="text-sm text-muted-foreground">
                We'll show you the system running locally on our development setup
              </p>
            </div>
          </div>

          {/* What to Expect */}
          <div className="card p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Users className="h-6 w-6 mr-3 text-primary" />
              What to Expect in Your Demo
            </h2>
            <ul className="space-y-4">
              {[
                ["Live Prototype Walkthrough", "See our AI assistant in action with real-time demonstrations"],
                ["Core Features Preview", "Experience the basic functionality and user interface"],
                ["Development Insights", "Learn about our roadmap and upcoming features"],
                ["Q&A Session", "Ask questions and provide feedback on the platform"]
              ].map(([title, desc], idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium">{title}</h4>
                    <p className="text-muted-foreground">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Booking Form */}
          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-6">Book Your Demo Session</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <InputField label="Full Name *" id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <InputField label="Email *" id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <InputField label="Company" id="company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                <InputField label="Phone Number" id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>

              {/* Date */}
              <div>
                <Label>Preferred Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal mt-2", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time */}
              <div>
                <Label>Preferred Time *</Label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={formData.time === time ? "default" : "outline"}
                      className="text-sm"
                      onClick={() => setFormData({ ...formData, time })}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message">Additional Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your specific interests or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-2"
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Scheduling..." : "Schedule Demo"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const InputField = ({ label, id, type = "text", value, onChange, required = false }: any) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type={type} value={value} onChange={onChange} required={required} />
  </div>
);

export default ScheduleDemo;
