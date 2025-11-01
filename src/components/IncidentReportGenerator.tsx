import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { LogEntry } from "@/pages/Index";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";

interface IncidentReportGeneratorProps {
  logs: LogEntry[];
}

export const IncidentReportGenerator = ({ logs }: IncidentReportGeneratorProps) => {
  const { toast } = useToast();

  const generatePDF = () => {
    if (logs.length === 0) {
      toast({
        title: "No Data",
        description: "No logs available to generate report",
        variant: "destructive",
      });
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Header
    doc.setFontSize(20);
    doc.setTextColor(220, 38, 38);
    doc.text("CYBER SECURITY INCIDENT REPORT", pageWidth / 2, yPos, { align: "center" });
    
    yPos += 15;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, yPos, { align: "center" });

    // Executive Summary
    yPos += 20;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("EXECUTIVE SUMMARY", 20, yPos);
    
    const attacks = logs.filter(l => l.type === "attack");
    const defenses = logs.filter(l => l.type === "defense");
    const successfulAttacks = attacks.filter(l => l.status === "success");
    const blockedAttacks = attacks.filter(l => l.status === "blocked");

    yPos += 10;
    doc.setFontSize(10);
    doc.text(`Total Incidents: ${logs.length}`, 20, yPos);
    yPos += 7;
    doc.text(`Attack Events: ${attacks.length}`, 20, yPos);
    yPos += 7;
    doc.text(`Defense Actions: ${defenses.length}`, 20, yPos);
    yPos += 7;
    doc.text(`Successful Attacks: ${successfulAttacks.length}`, 20, yPos);
    yPos += 7;
    doc.text(`Blocked Attacks: ${blockedAttacks.length}`, 20, yPos);

    // Timeline
    yPos += 15;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("INCIDENT TIMELINE", 20, yPos);
    
    yPos += 10;
    doc.setFontSize(9);
    
    logs.slice(0, 15).forEach(log => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setTextColor(log.type === "attack" ? 220 : 59, log.type === "attack" ? 38 : 130, log.type === "attack" ? 38 : 246);
      doc.text(`[${log.timestamp.toLocaleTimeString()}] ${log.type.toUpperCase()}`, 20, yPos);
      yPos += 6;
      doc.setTextColor(0, 0, 0);
      doc.text(`Action: ${log.action}`, 25, yPos);
      yPos += 6;
      doc.text(`Status: ${log.status.toUpperCase()}`, 25, yPos);
      if (log.details.source) {
        yPos += 6;
        doc.text(`Source: ${log.details.source}`, 25, yPos);
      }
      if (log.details.target) {
        yPos += 6;
        doc.text(`Target: ${log.details.target}`, 25, yPos);
      }
      yPos += 10;
    });

    // Affected Systems
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }
    
    yPos += 10;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("AFFECTED SYSTEMS", 20, yPos);
    
    const uniqueTargets = [...new Set(logs.map(l => l.details.target).filter(Boolean))];
    const uniqueSources = [...new Set(logs.map(l => l.details.source).filter(Boolean))];
    
    yPos += 10;
    doc.setFontSize(10);
    doc.text(`Compromised Hosts: ${uniqueTargets.length}`, 20, yPos);
    yPos += 7;
    doc.text(`Attack Sources: ${uniqueSources.length}`, 20, yPos);

    // Recommendations
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }
    
    yPos += 15;
    doc.setFontSize(14);
    doc.text("RECOMMENDATIONS", 20, yPos);
    
    yPos += 10;
    doc.setFontSize(9);
    const recommendations = [
      "• Implement rate limiting on all public endpoints",
      "• Update WAF rules to block identified attack patterns",
      "• Enable multi-factor authentication for all users",
      "• Conduct security awareness training for staff",
      "• Review and update incident response procedures",
      "• Deploy IDS/IPS on critical network segments",
      "• Implement zero-trust network architecture",
      "• Schedule regular penetration testing",
    ];
    
    recommendations.forEach(rec => {
      if (yPos > 280) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(rec, 20, yPos);
      yPos += 7;
    });

    doc.save(`incident-report-${Date.now()}.pdf`);
    
    toast({
      title: "Report Generated",
      description: "Incident report has been downloaded successfully",
    });
  };

  return (
    <Card className="p-6 border-2 border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <FileText className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Incident Report</h2>
            <p className="text-sm text-muted-foreground">Generate PDF summary from logs</p>
          </div>
        </div>
        <Button
          onClick={generatePDF}
          className="gap-2"
          disabled={logs.length === 0}
        >
          <Download className="h-4 w-4" />
          Generate PDF
        </Button>
      </div>
    </Card>
  );
};
