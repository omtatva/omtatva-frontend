import type { Film } from "@/types";
import { IMAGE_SIZES, unsplash } from "@/lib/images";

const raw = {
  neon: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
  echoes: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
  quantum: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
  lastFrame: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1",
  synthetic: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
  darkMatter: "https://images.unsplash.com/photo-1594909127802-573f457b6a3c",
} as const;

export const films: Film[] = [
  {
    id: "1",
    title: "Neon Horizon",
    genre: "Sci-Fi",
    year: 2026,
    image: unsplash(raw.neon, IMAGE_SIZES.card),
    description: "A visionary tale of humanity's last frontier among the stars.",
    featured: true,
  },
  {
    id: "2",
    title: "Echoes of Tomorrow",
    genre: "Drama",
    year: 2025,
    image: unsplash(raw.echoes, IMAGE_SIZES.card),
    description: "Memory, loss, and the AI that remembers what we forget.",
  },
  {
    id: "3",
    title: "Quantum Dreams",
    genre: "Thriller",
    year: 2026,
    image: unsplash(raw.quantum, IMAGE_SIZES.card),
    description: "Reality bends when consciousness meets machine.",
  },
  {
    id: "4",
    title: "The Last Frame",
    genre: "Mystery",
    year: 2025,
    image: unsplash(raw.lastFrame, IMAGE_SIZES.card),
    description: "Every photograph hides a story waiting to be told.",
  },
  {
    id: "5",
    title: "Synthetic Soul",
    genre: "Romance",
    year: 2026,
    image: unsplash(raw.synthetic, IMAGE_SIZES.card),
    description: "Love transcends the boundary between human and artificial.",
  },
  {
    id: "6",
    title: "Dark Matter",
    genre: "Horror",
    year: 2025,
    image: unsplash(raw.darkMatter, IMAGE_SIZES.card),
    description: "What lurks in the spaces between dimensions.",
  },
];

export const trendingFilms = films.filter((f) => f.featured).concat(films.slice(0, 4));

export const HERO_IMAGE = unsplash(
  "https://images.unsplash.com/photo-1535010121840-743a46c928a4",
  IMAGE_SIZES.hero
);
