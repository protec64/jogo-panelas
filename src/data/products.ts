export interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  images: string[];
  originalPrice: number;
  price: number;
  discount: number;
  rating: number;
  stock: number;
  isLast: boolean;
  outOfStock?: boolean;
  description: string;
  specs: { label: string; value: string }[];
  checkoutUrl: string;
  reviews: Review[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Jogo de Panelas Brinox Antiaderente Ceramic Life 8 Peças Smart Plus Vanilla",
    image: "https://brinox.vteximg.com.br/arquivos/ids/276492/jogo-de-panelas-brinox-antiaderente-8-pecas-cor-vanilla.jpg?v=638919087523570000",
    images: [
      "https://brinox.vteximg.com.br/arquivos/ids/276492/jogo-de-panelas-brinox-antiaderente-8-pecas-cor-vanilla.jpg?v=638919087523570000",
      "https://brinox.vteximg.com.br/arquivos/ids/276493/jogo-de-panelas-8-pecas-antiaderente-smart-plus-vanilla.jpg?v=638730593729370000",
      "https://brinox.vteximg.com.br/arquivos/ids/276495/jogo-de-panelas-antiaderente-brinox-ceramic-life-8-pecas-smart-plus-vanilla.jpg?v=638730593729500000",
    ],
    originalPrice: 1099.99,
    price: 0.00,
    discount: 100,
    rating: 4.5,
    stock: 15,
    isLast: true,
    description: "O Jogo de Panelas Brinox Antiaderente Ceramic Life Smart Plus é perfeito para quem busca qualidade e praticidade na cozinha. Com 8 peças em alumínio com revestimento cerâmico antiaderente PFOA Free, você terá durabilidade e facilidade no preparo das suas refeições. Design moderno na cor Vanilla com cabos de toque macio.",
    specs: [
      { label: "Material", value: "Alumínio" },
      { label: "Revestimento", value: "Cerâmico PFOA Free" },
      { label: "Cor", value: "Vanilla" },
      { label: "Peças", value: "8 unidades" },
      { label: "Garantia", value: "12 meses" },
    ],
    checkoutUrl: "https://checkout.wpagamentos.online/checkout?product=1916da15-0ae0-11f1-b2a5-46da4690ad53",
    reviews: [
      { id: 1, name: "Maria Silva", rating: 5, date: "15/01/2025", comment: "Ganhei na roleta e não acreditei! Panelas maravilhosas, o revestimento cerâmico é excelente. Só paguei a taxa de envio!", verified: true },
      { id: 2, name: "João Santos", rating: 5, date: "12/01/2025", comment: "Participei da promoção da roleta e ganhei esse jogo lindo! A cor vanilla combinou perfeitamente com minha cozinha.", verified: true },
      { id: 3, name: "Ana Oliveira", rating: 5, date: "08/01/2025", comment: "Não acreditei quando a roleta parou no prêmio! Recebi rapidinho e as panelas são perfeitas. Super recomendo participar!", verified: true },
      { id: 4, name: "Carlos Mendes", rating: 5, date: "05/01/2025", comment: "Minha esposa ganhou na roleta e ficamos impressionados com a qualidade. Brinox é top mesmo!", verified: true },
      { id: 5, name: "Fernanda Costa", rating: 5, date: "02/01/2025", comment: "Eu achei que era golpe quando ganhei na roleta, mas recebi certinho! Já tenho há 3 meses e continuam perfeitas.", verified: true },
    ],
  },
  {
    id: 2,
    name: "Jogo de Panelas Brinox Antiaderente Ceramic Life 7 Peças Easy Preto",
    image: "https://brinox.vteximg.com.br/arquivos/ids/282325/foto-easy.png?v=639052218527370000",
    images: [
      "https://brinox.vteximg.com.br/arquivos/ids/282325/foto-easy.png?v=639052218527370000",
      "https://brinox.vteximg.com.br/arquivos/ids/282326/4789_110---1.jpg?v=639052218527830000",
      "https://brinox.vteximg.com.br/arquivos/ids/282327/4789_110---2.jpg?v=639052218527830000",
    ],
    originalPrice: 999.99,
    price: 0.00,
    discount: 100,
    rating: 4.5,
    stock: 18,
    isLast: true,
    description: "O Jogo de Panelas Brinox Antiaderente Ceramic Life Easy é a escolha perfeita para o dia a dia. Com 7 peças em alumínio com revestimento cerâmico antiaderente PFOA Free, oferece praticidade e durabilidade. Design moderno em preto com cabos de toque macio.",
    specs: [
      { label: "Material", value: "Alumínio" },
      { label: "Revestimento", value: "Cerâmico PFOA Free" },
      { label: "Cor", value: "Preto" },
      { label: "Peças", value: "7 unidades" },
      { label: "Garantia", value: "12 meses" },
    ],
    checkoutUrl: "https://checkout.wpagamentos.online/checkout?product=5dd800e6-0ae0-11f1-b2a5-46da4690ad53",
    reviews: [
      { id: 1, name: "Patricia Lima", rating: 5, date: "18/01/2025", comment: "Ganhei na roleta da Brinox e chegou super rápido! As 7 peças são lindas e de ótima qualidade.", verified: true },
      { id: 2, name: "Roberto Alves", rating: 5, date: "14/01/2025", comment: "Participei da promoção da roleta e tive a sorte de ganhar! A cor preta é elegante demais.", verified: true },
      { id: 3, name: "Juliana Ferreira", rating: 5, date: "10/01/2025", comment: "Não esperava ganhar na roleta, mas ganhei! Fáceis de limpar e o cabo não esquenta. Obrigada Brinox!", verified: true },
      { id: 4, name: "Marcos Souza", rating: 5, date: "06/01/2025", comment: "Minha mãe ganhou na roleta e ficou emocionada! Qualidade Brinox é incomparável.", verified: true },
    ],
  },
  {
    id: 3,
    name: "Jogo de Panelas Brinox Antiaderente Ceramic Life 8 Peças Smart Plus Vermelho",
    image: "https://brinox.vteximg.com.br/arquivos/ids/280675/Jogo_de_Panelas_Brinox_Antiaderente_Ceramic_Life_8_Pecas_Smart_Plus_Vermelho_Nova.jpg?v=639004705313730000",
    images: [
      "https://brinox.vteximg.com.br/arquivos/ids/280675/Jogo_de_Panelas_Brinox_Antiaderente_Ceramic_Life_8_Pecas_Smart_Plus_Vermelho_Nova.jpg?v=639004705313730000",
      "https://brinox.vteximg.com.br/arquivos/ids/280676/jogo-de-panelas-antiaderente-ceramic-life-8-pecas-smart-plus-vermelho.jpg.jpg?v=639004705314200000",
      "https://brinox.vteximg.com.br/arquivos/ids/280677/jogo-de-panelas-8-pecas-smart-plus-antiaderente-ceramic-life-brinox.jpg.jpg?v=639004705314370000",
    ],
    originalPrice: 1099.00,
    price: 0.00,
    discount: 100,
    rating: 4.5,
    stock: 20,
    isLast: true,
    description: "O Jogo de Panelas Brinox Antiaderente Ceramic Life Smart Plus em vermelho é perfeito para quem busca qualidade e design moderno. Com 8 peças em alumínio com revestimento cerâmico antiaderente PFOA Free, você terá durabilidade e facilidade no preparo das suas refeições com estilo.",
    specs: [
      { label: "Material", value: "Alumínio" },
      { label: "Revestimento", value: "Cerâmico PFOA Free" },
      { label: "Cor", value: "Vermelho" },
      { label: "Peças", value: "8 unidades" },
      { label: "Garantia", value: "12 meses" },
    ],
    checkoutUrl: "https://checkout.wpagamentos.online/checkout?product=3d4cf6cf-0ae0-11f1-b2a5-46da4690ad53",
    reviews: [
      { id: 1, name: "Luciana Martins", rating: 5, date: "20/01/2025", comment: "Ganhei na roleta e o vermelho é mais lindo pessoalmente! Deixou minha cozinha muito mais alegre.", verified: true },
      { id: 2, name: "Eduardo Ribeiro", rating: 5, date: "16/01/2025", comment: "Não acreditei quando ganhei na promoção da roleta! O revestimento cerâmico é superior a qualquer outra que já tive.", verified: true },
      { id: 3, name: "Camila Rocha", rating: 5, date: "11/01/2025", comment: "Participei da roleta sem expectativas e ganhei! Cozinho com menos óleo e a limpeza é super fácil.", verified: true },
      { id: 4, name: "Ricardo Pereira", rating: 5, date: "07/01/2025", comment: "A roleta é real gente! Ganhei meu jogo de panelas e só paguei o frete. Produto de primeira!", verified: true },
      { id: 5, name: "Amanda Dias", rating: 5, date: "03/01/2025", comment: "Minha sogra ganhou na roleta e me indicou. Também ganhei! Obrigada Brinox!", verified: true },
    ],
  },
  {
    id: 4,
    name: "Cafeteira Italiana Brinox Verona 6 Xícaras em Alumínio Vanilla",
    image: "https://brinox.vteximg.com.br/arquivos/ids/281703/VANILLA.jpg?v=639015740632830000",
    images: [
      "https://brinox.vteximg.com.br/arquivos/ids/281703/VANILLA.jpg?v=639015740632830000",
      "https://brinox.vteximg.com.br/arquivos/ids/281704/2182_105---1.jpg?v=639058297162130000",
      "https://brinox.vteximg.com.br/arquivos/ids/281705/2182_105---4.jpg?v=639058297162470000",
    ],
    originalPrice: 209.99,
    price: 0.00,
    discount: 100,
    rating: 4.5,
    stock: 0,
    isLast: false,
    outOfStock: true,
    description: "A Cafeteira Italiana Brinox Verona é perfeita para os amantes de café. Com capacidade para 6 xícaras, corpo em alumínio na cor Vanilla e detalhes em madeira, oferece design elegante e café encorpado no estilo italiano tradicional.",
    specs: [
      { label: "Material", value: "Alumínio" },
      { label: "Capacidade", value: "6 xícaras" },
      { label: "Cor", value: "Vanilla" },
      { label: "Código", value: "2182105" },
      { label: "Garantia", value: "12 meses" },
    ],
    checkoutUrl: "https://pay.contato-mi.site/checkout?product=cafeteira-verona-vanilla",
    reviews: [
      { id: 1, name: "Helena Gomes", rating: 5, date: "19/01/2025", comment: "Ganhei na roleta da Brinox! A cafeteira é linda e faz um café encorpado igual de cafeteria italiana.", verified: true },
      { id: 2, name: "Bruno Cardoso", rating: 5, date: "15/01/2025", comment: "Participei da promoção da roleta e ganhei! Design lindo e funcional, o café fica perfeito.", verified: true },
      { id: 3, name: "Isabela Nunes", rating: 5, date: "12/01/2025", comment: "A roleta funciona de verdade! Ganhei essa cafeteira linda. A cor vanilla é maravilhosa!", verified: true },
      { id: 4, name: "Gustavo Araujo", rating: 5, date: "09/01/2025", comment: "Eu duvidei da roleta mas ganhei! Melhor cafeteira que já tive. Obrigado Brinox!", verified: true },
    ],
  },
  {
    id: 5,
    name: "Panela de Pressão Indução Brinox Antiaderente Ceramic Life Pressure 6,8 Litros Ø24cm Vanilla",
    image: "https://brinox.vteximg.com.br/arquivos/ids/279340/Design-sem-nome---2025-09-11T143344.010.jpg?v=638937220710700000",
    images: [
      "https://brinox.vteximg.com.br/arquivos/ids/279340/Design-sem-nome---2025-09-11T143344.010.jpg?v=638937220710700000",
      "https://brinox.vteximg.com.br/arquivos/ids/279341/promocao-panela-pressao-vanila-brinox-antiaderente-ceramic-life-6-litros.png?v=638937220711670000",
      "https://brinox.vteximg.com.br/arquivos/ids/279342/Design-sem-nome---2025-09-11T143416.156.jpg?v=638937220711800000",
    ],
    originalPrice: 629.99,
    price: 0.00,
    discount: 100,
    rating: 4.5,
    stock: 0,
    isLast: false,
    outOfStock: true,
    description: "A Panela de Pressão Brinox Ceramic Life Pressure combina segurança e praticidade. Com capacidade de 6,8 litros, revestimento cerâmico antiaderente PFOA Free, fundo de indução e design Vanilla elegante, é ideal para preparar refeições deliciosas com rapidez.",
    specs: [
      { label: "Capacidade", value: "6,8 Litros" },
      { label: "Diâmetro", value: "Ø24cm" },
      { label: "Revestimento", value: "Cerâmico PFOA Free" },
      { label: "Fundo de Indução", value: "Sim" },
      { label: "Cor", value: "Vanilla" },
      { label: "Código", value: "4952103" },
      { label: "Garantia", value: "12 meses" },
    ],
    checkoutUrl: "https://pay.contato-mi.site/checkout?product=panela-pressao-inducao-vanilla",
    reviews: [
      { id: 1, name: "Renata Moreira", rating: 5, date: "21/01/2025", comment: "Ganhei essa panela de pressão na roleta! Funciona perfeitamente no meu fogão de indução. Amei!", verified: true },
      { id: 2, name: "Felipe Castro", rating: 5, date: "17/01/2025", comment: "Não acreditei quando ganhei na promoção da roleta! Qualidade excepcional, cozinha rápido e é muito segura.", verified: true },
      { id: 3, name: "Tatiana Vieira", rating: 5, date: "13/01/2025", comment: "A roleta é verdadeira! Ganhei e recebi rapidinho. O feijão fica pronto em minutos!", verified: true },
      { id: 4, name: "André Monteiro", rating: 5, date: "10/01/2025", comment: "Participei da roleta e ganhei! Excelente produto, funciona em todos os tipos de fogão.", verified: true },
      { id: 5, name: "Beatriz Santos", rating: 5, date: "04/01/2025", comment: "Minha vizinha ganhou na roleta e me indicou. Também ganhei! A melhor panela de pressão que já tive!", verified: true },
    ],
  },
];

export const getProductById = (id: number): Product | undefined => {
  return products.find((p) => p.id === id);
};
