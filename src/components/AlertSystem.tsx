import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Alert {
  id: string;
  message: string;
  type: "attack" | "defense";
}

interface AlertSystemProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

export const AlertSystem = ({ alerts, onDismiss }: AlertSystemProps) => {
  useEffect(() => {
    alerts.forEach((alert) => {
      const timer = setTimeout(() => {
        onDismiss(alert.id);
      }, 5000);
      return () => clearTimeout(timer);
    });
  }, [alerts, onDismiss]);

  return (
    <div className="fixed top-20 right-6 z-50 space-y-2 max-w-md">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg shadow-2xl border-2 backdrop-blur-sm animate-slide-up ${
            alert.type === "attack"
              ? "bg-red-950/90 border-red-500 animate-pulse-red"
              : "bg-blue-950/90 border-blue-500 animate-pulse-blue"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-medium flex-1">{alert.message}</p>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onDismiss(alert.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
