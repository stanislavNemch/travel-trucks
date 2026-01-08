import Link from "next/link";
import { Button } from "@/components/Button/Button";
import styles from "./not-found.module.css";

export default function NotFound() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404 - Page Not Found</h1>
            <p className={styles.description}>
                Sorry, the page you are looking for does not exist.
            </p>
            <Link href="/">
                <Button>Go Home</Button>
            </Link>
        </div>
    );
}
