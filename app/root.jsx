import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "react-router";

import "./app.css";
import BottomNav from "./components/common/BottomNav";
import { AlertCircle, Home, RotateCcw } from "lucide-react";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="pb-24">
        {children}
        <BottomNav />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-md w-full text-center space-y-8 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="flex justify-center">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl">
            <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
            {message}
          </h1>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            {details}
          </p>
        </div>

        {stack && (
          <div className="text-left bg-gray-50 dark:bg-black/40 p-4 rounded-xl overflow-hidden">
            <p className="text-xs font-mono text-gray-500 dark:text-gray-500 mb-2 uppercase tracking-widest">
              Stack Trace
            </p>
            <pre className="text-[10px] font-mono text-gray-400 dark:text-gray-600 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-40">
              <code>{stack}</code>
            </pre>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold transition-all duration-200 active:scale-95"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-2xl font-semibold transition-all duration-200 active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
            Retry
          </button>
        </div>
      </div>
    </main>
  );
}
