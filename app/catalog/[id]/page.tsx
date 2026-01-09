import { Metadata } from "next";
import { getCamperById } from "@/lib/api";
import { Header } from "@/components/Header/Header";
import { CamperDetails } from "@/components/CamperDetails/CamperDetails";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const camper = await getCamperById(id);

  return {
    title: `${camper.name} | TravelTrucks`,
    description: camper.description,
    openGraph: {
      title: camper.name,
      description: camper.description,
      images: [camper.gallery[0].original],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const camper = await getCamperById(id);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <CamperDetails camper={camper} />
      </main>
    </>
  );
}
