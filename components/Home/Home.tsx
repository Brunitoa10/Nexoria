import { ContentItemFactory } from "@/factories/ContentItemFactory";
import ContentCategory from "../Content/ContentCategory/ContentCategory";


export default function Home() {
  const peliculas = [
    ContentItemFactory.createContent("1", "Fast & Furious 6", "https://7abby72f43.ufs.sh/f/r7k0vuzPmhf9UYR0efCI2kj4OCIHhA8RfGF91Vogqx7mXZDi"),
    ContentItemFactory.createContent("2", "Pirates in the Caribbean", "https://7abby72f43.ufs.sh/f/r7k0vuzPmhf9rAu1fBzPmhf9svZJNBW35Izunl4LXT1wUGge"),
  ];

  const series = [
    ContentItemFactory.createContent("4", "The Black List", "https://7abby72f43.ufs.sh/f/r7k0vuzPmhf9cxkSMSQEXlMGIWdAmih1JkcsS8jnBKDQpaw6"),
    ContentItemFactory.createContent("5", "Suits", "https://7abby72f43.ufs.sh/f/r7k0vuzPmhf9yrf05ulE16HUAL57ORQ2MNv8coatwqIJCTVu"),
  ];

  const novelas = [
    ContentItemFactory.createContent("7", "Love in the Air", "https://7abby72f43.ufs.sh/f/r7k0vuzPmhf9ydgUPqE16HUAL57ORQ2MNv8coatwqIJCTVum"),
  ];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
      <h1 className="text-4xl font-bold text-white text-center mb-8">Bienvenido a Nexoria!</h1>

      <ContentCategory categoryTitle="Películas" contentItems={peliculas} />
      <ContentCategory categoryTitle="Series" contentItems={series} />
      <ContentCategory categoryTitle="Novelas" contentItems={novelas} />
    </div>
  );
}