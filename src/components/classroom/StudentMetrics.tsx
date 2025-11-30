import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

const studentsData = [
  { id: "STU001", name: "Alex Johnson", avatar: null, attendance: 95, attention: 82, behavior: 88 },
  { id: "STU002", name: "Emma Williams", avatar: null, attendance: 98, attention: 90, behavior: 95 },
  { id: "STU003", name: "Michael Brown", avatar: null, attendance: 88, attention: 72, behavior: 78 },
  { id: "STU004", name: "Sarah Davis", avatar: null, attendance: 100, attention: 88, behavior: 92 },
  { id: "STU005", name: "James Wilson", avatar: null, attendance: 92, attention: 75, behavior: 80 },
  { id: "STU006", name: "Emily Taylor", avatar: null, attendance: 96, attention: 85, behavior: 90 },
  { id: "STU007", name: "Daniel Martinez", avatar: null, attendance: 90, attention: 78, behavior: 85 },
  { id: "STU008", name: "Olivia Anderson", avatar: null, attendance: 94, attention: 86, behavior: 88 },
  { id: "STU009", name: "William Thomas", avatar: null, attendance: 87, attention: 70, behavior: 75 },
  { id: "STU010", name: "Sophia Jackson", avatar: null, attendance: 99, attention: 92, behavior: 96 },
  { id: "STU011", name: "Benjamin White", avatar: null, attendance: 91, attention: 77, behavior: 82 },
  { id: "STU012", name: "Isabella Harris", avatar: null, attendance: 97, attention: 89, behavior: 91 },
];

const StudentMetrics = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = studentsData.filter(
    student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStudentClick = (studentId: string) => {
    navigate(`/student/${studentId}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Student Metrics</h1>
          <p className="text-muted-foreground">Individual student performance analytics</p>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStudents.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            onClick={() => handleStudentClick(student.id)}
            className="bg-card rounded-2xl p-5 shadow-soft cursor-pointer hover:shadow-medium transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <User className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {student.name}
                </h3>
                <p className="text-sm text-muted-foreground">{student.id}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Attendance</span>
                  <span className="font-medium text-success">{student.attendance}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-success rounded-full"
                    style={{ width: `${student.attendance}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Attention</span>
                  <span className="font-medium text-primary">{student.attention}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${student.attention}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Behavior</span>
                  <span className="font-medium text-accent">{student.behavior}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full"
                    style={{ width: `${student.behavior}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StudentMetrics;
