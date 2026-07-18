"use client";

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BlogDetail from '../../../views/BlogDetail';

export default function BlogDetailPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#c1272d] selection:text-white overflow-x-hidden w-full relative">
      <Header activeSection="" onNavClick={() => {}} />
      <main>
        <BlogDetail />
      </main>
      <Footer />
    </div>
  );
}
