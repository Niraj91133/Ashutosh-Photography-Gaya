"use client";

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ClientPortal from '../../views/ClientPortal';

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#c1272d] selection:text-white overflow-x-hidden w-full relative">
      <Header activeSection="" onNavClick={() => {}} />
      <main className="py-12">
        <ClientPortal />
      </main>
      <Footer />
    </div>
  );
}
