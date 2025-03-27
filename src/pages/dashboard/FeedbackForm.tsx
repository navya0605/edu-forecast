
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import FeedbackForm from '@/components/admin/FeedbackForm';

const FeedbackPage = () => {
  return (
    <DashboardLayout requireAdmin>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight">Student Feedback</h1>
          <p className="text-muted-foreground">
            Send personalized feedback and learning resources to students
          </p>
        </div>
        
        <FeedbackForm />
      </div>
    </DashboardLayout>
  );
};

export default FeedbackPage;
