import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getStudentsForSection } from "@/data/studentsData";

const StudentMetrics = () => {
  const navigate = useNavigate();
  const { classId, sectionId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Parse class number and section from URL params
  const classNum = parseInt(classId || "1");
  const section = (sectionId || "a").toUpperCase().replace("SECTION-", "");

  // Get students for this specific class and section
  const studentsData = getStudentsForSection(classNum, section);

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
          <p className="text-muted-foreground">
            Individual student performance analytics - Class {classNum} Section {section} ({studentsData.length} students)
          </p>
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
            transition={{ delay: 0.03 * (index % 12) }}
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
