import { MessageCircle } from "lucide-react";
import TestimonialCard from "./TestimonialCard";
import testimonial1 from "@/assets/testimonial-1.png";
import testimonial2 from "@/assets/testimonial-2.png";
import testimonial3 from "@/assets/testimonial-3.png";

const testimonials = [
  {
    image: testimonial1,
    name: "Mariana Silva",
    location: "São Paulo, SP",
    comment: "Não acreditei quando chegou! Kit de panelas novinho, na caixa lacrada. Só paguei o frete mesmo, incrível!",
    date: "há 2 dias"
  },
  {
    image: testimonial2,
    name: "Carlos Eduardo",
    location: "Rio de Janeiro, RJ",
    comment: "Achei que era golpe, mas arrisquei. Chegou em 5 dias! Melhor decisão que tomei, produto top demais.",
    date: "há 4 dias"
  },
  {
    image: testimonial3,
    name: "Patrícia Oliveira",
    location: "Belo Horizonte, MG",
    comment: "Ganhei o meu e já indiquei pra toda família. Produto Brinox original com nota fiscal. Super recomendo!",
    date: "há 1 semana"
  }
];

interface TestimonialsSectionProps {
  show: boolean;
}

const TestimonialsSection = ({ show }: TestimonialsSectionProps) => {
  return (
    <div className={`w-full max-w-4xl mt-8 transition-all duration-700 delay-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Section Header */}
      <div className="flex items-center justify-center gap-2 mb-5">
        <MessageCircle className="w-5 h-5 text-blue" />
        <h3 className="text-white font-semibold text-lg">O que dizem nossos ganhadores</h3>
      </div>
      
      {/* Testimonials Carousel */}
      <div className="relative">
        {/* Gradient fade left */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
        
        {/* Gradient fade right */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
        
        {/* Scrollable container */}
        <div className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide snap-x snap-mandatory">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="snap-center">
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Stats */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">50.847</p>
          <p className="text-xs text-slate-400">Prêmios entregues</p>
        </div>
        <div className="w-px h-10 bg-slate-700" />
        <div className="text-center">
          <p className="text-2xl font-bold text-white">4.9/5</p>
          <p className="text-xs text-slate-400">Avaliação média</p>
        </div>
        <div className="w-px h-10 bg-slate-700" />
        <div className="text-center">
          <p className="text-2xl font-bold text-white">98%</p>
          <p className="text-xs text-slate-400">Satisfação</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
