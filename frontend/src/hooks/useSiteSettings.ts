import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface SiteSettings {
    admin_id?: string;
    admin_password?: string;
    phone?: string;
    email?: string;
    facebook_link?: string;
    instagram_link?: string;
    disabled_sections: string[];
}

export function useSiteSettings() {
    const [settings, setSettings] = useState<SiteSettings>({
        phone: '6205952218',
        email: 'nirajmanpurpatwa@gmail.com',
        facebook_link: '#',
        instagram_link: 'https://instagram.com/asutosh_photography_01?igshid=YmMyMTA2M2Y=',
        disabled_sections: []
    });

    useEffect(() => {
        async function fetchSettings() {
            if (!supabase) return;
            try {
                const { data, error } = await supabase
                    .from('site_settings')
                    .select('*')
                    .eq('id', 1)
                    .maybeSingle();

                if (data && !error) {
                    setSettings(data);
                }
            } catch (err) {
                console.warn('Could not fetch site settings');
            }
        }
        fetchSettings();
    }, []);

    return settings;
}

