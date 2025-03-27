
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, BadgeAlert, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PredictionResultProps {
  result: "Pass" | "Fail" | "Withdrawn" | "Distinction";
  confidence: number;
  recommendations: string[];
}

const PredictionResult = ({ result, confidence, recommendations }: PredictionResultProps) => {
  // Configuration for different result types
  const resultConfig = {
    Pass: {
      icon: <CheckCircle2 className="h-12 w-12 text-green-500" />,
      title: "Likely to Pass",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      description: "Our model predicts you are on track to pass this course.",
    },
    Fail: {
      icon: <AlertTriangle className="h-12 w-12 text-amber-500" />,
      title: "At Risk of Failing",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-800",
      description: "There are some concerning indicators in your academic performance.",
    },
    Withdrawn: {
      icon: <BadgeAlert className="h-12 w-12 text-red-500" />,
      title: "Risk of Withdrawal",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      description: "You show patterns similar to students who withdraw from courses.",
    },
    Distinction: {
      icon: <Award className="h-12 w-12 text-blue-500" />,
      title: "On Track for Distinction",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      description: "Your performance indicates potential for achieving distinction.",
    },
  };
  
  const config = resultConfig[result];
  const confidencePercent = Math.round(confidence * 100);
  
  return (
    <Card className={`shadow-md border-2 ${config.borderColor} animate-slide-in`}>
      <CardHeader className={`${config.bgColor} pb-4`}>
        <div className="flex items-center space-x-4">
          {config.icon}
          <div>
            <CardTitle className={`text-xl ${config.textColor}`}>{config.title}</CardTitle>
            <CardDescription className={config.textColor}>
              {config.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Prediction Confidence</span>
            <span>{confidencePercent}%</span>
          </div>
          <Progress value={confidencePercent} className="h-2" />
          <p className="text-xs text-muted-foreground pt-1">
            Based on analysis of similar student profiles and performance patterns
          </p>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold">Recommendations:</h4>
          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mt-0.5">
                  {index + 1}
                </span>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResult;
