import { Loader } from "@/components/Loader/Loader";
import { Header } from "@/components/Header/Header";

export default function Loading() {
  return (
    <>
      <Header />
      <main>
        <Loader />
      </main>
    </>
  );
}
