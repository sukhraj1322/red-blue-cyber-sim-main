import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, AlertTriangle, Target, Lock } from "lucide-react";
import { attackDatabase, AttackInfo } from "@/data/attackData";

interface ThreatIntelPanelProps {
  selectedAttack: string | null;
}

export const ThreatIntelPanel = ({ selectedAttack }: ThreatIntelPanelProps) => {
  const attackInfo: AttackInfo | undefined = selectedAttack ? attackDatabase[selectedAttack] : undefined;

  const getCVSSColor = (score: number) => {
    if (score >= 9.0) return "text-red-500 border-red-500";
    if (score >= 7.0) return "text-orange-500 border-orange-500";
    if (score >= 4.0) return "text-yellow-500 border-yellow-500";
    return "text-green-500 border-green-500";
  };

  const getCVSSSeverity = (score: number) => {
    if (score >= 9.0) return "CRITICAL";
    if (score >= 7.0) return "HIGH";
    if (score >= 4.0) return "MEDIUM";
    return "LOW";
  };

  return (
    <Card className="p-6 border-2 border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-orange-500/10">
          <AlertTriangle className="h-6 w-6 text-orange-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Threat Intelligence</h2>
          <p className="text-sm text-muted-foreground">CVE mapping and attack analysis</p>
        </div>
      </div>

      {attackInfo ? (
        <ScrollArea className="h-[500px]">
          <div className="space-y-6">
            {/* CVE Header */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold">{attackInfo.name}</h3>
                <Badge variant="outline" className="text-accent border-accent">
                  {attackInfo.cve}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{attackInfo.description}</p>
            </div>

            {/* CVSS Score */}
            <div className="p-4 rounded-lg bg-black/50 border-2 border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">CVSS v3.1 Score</p>
                    <p className="text-xs text-muted-foreground">Common Vulnerability Scoring System</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-bold ${getCVSSColor(attackInfo.cvss).split(' ')[0]}`}>
                    {attackInfo.cvss.toFixed(1)}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`mt-1 ${getCVSSColor(attackInfo.cvss)}`}
                  >
                    {getCVSSSeverity(attackInfo.cvss)}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Attack Vectors */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-accent" />
                <h3 className="font-semibold">Attack Vectors</h3>
              </div>
              <div className="space-y-2">
                {attackInfo.vectors.map((vector, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 transition-colors"
                  >
                    <p className="text-sm">• {vector}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mitigation Strategies */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lock className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">Mitigation Strategies</h3>
              </div>
              <div className="space-y-2">
                {attackInfo.mitigation.map((strategy, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20 hover:bg-blue-500/10 transition-colors"
                  >
                    <p className="text-sm">✓ {strategy}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Threat Intelligence Footer */}
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <p className="text-xs text-muted-foreground text-center">
                Threat intelligence data is simulated for educational purposes • 
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </ScrollArea>
      ) : (
        <div className="h-[500px] flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">Select an attack to view threat intelligence</p>
            <p className="text-xs text-muted-foreground mt-2">
              CVE mapping, CVSS scores, and mitigation strategies
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};
