
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StudentsList from '@/components/admin/StudentsList';

const StudentsListPage = () => {
  return (
    <DashboardLayout requireAdmin>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            View and manage student data and performance metrics
          </p>
        </div>
        
        <StudentsList />
      </div>
    </DashboardLayout>
  );
};

export default StudentsListPage;
