import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  image: string;
  name: string;
  location: string;
  comment: string;
  date: string;
}

const TestimonialCard = ({ image, name, location, comment, date }: TestimonialCardProps) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 flex-shrink-0 w-72">
      <div className="flex items-start gap-3 mb-3">
        <img 
          src={image} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover border-2 border-blue"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-sm truncate">{name}</p>
          <p className="text-slate-400 text-xs">{location}</p>
          <div className="flex items-center gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
        <Quote className="w-6 h-6 text-blue/40 flex-shrink-0" />
      </div>
      
      <p className="text-slate-300 text-sm leading-relaxed mb-3">
        "{comment}"
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">{date}</span>
        <span className="text-xs text-green-400 font-medium">✓ Ganhador Verificado</span>
      </div>
    </div>
  );
};

export default TestimonialCard;
