import {
  Utensils, Car, ShoppingBag, FileText, Film, HeartPulse, CircleDollarSign
} from "lucide-react";

export const CATEGORIES = [
  { name: "Food",          color: "#FB7185", Icon: Utensils },
  { name: "Transport",     color: "#38BDF8", Icon: Car },
  { name: "Shopping",      color: "#FBBF24", Icon: ShoppingBag },
  { name: "Bills",         color: "#34D399", Icon: FileText },
  { name: "Entertainment", color: "#A78BFA", Icon: Film },
  { name: "Health",        color: "#2DD4BF", Icon: HeartPulse },
  { name: "Other",         color: "#94A3B8", Icon: CircleDollarSign },
];

export const catMeta = (name) => CATEGORIES.find((c) => c.name === name) || CATEGORIES.at(-1);