export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* 📄 Información */}
        <div>
          <h3 className="text-white font-semibold mb-3">Sobre Nosotros</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Quiénes Somos</li>
            <li className="hover:text-white cursor-pointer">Términos y Condiciones</li>
            <li className="hover:text-white cursor-pointer">Privacidad</li>
            <li className="hover:text-white cursor-pointer">Ayuda</li>
          </ul>
        </div>

        {/* 📺 Categorías */}
        <div>
          <h3 className="text-white font-semibold mb-3">Categorías</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Series</li>
            <li className="hover:text-white cursor-pointer">Películas</li>
            <li className="hover:text-white cursor-pointer">Novelas</li>
            <li className="hover:text-white cursor-pointer">Infantil</li>
          </ul>
        </div>

        {/* 📩 Contacto */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contáctanos</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Soporte</li>
            <li className="hover:text-white cursor-pointer">Publicidad</li>
            <li className="hover:text-white cursor-pointer">Prensa</li>
            <li className="hover:text-white cursor-pointer">Afiliados</li>
          </ul>
        </div>

        {/* 🌎 Redes Sociales */}
        <div>
          <h3 className="text-white font-semibold mb-3">Síguenos</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              🌐 Facebook
            </a>
            <a href="#" className="hover:text-white">
              📷 Instagram
            </a>
          </div>
        </div>

      </div>

      {/* 📌 Línea separadora */}
      <hr className="border-gray-700 my-6" />

      {/* 📜 Derechos reservados */}
      <p className="text-center text-gray-500 text-sm">
        © 2025 Bruno Ariel Parisi - Todos los derechos reservados
      </p>
    </footer>
  );
}
