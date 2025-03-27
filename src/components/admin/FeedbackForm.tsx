
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, SendHorizonal, Upload } from "lucide-react";

const FeedbackForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    feedbackType: '',
    subject: '',
    message: '',
    attachFile: null as File | null
  });
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, attachFile: e.target.files![0] }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call - in production this would call your Flask backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success
      toast({
        title: "Feedback sent",
        description: `Feedback has been sent to student ${formData.studentId}.`,
      });
      
      // Reset form
      setFormData({
        studentId: '',
        feedbackType: '',
        subject: '',
        message: '',
        attachFile: null
      });
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sending failed",
        description: "There was an error sending your feedback. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Send Student Feedback</CardTitle>
        <CardDescription>
          Provide personalized feedback or learning resources to students
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID</Label>
            <Input
              id="studentId"
              name="studentId"
              placeholder="Enter student ID"
              value={formData.studentId}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="feedbackType">Feedback Type</Label>
            <Select
              value={formData.feedbackType}
              onValueChange={(value) => handleSelectChange("feedbackType", value)}
              required
            >
              <SelectTrigger id="feedbackType">
                <SelectValue placeholder="Select feedback type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="performance">Performance Review</SelectItem>
                <SelectItem value="resource">Learning Resource</SelectItem>
                <SelectItem value="improvement">Improvement Suggestion</SelectItem>
                <SelectItem value="warning">Warning Notice</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Feedback subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Type your feedback message here..."
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="attachFile">Attach File (Optional)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="attachFile"
                name="attachFile"
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('attachFile')?.click()}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {formData.attachFile ? formData.attachFile.name : "Choose File"}
              </Button>
              {formData.attachFile && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setFormData(prev => ({ ...prev, attachFile: null }))}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              )}
            </div>
            {formData.attachFile && (
              <p className="text-xs text-muted-foreground">
                {formData.attachFile.name} ({Math.round(formData.attachFile.size / 1024)} KB)
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <SendHorizonal className="mr-2 h-4 w-4" />
                Send Feedback
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FeedbackForm;
