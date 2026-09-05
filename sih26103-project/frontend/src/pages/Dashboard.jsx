import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  FolderKanban,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  MapPin,
  CalendarDays,
  IndianRupee,
  Users,
  Building2,
  ChevronRight,
  ShieldAlert,
  BarChart3,
  CircleCheck,
  Circle,
} from "lucide-react";

const demoProjects = [
  {
    id: "PRJ-001",
    name: "Government School Construction",
    department: "Education",
    location: "Indore, Madhya Pradesh",
    officer: "Rahul Sharma",
    team: "Education Works Team",
    budget: 5000000,
    expenditure: 3850000,
    progress: 78,
    plannedProgress: 85,
    status: "Ongoing",
    startDate: "01 Jun 2026",
    endDate: "30 Sep 2026",
    risk: "Medium",
    riskText: "Execution is 7% behind planned progress.",
    milestones: [
      { name: "Planning", status: "Completed", date: "10 Jun 2026" },
      { name: "Approval", status: "Completed", date: "18 Jun 2026" },
      { name: "Tender", status: "Completed", date: "28 Jun 2026" },
      { name: "Execution", status: "In Progress", date: "20 Sep 2026" },
      { name: "Completion", status: "Pending", date: "30 Sep 2026" },
    ],
  },
  {
    id: "PRJ-002",
    name: "Urban Road Development",
    department: "PWD",
    location: "Bhopal, Madhya Pradesh",
    officer: "Priya Verma",
    team: "PWD Infrastructure Team",
    budget: 85000000,
    expenditure: 64200000,
    progress: 64,
    plannedProgress: 82,
    status: "Delayed",
    startDate: "15 Mar 2026",
    endDate: "15 Nov 2026",
    risk: "High",
    riskText: "Progress is 18% below planned schedule.",
    milestones: [
      { name: "Planning", status: "Completed", date: "25 Mar 2026" },
      { name: "Approval", status: "Completed", date: "12 Apr 2026" },
      { name: "Tender", status: "Completed", date: "05 May 2026" },
      { name: "Execution", status: "In Progress", date: "20 Oct 2026" },
      { name: "Completion", status: "Pending", date: "15 Nov 2026" },
    ],
  },
  {
    id: "PRJ-003",
    name: "District Hospital Expansion",
    department: "Health",
    location: "Ujjain, Madhya Pradesh",
    officer: "Ankit Jain",
    team: "Health Infrastructure Team",
    budget: 120000000,
    expenditure: 72000000,
    progress: 58,
    plannedProgress: 67,
    status: "At Risk",
    startDate: "10 Jan 2026",
    endDate: "20 Dec 2026",
    risk: "High",
    riskText: "Construction progress is slower than expected.",
    milestones: [
      { name: "Planning", status: "Completed", date: "20 Jan 2026" },
      { name: "Approval", status: "Completed", date: "05 Feb 2026" },
      { name: "Tender", status: "Completed", date: "01 Mar 2026" },
      { name: "Execution", status: "In Progress", date: "15 Nov 2026" },
      { name: "Completion", status: "Pending", date: "20 Dec 2026" },
    ],
  },
  {
    id: "PRJ-004",
    name: "Rural Water Supply Project",
    department: "Jal Shakti",
    location: "Dewas, Madhya Pradesh",
    officer: "Neha Patel",
    team: "Water Supply Division",
    budget: 62000000,
    expenditure: 58900000,
    progress: 92,
    plannedProgress: 90,
    status: "Ongoing",
    startDate: "05 Feb 2026",
    endDate: "30 Sep 2026",
    risk: "Low",
    riskText: "Project is progressing as planned.",
    milestones: [
      { name: "Planning", status: "Completed", date: "15 Feb 2026" },
      { name: "Approval", status: "Completed", date: "28 Feb 2026" },
      { name: "Tender", status: "Completed", date: "15 Mar 2026" },
      { name: "Execution", status: "In Progress", date: "20 Sep 2026" },
      { name: "Completion", status: "Pending", date: "30 Sep 2026" },
    ],
  },
  {
    id: "PRJ-005",
    name: "Solar Street Lighting",
    department: "Energy",
    location: "Indore, Madhya Pradesh",
    officer: "Vikram Singh",
    team: "Renewable Energy Team",
    budget: 28000000,
    expenditure: 28000000,
    progress: 100,
    plannedProgress: 100,
    status: "Completed",
    startDate: "01 Feb 2026",
    endDate: "31 Jul 2026",
    risk: "Low",
    riskText: "Project completed successfully.",
    milestones: [
      { name: "Planning", status: "Completed", date: "10 Feb 2026" },
      { name: "Approval", status: "Completed", date: "20 Feb 2026" },
      { name: "Tender", status: "Completed", date: "10 Mar 2026" },
      { name: "Execution", status: "Completed", date: "15 Jul 2026" },
      { name: "Completion", status: "Completed", date: "31 Jul 2026" },
    ],
  },
  {
    id: "PRJ-006",
    name: "Smart Park Development",
    department: "Urban Development",
    location: "Indore, Madhya Pradesh",
    officer: "Sneha Kapoor",
    team: "Urban Development Team",
    budget: 35000000,
    expenditure: 34700000,
    progress: 100,
    plannedProgress: 100,
    status: "Completed",
    startDate: "10 Jan 2026",
    endDate: "15 Aug 2026",
    risk: "Low",
    riskText: "Project completed within planned schedule.",
    milestones: [
      { name: "Planning", status: "Completed", date: "20 Jan 2026" },
      { name: "Approval", status: "Completed", date: "05 Feb 2026" },
      { name: "Tender", status: "Completed", date: "20 Feb 2026" },
      { name: "Execution", status: "Completed", date: "01 Aug 2026" },
      { name: "Completion", status: "Completed", date: "15 Aug 2026" },
    ],
  },
  {
    id: "PRJ-007",
    name: "Affordable Housing Development",
    department: "Housing",
    location: "Ratlam, Madhya Pradesh",
    officer: "Amit Mishra",
    team: "Housing Development Team",
    budget: 95000000,
    expenditure: 54000000,
    progress: 51,
    plannedProgress: 68,
    status: "Delayed",
    startDate: "20 Feb 2026",
    endDate: "20 Dec 2026",
    risk: "High",
    riskText: "Execution milestone is overdue.",
    milestones: [
      { name: "Planning", status: "Completed", date: "01 Mar 2026" },
      { name: "Approval", status: "Completed", date: "20 Mar 2026" },
      { name: "Tender", status: "Completed", date: "15 Apr 2026" },
      { name: "Execution", status: "Delayed", date: "30 Sep 2026" },
      { name: "Completion", status: "Pending", date: "20 Dec 2026" },
    ],
  },
  {
    id: "PRJ-008",
    name: "Irrigation Canal Modernization",
    department: "Water Resources",
    location: "Khandwa, Madhya Pradesh",
    officer: "Pooja Mehta",
    team: "Water Resources Division",
    budget: 76000000,
    expenditure: 39000000,
    progress: 47,
    plannedProgress: 50,
    status: "Ongoing",
    startDate: "05 Apr 2026",
    endDate: "31 Dec 2026",
    risk: "Medium",
    riskText: "Minor progress gap detected.",
    milestones: [
      { name: "Planning", status: "Completed", date: "15 Apr 2026" },
      { name: "Approval", status: "Completed", date: "30 Apr 2026" },
      { name: "Tender", status: "Completed", date: "20 May 2026" },
      { name: "Execution", status: "In Progress", date: "15 Dec 2026" },
      { name: "Completion", status: "Pending", date: "31 Dec 2026" },
    ],
  },
];

function formatCurrency(amount) {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  }

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  }

  return `₹${amount.toLocaleString("en-IN")}`;
}

function StatusBadge({ status }) {
  const styles = {
    Ongoing: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    Delayed: "bg-red-100 text-red-700",
    "At Risk": "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

function RiskBadge({ risk }) {
  const styles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-orange-100 text-orange-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
        styles[risk]
      }`}
    >
      {risk} Risk
    </span>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("user");
  navigate("/");
};

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user.role === "Admin";
  console.log("USER:", user);
console.log("IS ADMIN:", isAdmin);

  const [selectedProject, setSelectedProject] = useState(
  isAdmin
    ? demoProjects[0]
    : demoProjects.find((project) => project.officer === "Rahul Sharma")
);
  const [departmentFilter, setDepartmentFilter] = useState("All");
const visibleProjects = isAdmin
  ? demoProjects
  : demoProjects.filter((project) => project.officer === "Rahul Sharma");

const filteredProjects = useMemo(() => {
  if (departmentFilter === "All") {
    return visibleProjects;
  }

  return visibleProjects.filter(
    (project) => project.department === departmentFilter
  );
}, [departmentFilter, visibleProjects]);
  const totalBudget = visibleProjects.reduce(
    (sum, project) => sum + project.budget,
    0
  );

  const totalExpenditure = visibleProjects.reduce(
    (sum, project) => sum + project.expenditure,
    0
  );

  const utilization = ((totalExpenditure / totalBudget) * 100).toFixed(1);

  const ongoing = visibleProjects.filter(
    (project) => project.status === "Ongoing"
  ).length;

  const completed = visibleProjects.filter(
    (project) => project.status === "Completed"
  ).length;

  const delayed = visibleProjects.filter(
    (project) =>
      project.status === "Delayed" || project.status === "At Risk"
  ).length;

  const departments = [
    "All",
    ...new Set(visibleProjects.map((project) => project.department)),
  ];

  const riskProjects = visibleProjects.filter(
    (project) => project.risk === "High" || project.risk === "Medium"
  );

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold">
              PM
            </div>

            <div>
              <h1 className="font-bold">Project Monitor</h1>
              <p className="text-xs text-slate-400">SIH 26103</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600">
            <LayoutDashboard size={19} />
            Dashboard
          </button>

         <button
  onClick={() => navigate("/projects")}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
>
  <FolderKanban size={19} />
  Projects
</button>

          <button
  onClick={() => navigate("/issues")}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
>
  <Clock3 size={19} />
  Issues & Delays
</button>

          {isAdmin && (
  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300">
    <TrendingUp size={19} />
    Reports
  </button>
)}
        </nav>

  <div className="mt-auto p-4 border-t border-slate-700"> 
  <p className="text-xs text-slate-500">Logged in as</p>

  <p className="text-sm font-medium mt-1"> 
    {isAdmin ? "Administrator" : "Project Officer"} 
  </p>

  <p className="text-xs text-blue-400 mt-1"> 
    {isAdmin ? "Admin Access" : "Officer Access"} 
  </p>

  <button
    onClick={handleLogout}
    className="w-full mt-4 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition"
  >
    Logout
  </button>
</div>  
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 md:px-8 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
  {isAdmin ? "Project Dashboard" : "My Project Dashboard"}
</h2>

            <p className="text-sm text-slate-500 mt-1">
              Centralized monitoring of government projects
            </p>
          </div>

          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-slate-700">
  {isAdmin ? "Administrator" : "Project Officer"}
</p>
<p className="text-xs text-slate-400">
  {isAdmin ? "Project Monitoring Department" : "Assigned Projects"}
</p>
          </div>
        </header>

        <div className="p-6 md:p-8">
          {/* Top statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Projects</p>
                  <h3 className="text-3xl font-bold text-slate-800 mt-2">
                    {visibleProjects.length}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Across all departments
                  </p>
                </div>

                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FolderKanban className="text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Ongoing</p>
                  <h3 className="text-3xl font-bold text-slate-800 mt-2">
                    {ongoing}
                  </h3>
                  <p className="text-xs text-blue-600 mt-1">
                    Active projects
                  </p>
                </div>

                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Clock3 className="text-indigo-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Completed</p>
                  <h3 className="text-3xl font-bold text-slate-800 mt-2">
                    {completed}
                  </h3>
                  <p className="text-xs text-green-600 mt-1">
                    Successfully completed
                  </p>
                </div>

                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Delayed / At Risk
                  </p>
                  <h3 className="text-3xl font-bold text-slate-800 mt-2">
                    {delayed}
                  </h3>
                  <p className="text-xs text-red-600 mt-1">
                    Requires attention
                  </p>
                </div>

                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Financial statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <IndianRupee className="text-emerald-600" size={20} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">Overall Budget</p>
                  <p className="text-xl font-bold text-slate-800">
                    {formatCurrency(totalBudget)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <BarChart3 className="text-blue-600" size={20} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">Expenditure</p>
                  <p className="text-xl font-bold text-slate-800">
                    {formatCurrency(totalExpenditure)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="text-purple-600" size={20} />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-xs text-slate-500">
                      Budget Utilization
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {utilization}%
                    </p>
                  </div>

                  <div className="w-full bg-slate-200 h-2 rounded-full mt-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${utilization}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Selected project */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
            <div className="p-6 border-b border-slate-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-800">
                      Project Details
                    </h3>
                    <StatusBadge status={selectedProject.status} />
                  </div>

                  <p className="text-sm text-slate-500 mt-1">
                    Selected project overview and performance
                  </p>
                </div>

                <select
                  value={selectedProject.id}
                  onChange={(e) => {
                    const project = visibleProjects.find(
                      (item) => item.id === e.target.value
                    );

                    setSelectedProject(project);
                  }}
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {visibleProjects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.id} - {project.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Project info */}
                <div className="lg:col-span-1">
                  <p className="text-xs text-slate-400 font-semibold uppercase">
                    Project
                  </p>

                  <h4 className="text-xl font-bold text-slate-800 mt-1">
                    {selectedProject.name}
                  </h4>

                  <div className="space-y-3 mt-5 text-sm">
                    <div className="flex gap-3">
                      <Building2 size={18} className="text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-400">Department</p>
                        <p className="font-medium text-slate-700">
                          {selectedProject.department}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <MapPin size={18} className="text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-400">Location</p>
                        <p className="font-medium text-slate-700">
                          {selectedProject.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Users size={18} className="text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-400">
                          Responsible Officer
                        </p>
                        <p className="font-medium text-slate-700">
                          {selectedProject.officer}
                        </p>
                        <p className="text-xs text-slate-400">
                          {selectedProject.team}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <CalendarDays size={18} className="text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-400">Timeline</p>
                        <p className="font-medium text-slate-700">
                          {selectedProject.startDate} →{" "}
                          {selectedProject.endDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Planned vs Actual Progress
                  </p>

                  <div className="mt-5 space-y-5">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-slate-500">
                          Planned Progress
                        </span>
                        <span className="text-sm font-bold text-slate-700">
                          {selectedProject.plannedProgress}%
                        </span>
                      </div>

                      <div className="h-3 bg-slate-200 rounded-full">
                        <div
                          className="h-3 bg-slate-400 rounded-full"
                          style={{
                            width: `${selectedProject.plannedProgress}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-slate-500">
                          Actual Progress
                        </span>
                        <span className="text-sm font-bold text-blue-600">
                          {selectedProject.progress}%
                        </span>
                      </div>

                      <div className="h-3 bg-slate-200 rounded-full">
                        <div
                          className="h-3 bg-blue-600 rounded-full"
                          style={{
                            width: `${selectedProject.progress}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-slate-500">
                        Progress Gap
                      </p>

                      <p
                        className={`text-2xl font-bold mt-1 ${
                          selectedProject.progress >=
                          selectedProject.plannedProgress
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {selectedProject.progress -
                          selectedProject.plannedProgress}
                        %
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        Actual progress compared with planned progress
                      </p>
                    </div>
                  </div>
                </div>

                {/* Financial */}
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Financial Progress
                  </p>

                  <div className="mt-5 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">
                        Allocated Budget
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(selectedProject.budget)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">
                        Amount Spent
                      </span>
                      <span className="font-semibold text-blue-600">
                        {formatCurrency(selectedProject.expenditure)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">
                        Remaining
                      </span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(
                          selectedProject.budget -
                            selectedProject.expenditure
                        )}
                      </span>
                    </div>

                    <div className="pt-3 border-t">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-slate-500">
                          Budget Utilization
                        </span>

                        <span className="text-xs font-bold">
                          {(
                            (selectedProject.expenditure /
                              selectedProject.budget) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>

                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{
                            width: `${
                              (selectedProject.expenditure /
                                selectedProject.budget) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h4 className="font-bold text-slate-800">
                      Project Milestones
                    </h4>

                    <p className="text-xs text-slate-400 mt-1">
                      Planning → Approval → Tender → Execution → Completion
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {selectedProject.milestones.map((milestone, index) => {
                    const completed = milestone.status === "Completed";
                    const delayed = milestone.status === "Delayed";
                    const active = milestone.status === "In Progress";

                    return (
                      <div
                        key={milestone.name}
                        className={`rounded-xl border p-4 ${
                          delayed
                            ? "border-red-200 bg-red-50"
                            : active
                            ? "border-blue-200 bg-blue-50"
                            : completed
                            ? "border-green-200 bg-green-50"
                            : "border-slate-200 bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-400">
                            0{index + 1}
                          </span>

                          {completed ? (
                            <CircleCheck
                              size={19}
                              className="text-green-600"
                            />
                          ) : delayed ? (
                            <AlertTriangle
                              size={19}
                              className="text-red-600"
                            />
                          ) : active ? (
                            <Clock3
                              size={19}
                              className="text-blue-600"
                            />
                          ) : (
                            <Circle
                              size={19}
                              className="text-slate-400"
                            />
                          )}
                        </div>

                        <p className="font-semibold text-sm text-slate-700 mt-3">
                          {milestone.name}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {milestone.date}
                        </p>

                        <p
                          className={`text-xs font-semibold mt-2 ${
                            delayed
                              ? "text-red-600"
                              : active
                              ? "text-blue-600"
                              : completed
                              ? "text-green-600"
                              : "text-slate-400"
                          }`}
                        >
                          {milestone.status}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Risk */}
              <div className="mt-6">
                <div
                  className={`rounded-xl border p-4 ${
                    selectedProject.risk === "High"
                      ? "bg-red-50 border-red-200"
                      : selectedProject.risk === "Medium"
                      ? "bg-orange-50 border-orange-200"
                      : "bg-green-50 border-green-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <ShieldAlert
                      size={22}
                      className={
                        selectedProject.risk === "High"
                          ? "text-red-600"
                          : selectedProject.risk === "Medium"
                          ? "text-orange-600"
                          : "text-green-600"
                      }
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-800">
                          Project Risk Alert
                        </p>
                        <RiskBadge risk={selectedProject.risk} />
                      </div>

                      <p className="text-sm text-slate-600 mt-1">
                        {selectedProject.riskText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project list */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
            <div className="p-6 border-b border-slate-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Project Overview
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Select a project to inspect detailed performance
                  </p>
                </div>

                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
                >
                  {departments.map((department) => (
                    <option key={department}>{department}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="w-full text-left p-5 hover:bg-slate-50 transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                    <div className="lg:w-1/3">
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-slate-400 font-medium">
                          {project.id}
                        </p>

                        <StatusBadge status={project.status} />
                      </div>

                      <h4 className="font-semibold text-slate-800 mt-1">
                        {project.name}
                      </h4>

                      <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                        <MapPin size={13} />
                        {project.location}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-slate-500">
                          Actual Progress
                        </span>

                        <span className="text-sm font-semibold text-slate-700">
                          {project.progress}%
                        </span>
                      </div>

                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${project.progress}%`,
                          }}
                        />
                      </div>

                      <div className="flex justify-between mt-2">
                        <span className="text-[11px] text-slate-400">
                          Planned: {project.plannedProgress}%
                        </span>

                        <span className="text-[11px] text-slate-400">
                          Budget: {formatCurrency(project.budget)}
                        </span>
                      </div>
                    </div>

                    <div className="lg:w-32">
                      <p className="text-xs text-slate-400">Officer</p>
                      <p className="text-sm font-medium text-slate-700 mt-1">
                        {project.officer}
                      </p>
                    </div>

                    <div className="lg:w-28 flex justify-end">
                      <ChevronRight
                        size={20}
                        className="text-slate-400"
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Risk alerts */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <ShieldAlert className="text-red-600" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    Risk & Delay Alerts
                  </h3>

                  <p className="text-xs text-slate-500">
                    Projects requiring officer attention
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {riskProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-400">
                        {project.id}
                      </p>

                      <p className="font-semibold text-slate-800 mt-1">
                        {project.name}
                      </p>

                      <p className="text-sm text-slate-500 mt-2">
                        {project.riskText}
                      </p>
                    </div>

                    <RiskBadge risk={project.risk} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;