
import { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  BadgeAlert, 
  CheckCircle2, 
  SearchIcon,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  gender: string;
  region: string;
  education: string;
  disability: string;
  score: number;
  result: string;
}

const StudentsList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterResult, setFilterResult] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      
      try {
        // This would be a real API call in production
        // Mock API call for demo purposes
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock student data
        const mockStudents: Student[] = Array.from({ length: 50 }, (_, i) => {
          const id = `${10000 + i}`;
          const gender = Math.random() > 0.5 ? 'M' : 'F';
          const regions = ['East Anglian', 'Scotland', 'North Western', 'South East', 'West Midlands'];
          const educations = ['Lower Than A Level', 'A Level or Equivalent', 'HE Qualification', 'Postgraduate'];
          const disability = Math.random() > 0.8 ? 'Y' : 'N';
          const score = Math.floor(Math.random() * 100);
          let result = '';
          
          if (score < 40) result = 'Withdrawn';
          else if (score < 60) result = 'Fail';
          else if (score < 80) result = 'Pass';
          else result = 'Distinction';
          
          return {
            id,
            name: `Student ${id}`,
            gender,
            region: regions[Math.floor(Math.random() * regions.length)],
            education: educations[Math.floor(Math.random() * educations.length)],
            disability,
            score,
            result
          };
        });
        
        setStudents(mockStudents);
        setTotalPages(Math.ceil(mockStudents.length / 10));
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, []);
  
  // Filter and paginate students
  const filteredStudents = students
    .filter(student => {
      // Search filter
      const searchFilter = student.id.includes(searchTerm) || 
                         student.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Result filter
      const resultFilter = filterResult === 'all' || student.result.toLowerCase() === filterResult.toLowerCase();
      
      return searchFilter && resultFilter;
    });
  
  const paginatedStudents = filteredStudents.slice((page - 1) * 10, page * 10);
  const filteredTotalPages = Math.max(1, Math.ceil(filteredStudents.length / 10));
  
  const getResultBadge = (result: string) => {
    switch (result) {
      case 'Pass':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle2 className="w-3 h-3 mr-1" /> Pass</span>;
      case 'Distinction':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1"><path d="M12 1v4M18 8l2.5-2.5M20 12h-4M18 16l2.5 2.5M12 19v4M8 16l-2.5 2.5M4 12H0M8 8 5.5 5.5" /></svg> Distinction</span>;
      case 'Fail':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><BadgeAlert className="w-3 h-3 mr-1" /> Fail</span>;
      case 'Withdrawn':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1"><path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" /></svg> Withdrawn</span>;
      default:
        return result;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students by ID or name..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // Reset to first page when searching
            }}
          />
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={filterResult}
              onValueChange={(value) => {
                setFilterResult(value);
                setPage(1); // Reset to first page when filtering
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Results</SelectItem>
                <SelectItem value="distinction">Distinction</SelectItem>
                <SelectItem value="pass">Pass</SelectItem>
                <SelectItem value="fail">Fail</SelectItem>
                <SelectItem value="withdrawn">Withdrawn</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="rounded-md border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Gender</TableHead>
              <TableHead className="hidden lg:table-cell">Region</TableHead>
              <TableHead className="hidden lg:table-cell">Education</TableHead>
              <TableHead className="hidden sm:table-cell">Score</TableHead>
              <TableHead>Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex justify-center">
                    <svg className="animate-spin h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </TableCell>
              </TableRow>
            ) : paginatedStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No students found matching your search criteria.
                </TableCell>
              </TableRow>
            ) : (
              paginatedStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{student.gender}</TableCell>
                  <TableCell className="hidden lg:table-cell">{student.region}</TableCell>
                  <TableCell className="hidden lg:table-cell">{student.education}</TableCell>
                  <TableCell className="hidden sm:table-cell">{student.score}%</TableCell>
                  <TableCell>{getResultBadge(student.result)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing page {page} of {filteredTotalPages} ({filteredStudents.length} students)
        </p>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.min(filteredTotalPages, p + 1))}
            disabled={page === filteredTotalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
