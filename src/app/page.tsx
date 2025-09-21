"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] text-white font-inter overflow-x-hidden">
      {/* Header */}
      <header className="min-h-screen flex flex-col items-center justify-center text-center px-16 relative">
        <div className="z-10 flex flex-col items-center justify-center min-h-screen">
          <div className="mb-8 animate-fadeIn">
            <Image
              src="/logo.svg"
              alt="TiwanaConnect Logo"
              width={80}
              height={80}
              className="drop-shadow-lg animate-pulse"
            />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 animate-fadeInUp">
            TiwanaConnect
          </h1>

          <p className="mt-4 text-lg md:text-xl text-gray-300 animate-fadeInUp delay-100 text-center">
            Bridging Generations, Preserving Legacy.
          </p>

          <div className="mt-8 flex space-x-4">
            {/* Coming Soon Button */}
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 shadow-lg transition transform hover:-translate-y-1 animate-fadeInUp delay-200">
              Coming Soon
            </button>

            {/* Login Button */}
            <button
              onClick={() => router.push("/login")}
              className="px-8 py-3 rounded-full bg-gray-700 hover:bg-gray-600 shadow-lg transition transform hover:-translate-y-1 animate-fadeInUp delay-300"
            >
              Test Login
            </button>
          </div>
        </div>
        {/* Background gradient circles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full top-[20%] left-[10%] blur-3xl"></div>
          <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full top-[60%] left-[70%] blur-3xl"></div>
          <div className="absolute w-72 h-72 bg-yellow-400/5 rounded-full top-[40%] left-[40%] blur-3xl"></div>
        </div>
      </header>

      {/* Sections */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* About */}
        <section className="bg-white/5 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-3xl font-semibold mb-4">About the App</h2>
          <p className="text-gray-300 leading-relaxed">
            TiwanaConnect is a private digital platform for the Tiwana biradri.
            It helps document and visualize our family tree, understand
            relationships, and preserve our shared legacy. Designed to connect
            hundreds of family members across generations — from elders to the
            youngest ones.
          </p>
        </section>

        {/* Features */}
        <section className="bg-white/5 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-3xl font-semibold mb-6">
            First Release Features
          </h2>
          <ul className="space-y-4">
            {[
              [
                "🌳",
                "Family Tree Visualization",
                "Easy-to-understand relationship graphs that show connections across generations.",
              ],
              [
                "📇",
                "Member Profiles",
                "Each member has a personal record with essential details and information.",
              ],
              [
                "🧬",
                "Relation Mapping",
                "Add father, mother, spouse, children; auto-generates comprehensive family tree.",
              ],
              [
                "🔎",
                "Search & Navigation",
                "Find any family member quickly with powerful search functionality.",
              ],
              [
                "📤",
                "Import/Export",
                "Backup or transfer family data easily with secure import/export options.",
              ],
              [
                "🛡️",
                "Private & Secure",
                "Only accessible to approved family members with robust security measures.",
              ],
            ].map(([icon, title, desc], idx) => (
              <li
                key={idx}
                className="flex items-start gap-4 p-4 bg-white/10 rounded-lg border-l-4 border-indigo-500 hover:bg-white/20 transition"
              >
                <div className="text-2xl">{icon}</div>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-gray-300 text-sm">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Vision */}
        <section className="bg-white/5 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-300 leading-relaxed">
            This app isn&apos;t just a tool — it&apos;s a digital legacy for
            future generations. We aim to keep our roots connected, even as we
            grow around the world. Future updates will include event
            invitations, inheritance planning, and private social features.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-semibold mb-4">Contact</h2>
          <p className="mb-4">For questions, collaboration, or early access:</p>
          <a
            href="mailto:support@tiwanaconnect.com"
            className="inline-block px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
          >
            support@tiwanaconnect.com
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-gray-400 text-center py-8 bg-white/5 backdrop-blur-md">
        <p>© TiwanaConnect 2025. All rights reserved.</p>
      </footer>
    </div>
  );
}
