
import { useState } from "react";
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, AlertTriangle, CheckCircle2, BadgeAlert } from "lucide-react";
import PredictionResult from "./PredictionResult";

interface PredictionData {
  result: "Pass" | "Fail" | "Withdrawn" | "Distinction";
  confidence: number;
  recommendations?: string[];
}

const PredictionForm = () => {
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionData | null>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    clicks: "",
    assessmentScore: "",
    gender: "",
    education: "",
    age: "",
    previousAttempts: "",
    disabilityStatus: "",
    region: "",
  });
  
  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPredictionResult(null);
    
    try {
      // Simulate API call - in production this would call your Flask backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock prediction result
      const mockResults: PredictionData[] = [
        {
          result: "Pass",
          confidence: 0.78,
          recommendations: [
            "Continue with current study patterns",
            "Participate more in discussion forums",
            "Review module 3 materials before the final assessment"
          ]
        },
        {
          result: "Fail",
          confidence: 0.65,
          recommendations: [
            "Increase study time by at least 5 hours per week",
            "Seek tutoring for difficult topics",
            "Schedule regular meetings with your advisor",
            "Complete all practice exercises in modules 1-4"
          ]
        },
        {
          result: "Withdrawn",
          confidence: 0.82,
          recommendations: [
            "Contact student support services immediately",
            "Consider switching to part-time enrollment",
            "Schedule a meeting with your academic advisor",
            "Apply for academic accommodations if eligible"
          ]
        },
        {
          result: "Distinction",
          confidence: 0.91,
          recommendations: [
            "Consider mentoring other students",
            "Apply for advanced studies opportunities",
            "Explore research projects with faculty members"
          ]
        }
      ];
      
      // Select a random result for demo purposes
      const randomIndex = Math.floor(Math.random() * mockResults.length);
      setPredictionResult(mockResults[randomIndex]);
      
      toast({
        title: "Prediction complete",
        description: "Your academic prediction has been generated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Prediction failed",
        description: "There was an error generating your prediction. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader className="pb-4">
          <CardTitle>Academic Outcome Prediction</CardTitle>
          <CardDescription>
            Enter your data to predict your academic outcome and receive personalized recommendations
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="assessmentScore">Latest Assessment Score (0-100)</Label>
                <Input
                  id="assessmentScore"
                  name="assessmentScore"
                  placeholder="Enter your score"
                  value={formData.assessmentScore}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clicks">VLE Interactions (total clicks)</Label>
                <Input
                  id="clicks"
                  name="clicks"
                  placeholder="Total VLE interactions"
                  value={formData.clicks}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleChange("gender", value)}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                    <SelectItem value="O">Other/Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="education">Highest Education</Label>
                <Select
                  value={formData.education}
                  onValueChange={(value) => handleChange("education", value)}
                >
                  <SelectTrigger id="education">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lower_than_a_level">Lower Than A Level</SelectItem>
                    <SelectItem value="a_level">A Level or Equivalent</SelectItem>
                    <SelectItem value="he_qualification">HE Qualification</SelectItem>
                    <SelectItem value="postgraduate">Postgraduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age Band</Label>
                <Select
                  value={formData.age}
                  onValueChange={(value) => handleChange("age", value)}
                >
                  <SelectTrigger id="age">
                    <SelectValue placeholder="Select age band" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-35">0-35</SelectItem>
                    <SelectItem value="35-55">35-55</SelectItem>
                    <SelectItem value="55<=">55+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="previousAttempts">Previous Attempts</Label>
                <Select
                  value={formData.previousAttempts}
                  onValueChange={(value) => handleChange("previousAttempts", value)}
                >
                  <SelectTrigger id="previousAttempts">
                    <SelectValue placeholder="Select number of attempts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3+">3+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="disabilityStatus">Disability Status</Label>
                <Select
                  value={formData.disabilityStatus}
                  onValueChange={(value) => handleChange("disabilityStatus", value)}
                >
                  <SelectTrigger id="disabilityStatus">
                    <SelectValue placeholder="Select disability status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Y">Yes</SelectItem>
                    <SelectItem value="N">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select
                  value={formData.region}
                  onValueChange={(value) => handleChange("region", value)}
                >
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="east_anglian">East Anglian Region</SelectItem>
                    <SelectItem value="scotland">Scotland</SelectItem>
                    <SelectItem value="north_western">North Western Region</SelectItem>
                    <SelectItem value="south_east">South East Region</SelectItem>
                    <SelectItem value="west_midlands">West Midlands Region</SelectItem>
                    <SelectItem value="other">Other Region</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                  Generating prediction...
                </>
              ) : "Generate Prediction"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      {predictionResult && (
        <PredictionResult
          result={predictionResult.result}
          confidence={predictionResult.confidence}
          recommendations={predictionResult.recommendations || []}
        />
      )}
    </div>
  );
};

export default PredictionForm;
