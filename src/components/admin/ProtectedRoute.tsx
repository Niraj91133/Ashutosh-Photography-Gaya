"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<string | null>(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const logged = localStorage.getItem('adminLoggedIn');
        setIsLoggedIn(logged);
        setChecking(false);
        if (!logged) {
            router.push('/admin/login');
        }
    }, [router]);

    if (checking) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#c1272d]">
                <div className="w-12 h-12 border-4 border-[#c1272d] border-t-transparent animate-spin rounded-full"></div>
            </div>
        );
    }

    if (!isLoggedIn) {
        return null;
    }

    return <>{children}</>;
}
