-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
    id BIGINT PRIMARY KEY DEFAULT 1,
    admin_id TEXT DEFAULT 'vishalriya26',
    admin_password TEXT DEFAULT 'Vishalriya26',
    phone TEXT,
    email TEXT,
    facebook_link TEXT DEFAULT '#',
    instagram_link TEXT DEFAULT '#',
    disabled_sections TEXT[] DEFAULT '{}'
);

-- Insert default settings if not exists
INSERT INTO site_settings (id, admin_id, admin_password, phone, email)
VALUES (1, 'vishalriya26', 'Vishalriya26', '9667517894', 'vishalphotography2312@gmail.com')
ON CONFLICT (id) DO NOTHING;

-- Create site_images table
CREATE TABLE IF NOT EXISTS site_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    url TEXT NOT NULL,
    section TEXT NOT NULL,
    category TEXT,
    title TEXT,
    description TEXT,
    media_type TEXT DEFAULT 'image'
);

-- Create clients table for Private Gallery
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    wedding_date TEXT,
    photo_url TEXT,
    drive_link TEXT,
    password TEXT NOT NULL
);

-- Enable RLS (Optional but recommended - for now we set them to public for ease of use as per typical user request flow)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create Policies for public read
CREATE POLICY "Public Read Settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Images" ON site_images FOR SELECT USING (true);
CREATE POLICY "Public Read Clients" ON clients FOR SELECT USING (true);

-- Create Policies for full access (Ideally should be authenticated, but for local setup we'll allow public for now)
CREATE POLICY "Public Full Access Settings" ON site_settings FOR ALL USING (true);
CREATE POLICY "Public Full Access Images" ON site_images FOR ALL USING (true);
CREATE POLICY "Public Full Access Clients" ON clients FOR ALL USING (true);
