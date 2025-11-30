import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, AlertTriangle, Video, Calendar, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllMisconductRecords, MisconductRecord } from "@/data/studentsData";

const misconductTypes = [
  "All Types",
  "Cheating during exam",
  "Leaving class without permission",
  "Using phone in class",
  "Disturbing class / talking loudly",
  "Bullying / misbehaving",
  "Not paying attention repeatedly"
];

const StudentReports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [classFilter, setClassFilter] = useState("All");

  const records = getAllMisconductRecords;

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          record.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "All Types" || record.type === typeFilter;
    const matchesClass = classFilter === "All" || record.classSection === classFilter;
    const matchesDate = !dateFilter || record.date.includes(dateFilter);
    
    return matchesSearch && matchesType && matchesClass && matchesDate;
  });

  const getActionColor = (action: string) => {
    switch (action) {
      case "Warning issued": return "bg-warning/10 text-warning";
      case "Parent meeting scheduled": return "bg-destructive/10 text-destructive";
      default: return "bg-primary/10 text-primary";
    }
  };

  // Generate class options
  const classOptions = ["All"];
  for (let i = 1; i <= 10; i++) {
    for (const section of ['A', 'B', 'C']) {
      classOptions.push(`${i}-${section}`);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-destructive" />
            Student Reports
          </h1>
          <p className="text-muted-foreground">Detailed log of all misconduct detected in classrooms</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-2xl p-6 shadow-soft mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <span className="font-medium text-foreground">Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Class" />
            </SelectTrigger>
            <SelectContent>
              {classOptions.map(cls => (
                <SelectItem key={cls} value={cls}>{cls === "All" ? "All Classes" : `Class ${cls}`}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              {misconductTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            placeholder="Filter by Date"
          />
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Student</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Class</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Misconduct Type</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Date & Time</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Teacher Present</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Action Taken</th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-muted-foreground">Clip</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <motion.tr 
                  key={record.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.02 * index }}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{record.studentName}</p>
                        <p className="text-xs text-muted-foreground">{record.studentId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full bg-secondary text-foreground text-sm">
                      {record.classSection}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                      <span className="text-sm text-foreground">{record.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-foreground">{record.date}</p>
                        <p className="text-xs text-muted-foreground">{record.time}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-foreground">{record.teacher}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getActionColor(record.actionTaken)}`}>
                      {record.actionTaken}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <Video className="w-4 h-4" />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredRecords.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No misconduct records found matching your filters.
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        Showing {filteredRecords.length} of {records.length} records
      </div>
    </div>
  );
};

export default StudentReports;
