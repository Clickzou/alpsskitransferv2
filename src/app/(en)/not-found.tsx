import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header lang="en" />
      <main id="contenu" className="mx-auto max-w-6xl px-4 py-20">
        <h1 className="font-display text-titre-section text-alpine">Page not found</h1>
        <p className="mt-4">
          <Link className="underline hover:text-marque" href="/">
            Back to the homepage
          </Link>
        </p>
      </main>
      <Footer lang="en" />
    </>
  );
}
