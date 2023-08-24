import Link from "next/link";

const Button = () => {
    return (
        <Link href="app/signup/signup-page">
            <button type="button" className="button">
                Get Started
            </button>
        </Link>
    )
}

export default Button;
