"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUserStore } from "../stores/useUserStore";
import { TaskHeader } from "./Components/TaskHeader/TaskHeader";
import Stats from "./Components/Stats/Stats";
import { TasksArea } from "./Components/TasksArea/TasksArea";
import { TasksFooter } from "./Components/TaskFooter/TaskFooter";
import { TasksDialog } from "./Components/Dialogs/TaskDialog/TaskDialog";

export default function Dashboard() {
  const router = useRouter();
  const { user, validateUser } = useUserStore();

  // New: searchTerm state
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const isAuthenticated = await validateUser();

      if (!isAuthenticated) {
        router.push("/");
      }
    };

    checkUser();
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen border flex items-center w-full justify-center poppins">
      <div className="w-[55%] border border-gray-400 flex flex-col gap-6 bg-inherit shadow-md rounded-md p-8">
        <TaskHeader onSearch={(value) => setSearchTerm(value)} />
        <Stats />
        <AllTasksHeader />
        <TasksArea searchTerm={searchTerm} />
        <TasksFooter />
      </div>
    </div>
  );
}

// Header above the task list
function AllTasksHeader() {
  return (
    <div className="flex justify-between items-center mt-4 mb-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">{`Today's Task`}</h2>
        <p className="text-sm text-gray-400">{formatDate()}</p>
      </div>
      <TasksDialog />
    </div>
  );
}

// Helper to format today's date
function formatDate(date: Date = new Date()): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
}
