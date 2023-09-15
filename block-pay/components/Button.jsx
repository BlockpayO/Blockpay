import Link from "next/link";

const Button = () => {
  return (
    <Link href="/sign-up">
      <button
        type="button"
        className="rounded-md bg-blue-600 border text-white hover:text-black hover:bg-white hover:border-blue-600 py-2 px-4"
      >
        Get Started
      </button>
    </Link>
  );
};

export default Button;
