import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Shield, 
  ShieldCheck, 
  Lock, 
  Eye, 
  Fingerprint, 
  Server, 
  FileCheck,
  Scan,
  AlertTriangle,
  ShieldAlert
} from "lucide-react";

const defenses = [
  { id: 1, name: "Firewall", icon: Shield, description: "Network protection" },
  { id: 2, name: "IDS/IPS", icon: Eye, description: "Intrusion detection" },
  { id: 3, name: "Encryption", icon: Lock, description: "Data protection" },
  { id: 4, name: "2FA", icon: Fingerprint, description: "Two-factor auth" },
  { id: 5, name: "Backup System", icon: Server, description: "Data recovery" },
  { id: 6, name: "Antivirus", icon: ShieldCheck, description: "Malware protection" },
  { id: 7, name: "Patch Management", icon: FileCheck, description: "System updates" },
  { id: 8, name: "Vulnerability Scan", icon: Scan, description: "Security audit" },
  { id: 9, name: "SIEM", icon: AlertTriangle, description: "Security monitoring" },
  { id: 10, name: "WAF", icon: ShieldAlert, description: "Web application firewall" },
];

interface DefensePanelProps {
  onDefense: (defenseType: string) => void;
  isActive: boolean;
}

export const DefensePanel = ({ onDefense, isActive }: DefensePanelProps) => {
  return (
    <Card className={`p-6 transition-all duration-300 border-2 ${
      isActive 
        ? "border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)] animate-pulse-blue" 
        : "border-border hover:border-blue-500/50"
    }`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-blue-500/10">
          <Shield className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-blue-500">BLUE TEAM</h2>
          <p className="text-sm text-muted-foreground">Defensive Operations</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {defenses.map((defense) => {
          const Icon = defense.icon;
          return (
            <Button
              key={defense.id}
              variant="outline"
              className="h-auto flex-col items-start p-4 border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/10 hover:scale-105 transition-all duration-200 group"
              onClick={() => onDefense(defense.name)}
            >
              <div className="flex items-center gap-2 mb-2 w-full">
                <Icon className="h-4 w-4 text-blue-500 group-hover:animate-pulse" />
                <span className="font-semibold text-sm">{defense.name}</span>
              </div>
              <p className="text-xs text-muted-foreground text-left">{defense.description}</p>
            </Button>
          );
        })}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
        <p className="text-xs text-muted-foreground">
          <span className="text-blue-500 font-semibold">Info:</span> Activate defense mechanisms to protect systems. 
          Real-time monitoring active.
        </p>
      </div>
    </Card>
  );
};
