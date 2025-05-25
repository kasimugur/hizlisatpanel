import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between px-6 w-auto py-4 border-b border-b-blue-100 bg-white shadow-sm">
      <h1 className="text-xl font-semibold"></h1>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
