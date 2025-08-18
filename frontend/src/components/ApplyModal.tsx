// components/ApplyModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ApplyModalProps {
  open: boolean;
  onClose: () => void;
  positionTitle: string;
}

export default function ApplyModal({ open, onClose, positionTitle }: ApplyModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cgpa: "",
    experience: "",
    resume: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("cgpa", formData.cgpa);
      form.append("experience", formData.experience);
      form.append("position", positionTitle);
      if (formData.resume) form.append("resume", formData.resume);

      const res = await fetch("https://yoursai-5.onrender.com/api/apply"
, {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Failed to submit application");

      toast({
        title: "Application sent!",
        description: `You've successfully applied for ${positionTitle}.`,
      });
      onClose();
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not send application.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for {positionTitle}</DialogTitle>
        </DialogHeader>

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input name="name" required onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" required onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input type="tel" name="phone" required onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="cgpa">CGPA</Label>
            <Input name="cgpa" required onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="experience">Experience</Label>
            <Input name="experience" required onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="resume">Upload Resume (PDF)</Label>
            <Input type="file" name="resume" accept=".pdf" required onChange={handleChange} />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
