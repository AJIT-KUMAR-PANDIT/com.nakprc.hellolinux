import { Terminal, Mic, LayoutDashboard, Rocket, FileText, User } from "lucide-react";
import { Link, useLocation } from "react-router";

const navItems = [
  { icon: Terminal, label: "Terminal", to: "/terminal" },
  { icon: Mic, label: "Voice", to: "/voice" },
  { icon: LayoutDashboard, label: "Console", to: "/console" },
  { icon: Rocket, label: "Deploy", to: "/deploy" },
  { icon: FileText, label: "Logs", to: "/logs" },
  { icon: User, label: "Account", to: "/account" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`flex flex-col items-center gap-1 transition-all duration-200 ease-in-out group ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                }`}
              >
                <div
                  className={`p-2 rounded-xl transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/30"
                      : "group-hover:bg-gray-100 dark:group-hover:bg-gray-800"
                  }`}
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 2}
                    className="transition-transform duration-200 group-active:scale-90"
                  />
                </div>
                <span className="text-[10px] font-medium leading-none tracking-tight">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Bottom safe area for mobile devices */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
