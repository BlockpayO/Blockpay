import Link from "next/link";

const Button = () => {
  return (
    <Link href="/sign-up">
      <button
        type="button"
        className="rounded-md text-lg bg-blue-700 text-white hover:bg-blue-600 py-2 px-4 shadow-md"
      >
        Get Started
      </button>
    </Link>
  );
};

export default Button;
