import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Skull, 
  Wifi, 
  Database, 
  Code, 
  Mail, 
  Key, 
  Bug, 
  FileX,
  Zap,
  Network
} from "lucide-react";

const attacks = [
  { id: 1, name: "DDoS Attack", icon: Wifi, description: "Distributed Denial of Service" },
  { id: 2, name: "SQL Injection", icon: Database, description: "Database exploitation" },
  { id: 3, name: "XSS Attack", icon: Code, description: "Cross-Site Scripting" },
  { id: 4, name: "Phishing", icon: Mail, description: "Social engineering" },
  { id: 5, name: "Brute Force", icon: Key, description: "Password cracking" },
  { id: 6, name: "Malware", icon: Bug, description: "Malicious software" },
  { id: 7, name: "Ransomware", icon: FileX, description: "Data encryption attack" },
  { id: 8, name: "Zero-Day Exploit", icon: Zap, description: "Unknown vulnerability" },
  { id: 9, name: "Man-in-the-Middle", icon: Network, description: "Traffic interception" },
  { id: 10, name: "Privilege Escalation", icon: Skull, description: "Unauthorized access" },
];

interface AttackPanelProps {
  onAttack: (attackType: string) => void;
  isActive: boolean;
}

export const AttackPanel = ({ onAttack, isActive }: AttackPanelProps) => {
  return (
    <Card className={`p-6 transition-all duration-300 border-2 ${
      isActive 
        ? "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-pulse-red" 
        : "border-border hover:border-red-500/50"
    }`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-red-500/10">
          <Skull className="h-6 w-6 text-red-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-red-500">RED TEAM</h2>
          <p className="text-sm text-muted-foreground">Offensive Operations</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {attacks.map((attack) => {
          const Icon = attack.icon;
          return (
            <Button
              key={attack.id}
              variant="outline"
              className="h-auto flex-col items-start p-4 border-red-500/30 hover:border-red-500 hover:bg-red-500/10 hover:scale-105 transition-all duration-200 group"
              onClick={() => onAttack(attack.name)}
            >
              <div className="flex items-center gap-2 mb-2 w-full">
                <Icon className="h-4 w-4 text-red-500 group-hover:animate-pulse" />
                <span className="font-semibold text-sm">{attack.name}</span>
              </div>
              <p className="text-xs text-muted-foreground text-left">{attack.description}</p>
            </Button>
          );
        })}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
        <p className="text-xs text-muted-foreground">
          <span className="text-red-500 font-semibold">Warning:</span> Click any attack to simulate. 
          System will respond with defensive measures.
        </p>
      </div>
    </Card>
  );
};
