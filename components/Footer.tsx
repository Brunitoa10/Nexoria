import Link from "next/link";

import { FOOTER_COLUMNS, SOCIAL_LINKS } from "@/config/navigation";
import { SITE_CONFIG } from "@/config/site";

const linkClassName = "hover:text-white transition";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-400 p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {FOOTER_COLUMNS.map(({ title, links }) => (
          <nav key={title} aria-label={title}>
            <h3 className="text-white font-semibold mb-3">{title}</h3>
            <ul className="space-y-2">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={linkClassName}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h3 className="text-white font-semibold mb-3">Síguenos</h3>
          <div className="flex space-x-4">
            {SOCIAL_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className={linkClassName} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-gray-700 my-6" />

      <p className="text-center text-gray-500 text-sm">
        © {year} {SITE_CONFIG.author} - Todos los derechos reservados
      </p>
    </footer>
  );
}
