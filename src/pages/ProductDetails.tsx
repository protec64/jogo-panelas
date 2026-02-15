import { useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Truck, Shield, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import ProductReviews from "@/components/ProductReviews";
import { getProductById } from "@/data/products";
import brinoxLogo from "@/assets/brinox-logo.svg";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = getProductById(Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <p className="text-muted-foreground text-lg mb-4">Produto não encontrado</p>
        <Button onClick={() => { window.location.href = "/loja" + window.location.search; }} variant="outline">
          Voltar para a Loja
        </Button>
      </div>
    );
  }

  const formatPrice = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="bg-white border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href={"/loja" + window.location.search} className="flex items-center gap-2">
            <img src={brinoxLogo} alt="Brinox" className="h-6" />
          </a>

          <button
            onClick={() => { window.location.href = "/loja" + window.location.search; }}
            className="flex items-center gap-2 text-muted-foreground hover:text-card-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar</span>
          </button>
        </div>
      </nav>

      {/* Product Content */}
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl p-8 aspect-square flex items-center justify-center border border-border/30">
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-blue text-white text-sm font-bold px-3 py-1.5 rounded-lg">
                  -{product.discount}%
                </div>

                {product.isLast && (
                  <div className="absolute top-4 right-4 bg-white border border-border/50 text-muted-foreground text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    Últimas unidades!
                  </div>
                )}

                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 justify-center">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-xl border-2 p-2 transition-all ${
                      selectedImage === index
                        ? "border-blue bg-blue/5"
                        : "border-border/50 hover:border-blue/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-blue text-blue"
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">
                  ({product.rating}) • {product.stock} em estoque
                </span>
              </div>

              {/* Name */}
              <h1 className="text-2xl md:text-3xl font-bold text-card-foreground leading-tight">
                {product.name}
              </h1>

              {/* Prices */}
              <div className="space-y-1">
                <p className="text-muted-foreground text-lg line-through">
                  De: {formatPrice(product.originalPrice)}
                </p>
                <div className="flex items-baseline gap-3">
                  <p className="text-blue font-bold text-4xl">
                    {formatPrice(product.price)}
                  </p>
                  <span className="bg-blue/10 text-blue text-sm font-semibold px-2 py-1 rounded">
                    Economize {formatPrice(product.originalPrice - product.price)}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Taxa de resgate com {product.discount}% de desconto
                </p>
              </div>

              {/* Stock Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Estoque disponível</span>
                  <span className="text-blue font-semibold">{product.stock} unidades</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue rounded-full transition-all"
                    style={{ width: `${Math.min(100, (product.stock / 30) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Buy Button */}
              <Button
                disabled={product.outOfStock}
                onClick={() => {
                  if (!product.outOfStock) {
                    const separator = product.checkoutUrl.includes('?') ? '&' : '?';
                    const params = window.location.search.replace('?', '');
                    window.location.href = product.checkoutUrl + (params ? separator + params : '');
                  }
                }}
                className={`w-full font-semibold py-6 text-lg rounded-xl flex items-center justify-center gap-2 ${product.outOfStock ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-blue hover:bg-blue-hover text-white'}`}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.outOfStock ? 'Produto Esgotado' : 'Comprar Agora'}
              </Button>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                  <Truck className="w-5 h-5 text-blue flex-shrink-0" />
                  <div>
                    <p className="text-card-foreground text-sm font-medium">Frete Grátis</p>
                    <p className="text-muted-foreground text-xs">Para todo Brasil</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                  <Shield className="w-5 h-5 text-blue flex-shrink-0" />
                  <div>
                    <p className="text-card-foreground text-sm font-medium">Garantia</p>
                    <p className="text-muted-foreground text-xs">12 meses</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                  <Check className="w-5 h-5 text-blue flex-shrink-0" />
                  <div>
                    <p className="text-card-foreground text-sm font-medium">Original</p>
                    <p className="text-muted-foreground text-xs">100% autêntico</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-6 border-t border-border/50 space-y-4">
                <h2 className="text-xl font-bold text-card-foreground">Descrição</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Specs */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-card-foreground">Especificações</h2>
                <div className="bg-muted/30 rounded-xl overflow-hidden">
                  {product.specs.map((spec, index) => (
                    <div
                      key={index}
                      className={`flex justify-between p-4 ${
                        index !== product.specs.length - 1 ? "border-b border-border/50" : ""
                      }`}
                    >
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="text-card-foreground font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Section */}
              {product.reviews && product.reviews.length > 0 && (
                <div className="pt-6 border-t border-border/50">
                  <ProductReviews reviews={product.reviews} rating={product.rating} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer variant="store" />
    </div>
  );
};

export default ProductDetails;
