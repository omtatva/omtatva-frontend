import type { BTSItem } from "@/types";
import { IMAGE_SIZES, unsplash } from "@/lib/images";

export const btsItems: BTSItem[] = [
  {
    id: "1",
    title: "Building Worlds with AI",
    image: unsplash("https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d", IMAGE_SIZES.bts),
    duration: "4:32",
  },
  {
    id: "2",
    title: "The Art of Neural Cinematography",
    image: unsplash("https://images.unsplash.com/photo-1492691527719-9d1e07e534b4", IMAGE_SIZES.bts),
    duration: "6:15",
  },
  {
    id: "3",
    title: "Inside Our VFX Pipeline",
    image: unsplash("https://images.unsplash.com/photo-1558618666-fcd25c85cd64", IMAGE_SIZES.bts),
    duration: "3:48",
  },
  {
    id: "4",
    title: "Composing the Future of Film Music",
    image: unsplash("https://images.unsplash.com/photo-1598488035139-bdbb2231d1ea", IMAGE_SIZES.bts),
    duration: "5:20",
  },
];
