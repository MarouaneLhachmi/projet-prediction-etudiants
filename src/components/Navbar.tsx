"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, BarChart3, Cpu, Brain } from "lucide-react";
import clsx from "clsx";

const links = [
  { href: "/",          label: "Dashboard",       icon: BarChart3  },
  { href: "/pipeline",  label: "Pipeline MapReduce", icon: Cpu      },
  { href: "/predict",   label: "Prédiction ML",    icon: Brain      },
];

export default function Navbar() {
  const path = usePathname();
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#1F3864] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
          <GraduationCap className="w-6 h-6 text-[#F4B942]" />
          <span className="hidden sm:block">Projet 9 <span className="text-[#F4B942]">EMSI</span></span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                path === href
                  ? "bg-[#F4B942] text-[#1F3864]"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden md:block">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
