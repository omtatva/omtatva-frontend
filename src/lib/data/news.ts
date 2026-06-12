import type { NewsItem } from "@/types";
import { IMAGE_SIZES, unsplash } from "@/lib/images";

export const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Om Tatva Digitals Wins Best AI Cinematography at FilmTech Awards",
    excerpt:
      "Our groundbreaking work on Neon Horizon has been recognized for pushing the boundaries of AI-assisted visual storytelling.",
    date: "May 12, 2026",
    category: "Awards",
    image: unsplash("https://images.unsplash.com/photo-1514525253161-7a46d19cd819", IMAGE_SIZES.news),
  },
  {
    id: "2",
    title: "Introducing Neural Storyboarding: A New Era of Pre-Production",
    excerpt:
      "Our R&D team unveils a revolutionary AI storyboarding tool that transforms scripts into cinematic visual sequences in minutes.",
    date: "April 28, 2026",
    category: "Innovation",
    image: unsplash("https://images.unsplash.com/photo-1574267432553-4b4628081c31", IMAGE_SIZES.news),
  },
  {
    id: "3",
    title: "Echoes of Tomorrow — Official Trailer Release",
    excerpt:
      "Experience the first glimpse of our most ambitious drama yet. Premiering at Cannes Film Festival 2026.",
    date: "April 15, 2026",
    category: "Release",
    image: unsplash("https://images.unsplash.com/photo-1485846234645-a62644f84728", IMAGE_SIZES.news),
  },
  {
    id: "4",
    title: "The Future of Filmmaking: AI as Creative Partner",
    excerpt:
      "Our founders share insights on how artificial intelligence is reshaping Hollywood production workflows.",
    date: "March 30, 2026",
    category: "Insights",
    image: unsplash("https://images.unsplash.com/photo-1598899134739-24c46d58d4f7", IMAGE_SIZES.news),
  },
];
