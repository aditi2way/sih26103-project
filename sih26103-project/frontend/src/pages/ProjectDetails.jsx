import {
  ArrowLeft,
  MapPin,
  Users,
  CalendarDays,
  IndianRupee,
  FolderKanban,
  AlertTriangle,
  Target,
  TrendingUp,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

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
    startDate: "01 Jan 2026",
    endDate: "30 Sep 2026",
    description:
      "Construction and development of government school infrastructure to improve educational facilities and provide a better learning environment.",
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
    startDate: "15 Feb 2026",
    endDate: "15 Aug 2026",
    description:
      "Development and improvement of major urban roads to improve connectivity and transportation infrastructure.",
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
    startDate: "10 Mar 2026",
    endDate: "20 Dec 2026",
    description:
      "Expansion of district hospital infrastructure including additional facilities, treatment areas and supporting infrastructure.",
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
    startDate: "05 Jan 2026",
    endDate: "10 Oct 2026",
    description:
      "Development of rural water supply infrastructure to provide reliable access to clean drinking water.",
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
    startDate: "10 Jan 2026",
    endDate: "30 Jun 2026",
    description:
      "Installation of solar-powered street lighting systems across selected urban areas.",
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
    startDate: "20 Jan 2026",
    endDate: "15 Jul 2026",
    description:
      "Development of a smart public park with modern recreational facilities and improved public amenities.",
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
    startDate: "01 Feb 2026",
    endDate: "05 Nov 2026",
    description:
      "Construction of affordable housing units to support housing accessibility for eligible beneficiaries.",
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
    startDate: "15 Apr 2026",
    endDate: "25 Jan 2027",
    description:
      "Modernization of existing irrigation canal infrastructure to improve water distribution and agricultural productivity.",
  },
];

const milestones = [
  {
    name: "Project Planning",
    date: "15 Jan 2026",
    status: "Completed",
  },
  {
    name: "Foundation Work",
    date: "15 Mar 2026",
    status: "Completed",
  },
  {
    name: "Construction Phase",
    date: "30 Jun 2026",
    status: "In Progress",
  },
  {
    name: "Final Inspection",
    date: "15 Sep 2026",
    status: "Pending",
  },
];

const issues = [
  {
    id: "ISS-001",
    title: "Material procurement delay",
    severity: "Medium",
    status: "Open",
  },
  {
    id: "ISS-002",
    title: "Weather related delay",
    severity: "Low",
    status: "Resolved",
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
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        styles[risk] || "text-slate-600 bg-slate-50"
      }`}
    >
      {risk} Risk
    </span>
  );
}

function ProjectDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Find project using the URL parameter
  const project = projects.find(
    (p) => p.id.toLowerCase() === String(id).toLowerCase()
  );

  // Project not found
  if (!project) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
          <div className="w-14 h-14 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="text-red-500" size={26} />
          </div>

          <h2 className="text-xl font-bold text-slate-800">
            Project Not Found
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            The requested project could not be found.
          </p>

          <button
            onClick={() => navigate("/projects")}
            className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

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
              Project Officer
            </p>

            <p className="text-xs text-slate-500">
              Monitoring Access
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/projects")}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 mb-6 transition"
        >
          <ArrowLeft size={18} />
          Back to Projects
        </button>

        {/* Project Header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                <FolderKanban size={27} className="text-blue-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-blue-600">
                  {project.id}
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-1">
                  {project.name}
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  {project.department}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <StatusBadge status={project.status} />
              <RiskBadge risk={project.risk} />
            </div>
          </div>
        </div>

        {/* Key Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {/* Location */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin size={18} />

              <span className="text-xs font-semibold uppercase">
                Location
              </span>
            </div>

            <p className="font-semibold text-slate-700 mt-3">
              {project.location}
            </p>
          </div>

          {/* Officer */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 text-slate-400">
              <Users size={18} />

              <span className="text-xs font-semibold uppercase">
                Officer
              </span>
            </div>

            <p className="font-semibold text-slate-700 mt-3">
              {project.officer}
            </p>
          </div>

          {/* Start Date */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 text-slate-400">
              <CalendarDays size={18} />

              <span className="text-xs font-semibold uppercase">
                Start Date
              </span>
            </div>

            <p className="font-semibold text-slate-700 mt-3">
              {project.startDate}
            </p>
          </div>

          {/* End Date */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 text-slate-400">
              <CalendarDays size={18} />

              <span className="text-xs font-semibold uppercase">
                End Date
              </span>
            </div>

            <p className="font-semibold text-slate-700 mt-3">
              {project.endDate}
            </p>
          </div>
        </div>

        {/* Budget + Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Budget */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <IndianRupee size={20} className="text-blue-600" />

              <h3 className="text-lg font-bold text-slate-800">
                Budget Utilization
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">
                  Approved Budget
                </p>

                <p className="text-2xl font-bold text-slate-800 mt-2">
                  {formatCurrency(project.budget)}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">
                  Expenditure
                </p>

                <p className="text-2xl font-bold text-blue-600 mt-2">
                  {formatCurrency(project.expenditure)}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-500">Budget Used</span>

                <span className="font-bold text-slate-700">
                  {((project.expenditure / project.budget) * 100).toFixed(1)}%
                </span>
              </div>

              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{
                    width: `${Math.min(
                      (project.expenditure / project.budget) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp size={20} className="text-blue-600" />

              <h3 className="text-lg font-bold text-slate-800">
                Project Progress
              </h3>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-bold text-slate-800">
                  {project.progress}%
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Current completion
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-400">Planned</p>

                <p className="text-xl font-bold text-slate-700">
                  {project.planned}%
                </p>
              </div>
            </div>

            <div className="mt-5 h-4 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{
                  width: `${Math.min(project.progress, 100)}%`,
                }}
              />
            </div>

            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-3">
            Project Description
          </h3>

          <p className="text-sm text-slate-600 leading-6">
            {project.description}
          </p>
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Target size={20} className="text-blue-600" />

            <h3 className="text-lg font-bold text-slate-800">
              Project Milestones
            </h3>
          </div>

          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl"
              >
                <div
                  className={`w-3 h-3 rounded-full shrink-0 ${
                    milestone.status === "Completed"
                      ? "bg-green-500"
                      : milestone.status === "In Progress"
                      ? "bg-blue-500"
                      : "bg-slate-300"
                  }`}
                />

                <div className="flex-1">
                  <p className="font-semibold text-slate-700">
                    {milestone.name}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Target: {milestone.date}
                  </p>
                </div>

                <span
                  className={`text-xs font-semibold ${
                    milestone.status === "Completed"
                      ? "text-green-600"
                      : milestone.status === "In Progress"
                      ? "text-blue-600"
                      : "text-slate-400"
                  }`}
                >
                  {milestone.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Issues */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle size={20} className="text-orange-500" />

            <h3 className="text-lg font-bold text-slate-800">
              Issues & Delays
            </h3>
          </div>

          <div className="space-y-4">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="flex flex-col md:flex-row md:items-center gap-3 p-4 bg-slate-50 rounded-xl"
              >
                <div className="flex-1">
                  <p className="text-xs font-semibold text-blue-600">
                    {issue.id}
                  </p>

                  <p className="font-semibold text-slate-700 mt-1">
                    {issue.title}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    issue.severity === "Medium"
                      ? "bg-orange-50 text-orange-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {issue.severity}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    issue.status === "Open"
                      ? "bg-red-50 text-red-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {issue.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Note */}
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-xs font-semibold text-blue-700">
            Prototype Demo Data
          </p>

          <p className="text-xs text-blue-600 mt-1">
            Project details, milestones and issue information shown here are
            simulated data for the SIH 26103 prototype.
          </p>
        </div>
      </main>
    </div>
  );
}

export default ProjectDetails;