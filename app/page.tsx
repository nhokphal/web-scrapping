import Products from "@/components/products";
import SearchForm from "@/components/search-form";
import axios from "axios";
import Image from "next/image";

export default async function Home() {

  try {

  } catch (error) {

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SearchForm />

      <Products />

    </main>
  );
}
