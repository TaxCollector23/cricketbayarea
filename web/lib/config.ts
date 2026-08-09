export const SHOP_NAME = "Cricket Bay Area";
export const SHOP_TAGLINE = "Cricket equipment available for pickup in the Bay Area.";
export const SHOP_ADDRESS = process.env.SHOP_ADDRESS ?? "";

export const CONTACTS = [
  {
    name: "Karan",
    phone: "+1 (510) 673-5822",
    tel: "+15106735822",
    wa: "15106735822",
  },
  {
    name: "Abhi",
    phone: "+1 (408) 718-7279",
    tel: "+14087187279",
    wa: "14087187279",
  },
] as const;

export function whatsappHref(waDigits: string, message: string): string {
  return `https://wa.me/${waDigits}?text=${encodeURIComponent(message)}`;
}

export const CATEGORIES = ["Bats", "Balls", "Kitbags"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_PATHS: Record<Category, string> = {
  Bats: "/bats",
  Balls: "/balls",
  Kitbags: "/kitbags",
};

export const CATEGORY_BLURB: Record<Category, string> = {
  Bats: "English and Kashmir willow bats, chosen and knocked in ready to play.",
  Balls: "Leather match balls and practice balls for club and social play.",
  Kitbags: "Wheelie kitbags, duffles, and full junior kits.",
};

export const CATEGORY_ACCENTS: Record<
  Category,
  { tile: string; ring: string; label: string }
> = {
  Bats: {
    tile: "bg-amber-50 border-amber-200",
    ring: "bg-amber-100 text-amber-800",
    label: "text-amber-900",
  },
  Balls: {
    tile: "bg-rose-50 border-rose-200",
    ring: "bg-rose-100 text-rose-800",
    label: "text-rose-900",
  },
  Kitbags: {
    tile: "bg-sky-50 border-sky-200",
    ring: "bg-sky-100 text-sky-800",
    label: "text-sky-900",
  },
};
