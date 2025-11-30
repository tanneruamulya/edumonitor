import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Radio, 
  BarChart2, 
  PieChart as PieChartIcon, 
  FileText,
  ArrowLeft,
  Users,
  Activity,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import StudentMetrics from "@/components/classroom/StudentMetrics";
import ClassroomMetrics from "@/components/classroom/ClassroomMetrics";
import ClassroomProfile from "@/components/classroom/ClassroomProfile";
import LiveView from "@/components/classroom/LiveView";

const ClassroomDashboard = () => {
  const navigate = useNavigate();
  const { classId, sectionId } = useParams();
  const [activeTab, setActiveTab] = useState("live");

  const sidebarItems = [
    { id: "live", label: "Live", icon: Radio },
    { id: "student-metrics", label: "Student Metrics", icon: Users },
    { id: "classroom-metrics", label: "Classroom Metrics", icon: BarChart2 },
    { id: "classroom-profile", label: "Classroom Profile", icon: FileText },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "live":
        return <LiveView />;
      case "student-metrics":
        return <StudentMetrics />;
      case "classroom-metrics":
        return <ClassroomMetrics />;
      case "classroom-profile":
        return <ClassroomProfile />;
      default:
        return <LiveView />;
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-card border-r border-border p-6 flex flex-col"
      >
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/classes")}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Classes
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Class {classId}</h2>
              <p className="text-sm text-muted-foreground">Section {sectionId?.toUpperCase().replace("-", " ")}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-item w-full ${activeTab === item.id ? "active" : ""}`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="mt-auto pt-6 border-t border-border space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Students</span>
            <span className="font-semibold text-foreground">32</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Present Today</span>
            <span className="font-semibold text-success">30</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Avg Attention</span>
            <span className="font-semibold text-primary">78%</span>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-8"
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
};

export default ClassroomDashboard;
