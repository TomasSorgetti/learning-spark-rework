"use client";

import useSessionStore from "@/lib/store/sessionStore";
import useUserStore from "@/lib/store/userStore";
import { getAllSessions } from "@/queries/sessions";
import { useEffect } from "react";

export default function ProfilePage() {
  const { sessions, setSessions, currentSession, setCurrentSession } =
    useSessionStore();
  const { user } = useUserStore();

  useEffect(() => {
    const fetchSessions = async () => {
      const response = await getAllSessions();
      console.log(response);

      if (!response.error && response.allSessions !== sessions) {
        setSessions(response.allSessions);
        setCurrentSession(response.currentSession);
      }
    };
    fetchSessions();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1>Profile Page</h1>
      <div>
        <span>Name: {user?.name}</span>
        <span>Email: {user?.email}</span>
        <p>
          Roles:{" "}
          {user?.roles?.map((role, index) => (
            <span key={index}>{role.name},</span>
          ))}
        </p>
      </div>
      <div>
        <h2>Current Session</h2>
        {currentSession && (
          <div>
            <h3>{currentSession.userAgent}</h3>
            <p>{currentSession.createdAt}</p>
          </div>
        )}
        <h2>All Sessions</h2>
        {sessions?.map((session, index) => (
          <div key={`session-${index}`}>
            <h3>{session.userAgent}</h3>
            <p>{session.createdAt}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
