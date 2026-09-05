import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  MapPin,
  Users,
  CalendarDays,
  IndianRupee,
  ChevronRight,
  FolderKanban,
} from "lucide-react";

const projects = [
  {
    id: "PRJ-001",
    name: "Government School Construction",
    department: "Education",
    location: "Indore, Madhya Pradesh",
    officer: "Rahul Sharma",
    budget: 5000000,
    expenditure: 3850000,
    progress: 78,
    planned: 85,
    status: "Ongoing",
    risk: "Medium",
    endDate: "30 Sep 2026",
  },
  {
    id: "PRJ-002",
    name: "Urban Road Development",
    department: "PWD",
    location: "Bhopal, Madhya Pradesh",
    officer: "Priya Verma",
    budget: 85000000,
    expenditure: 64200000,
    progress: 64,
    planned: 82,
    status: "Delayed",
    risk: "High",
    endDate: "15 Aug 2026",
  },
  {
    id: "PRJ-003",
    name: "District Hospital Expansion",
    department: "Health",
    location: "Ujjain, Madhya Pradesh",
    officer: "Ankit Jain",
    budget: 120000000,
    expenditure: 72000000,
    progress: 58,
    planned: 67,
    status: "At Risk",
    risk: "High",
    endDate: "20 Dec 2026",
  },
  {
    id: "PRJ-004",
    name: "Rural Water Supply Project",
    department: "Jal Shakti",
    location: "Dewas, Madhya Pradesh",
    officer: "Neha Patel",
    budget: 62000000,
    expenditure: 58900000,
    progress: 92,
    planned: 90,
    status: "Ongoing",
    risk: "Low",
    endDate: "10 Oct 2026",
  },
  {
    id: "PRJ-005",
    name: "Solar Street Lighting",
    department: "Energy",
    location: "Indore, Madhya Pradesh",
    officer: "Vikram Singh",
    budget: 28000000,
    expenditure: 28000000,
    progress: 100,
    planned: 100,
    status: "Completed",
    risk: "Low",
    endDate: "30 Jun 2026",
  },
  {
    id: "PRJ-006",
    name: "Smart Park Development",
    department: "Urban Development",
    location: "Indore, Madhya Pradesh",
    officer: "Sneha Kapoor",
    budget: 35000000,
    expenditure: 34700000,
    progress: 100,
    planned: 100,
    status: "Completed",
    risk: "Low",
    endDate: "15 Jul 2026",
  },
  {
    id: "PRJ-007",
    name: "Affordable Housing Development",
    department: "Housing",
    location: "Ratlam, Madhya Pradesh",
    officer: "Amit Mishra",
    budget: 95000000,
    expenditure: 54000000,
    progress: 51,
    planned: 68,
    status: "Delayed",
    risk: "High",
    endDate: "05 Nov 2026",
  },
  {
    id: "PRJ-008",
    name: "Irrigation Canal Modernization",
    department: "Water Resources",
    location: "Khandwa, Madhya Pradesh",
    officer: "Pooja Mehta",
    budget: 76000000,
    expenditure: 39000000,
    progress: 47,
    planned: 50,
    status: "Ongoing",
    risk: "Medium",
    endDate: "25 Jan 2027",
  },
];

const formatCurrency = (amount) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  }

  return `₹${(amount / 100000).toFixed(1)} L`;
};

function StatusBadge({ status }) {
  const styles = {
    Ongoing: "bg-blue-50 text-blue-700 border-blue-200",
    Completed: "bg-green-50 text-green-700 border-green-200",
    Delayed: "bg-red-50 text-red-700 border-red-200",
    "At Risk": "bg-orange-50 text-orange-700 border-orange-200",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
        styles[status] || "bg-slate-50 text-slate-600 border-slate-200"
      }`}
    >
      {status}
    </span>
  );
}

function RiskBadge({ risk }) {
  const styles = {
    High: "text-red-600 bg-red-50",
    Medium: "text-orange-600 bg-orange-50",
    Low: "text-green-600 bg-green-50",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
        styles[risk]
      }`}
    >
      {risk} Risk
    </span>
  );
}

function Projects() {
    const navigate = useNavigate();
  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Admin can see all projects
  const isAdmin = user.role === "Admin";

  // Officer can see only Rahul Sharma's assigned projects
  const visibleProjects = isAdmin
    ? projects
    : projects.filter((project) => project.officer === "Rahul Sharma");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  const departments = useMemo(() => {
    return [
      "All",
      ...new Set(visibleProjects.map((project) => project.department)),
    ];
  }, [visibleProjects]);

  const filteredProjects = visibleProjects.filter((project) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      project.name.toLowerCase().includes(searchText) ||
      project.id.toLowerCase().includes(searchText) ||
      project.location.toLowerCase().includes(searchText) ||
      project.officer.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;

    const matchesDepartment =
      departmentFilter === "All" ||
      project.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center">
              <FolderKanban className="text-white" size={23} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-800">
                Project Monitor
              </h1>

              <p className="text-xs text-slate-500">
                Integrated Project-Monitoring Platform
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-slate-700">
              {isAdmin ? "Administrator" : "Project Officer"}
            </p>

            <p className="text-xs text-slate-500">
              {isAdmin ? "Admin Access" : "Officer Access"}
            </p>
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Page Heading */}
        <div className="mb-7">
          <p className="text-sm text-blue-600 font-semibold mb-1">
            PROJECT MANAGEMENT
          </p>

          <h2 className="text-3xl font-bold text-slate-800">
            {isAdmin ? "Projects" : "My Projects"}
          </h2>

          <p className="text-slate-500 mt-1">
            {isAdmin
              ? "Monitor project progress, budget utilization and implementation status."
              : "View and monitor your assigned project progress and implementation status."}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-7">

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">Total Projects</p>
            <p className="text-3xl font-bold text-slate-800 mt-2">
              {visibleProjects.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">Ongoing</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {visibleProjects.filter((p) => p.status === "Ongoing").length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">Delayed</p>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {visibleProjects.filter((p) => p.status === "Delayed").length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {visibleProjects.filter((p) => p.status === "Completed").length}
            </p>
          </div>

        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-6">

          <div className="flex flex-col lg:flex-row gap-4">

            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search by project, ID, location or officer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Delayed">Delayed</option>
              <option value="At Risk">At Risk</option>
            </select>

            {/* Department */}
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department === "All"
                    ? "All Departments"
                    : department}
                </option>
              ))}
            </select>

          </div>

          <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
            <Filter size={14} />
            Showing {filteredProjects.length} of {visibleProjects.length} projects
          </div>

        </div>

        {/* Project List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

          <div className="px-6 py-5 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-800">
              {isAdmin ? "Project Portfolio" : "My Project Portfolio"}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {isAdmin
                ? "Select a project to view detailed monitoring information."
                : "View detailed monitoring information for your assigned project."}
            </p>
          </div>

          <div className="divide-y divide-slate-100">

            {filteredProjects.map((project) => (

              <div
  key={project.id}
  onClick={() => navigate(`/projects/${project.id}`)}
  className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
>
                <div className="flex flex-col xl:flex-row xl:items-center gap-5">

                  {/* Project Name */}
                  <div className="xl:w-1/4">
                    <div className="flex items-start gap-3">

                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                        <FolderKanban
                          size={19}
                          className="text-blue-600"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-blue-600">
                          {project.id}
                        </p>

                        <h4 className="font-bold text-slate-800 mt-1">
                          {project.name}
                        </h4>
                      </div>

                    </div>
                  </div>

                  {/* Department / Location */}
                  <div className="xl:w-1/5">
                    <p className="text-xs text-slate-400 uppercase font-semibold">
                      Department
                    </p>

                    <p className="text-sm font-medium text-slate-700 mt-1">
                      {project.department}
                    </p>

                    <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                      <MapPin size={13} />
                      {project.location}
                    </div>
                  </div>

                  {/* Officer */}
                  <div className="xl:w-1/6">
                    <p className="text-xs text-slate-400 uppercase font-semibold">
                      Officer
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <Users size={15} className="text-slate-400" />

                      <span className="text-sm text-slate-700">
                        {project.officer}
                      </span>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="xl:w-1/6">
                    <p className="text-xs text-slate-400 uppercase font-semibold">
                      Budget
                    </p>

                    <div className="flex items-center gap-1 mt-2">
                      <IndianRupee
                        size={14}
                        className="text-slate-400"
                      />

                      <span className="text-sm font-semibold text-slate-700">
                        {formatCurrency(project.budget)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-1">
                      Spent {formatCurrency(project.expenditure)}
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="xl:w-1/6">

                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-500">
                        Progress
                      </span>

                      <span className="font-bold text-slate-700">
                        {project.progress}%
                      </span>
                    </div>

                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          width: `${project.progress}%`,
                        }}
                      />
                    </div>

                    <div className="mt-3">
                      <StatusBadge status={project.status} />
                    </div>

                  </div>

                  {/* Risk / Arrow */}
                  <div className="flex items-center gap-3">

                    <div>
                      <RiskBadge risk={project.risk} />

                      <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
                        <CalendarDays size={12} />
                        {project.endDate}
                      </div>
                    </div>

                    <ChevronRight
                      size={20}
                      className="text-slate-400"
                    />

                  </div>

                </div>

              </div>

            ))}

            {filteredProjects.length === 0 && (
              <div className="p-12 text-center">

                <Search
                  size={35}
                  className="mx-auto text-slate-300"
                />

                <h3 className="font-semibold text-slate-700 mt-3">
                  No projects found
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Try changing your search or filters.
                </p>

              </div>
            )}

          </div>

        </div>

        {/* Demo Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">

          <p className="text-xs font-semibold text-blue-700">
            Prototype Demo Data
          </p>

          <p className="text-xs text-blue-600 mt-1">
            Project information shown here is simulated data for the SIH 26103 prototype.
          </p>

        </div>

      </main>
    </div>
  );
}

export default Projects;