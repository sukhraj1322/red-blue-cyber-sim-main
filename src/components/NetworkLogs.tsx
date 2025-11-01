import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Terminal, Clock, MapPin, Activity } from "lucide-react";
import { LogEntry } from "@/pages/Index";

interface NetworkLogsProps {
  logs: LogEntry[];
}

export const NetworkLogs = ({ logs }: NetworkLogsProps) => {
  return (
    <Card className="p-6 border-2 border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent/10">
          <Terminal className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Network Logs</h2>
          <p className="text-sm text-muted-foreground">Real-time activity monitoring</p>
        </div>
      </div>

      <ScrollArea className="h-[500px] rounded-lg border border-border bg-black/50 p-4">
        <div className="space-y-3 font-mono text-sm">
          {logs.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No activity logged yet. Start an attack or defense action.</p>
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className={`p-4 rounded-lg border-l-4 transition-all duration-300 animate-slide-up ${
                  log.type === "attack"
                    ? "border-l-red-500 bg-red-500/5 hover:bg-red-500/10"
                    : "border-l-blue-500 bg-blue-500/5 hover:bg-blue-500/10"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        log.type === "attack"
                          ? "border-red-500 text-red-500"
                          : "border-blue-500 text-blue-500"
                      }
                    >
                      {log.type.toUpperCase()}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        log.status === "success"
                          ? "border-accent text-accent"
                          : log.status === "blocked"
                          ? "border-blue-500 text-blue-500"
                          : "border-yellow-500 text-yellow-500"
                      }
                    >
                      {log.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {log.timestamp.toLocaleTimeString()}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-foreground font-semibold">{log.action}</p>
                  
                  {log.details.source && (
                    <div className="flex items-center gap-2 text-xs">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Source:</span>
                      <span className="text-accent">{log.details.source}</span>
                    </div>
                  )}

                  {log.details.target && (
                    <div className="flex items-center gap-2 text-xs">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Target:</span>
                      <span className="text-accent">{log.details.target}</span>
                    </div>
                  )}

                  {log.details.method && (
                    <div className="flex items-center gap-2 text-xs">
                      <Activity className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Method:</span>
                      <span className="text-foreground">{log.details.method}</span>
                    </div>
                  )}

                  {log.details.payload && (
                    <div className="flex items-center gap-2 text-xs">
                      <Activity className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Payload:</span>
                      <span className="text-foreground">{log.details.payload}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};
