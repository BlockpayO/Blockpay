import Link from "next/link";
import Image from "next/image";
import getstartedbutton from "@/public/assets/images/index"

const Button = () => {
    return (
        <Link href="app/signup/signup-page">
            <button type="button">
                Get Started
            </button>
        </Link>
    )
}

export default Button;
