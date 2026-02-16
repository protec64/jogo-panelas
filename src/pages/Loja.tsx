import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, ShoppingCart, Star, ArrowRight, Clock, Sparkles, Gift, X, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { products, Product } from "@/data/products";
import confetti from "canvas-confetti";
import brinoxLogo from "@/assets/brinox-logo.svg";
import CheckoutLoadingOverlay from "@/components/CheckoutLoadingOverlay";
const Loja = () => {
  const [cartCount] = useState(0);
  const [showPrizeBanner, setShowPrizeBanner] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // Preload first 2 product images for faster loading above the fold
  useEffect(() => {
    const imagesToPreload = products.slice(0, 2).map(p => p.image);
    const preloadLinks: HTMLLinkElement[] = [];
    
    imagesToPreload.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
      preloadLinks.push(link);
    });

    return () => {
      preloadLinks.forEach(link => link.remove());
    };
  }, []);

  useEffect(() => {
    const premio = searchParams.get("premio");
    if (premio === "brinox") {
      setShowPrizeBanner(true);

      // Trigger confetti celebration
      const duration = 3000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: {
            x: 0,
            y: 0
          },
          colors: ['#3B82F6', '#38BDF8', '#FFFFFF']
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: {
            x: 1,
            y: 0
          },
          colors: ['#3B82F6', '#38BDF8', '#FFFFFF']
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [searchParams]);
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <div className="min-h-screen flex flex-col bg-white">
      {checkoutUrl && <CheckoutLoadingOverlay checkoutUrl={checkoutUrl} />}
      {/* Prize Banner */}
      {showPrizeBanner && <div className="bg-gradient-to-r from-blue via-blue-hover to-blue text-white py-1.5 sm:py-2 px-2 sm:px-3 relative overflow-hidden animate-fade-in">
          <div className="container mx-auto flex items-center justify-center gap-2 relative">
            <PartyPopper className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <p className="text-[11px] sm:text-xs md:text-sm font-medium text-center">
              🎉 Você ganhou um <span className="font-bold">Brinox GRÁTIS</span>! Resgate agora!
            </p>
            <button onClick={() => setShowPrizeBanner(false)} className="absolute right-2 p-0.5 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </button>
          </div>
        </div>}

      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate("/loja")}>
            <img src={brinoxLogo} alt="Brinox" className="h-5 sm:h-6" />
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 sm:gap-8">
            <a href="#" className="text-card-foreground font-medium text-sm border-b-2 border-blue pb-1 hover:text-blue transition-colors">
              Início
            </a>
            <a href="#products" className="text-muted-foreground text-sm hover:text-card-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue hover:after:w-full after:transition-all">
              Produtos
            </a>
            <a href="#" className="text-muted-foreground text-sm hover:text-card-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue hover:after:w-full after:transition-all">
              Promoções
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="p-2 rounded-full text-muted-foreground hover:text-card-foreground hover:bg-muted/50 transition-all">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="relative p-2 rounded-full text-muted-foreground hover:text-card-foreground hover:bg-muted/50 transition-all">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-blue text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center font-medium animate-scale-in">
                  {cartCount}
                </span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      

      {/* Products Section */}
      <section id="products" className="py-6 sm:py-12 bg-gradient-to-b from-white to-muted/30">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            {products.map((product, index) => <ProductCard key={product.id} product={product} onClick={() => navigate(`/produto/${product.id}`)} index={index} onCheckout={(url) => { setCheckoutUrl(url); }} />)}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer variant="store" />
    </div>;
};
const ProductCard = ({
  product,
  onClick,
  index,
  onCheckout
}: {
  product: Product;
  onClick: () => void;
  index: number;
  onCheckout: (url: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const formatPrice = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  };
  const isOutOfStock = product.outOfStock === true;

  return <div onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`bg-white rounded-lg sm:rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl hover:shadow-blue/10 transition-all duration-300 group cursor-pointer hover:-translate-y-1 animate-fade-in ${isOutOfStock ? 'opacity-75' : ''}`} style={{
    animationDelay: `${index * 0.1}s`
  }}>
      {/* Image Container */}
      <div className="relative bg-white p-2.5 sm:p-6 h-32 sm:h-52 flex items-center justify-center overflow-hidden">
        {/* Discount Badge */}
        {!isOutOfStock && <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-blue to-blue-hover text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-lg shadow-blue/25 z-10">
          -{product.discount}%
        </div>}

        {/* Out of Stock Badge */}
        {isOutOfStock && <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-muted-foreground text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg z-10">
          ESGOTADO
        </div>}

        {/* Last Units Badge */}
        {product.isLast && !isOutOfStock && <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-sm border border-blue/20 text-blue text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-1.5 z-10 animate-pulse">
            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            Últimas!
          </div>}

        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-muted/50 rounded-xl animate-pulse" />
          </div>
        )}

        {/* Product Image */}
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`max-h-full max-w-full object-contain transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'} ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${isOutOfStock ? 'grayscale' : ''}`} 
        />

        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-blue/10 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-5">
        {/* Rating */}
        <div className="flex items-center gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-blue text-blue" />)}
          <span className="text-muted-foreground text-[10px] sm:text-xs ml-1 font-medium">({product.rating})</span>
        </div>

        {/* Name */}
        <h3 className="text-card-foreground font-semibold text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 min-h-[32px] sm:min-h-[40px] group-hover:text-blue transition-colors">
          {product.name}
        </h3>

        {/* Prices */}
        <div className="mb-2 sm:mb-3">
          <p className="text-muted-foreground text-[10px] sm:text-xs line-through">
            {formatPrice(product.originalPrice)}
          </p>
          <p className={`font-bold text-lg sm:text-2xl ${isOutOfStock ? 'text-muted-foreground' : 'text-blue'}`}>
            {isOutOfStock ? 'Esgotado' : formatPrice(product.price)}
          </p>
        </div>

        {/* Stock */}
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <p className="text-muted-foreground text-[9px] sm:text-xs">
            {isOutOfStock ? <span className="text-destructive font-bold">Estoque esgotado</span> : <>Restam <span className="text-blue font-bold">{product.stock}</span> un.</>}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 sm:h-1.5 bg-muted rounded-full overflow-hidden mb-3 sm:mb-4">
          <div className={`h-full rounded-full transition-all duration-1000 ${isOutOfStock ? 'bg-muted-foreground' : 'bg-gradient-to-r from-blue to-blue-hover'}`} style={{
          width: isOutOfStock ? '0%' : `${Math.min(100, product.stock / 30 * 100)}%`
        }} />
        </div>

        {/* CTA Button */}
        <Button 
          disabled={isOutOfStock}
          onClick={(e) => {
            e.stopPropagation();
            if (!isOutOfStock) onCheckout(product.checkoutUrl);
          }}
          className={`w-full font-semibold py-3 sm:py-5 text-sm sm:text-base rounded-lg sm:rounded-xl transition-all ${isOutOfStock ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-gradient-to-r from-blue to-blue-hover hover:from-blue-hover hover:to-blue text-white shadow-md shadow-blue/20 hover:shadow-lg hover:shadow-blue/30'}`}
        >
          {isOutOfStock ? 'Indisponível' : 'Resgatar Agora'}
        </Button>
      </div>
    </div>;
};
export default Loja;
