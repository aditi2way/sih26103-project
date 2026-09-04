import { useState, useEffect } from "react";

import {
  LayoutDashboard,
  FolderKanban,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  MapPin,
  CalendarDays,
} from "lucide-react";
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

function Dashboard() {
    const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);
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

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300">
            <FolderKanban size={19} />
            Projects
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300">
            <AlertTriangle size={19} />
            Issues & Delays
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300">
            <TrendingUp size={19} />
            Reports
          </button>

        </nav>

        <div className="mt-auto p-4 border-t border-slate-700">
          <p className="text-xs text-slate-500">Logged in as</p>
          <p className="text-sm font-medium mt-1">Administrator</p>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">

        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 md:px-8 py-5 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Project Dashboard
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Monitor and manage project performance
            </p>
          </div>

          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-slate-700">
              Administrator
            </p>

            <p className="text-xs text-slate-400">
              Project Monitoring
            </p>
          </div>

        </header>

        <div className="p-6 md:p-8">

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

            {/* Total */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Total Projects
                  </p>

                  <h3 className="text-3xl font-bold text-slate-800 mt-2">
                    {projects.length}
                  </h3>
                </div>

                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FolderKanban className="text-blue-600" />
                </div>
              </div>
            </div>

            {/* Ongoing */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Ongoing
                  </p>

                  <h3 className="text-3xl font-bold text-slate-800 mt-2">
                    {projects.filter((project) => project.status === "Ongoing").length}
                  </h3>
                </div>

                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Clock3 className="text-indigo-600" />
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Completed
                  </p>

                  <h3 className="text-3xl font-bold text-slate-800 mt-2">
                    {projects.filter((project) => project.status === "Completed").length}
                  </h3>
                </div>

                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="text-green-600" />
                </div>
              </div>
            </div>

            {/* Delayed */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Delayed / At Risk
                  </p>

                  <h3 className="text-3xl font-bold text-slate-800 mt-2">
                    {projects.filter(
  (project) => project.status === "Delayed" || project.status === "At Risk"
).length}
                  </h3>
                </div>

                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="text-red-600" />
                </div>
              </div>
            </div>

          </div>

          {/* Projects */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">

            <div className="p-6 border-b border-slate-200 flex items-center justify-between">

              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  Project Overview
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Current status of monitored projects
                </p>
              </div>

              <button className="text-sm text-blue-600 font-semibold hover:text-blue-700">
                View All
              </button>

            </div>

            <div className="divide-y divide-slate-100">

              {projects.map((project) => (

                <div
                  key={project.id}
                  className="p-5 hover:bg-slate-50 transition"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center gap-5">

                    {/* Project name */}
                    <div className="lg:w-1/3">

                      <p className="text-xs text-slate-400 font-medium">
                        {project.id}
                      </p>

                      <h4 className="font-semibold text-slate-800 mt-1">
                        {project.name}
                      </h4>

                      <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                        <MapPin size={13} />
                        {project.location}
                      </div>

                    </div>

                    {/* Progress */}
                    <div className="flex-1">

                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-slate-500">
                          Progress
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

                    </div>

                    {/* Deadline */}
                    <div className="lg:w-36">

                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <CalendarDays size={14} />
                        Deadline
                      </div>

                      <p className="text-sm font-medium text-slate-700 mt-1">
                        {project.deadline}
                      </p>

                    </div>

                    {/* Status */}
                    <div className="lg:w-28">
                      <StatusBadge status={project.status} />
                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;