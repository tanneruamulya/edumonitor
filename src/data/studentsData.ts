// Comprehensive student data for all classes and sections
// Each class has 36 students with unique Indian names and individual data

export interface Student {
  id: string;
  name: string;
  attendance: number;
  attention: number;
  behavior: number;
  engagement: number;
  misconduct: number;
  parentContact: string;
  email: string;
  rollNo: string;
}

export interface MisconductRecord {
  id: string;
  studentId: string;
  studentName: string;
  classSection: string;
  type: string;
  date: string;
  time: string;
  teacher: string;
  actionTaken: string;
  videoClip?: string;
}

const indianNames = [
  "Aarav Sharma", "Vivaan Patel", "Aditya Kumar", "Vihaan Singh", "Arjun Reddy",
  "Sai Krishnan", "Reyansh Gupta", "Ayaan Iyer", "Krishna Nair", "Ishaan Menon",
  "Arnav Joshi", "Shaurya Rao", "Dhruv Pillai", "Kabir Ahmed", "Ritvik Bhat",
  "Aarush Verma", "Advait Kulkarni", "Rudra Hegde", "Atharva Deshmukh", "Ananya Mishra",
  "Diya Kapoor", "Saanvi Chatterjee", "Aanya Sen", "Aadhya Banerjee", "Pari Mukherjee",
  "Myra Das", "Sara Khan", "Ira Sinha", "Navya Ghosh", "Anika Bose",
  "Priya Chakraborty", "Khushi Mahajan", "Riya Saxena", "Anvi Tiwari", "Kiara Pandey",
  "Mira Agarwal", "Shreya Rastogi", "Tanvi Dubey", "Nisha Bhatt", "Kavya Srivastava",
  "Meera Yadav", "Pooja Thakur", "Simran Kaur", "Neha Malhotra", "Anjali Chopra",
  "Amulya Reddy", "Sharon Varghese", "Chandana Prasad", "Sahasra Naidu", "Harsha Gowda",
  "Aqeel Sheikh", "Mohammed Farhan", "Zainab Ansari", "Fatima Siddiqui", "Ayesha Begum",
  "Rohan Mathew", "Joel Thomas", "Maria Joseph", "Grace Samuel", "David Fernandes",
  "Rahul Menon", "Sneha Nambiar", "Lakshmi Suresh", "Ganesh Pillai", "Deepa Krishnan",
  "Vishnu Warrier", "Anjana Mohan", "Revathi Unni", "Arjun Madhavan", "Gayatri Nair",
  "Siddharth Roy", "Trisha Bhattacharya", "Sourav Dey", "Moumita Paul", "Debashish Sarkar",
  "Abhishek Choudhury", "Pallavi Goswami", "Dipankar Lahiri", "Arunima Basu", "Subhash Dutta",
  "Varun Hegde", "Akshay Shetty", "Divya Kamath", "Supriya Bhat", "Prashanth Rao",
  "Manish Patil", "Swati Kulkarni", "Vinay Gaikwad", "Reshma Pawar", "Sachin Jadhav"
];

const misconductTypes = [
  "Cheating during exam",
  "Leaving class without permission",
  "Using phone in class",
  "Disturbing class / talking loudly",
  "Bullying / misbehaving",
  "Not paying attention repeatedly"
];

const teachers = [
  "Mrs. Lakshmi Devi", "Mr. Ramesh Kumar", "Mrs. Padmavathi", "Mr. Suresh Babu",
  "Mrs. Anitha Rao", "Mr. Venkatesh", "Mrs. Kavitha Sharma", "Mr. Rajesh Singh"
];

const actionTypes = [
  "Consultation pending",
  "Warning issued",
  "Parent meeting scheduled"
];

// Generate unique data for each student
const generateStudentData = (classNum: number, section: string, index: number): Student => {
  const baseId = `STU${classNum}${section}${String(index + 1).padStart(3, '0')}`;
  const nameIndex = ((classNum - 1) * 108 + (section.charCodeAt(0) - 65) * 36 + index) % indianNames.length;
  const name = indianNames[(nameIndex + index * 7) % indianNames.length];
  
  // Generate varied but consistent data for each student
  const seed = classNum * 1000 + (section.charCodeAt(0) - 65) * 100 + index;
  const attendance = 75 + (seed % 25);
  const attention = 60 + ((seed * 3) % 35);
  const behavior = 65 + ((seed * 7) % 30);
  const engagement = 55 + ((seed * 11) % 40);
  const misconduct = (seed % 8);

  return {
    id: baseId,
    name,
    attendance,
    attention,
    behavior,
    engagement,
    misconduct,
    parentContact: `+91 ${9000000000 + seed}`,
    email: `${name.toLowerCase().replace(' ', '.')}@school.edu`,
    rollNo: String(index + 1)
  };
};

// Generate students for a specific class and section
export const getStudentsForSection = (classNum: number, section: string): Student[] => {
  return Array.from({ length: 36 }, (_, index) => 
    generateStudentData(classNum, section, index)
  );
};

// Get student by ID
export const getStudentById = (studentId: string): Student | null => {
  // Parse the student ID to get class, section and index
  const match = studentId.match(/STU(\d+)([ABC])(\d+)/);
  if (!match) return null;
  
  const classNum = parseInt(match[1]);
  const section = match[2];
  const index = parseInt(match[3]) - 1;
  
  if (classNum < 1 || classNum > 10 || index < 0 || index >= 36) return null;
  
  return generateStudentData(classNum, section, index);
};

// Generate attendance data for a student
export const getAttendanceData = (studentId: string) => {
  const seed = studentId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return [
    { month: "Jan", present: 18 + (seed % 4), absent: 2 - (seed % 2) },
    { month: "Feb", present: 17 + (seed % 5), absent: 3 - (seed % 3) },
    { month: "Mar", present: 19 + (seed % 3), absent: 1 + (seed % 2) },
    { month: "Apr", present: 16 + (seed % 6), absent: 4 - (seed % 3) },
    { month: "May", present: 20 + (seed % 2), absent: seed % 2 },
  ];
};

// Generate attention data for a student
export const getAttentionData = (studentId: string) => {
  const seed = studentId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return [
    { week: "Week 1", attention: 65 + (seed % 20) },
    { week: "Week 2", attention: 70 + ((seed * 2) % 18) },
    { week: "Week 3", attention: 68 + ((seed * 3) % 22) },
    { week: "Week 4", attention: 72 + ((seed * 5) % 20) },
    { week: "Week 5", attention: 75 + ((seed * 7) % 18) },
  ];
};

// Generate behavior data for a student
export const getBehaviorData = (studentId: string) => {
  const seed = studentId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const excellent = 40 + (seed % 30);
  const good = 25 + ((seed * 2) % 20);
  const needsImprovement = 100 - excellent - good;
  return [
    { name: "Excellent", value: excellent, color: "hsl(142, 71%, 45%)" },
    { name: "Good", value: good, color: "hsl(199, 89%, 48%)" },
    { name: "Needs Improvement", value: needsImprovement, color: "hsl(38, 92%, 50%)" },
  ];
};

// Generate engagement data for a student
export const getEngagementData = (studentId: string) => {
  const seed = studentId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return [
    { subject: "Math", score: 60 + (seed % 35) },
    { subject: "Physics", score: 55 + ((seed * 2) % 40) },
    { subject: "Chemistry", score: 65 + ((seed * 3) % 30) },
    { subject: "English", score: 70 + ((seed * 5) % 25) },
    { subject: "History", score: 58 + ((seed * 7) % 37) },
  ];
};

// Generate misconduct data for a student
export const getMisconductData = (studentId: string) => {
  const seed = studentId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return [
    { month: "Jan", incidents: seed % 3 },
    { month: "Feb", incidents: (seed * 2) % 2 },
    { month: "Mar", incidents: (seed * 3) % 4 },
    { month: "Apr", incidents: (seed * 5) % 2 },
    { month: "May", incidents: (seed * 7) % 3 },
  ];
};

// Generate misconduct records for all students
export const generateMisconductRecords = (): MisconductRecord[] => {
  const records: MisconductRecord[] = [];
  let recordId = 1;

  for (let classNum = 1; classNum <= 10; classNum++) {
    for (const section of ['A', 'B', 'C']) {
      const students = getStudentsForSection(classNum, section);
      students.forEach((student, idx) => {
        if (student.misconduct > 0) {
          for (let m = 0; m < student.misconduct && m < 3; m++) {
            const seed = student.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + m;
            records.push({
              id: `MIS${String(recordId++).padStart(4, '0')}`,
              studentId: student.id,
              studentName: student.name,
              classSection: `${classNum}-${section}`,
              type: misconductTypes[seed % misconductTypes.length],
              date: `2024-${String(1 + (seed % 11)).padStart(2, '0')}-${String(1 + (seed % 28)).padStart(2, '0')}`,
              time: `${String(8 + (seed % 8)).padStart(2, '0')}:${String(seed % 60).padStart(2, '0')} ${seed % 2 === 0 ? 'AM' : 'PM'}`,
              teacher: teachers[seed % teachers.length],
              actionTaken: actionTypes[seed % actionTypes.length]
            });
          }
        }
      });
    }
  }

  return records.slice(0, 100); // Return first 100 records for display
};

// Get all misconduct records
export const getAllMisconductRecords = generateMisconductRecords();

// Get notifications for teachers
export interface TeacherNotification {
  id: string;
  studentName: string;
  type: string;
  time: string;
  classSection: string;
  isRead: boolean;
}

export const generateTeacherNotifications = (): TeacherNotification[] => {
  return [
    { id: "N001", studentName: "Aarav Sharma", type: "Cheating during exam", time: "10:42 AM", classSection: "5-A", isRead: false },
    { id: "N002", studentName: "Vivaan Patel", type: "Leaving class without permission", time: "11:05 AM", classSection: "3-B", isRead: false },
    { id: "N003", studentName: "Diya Kapoor", type: "Using phone in class", time: "09:30 AM", classSection: "7-C", isRead: false },
    { id: "N004", studentName: "Arjun Reddy", type: "Disturbing class / talking loudly", time: "02:15 PM", classSection: "9-A", isRead: true },
    { id: "N005", studentName: "Saanvi Chatterjee", type: "Not paying attention repeatedly", time: "01:45 PM", classSection: "6-B", isRead: true },
    { id: "N006", studentName: "Krishna Nair", type: "Bullying / misbehaving", time: "10:20 AM", classSection: "4-C", isRead: false },
    { id: "N007", studentName: "Ananya Mishra", type: "Using phone in class", time: "03:30 PM", classSection: "8-A", isRead: false },
    { id: "N008", studentName: "Kabir Ahmed", type: "Leaving class without permission", time: "11:50 AM", classSection: "2-B", isRead: true },
  ];
};
