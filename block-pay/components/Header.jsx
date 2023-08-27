import Link from "next/link"
import React from 'react';
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();

    return (
        <div>
            <Link href={"/"} className={router.pathname == "/Signup" ? styles.active : styles.link}>
                <button type="button">
                    Get Started
                </button>
            </Link>
        </div>
    )
}



export default Header