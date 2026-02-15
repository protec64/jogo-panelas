
import { Mail, Phone, MapPin } from "lucide-react";
import brinoxLogo from "@/assets/brinox-logo.svg";
interface FooterProps {
  variant?: "full" | "minimal" | "store";
}
const Footer = ({
  variant = "full"
}: FooterProps) => {
  if (variant === "minimal") {
    return <footer className="py-6 px-4">
        <div className="flex items-center justify-center gap-4 text-sm text-white/90">
          <a href={"/privacidade" + window.location.search} className="hover:underline">
            Privacidade
          </a>
          <span className="text-white/60">•</span>
          <a href={"/termos" + window.location.search} className="hover:underline">
            Termos
          </a>
        </div>
      </footer>;
  }
  if (variant === "store") {
    return <footer className="bg-card-foreground text-white mt-auto">
        {/* Main Footer */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <img src={brinoxLogo} alt="Brinox" className="h-6 brightness-0 invert" />
              <p className="text-white/70 text-sm leading-relaxed">
                Qualidade e inovação para sua cozinha. Produtos de excelência com a melhor tecnologia do mercado.
              </p>
            </div>

            {/* Links Rápidos */}
            

            {/* Suporte */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Suporte</h3>
              <ul className="space-y-2">
                <li>
                  <a href={"/privacidade" + window.location.search} className="text-white/70 hover:text-blue transition-colors text-sm">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href={"/termos" + window.location.search} className="text-white/70 hover:text-blue transition-colors text-sm">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-blue transition-colors text-sm">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contato */}
            
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/50 text-sm">© 2026 Brinox Brasil — Todos os direitos reservados.</p>
              <div className="flex items-center gap-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 opacity-70" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 opacity-70" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png" alt="PayPal" className="h-5 opacity-70" />
              </div>
            </div>
          </div>
        </div>
      </footer>;
  }
  return <footer className="py-6 px-4">
      <div className="flex items-center justify-center gap-2 text-sm text-white/90 mb-2">
        <a href={"/privacidade" + window.location.search} className="hover:underline">
          Política de Privacidade
        </a>
        <span className="text-white/60">|</span>
        <a href={"/termos" + window.location.search} className="hover:underline">
          Termos de Uso
        </a>
      </div>
      <p className="text-center text-sm text-white/70">
        © 2025 — Todos os direitos reservados.
      </p>
    </footer>;
};
export default Footer;