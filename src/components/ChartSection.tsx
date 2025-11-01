import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { BarChart3 } from "lucide-react";
import { LogEntry } from "@/pages/Index";

interface ChartSectionProps {
  logs: LogEntry[];
}

export const ChartSection = ({ logs }: ChartSectionProps) => {
  // Attack type distribution
  const attackCounts = logs
    .filter(log => log.type === "attack")
    .reduce((acc, log) => {
      acc[log.action] = (acc[log.action] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const attackData = Object.entries(attackCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // Defense type distribution
  const defenseCounts = logs
    .filter(log => log.type === "defense")
    .reduce((acc, log) => {
      acc[log.action] = (acc[log.action] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const defenseData = Object.entries(defenseCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // Status distribution
  const statusCounts = logs.reduce((acc, log) => {
    acc[log.status] = (acc[log.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = Object.entries(statusCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const COLORS = {
    attack: ['#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c'],
    defense: ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8'],
    status: ['#22c55e', '#3b82f6', '#eab308'],
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Attack Distribution */}
      <Card className="p-6 border-2 border-red-500/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-red-500/10">
            <BarChart3 className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-500">Attack Distribution</h3>
            <p className="text-xs text-muted-foreground">Types of attacks executed</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          {attackData.length > 0 ? (
            <PieChart>
              <Pie
                data={attackData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {attackData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS.attack[index % COLORS.attack.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
              No attack data yet
            </div>
          )}
        </ResponsiveContainer>
      </Card>

      {/* Defense Distribution */}
      <Card className="p-6 border-2 border-blue-500/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <BarChart3 className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-blue-500">Defense Distribution</h3>
            <p className="text-xs text-muted-foreground">Types of defenses activated</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          {defenseData.length > 0 ? (
            <PieChart>
              <Pie
                data={defenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {defenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS.defense[index % COLORS.defense.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
              No defense data yet
            </div>
          )}
        </ResponsiveContainer>
      </Card>

      {/* Status Distribution */}
      <Card className="p-6 border-2 border-accent/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-accent/10">
            <BarChart3 className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-accent">Status Overview</h3>
            <p className="text-xs text-muted-foreground">Action outcomes</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          {statusData.length > 0 ? (
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS.status[index % COLORS.status.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
              No status data yet
            </div>
          )}
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
