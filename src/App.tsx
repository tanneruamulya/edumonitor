import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherDashboard from "./pages/TeacherDashboard";
import Classes from "./pages/Classes";
import ClassroomDashboard from "./pages/ClassroomDashboard";
import StudentDetails from "./pages/StudentDetails";
import SchoolProfile from "./pages/SchoolProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classroom/:classId/:sectionId" element={<ClassroomDashboard />} />
          <Route path="/student/:studentId" element={<StudentDetails />} />
          <Route path="/school-profile" element={<SchoolProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
