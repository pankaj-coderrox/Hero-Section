export type Product = {
  id: string;
  name: string;
  eyebrow: string;
  price: string;
  description: string;
  descriptionLines: [string, string];
  image: string;
  tileClass: string;
  accent: string;
};

export const products: Product[] = [
  {
    id: "verdant",
    name: "Matcha Fusion",
    eyebrow: "Fresh seasonal favorite",
    price: "$28.00",
    description:
      "A chilled matcha cream drink with soft whipped topping, balanced sweetness, and a clean green finish.",
    descriptionLines: [
      "A chilled matcha cream drink with soft whipped",
      "topping, balanced sweetness, and a clean green finish."
    ],
    image: "/products/matcha-fusion.png",
    tileClass: "from-emerald-400 to-emerald-700",
    accent: "#007a4c"
  },
  {
    id: "berry",
    name: "Vanilla Flow",
    eyebrow: "Cream collection",
    price: "$25.00",
    description:
      "A smooth vanilla cream blend with golden drizzle, crushed ice, and a mellow dessert-shop finish.",
    descriptionLines: [
      "A smooth vanilla cream blend with golden drizzle,",
      "crushed ice, and a mellow dessert-shop finish."
    ],
    image: "/products/vanilla-flow.png",
    tileClass: "from-amber-200 to-amber-500",
    accent: "#d99919"
  },
  {
    id: "citrus",
    name: "Strawberry Blush",
    eyebrow: "Fruit cream collection",
    price: "$30.00",
    description:
      "A soft strawberry cream blend with bright berry drizzle, whipped cream, and a crisp chilled finish.",
    descriptionLines: [
      "A soft strawberry cream blend with bright berry drizzle,",
      "whipped cream, and a crisp chilled finish."
    ],
    image: "/products/strawberry-blush.png",
    tileClass: "from-rose-300 to-rose-500",
    accent: "#de496d"
  }
];
