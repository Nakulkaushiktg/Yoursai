import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, MicOff, CalendarIcon, Bot, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const FullDemo = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [message, setMessage] = useState("");
  const [showScheduling, setShowScheduling] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const firstName =
    user?.user_metadata?.name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "Friend";

  useEffect(() => {
    const welcomeMessage = `Hi ${firstName}, welcome! I'm your AI assistant. Our demo is currently in early stage, so we can show you the system running locally on our development setup. Would you like to schedule a personalized demo?`;

    setMessage(welcomeMessage);

    if ("speechSynthesis" in window && !isPaused) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(welcomeMessage);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      speechSynthesis.speak(utterance);
    }

    if (
      "webkitSpeechRecognition" in window ||
      "SpeechRecognition" in window
    ) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log("Speech recognized:", transcript);

        if (
          transcript.includes("yes") ||
          transcript.includes("yeah") ||
          transcript.includes("sure")
        ) {
          navigate("/schedule-demo");
        }
      };

      setRecognition(recognitionInstance);
    }
  }, [firstName, isPaused, navigate]);

  const pauseSpeech = () => {
    setIsPaused(true);
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsListening(false);
  };

  const handleMicToggle = () => {
    pauseSpeech(); // Pause speech when mic button is clicked

    if (!isListening) {
      if (recognition) {
        setIsListening(true);
        setMessage("I'm listening... Say 'yes' to schedule a demo or speak anything else!");
        recognition.start();

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
          setMessage("Sorry, I couldn't hear you clearly. Please try again or click the button below to schedule a demo.");
        };
      } else {
        // Fallback
        setIsListening(true);
        setMessage("I'm listening... Please speak!");

        setTimeout(() => {
          setIsListening(false);
          const responses = [
            "I heard you! Unfortunately, full voice interaction is still in development. For now, let me help you schedule a live demo where you can see all our capabilities!",
            "Thanks for trying to speak with me! Our voice features are being enhanced. Would you like to book a demo session to see the full system in action?",
            "Voice input received! While we're perfecting this feature, I'd love to show you what we can do in a live demo session."
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          setMessage(randomResponse);

          if ("speechSynthesis" in window) {
            setIsSpeaking(true);
            const utterance = new SpeechSynthesisUtterance(randomResponse);
            utterance.rate = 0.9;
            utterance.onend = () => setIsSpeaking(false);
            speechSynthesis.speak(utterance);
          }
        }, 3000);
      }
    } else {
      setIsListening(false);
      if (recognition) {
        recognition.stop();
      }
      setMessage("Stopped listening. Click the mic to try again or use the button below to schedule!");
    }
  };

  const handleScheduleYes = () => {
    setShowScheduling(true);
    const scheduleMessage = "Great! Please select your preferred date and time for the demo.";
    setMessage(scheduleMessage);

    if ("speechSynthesis" in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(scheduleMessage);
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const handleSubmitSchedule = async () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select both date and time",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: firstName,
        email: user?.email || "",
        date: format(selectedDate, "yyyy-MM-dd"),
        time: selectedTime,
        selectedDateTime: `${format(selectedDate, "PPP")} at ${selectedTime}`,
        message: `Demo request from Full Demo page by ${firstName}`,
      };

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/fulldemo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send");

      const successMessage = `Perfect! I've sent your demo request for ${format(selectedDate, "PPP")} at ${selectedTime}. You'll receive a confirmation email shortly!`;
      setMessage(successMessage);
      setShowScheduling(false);

      if ("speechSynthesis" in window) {
        setIsSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(successMessage);
        utterance.rate = 0.9;
        utterance.onend = () => setIsSpeaking(false);
        speechSynthesis.speak(utterance);
      }

      toast({
        title: "Demo scheduled successfully!",
        description: "Check your email for confirmation details.",
      });
    } catch (error) {
      console.error("Error scheduling demo:", error);
      toast({
        title: "Error scheduling demo",
        description: "Please try again or use the main schedule page.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];


  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              AI Assistant Demo
            </h1>
            <p className="text-xl text-muted-foreground">
              Experience our AI assistant prototype
            </p>
          </div>

          <Card className="p-8 mb-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Bot className="h-12 w-12 text-white" />
              </div>

              <div className="flex items-center justify-center mb-6">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${
                    isSpeaking ? "bg-green-500 animate-pulse" :
                    isListening ? "bg-blue-500 animate-pulse" :
                    "bg-gray-400"
                  }`}
                />
                <span className="text-sm text-muted-foreground">
                  {isSpeaking ? "Speaking..." :
                   isListening ? "Listening..." :
                   "Ready to assist"}
                </span>
              </div>

              {/* Message Display */}
              <div className="bg-muted/50 rounded-lg p-6 mb-8 min-h-[120px] flex items-center justify-center">
                <p className="text-lg leading-relaxed text-center">
		{message || "Hello! I'm your AI assistant. Click the microphone to start talking with me."}
		</p>
              </div>

              <div className="flex justify-center gap-4 mb-8">
                <Button
                  onClick={handleMicToggle}
                  size="lg"
                  variant={isListening ? "destructive" : "default"}
                  className="w-16 h-16 rounded-full"
                  disabled={isSpeaking}
                >
                  {isListening ? (
		  <MicOff className="h-6 w-6" /> 
		  ):(
		   <Mic className="h-6 w-6" />
		   )}
                </Button>
                <Button
                  onClick={pauseSpeech}
                  size="lg"
                  variant="outline"
                  className="px-6"
                  disabled={!isSpeaking && !isListening}
                >
                  Pause Assistant
                </Button>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-6">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  <strong>Demo Note:</strong> This is a prototype version. Voice recognition and responses are simulated.
                  For the full experience with advanced AI capabilities, book a live demo session!
                </p>
              </div>

              {!showScheduling ? (
                <Button
                  onClick={handleScheduleYes}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Yes, Schedule Demo
                </Button>
              ) : (
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Time</label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4" />
                              {time}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleSubmitSchedule}
                    disabled={!selectedDate || !selectedTime || isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-primary/80"
                  >
                    {isSubmitting ? "Scheduling..." : "Schedule Demo"}
                  </Button>
                </div>
              )}
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Voice Interaction</h3>
              <p className="text-sm text-muted-foreground">
                Natural voice conversations with AI responses
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Smart Assistant</h3>
              <p className="text-sm text-muted-foreground">
                Intelligent responses and task assistance
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Live Demo</h3>
              <p className="text-sm text-muted-foreground">
                See full capabilities in a personalized session
              </p>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FullDemo;
