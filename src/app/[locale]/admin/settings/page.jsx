import SubjectForm from "@/components/ui/forms/SubjectForm";

export default function AdminSettings() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center">
      <h1>Settings</h1>
      {/* <span className="text-red-500">This page is not yet implemented</span> */}
      <div>
        <h2>Create a subject</h2>
        <SubjectForm />
      </div>
    </main>
  );
}
