
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PredictionForm from '@/components/predictions/PredictionForm';

const Prediction = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight">Academic Prediction</h1>
          <p className="text-muted-foreground">
            Use our AI-based prediction model to forecast your academic outcomes
          </p>
        </div>
        
        <PredictionForm />
      </div>
    </DashboardLayout>
  );
};

export default Prediction;
