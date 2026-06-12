import { IMAGE_SIZES, unsplash } from "@/lib/images";
import type { TeamMember } from "@/types";

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Arjun Mehta",
    role: "Founder & CEO",
    department: "Leadership",
    bio: "Visionary filmmaker and technologist who founded Om Tatva to bridge the gap between cinematic artistry and artificial intelligence.",
    image: unsplash(
      "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      IMAGE_SIZES.card
    ),
    featured: true,
    socialLinks: [
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "X", href: "https://x.com" },
    ],
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "Chief Creative Officer",
    department: "Leadership",
    bio: "Award-winning director with two decades of experience shaping narratives that push the boundaries of visual storytelling.",
    image: unsplash(
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      IMAGE_SIZES.card
    ),
    featured: true,
    socialLinks: [{ label: "LinkedIn", href: "https://linkedin.com" }],
  },
  {
    id: "3",
    name: "Dr. James Chen",
    role: "Head of AI Research",
    department: "Leadership",
    bio: "Former Google Brain researcher pioneering neural rendering pipelines that power our next-generation cinematography tools.",
    image: unsplash(
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      IMAGE_SIZES.card
    ),
    featured: true,
    socialLinks: [{ label: "LinkedIn", href: "https://linkedin.com" }],
  },
  {
    id: "4",
    name: "Sofia Reyes",
    role: "Director of Photography",
    department: "Creative",
    bio: "Cinematographer whose lens work blends traditional film craft with AI-assisted lighting and composition systems.",
    image: unsplash(
      "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      IMAGE_SIZES.card
    ),
  },
  {
    id: "5",
    name: "Marcus Webb",
    role: "Lead VFX Supervisor",
    department: "Creative",
    bio: "Oscar-nominated visual effects artist leading our Neural VFX Labs in creating photorealistic digital worlds.",
    image: unsplash(
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      IMAGE_SIZES.card
    ),
  },
  {
    id: "6",
    name: "Yuki Tanaka",
    role: "AI Pipeline Architect",
    department: "Technology",
    bio: "Engineering the end-to-end production pipeline that seamlessly integrates AI tools into every stage of filmmaking.",
    image: unsplash(
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      IMAGE_SIZES.card
    ),
  },
  {
    id: "7",
    name: "David Okonkwo",
    role: "ML Engineering Lead",
    department: "Technology",
    bio: "Building the machine learning models behind our real-time scene generation and character animation systems.",
    image: unsplash(
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      IMAGE_SIZES.card
    ),
  },
  {
    id: "8",
    name: "Elena Vasquez",
    role: "Head of Production",
    department: "Operations",
    bio: "Orchestrating complex multi-studio productions from pre-visualization through final delivery and distribution.",
    image: unsplash(
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      IMAGE_SIZES.card
    ),
  },
  {
    id: "9",
    name: "Rahul Kapoor",
    role: "Studio Operations Director",
    department: "Operations",
    bio: "Ensuring our global studio network runs with the precision and creative energy that defines Om Tatva.",
    image: unsplash(
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      IMAGE_SIZES.card
    ),
  },
];
