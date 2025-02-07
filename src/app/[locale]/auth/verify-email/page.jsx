import VerifyEmailForm from "@/components/forms/VerifyEmailForm";

export default function VerifyEmailPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <header className="text-center">
        <h1 className="text-4xl mb-2">Verify your Email</h1>
        <p>A code has been sent to your email. Please enter it below.</p>
      </header>
      <VerifyEmailForm />
    </main>
  );
}
