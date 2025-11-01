import { useState } from "react";
import { AttackPanel } from "@/components/AttackPanel";
import { DefensePanel } from "@/components/DefensePanel";
import { NetworkLogs } from "@/components/NetworkLogs";
import { StatsCards } from "@/components/StatsCards";
import { ChartSection } from "@/components/ChartSection";
import { AlertSystem } from "@/components/AlertSystem";
import { IncidentReportGenerator } from "@/components/IncidentReportGenerator";
import { PacketViewer } from "@/components/PacketViewer";
import { ThreatIntelPanel } from "@/components/ThreatIntelPanel";
import { Shield } from "lucide-react";

export type LogEntry = {
  id: string;
  timestamp: Date;
  type: "attack" | "defense";
  action: string;
  status: "success" | "blocked" | "failed";
  details: {
    source?: string;
    target?: string;
    method?: string;
    payload?: string;
  };
};

const Index = () => {
  const [mode, setMode] = useState<"neutral" | "attack" | "defense">("neutral");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [alerts, setAlerts] = useState<{ id: string; message: string; type: "attack" | "defense" }[]>([]);
  const [selectedAttack, setSelectedAttack] = useState<string | null>(null);

  const handleAttack = (attackType: string) => {
    setMode("attack");
    setSelectedAttack(attackType);
    
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type: "attack",
      action: attackType,
      status: Math.random() > 0.3 ? "success" : "blocked",
      details: {
        source: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        target: `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        method: attackType,
        payload: `${Math.floor(Math.random() * 1000)}KB`
      }
    };

    setLogs(prev => [newLog, ...prev.slice(0, 49)]);
    
    setAlerts(prev => [...prev, {
      id: Date.now().toString(),
      message: `🚨 ${attackType} detected from ${newLog.details.source}`,
      type: "attack"
    }]);

    setTimeout(() => setMode("neutral"), 2000);
  };

  const handleDefense = (defenseType: string) => {
    setMode("defense");
    
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type: "defense",
      action: defenseType,
      status: Math.random() > 0.2 ? "success" : "failed",
      details: {
        method: defenseType,
        target: "All Systems",
      }
    };

    setLogs(prev => [newLog, ...prev.slice(0, 49)]);
    
    setAlerts(prev => [...prev, {
      id: Date.now().toString(),
      message: `🛡️ ${defenseType} activated successfully`,
      type: "defense"
    }]);

    setTimeout(() => setMode("neutral"), 2000);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      mode === "attack" ? "bg-red-950/20" : mode === "defense" ? "bg-blue-950/20" : "bg-background"
    }`}>
      <AlertSystem alerts={alerts} onDismiss={removeAlert} />
      
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="h-8 w-8 text-accent" />
                <div className="absolute inset-0 animate-pulse-blue blur-xl opacity-50"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  <span className="text-red-500">RED</span>
                  <span className="text-muted-foreground"> vs </span>
                  <span className="text-blue-500">BLUE</span>
                  <span className="text-foreground"> TEAM</span>
                </h1>
                <p className="text-xs text-muted-foreground">Cyber Security Simulation Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border">
                <div className={`h-2 w-2 rounded-full ${
                  mode === "attack" ? "bg-red-500 animate-pulse" : 
                  mode === "defense" ? "bg-blue-500 animate-pulse" : 
                  "bg-accent"
                }`}></div>
                <span className="text-sm font-medium">
                  {mode === "attack" ? "ATTACK MODE" : mode === "defense" ? "DEFENSE MODE" : "STANDBY"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats Cards */}
        <StatsCards logs={logs} />

        {/* Attack and Defense Panels */}
        <div className="grid lg:grid-cols-2 gap-6">
          <AttackPanel onAttack={handleAttack} isActive={mode === "attack"} />
          <DefensePanel onDefense={handleDefense} isActive={mode === "defense"} />
        </div>

        {/* Charts Section */}
        <ChartSection logs={logs} />

        {/* Advanced Features */}
        <div className="grid lg:grid-cols-2 gap-6">
          <ThreatIntelPanel selectedAttack={selectedAttack} />
          <IncidentReportGenerator logs={logs} />
        </div>

        {/* Packet Viewer */}
        <PacketViewer logs={logs} />

        {/* Network Logs */}
        <NetworkLogs logs={logs} />
      </main>
    </div>
  );
};

export default Index;
