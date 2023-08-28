
import Link from "next/link";

const Button = () => {
    return (
        <Link href="/sign-up">
            <button type="button" className="button rounded-md text-lg">
                    Get Started
            </button>
        </Link>
    )
}

export default Button;
