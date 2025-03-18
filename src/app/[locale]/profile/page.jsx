"use client";

import ProfileInfo from "@/components/ui/forms/ProfileInfo";
import { useLoading } from "@/features/loadingBar/context/loadingContext";
import AuthGuard from "@/layouts/guards/AuthGuard";
import useSessionStore from "@/lib/store/sessionStore";
import { getAllSessions, deleteSession } from "@/lib/queries/sessions";
import { useEffect } from "react";

export default function ProfilePage() {
  const {
    sessions = [],
    setSessions,
    currentSession,
    setCurrentSession,
  } = useSessionStore();

  const { startLoading, finishLoading } = useLoading();

  useEffect(() => {
    const fetchSessions = async () => {
      const response = await getAllSessions();
      if (!response.error && response.allSessions !== sessions) {
        setSessions(response.allSessions);
        setCurrentSession(response.currentSession);
      }
    };
    fetchSessions();
  }, []);

  const handleDeleteSession = async (sessionId) => {
    startLoading();
    try {
      const response = await deleteSession(sessionId);

      if (response.error) throw new Error(response.message);
      setSessions((prevSessions) =>
        prevSessions.filter((session) => session._id !== sessionId)
      );
    } catch (error) {
      console.log(error);
    } finally {
      finishLoading();
    }
  };

  return (
    <main className="min-h-screen">
      <AuthGuard>
        <div className=" flex justify-between mt-32 max-w-[1200px] mx-auto">
          <ProfileInfo />

          <div className="w-full max-w-[860px] flex flex-col gap-4">
            <h2 className="text-3xl">Current Session</h2>
            {currentSession && (
              <div>
                <h3>{currentSession.userAgent}</h3>
                <p>{currentSession.createdAt}</p>
              </div>
            )}
            <h2 className="text-3xl">All Sessions</h2>
            {Array.isArray(sessions) && sessions?.length > 0 ? (
              sessions.map((session) => (
                <div key={session._id}>
                  <h3>{session.userAgent}</h3>
                  <p>{session.createdAt}</p>
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteSession(session._id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No other sessions found...</p>
            )}
          </div>
        </div>
      </AuthGuard>
    </main>
  );
}
