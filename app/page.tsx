import { Header } from "@/components/Header/Header";
import styles from "./page.module.css";
import { Button } from "@/components/Button/Button";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <section className={styles.hero}>
                    <div className={`container ${styles.container}`}>
                        <h1 className={styles.title}>Campers of your dreams</h1>
                        <p className={styles.subtitle}>
                            You can find everything you want in our catalog
                        </p>
                        <Link href="/catalog">
                            <Button>View Now</Button>
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
