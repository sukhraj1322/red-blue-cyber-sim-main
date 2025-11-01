import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Network, Layers } from "lucide-react";
import { LogEntry } from "@/pages/Index";
import { useState } from "react";

interface PacketViewerProps {
  logs: LogEntry[];
}

const generatePacketData = (log: LogEntry) => {
  const protocols = ["TCP", "UDP", "ICMP", "HTTP", "HTTPS"];
  const protocol = protocols[Math.floor(Math.random() * protocols.length)];
  const srcPort = Math.floor(Math.random() * 65535);
  const dstPort = log.type === "attack" ? [80, 443, 22, 3306, 8080][Math.floor(Math.random() * 5)] : srcPort;
  const payloadSize = Math.floor(Math.random() * 1500) + 64;
  
  // Generate hex dump
  const hexDump = [];
  for (let i = 0; i < 8; i++) {
    const bytes = Array.from({ length: 16 }, () => 
      Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    ).join(' ');
    hexDump.push(`${(i * 16).toString(16).padStart(4, '0')}  ${bytes}`);
  }
  
  return {
    protocol,
    srcPort,
    dstPort,
    payloadSize,
    hexDump,
    flags: log.type === "attack" ? "SYN, ACK, PSH" : "ACK",
    ttl: Math.floor(Math.random() * 64) + 64,
    checksum: Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0'),
  };
};

export const PacketViewer = ({ logs }: PacketViewerProps) => {
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const attackLogs = logs.filter(l => l.type === "attack");

  return (
    <Card className="p-6 border-2 border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-purple-500/10">
          <Network className="h-6 w-6 text-purple-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Packet Forensics</h2>
          <p className="text-sm text-muted-foreground">Simulated packet capture analysis</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Packet List */}
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Captured Packets ({attackLogs.length})
          </h3>
          <ScrollArea className="h-[400px] rounded-lg border border-border bg-black/50 p-3">
            <div className="space-y-2">
              {attackLogs.length === 0 ? (
                <p className="text-center text-muted-foreground py-10">No packets captured yet</p>
              ) : (
                attackLogs.map((log) => {
                  const packet = generatePacketData(log);
                  return (
                    <div
                      key={log.id}
                      onClick={() => setSelectedLog(log)}
                      className={`p-3 rounded border cursor-pointer transition-all hover:border-purple-500 ${
                        selectedLog?.id === log.id
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-border bg-card/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {packet.protocol}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {log.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-xs font-mono">
                        {log.details.source}:{packet.srcPort} → {log.details.target}:{packet.dstPort}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {log.action} • {packet.payloadSize} bytes
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Packet Details */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Packet Details</h3>
          {selectedLog ? (
            <ScrollArea className="h-[400px] rounded-lg border border-border bg-black/50 p-4">
              {(() => {
                const packet = generatePacketData(selectedLog);
                return (
                  <div className="space-y-4 font-mono text-xs">
                    <div>
                      <p className="text-accent font-semibold mb-2">LAYER 3 - NETWORK</p>
                      <div className="space-y-1 pl-4">
                        <p>Source IP: {selectedLog.details.source}</p>
                        <p>Dest IP: {selectedLog.details.target}</p>
                        <p>TTL: {packet.ttl}</p>
                        <p>Protocol: {packet.protocol}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-accent font-semibold mb-2">LAYER 4 - TRANSPORT</p>
                      <div className="space-y-1 pl-4">
                        <p>Source Port: {packet.srcPort}</p>
                        <p>Dest Port: {packet.dstPort}</p>
                        <p>Flags: {packet.flags}</p>
                        <p>Checksum: 0x{packet.checksum}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-accent font-semibold mb-2">LAYER 7 - APPLICATION</p>
                      <div className="space-y-1 pl-4">
                        <p>Attack Type: {selectedLog.action}</p>
                        <p>Payload Size: {packet.payloadSize} bytes</p>
                        <p>Status: {selectedLog.status.toUpperCase()}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-accent font-semibold mb-2">HEX DUMP</p>
                      <div className="space-y-1 pl-4 text-green-400">
                        {packet.hexDump.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </ScrollArea>
          ) : (
            <div className="h-[400px] rounded-lg border border-border bg-black/50 flex items-center justify-center">
              <p className="text-muted-foreground">Select a packet to view details</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
