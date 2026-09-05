import {
  AlertTriangle,
  Clock3,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

const issues = [
  {
    id: "ISS-001",
    project: "Urban Road Development",
    issue: "Land acquisition delay",
    description: "Required land clearance is pending.",
    severity: "High",
    status: "Open",
    date: "2026-08-28",
  },
  {
    id: "ISS-002",
    project: "District Hospital Expansion",
    issue: "Material procurement delay",
    description: "Construction material delivery is behind schedule.",
    severity: "High",
    status: "In Progress",
    date: "2026-08-25",
  },
  {
    id: "ISS-003",
    project: "Affordable Housing Development",
    issue: "Slow construction progress",
    description: "Physical progress is below the planned target.",
    severity: "High",
    status: "Open",
    date: "2026-08-30",
  },
  {
    id: "ISS-004",
    project: "Government School Construction",
    issue: "Minor contractor delay",
    description: "Some finishing work is taking longer than expected.",
    severity: "Medium",
    status: "In Progress",
    date: "2026-08-31",
  },
  {
    id: "ISS-005",
    project: "Irrigation Canal Modernization",
    issue: "Weather-related delay",
    description: "Heavy rainfall affected construction activities.",
    severity: "Medium",
    status: "Open",
    date: "2026-09-01",
  },
];

function SeverityBadge({ severity }) {
  const styles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        styles[severity]
      }`}
    >
      {severity}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Open: "bg-red-100 text-red-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        styles[status]
      }`}
    >
      {status}
    </span>
  );
}

function Issues() {
  const openIssues = issues.filter((i) => i.status === "Open").length;
  const highSeverity = issues.filter((i) => i.severity === "High").length;
  const inProgress = issues.filter(
    (i) => i.status === "In Progress"
  ).length;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5">
        <h1 className="text-2xl font-bold text-slate-800">
          Issues & Delays
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor project issues, risks and delays
        </p>
      </header>

      <main className="p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Open Issues</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {openIssues}
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">High Severity</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {highSeverity}
                </p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl">
                <ShieldAlert className="text-amber-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">In Progress</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {inProgress}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Clock3 className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Issues Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-800">
              Active Issues & Delays
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Track problems affecting project execution
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500">
                    Issue
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500">
                    Project
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500">
                    Severity
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500">
                    Reported
                  </th>
                </tr>
              </thead>

              <tbody>
                {issues.map((issue) => (
                  <tr
                    key={issue.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {issue.issue}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {issue.description}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {issue.id}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      {issue.project}
                    </td>

                    <td className="px-6 py-5">
                      <SeverityBadge severity={issue.severity} />
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={issue.status} />
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      {issue.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Prototype Notice */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3">
          <CheckCircle2 className="text-blue-600 flex-shrink-0" size={20} />
          <p className="text-sm text-blue-700">
            Prototype uses simulated project issue data. In the
            production system, issues can be linked with authorized
            departmental project data.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Issues;