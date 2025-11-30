import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar,
  Award,
  Activity,
  Bell,
  MessageSquare,
  BookOpen,
  LogOut,
  User,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

const childInfo = {
  name: "Aarav Sharma",
  class: "5-A",
  rollNo: "15",
  studentId: "STU5A015"
};

const attendanceData = [
  { month: "Aug", present: 22, absent: 2, late: 1 },
  { month: "Sep", present: 20, absent: 1, late: 2 },
  { month: "Oct", present: 21, absent: 3, late: 0 },
  { month: "Nov", present: 19, absent: 2, late: 1 },
  { month: "Dec", present: 18, absent: 1, late: 0 },
];

const behaviorScoreData = [
  { day: "Mon", score: 85 },
  { day: "Tue", score: 78 },
  { day: "Wed", score: 92 },
  { day: "Thu", score: 88 },
  { day: "Fri", score: 95 },
];

const engagementData = [
  { subject: "Math", attentiveness: 85, participation: 78 },
  { subject: "Science", attentiveness: 72, participation: 80 },
  { subject: "English", attentiveness: 90, participation: 85 },
  { subject: "Hindi", attentiveness: 88, participation: 75 },
  { subject: "Social", attentiveness: 65, participation: 70 },
];

const confusionTopics = [
  "Quadratic Equations - Math",
  "Photosynthesis Process - Science",
  "Tense Structures - English"
];

const alerts = [
  { id: 1, message: "Your child left classroom without permission.", time: "Today, 11:05 AM", type: "warning" },
  { id: 2, message: "Attention score dropped this week.", time: "Yesterday", type: "info" },
  { id: 3, message: "Great performance in Math test!", time: "2 days ago", type: "success" },
];

const teacherMessages = [
  { id: 1, teacher: "Mrs. Lakshmi Devi", subject: "Math", message: "Your child is doing well in Mathematics. Keep encouraging!", date: "Nov 28" },
  { id: 2, teacher: "Mr. Ramesh Kumar", subject: "Science", message: "Needs to focus more in Science practicals.", date: "Nov 25" },
  { id: 3, teacher: "Mrs. Padmavathi", subject: "English", message: "Excellent essay writing skills!", date: "Nov 22" },
];

const homeworkList = [
  { id: 1, subject: "Math", title: "Chapter 5 Exercises", dueDate: "Dec 2", status: "pending" },
  { id: 2, subject: "Science", title: "Lab Report", dueDate: "Dec 3", status: "completed" },
  { id: 3, subject: "English", title: "Essay Writing", dueDate: "Dec 4", status: "pending" },
  { id: 4, subject: "Hindi", title: "Grammar Exercises", dueDate: "Dec 1", status: "overdue" },
];

const progressData = [
  { subject: "Math", progress: 78 },
  { subject: "Science", progress: 65 },
  { subject: "English", progress: 88 },
  { subject: "Hindi", progress: 72 },
  { subject: "Social", progress: 70 },
];

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "behavior", label: "Behavior", icon: Award },
    { id: "engagement", label: "Engagement", icon: Activity },
    { id: "alerts", label: "Alerts", icon: Bell },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "homework", label: "Homework", icon: BookOpen },
  ];

  const getBehaviorStatus = () => {
    const avgScore = behaviorScoreData.reduce((acc, d) => acc + d.score, 0) / behaviorScoreData.length;
    if (avgScore >= 85) return { status: "Good", color: "text-success", bg: "bg-success/10" };
    if (avgScore >= 70) return { status: "Needs Attention", color: "text-warning", bg: "bg-warning/10" };
    return { status: "Serious", color: "text-destructive", bg: "bg-destructive/10" };
  };

  const behaviorStatus = getBehaviorStatus();

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Attendance</p>
              <p className="text-2xl font-bold text-success">92%</p>
            </div>
            <Calendar className="w-8 h-8 text-success" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Behavior Score</p>
              <p className="text-2xl font-bold text-primary">88%</p>
            </div>
            <Award className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Engagement</p>
              <p className="text-2xl font-bold text-accent">78%</p>
            </div>
            <Activity className="w-8 h-8 text-accent" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Misconducts</p>
              <p className="text-2xl font-bold text-destructive">2</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl p-6 shadow-soft">
          <h3 className="font-semibold mb-4 text-foreground">Recent Alerts</h3>
          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className={`p-3 rounded-xl ${alert.type === 'warning' ? 'bg-warning/10' : alert.type === 'success' ? 'bg-success/10' : 'bg-primary/10'}`}>
                <p className="text-sm text-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-soft">
          <h3 className="font-semibold mb-4 text-foreground">Homework Status</h3>
          <div className="space-y-3">
            {homeworkList.slice(0, 3).map((hw) => (
              <div key={hw.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                <div>
                  <p className="font-medium text-foreground">{hw.title}</p>
                  <p className="text-xs text-muted-foreground">{hw.subject} • Due: {hw.dueDate}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  hw.status === 'completed' ? 'bg-success/10 text-success' :
                  hw.status === 'overdue' ? 'bg-destructive/10 text-destructive' :
                  'bg-warning/10 text-warning'
                }`}>
                  {hw.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Total Present</p>
          <p className="text-3xl font-bold text-success">100</p>
          <p className="text-xs text-muted-foreground">out of 108 days</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Days Absent</p>
          <p className="text-3xl font-bold text-destructive">9</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Late Marks</p>
          <p className="text-3xl font-bold text-warning">4</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-soft">
        <h3 className="font-semibold mb-4 text-foreground">Monthly Attendance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }} />
            <Legend />
            <Bar dataKey="present" fill="hsl(142, 71%, 45%)" name="Present" radius={[4, 4, 0, 0]} />
            <Bar dataKey="absent" fill="hsl(0, 84%, 60%)" name="Absent" radius={[4, 4, 0, 0]} />
            <Bar dataKey="late" fill="hsl(38, 92%, 50%)" name="Late" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderBehavior = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Behavior Status</p>
          <div className={`mt-2 px-4 py-2 rounded-full inline-block ${behaviorStatus.bg}`}>
            <span className={`font-bold ${behaviorStatus.color}`}>{behaviorStatus.status}</span>
          </div>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Misconduct Incidents</p>
          <p className="text-3xl font-bold text-destructive">2</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Avg Weekly Score</p>
          <p className="text-3xl font-bold text-primary">88%</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-soft">
        <h3 className="font-semibold mb-4 text-foreground">Daily Behavior Score</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={behaviorScoreData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
            <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }} />
            <Line type="monotone" dataKey="score" stroke="hsl(199, 89%, 48%)" strokeWidth={3} dot={{ fill: "hsl(199, 89%, 48%)" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderEngagement = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-2xl p-6 shadow-soft">
        <h3 className="font-semibold mb-4 text-foreground">Subject-wise Engagement</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }} />
            <Legend />
            <Bar dataKey="attentiveness" fill="hsl(199, 89%, 48%)" name="Attentiveness" radius={[4, 4, 0, 0]} />
            <Bar dataKey="participation" fill="hsl(173, 58%, 39%)" name="Participation" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-soft">
        <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          Topics Needing Attention
        </h3>
        <div className="space-y-3">
          {confusionTopics.map((topic, index) => (
            <div key={index} className="p-4 bg-warning/10 rounded-xl">
              <p className="text-foreground">{topic}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Alerts & Notifications</h2>
      {alerts.map((alert) => (
        <div key={alert.id} className={`p-4 rounded-2xl ${
          alert.type === 'warning' ? 'bg-warning/10 border-l-4 border-warning' :
          alert.type === 'success' ? 'bg-success/10 border-l-4 border-success' :
          'bg-primary/10 border-l-4 border-primary'
        }`}>
          <div className="flex items-start gap-3">
            {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />}
            {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-success mt-0.5" />}
            {alert.type === 'info' && <Bell className="w-5 h-5 text-primary mt-0.5" />}
            <div>
              <p className="text-foreground">{alert.message}</p>
              <p className="text-sm text-muted-foreground mt-1">{alert.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Teacher Messages</h2>
      {teacherMessages.map((msg) => (
        <div key={msg.id} className="bg-card rounded-2xl p-4 shadow-soft">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-semibold text-foreground">{msg.teacher}</p>
              <p className="text-sm text-muted-foreground">{msg.subject}</p>
            </div>
            <span className="text-xs text-muted-foreground">{msg.date}</span>
          </div>
          <p className="text-foreground">{msg.message}</p>
        </div>
      ))}
    </div>
  );

  const renderHomework = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl p-6 shadow-soft">
          <h3 className="font-semibold mb-4 text-foreground">Homework List</h3>
          <div className="space-y-3">
            {homeworkList.map((hw) => (
              <div key={hw.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                <div className="flex items-center gap-3">
                  {hw.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : hw.status === 'overdue' ? (
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  ) : (
                    <Clock className="w-5 h-5 text-warning" />
                  )}
                  <div>
                    <p className="font-medium text-foreground">{hw.title}</p>
                    <p className="text-xs text-muted-foreground">{hw.subject} • Due: {hw.dueDate}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  hw.status === 'completed' ? 'bg-success/10 text-success' :
                  hw.status === 'overdue' ? 'bg-destructive/10 text-destructive' :
                  'bg-warning/10 text-warning'
                }`}>
                  {hw.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-soft">
          <h3 className="font-semibold mb-4 text-foreground">Subject Progress</h3>
          <div className="space-y-4">
            {progressData.map((subject) => (
              <div key={subject.subject}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-foreground">{subject.subject}</span>
                  <span className="text-sm font-medium text-primary">{subject.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return renderOverview();
      case "attendance": return renderAttendance();
      case "behavior": return renderBehavior();
      case "engagement": return renderEngagement();
      case "alerts": return renderAlerts();
      case "messages": return renderMessages();
      case "homework": return renderHomework();
      default: return renderOverview();
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
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center">
              <User className="w-6 h-6 text-success" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">{childInfo.name}</h2>
              <p className="text-sm text-muted-foreground">Class {childInfo.class}</p>
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

        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mt-auto text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {sidebarItems.find(item => item.id === activeTab)?.label}
            </h1>
            <p className="text-muted-foreground">
              Monitoring {childInfo.name}'s academic journey
            </p>
          </div>
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
};

export default ParentDashboard;
