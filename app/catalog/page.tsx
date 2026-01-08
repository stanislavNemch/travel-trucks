import { Header } from "@/components/Header/Header";
import { Filters } from "@/components/Filters/Filters";
import { CamperList } from "@/components/CamperList/CamperList";
import styles from "./page.module.css";

export default function Catalog() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={`container ${styles.container}`}>
                    <Filters />
                    <CamperList />
                </div>
            </main>
        </>
    );
}
