import { ArrowRotateRight } from "iconic-react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode;
};

export default function SubmitButton({ children }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex items-center justify-center gap-3 bg-blue-500 text-white disabled:bg-blue-300 disabled:text-gray-100 py-2 px-4 w-full`}
    >
      {pending ? (
        <>
          <span>Saving...</span>
          <ArrowRotateRight size="24" className="animate-spin" />
        </>
      ) : (
        children
      )}
    </button>
  );
}
