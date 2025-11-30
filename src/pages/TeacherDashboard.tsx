import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  User, 
  LogOut, 
  Eye,
  TrendingUp,
  Users,
  AlertTriangle,
  Activity,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const classData = [
  { name: "Class 1-A", attention: 78, behavior: 85, attendance: 92, engagement: 75, misconduct: 5 },
  { name: "Class 3-B", attention: 82, behavior: 88, attendance: 95, engagement: 80, misconduct: 3 },
  { name: "Class 5-A", attention: 71, behavior: 79, attendance: 88, engagement: 68, misconduct: 8 },
  { name: "Class 7-C", attention: 85, behavior: 91, attendance: 96, engagement: 83, misconduct: 2 },
  { name: "Class 9-A", attention: 88, behavior: 93, attendance: 98, engagement: 87, misconduct: 1 },
];

const chartColors = ["hsl(199, 89%, 48%)", "hsl(173, 58%, 39%)", "hsl(142, 71%, 45%)", "hsl(38, 92%, 50%)", "hsl(0, 84%, 60%)"];

const teacherProfile = {
  name: "Mr. Johnson",
  email: "johnson@school.edu",
  phone: "+1 234 567 8900",
  address: "123 Education Lane, Springfield",
  department: "Mathematics",
  employeeId: "TCH-2024-001",
  joinDate: "January 15, 2020",
  qualification: "M.Sc. Mathematics, B.Ed.",
  experience: "8 Years",
  classesAssigned: 5,
};

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [previewClass, setPreviewClass] = useState<typeof classData[0] | null>(null);

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "classes", label: "My Classes", icon: BookOpen },
    { id: "profile", label: "Profile", icon: User },
  ];

  const statCards = [
    { label: "Avg Attention", value: "81%", icon: Activity, color: "text-primary" },
    { label: "Avg Behavior", value: "87%", icon: TrendingUp, color: "text-accent" },
    { label: "Avg Attendance", value: "94%", icon: Users, color: "text-success" },
    { label: "Total Misconducts", value: "19", icon: AlertTriangle, color: "text-destructive" },
  ];

  const renderDashboard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Teacher Dashboard</h1>
        <p className="text-muted-foreground">Analytics overview for all your classes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="stat-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Attention & Behavior Chart */}
        <div className="bg-card rounded-2xl p-6 shadow-soft">
          <h3 className="font-semibold text-foreground mb-4">Attention & Behavior by Class</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px"
                }} 
              />
              <Legend />
              <Bar dataKey="attention" fill={chartColors[0]} name="Attention %" radius={[4, 4, 0, 0]} />
              <Bar dataKey="behavior" fill={chartColors[1]} name="Behavior %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance & Engagement Chart */}
        <div className="bg-card rounded-2xl p-6 shadow-soft">
          <h3 className="font-semibold text-foreground mb-4">Attendance & Engagement Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={classData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px"
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="attendance" stroke={chartColors[2]} strokeWidth={3} name="Attendance %" />
              <Line type="monotone" dataKey="engagement" stroke={chartColors[3]} strokeWidth={3} name="Engagement %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Classes List */}
      <div className="bg-card rounded-2xl p-6 shadow-soft">
        <h3 className="font-semibold text-foreground mb-4">Classes Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Class</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Attention</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Behavior</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Attendance</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Engagement</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Misconduct</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {classData.map((cls, index) => (
                <motion.tr 
                  key={cls.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 * index }}
                  className="border-b border-border/50 hover:bg-secondary/50 transition-colors"
                >
                  <td className="py-4 px-4 font-medium text-foreground">{cls.name}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">{cls.attention}%</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">{cls.behavior}%</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">{cls.attendance}%</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-warning/10 text-warning text-sm font-medium">{cls.engagement}%</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">{cls.misconduct}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setPreviewClass(cls)}
                      className="text-primary hover:text-primary/80"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );

  const renderMyClasses = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Classes</h1>
        <p className="text-muted-foreground">View and manage your assigned classes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classData.map((cls, index) => (
          <motion.div
            key={cls.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-strong transition-shadow cursor-pointer group"
            onClick={() => setPreviewClass(cls)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{cls.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">Mathematics</p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Attendance</span>
                <span className="text-sm font-medium text-success">{cls.attendance}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-success h-2 rounded-full transition-all"
                  style={{ width: `${cls.attendance}%` }}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg Attention</span>
                <span className="text-sm font-medium text-primary">{cls.attention}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${cls.attention}%` }}
                />
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Misconducts: {cls.misconduct}</span>
              <span className="text-xs text-accent font-medium">View Details →</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderProfile = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
        <p className="text-muted-foreground">View and manage your profile information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-card rounded-2xl p-6 shadow-soft">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-1">{teacherProfile.name}</h2>
            <p className="text-muted-foreground mb-4">{teacherProfile.department} Teacher</p>
            <div className="px-4 py-2 bg-primary/10 rounded-full inline-block">
              <span className="text-sm font-medium text-primary">{teacherProfile.employeeId}</span>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{teacherProfile.email}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{teacherProfile.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{teacherProfile.address}</span>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-foreground mb-6">Professional Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Full Name</label>
                <Input value={teacherProfile.name} readOnly className="mt-1 bg-secondary/50" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Email Address</label>
                <Input value={teacherProfile.email} readOnly className="mt-1 bg-secondary/50" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Phone Number</label>
                <Input value={teacherProfile.phone} readOnly className="mt-1 bg-secondary/50" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Department</label>
                <Input value={teacherProfile.department} readOnly className="mt-1 bg-secondary/50" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Qualification</label>
                <Input value={teacherProfile.qualification} readOnly className="mt-1 bg-secondary/50" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Experience</label>
                <Input value={teacherProfile.experience} readOnly className="mt-1 bg-secondary/50" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Join Date</label>
                <Input value={teacherProfile.joinDate} readOnly className="mt-1 bg-secondary/50" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Classes Assigned</label>
                <Input value={String(teacherProfile.classesAssigned)} readOnly className="mt-1 bg-secondary/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="lg:col-span-3 bg-card rounded-2xl p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-foreground mb-6">Performance Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-secondary/50 rounded-xl">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">98%</p>
              <p className="text-sm text-muted-foreground">Attendance</p>
            </div>
            <div className="text-center p-4 bg-secondary/50 rounded-xl">
              <BookOpen className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">5</p>
              <p className="text-sm text-muted-foreground">Classes</p>
            </div>
            <div className="text-center p-4 bg-secondary/50 rounded-xl">
              <Users className="w-8 h-8 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-sm text-muted-foreground">Students</p>
            </div>
            <div className="text-center p-4 bg-secondary/50 rounded-xl">
              <Award className="w-8 h-8 text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">4.8</p>
              <p className="text-sm text-muted-foreground">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "classes":
        return renderMyClasses();
      case "profile":
        return renderProfile();
      default:
        return renderDashboard();
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
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Mr. Johnson</h2>
            <p className="text-xs text-muted-foreground">Mathematics Teacher</p>
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

        <button
          onClick={() => navigate("/teacher-login")}
          className="sidebar-item w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </main>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewClass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewClass(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-auto shadow-strong"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">{previewClass.name} Analytics</h2>
                <Button variant="ghost" size="icon" onClick={() => setPreviewClass(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Metrics Pie Chart */}
                <div className="bg-secondary/30 rounded-2xl p-4">
                  <h3 className="font-semibold mb-4 text-foreground">Performance Metrics</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Attention", value: previewClass.attention },
                          { name: "Behavior", value: previewClass.behavior },
                          { name: "Attendance", value: previewClass.attendance },
                          { name: "Engagement", value: previewClass.engagement },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartColors.slice(0, 4).map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="bg-secondary/30 rounded-2xl p-4">
                  <h3 className="font-semibold mb-4 text-foreground">Detailed Breakdown</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={[
                        { metric: "Attention", value: previewClass.attention },
                        { metric: "Behavior", value: previewClass.behavior },
                        { metric: "Attendance", value: previewClass.attendance },
                        { metric: "Engagement", value: previewClass.engagement },
                      ]}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                      <YAxis dataKey="metric" type="category" stroke="hsl(var(--muted-foreground))" width={80} />
                      <Tooltip />
                      <Bar dataKey="value" fill={chartColors[0]} radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-6 p-4 bg-destructive/5 rounded-2xl border border-destructive/20">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <span className="font-medium text-foreground">Misconduct Incidents: {previewClass.misconduct}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherDashboard;
