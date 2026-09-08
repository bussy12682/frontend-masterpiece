export const school = {
  name: "Bright Future College",
  email: "info@brightfuture.edu.ng",
  phone: "+234 801 234 5678",
  address: "123 Education Road, Lagos, Nigeria",
};

export const sessions = ["2026/2027", "2025/2026", "2024/2025"];
export const terms = ["First Term", "Second Term", "Third Term"];

export const classes = [
  { name: "JSS1A", level: "JSS1", arm: "A", students: 28 },
  { name: "JSS1B", level: "JSS1", arm: "B", students: 27 },
  { name: "JSS2A", level: "JSS2", arm: "A", students: 30 },
  { name: "JSS2B", level: "JSS2", arm: "B", students: 29 },
  { name: "SS1A", level: "SS1", arm: "A", students: 26 },
  { name: "SS1B", level: "SS1", arm: "B", students: 25 },
  { name: "SS2A", level: "SS2", arm: "A", students: 24 },
  { name: "SS2B", level: "SS2", arm: "B", students: 23 },
];

export const subjects = [
  { code: "MTH", name: "Mathematics", teacher: "Mr. John Doe", classes: 6 },
  { code: "ENG", name: "English Language", teacher: "Mrs. Grace Ade", classes: 8 },
  { code: "PHY", name: "Physics", teacher: "Mr. John Doe", classes: 4 },
  { code: "CHM", name: "Chemistry", teacher: "Mr. Emmanuel B.", classes: 4 },
  { code: "BIO", name: "Biology", teacher: "Mrs. Ngozi Uche", classes: 5 },
  { code: "CIV", name: "Civic Education", teacher: "Mr. Tunde Bello", classes: 8 },
];

export const students = [
  { id: "EDU-2036-0001", name: "John Doe", cls: "SS1A", age: 15, gender: "Male" },
  { id: "EDU-2036-0002", name: "Mary James", cls: "SS1A", age: 16, gender: "Female" },
  { id: "EDU-2036-0003", name: "David Paul", cls: "SS1B", age: 15, gender: "Male" },
  { id: "EDU-2036-0004", name: "Esther Okafor", cls: "SS2A", age: 17, gender: "Female" },
  { id: "EDU-2036-0005", name: "Chinedu Nwosu", cls: "SS2B", age: 16, gender: "Male" },
  { id: "EDU-2036-0006", name: "Aisha Bello", cls: "JSS2A", age: 13, gender: "Female" },
  { id: "EDU-2036-0007", name: "Samuel Eze", cls: "JSS1A", age: 11, gender: "Male" },
  { id: "EDU-2036-0008", name: "Fatima Musa", cls: "JSS1B", age: 12, gender: "Female" },
];

export const teachers = [
  { id: "TCH-001", name: "Mr. John Doe", email: "john@brightfuture.edu.ng", subject: "Mathematics", classes: 3 },
  { id: "TCH-002", name: "Mrs. Grace Ade", email: "grace@brightfuture.edu.ng", subject: "English Language", classes: 4 },
  { id: "TCH-003", name: "Mr. Emmanuel B.", email: "emma@brightfuture.edu.ng", subject: "Chemistry", classes: 2 },
  { id: "TCH-004", name: "Mrs. Ngozi Uche", email: "ngozi@brightfuture.edu.ng", subject: "Biology", classes: 3 },
  { id: "TCH-005", name: "Mr. Tunde Bello", email: "tunde@brightfuture.edu.ng", subject: "Civic Education", classes: 5 },
];

export const assignments = [
  { teacher: "Mr. John Doe", subject: "Mathematics", cls: "SS1A", session: "2026/2027", term: "First Term" },
  { teacher: "Mr. John Doe", subject: "Mathematics", cls: "SS1B", session: "2026/2027", term: "First Term" },
  { teacher: "Mr. John Doe", subject: "Physics", cls: "SS2A", session: "2026/2027", term: "First Term" },
  { teacher: "Mrs. Grace Ade", subject: "English Language", cls: "JSS1A", session: "2026/2027", term: "First Term" },
  { teacher: "Mrs. Ngozi Uche", subject: "Biology", cls: "SS1A", session: "2026/2027", term: "First Term" },
];

export type ScoreRow = { student: string; t1: number; t2: number; exam: number };

export const scoreRows: ScoreRow[] = [
  { student: "John Doe", t1: 15, t2: 18, exam: 60 },
  { student: "Mary James", t1: 12, t2: 16, exam: 55 },
  { student: "David Paul", t1: 10, t2: 14, exam: 48 },
  { student: "Esther Okafor", t1: 8, t2: 12, exam: 45 },
  { student: "Chinedu Nwosu", t1: 18, t2: 20, exam: 58 },
];

export function grade(total: number) {
  if (total >= 90) return "A";
  if (total >= 75) return "B";
  if (total >= 60) return "C";
  if (total >= 50) return "D";
  return "F";
}

export const attendanceRows = [
  { student: "John Doe", status: "Present" },
  { student: "Mary James", status: "Present" },
  { student: "David Paul", status: "Absent" },
  { student: "Esther Okafor", status: "Present" },
  { student: "Chinedu Nwosu", status: "Late" },
];

export const resultSubjects = [
  { subject: "Mathematics", t1: 15, t2: 18, exam: 60 },
  { subject: "English Language", t1: 14, t2: 17, exam: 54 },
  { subject: "Physics", t1: 12, t2: 16, exam: 50 },
  { subject: "Chemistry", t1: 13, t2: 15, exam: 48 },
  { subject: "Biology", t1: 16, t2: 18, exam: 56 },
];

export const performance = [
  { cls: "JSS1", average: 68, top: 92 },
  { cls: "JSS2", average: 72, top: 95 },
  { cls: "JSS3", average: 65, top: 88 },
  { cls: "SS1", average: 74, top: 96 },
  { cls: "SS2", average: 70, top: 93 },
  { cls: "SS3", average: 77, top: 98 },
];

export const activities = [
  { title: "New student registered", detail: "John Doe · SS1A", time: "2 hours ago" },
  { title: "Score entry completed", detail: "Mathematics · SS1A", time: "4 hours ago" },
  { title: "New teacher added", detail: "Mr. Emmanuel B.", time: "6 hours ago" },
  { title: "Report generated", detail: "SS1A · First Term", time: "1 day ago" },
];
