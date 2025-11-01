import { Card } from "@/components/ui/card";
import { Swords, Shield, TrendingUp, Activity } from "lucide-react";
import { LogEntry } from "@/pages/Index";

interface StatsCardsProps {
  logs: LogEntry[];
}

export const StatsCards = ({ logs }: StatsCardsProps) => {
  const totalAttacks = logs.filter(log => log.type === "attack").length;
  const totalDefenses = logs.filter(log => log.type === "defense").length;
  const successfulAttacks = logs.filter(log => log.type === "attack" && log.status === "success").length;
  const blockedAttacks = logs.filter(log => log.type === "attack" && log.status === "blocked").length;
  
  const attackSuccessRate = totalAttacks > 0 ? ((successfulAttacks / totalAttacks) * 100).toFixed(1) : "0.0";
  const defenseRate = totalAttacks > 0 ? ((blockedAttacks / totalAttacks) * 100).toFixed(1) : "0.0";

  const stats = [
    {
      title: "Total Attacks",
      value: totalAttacks,
      icon: Swords,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
    },
    {
      title: "Total Defenses",
      value: totalDefenses,
      icon: Shield,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      title: "Attack Success Rate",
      value: `${attackSuccessRate}%`,
      icon: TrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30",
    },
    {
      title: "Defense Efficiency",
      value: `${defenseRate}%`,
      icon: Activity,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className={`p-6 border-2 ${stat.borderColor} hover:scale-105 transition-all duration-300 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
          </Card>
        );
      })}
    </div>
  );
};
