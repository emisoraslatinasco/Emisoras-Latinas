/**
 * Botón flotante de WhatsApp, fijo en la esquina inferior derecha en todas las
 * páginas (se monta una sola vez en el layout raíz). Abre el chat con el número
 * de la emisora. El número va en formato internacional: 57 (Colombia) + 312...
 */
export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/573124249342"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      title="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform hover:scale-110"
    >
      <i className="fab fa-whatsapp text-3xl" aria-hidden="true"></i>
    </a>
  );
}
