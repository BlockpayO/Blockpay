
import Link from "next/link";

const Button = () => {
    return (
        <Link href="/sign-up">
            <button type="button" className="button">
                    Get Started
            </button>
        </Link>
    )
}

export default Button;
