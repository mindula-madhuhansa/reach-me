import SignInWithGoogleButton from "@/components/buttons/signin-with-google-btn";

export default function SignInPage() {
  return (
    <div className="mt-32">
      <div className="bg-white border p-4 rounded-xl max-w-md mx-auto shadow-md">
        <h1 className="text-4xl font-semibold text-center mb-2">Sign In</h1>
        <p className="text-center mb-6 text-neutral-500">
          Sign in to your account using one of the methods.
        </p>

        <SignInWithGoogleButton />
      </div>
    </div>
  );
}
