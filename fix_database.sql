-- 1. Create the necessary tables if they don't exist
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

CREATE TABLE IF NOT EXISTS site_settings (
    id BIGINT PRIMARY KEY DEFAULT 1,
    admin_id TEXT DEFAULT 'asutosh_admin',
    admin_password TEXT DEFAULT 'asutosh_admin',
    phone TEXT,
    email TEXT,
    facebook_link TEXT DEFAULT '#',
    instagram_link TEXT DEFAULT '#',
    disabled_sections TEXT[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    wedding_date TEXT,
    photo_url TEXT,
    drive_link TEXT,
    password TEXT NOT NULL
);

-- 2. Insert Default Settings
INSERT INTO site_settings (id, admin_id, admin_password, phone, email)
VALUES (1, 'asutosh_admin', 'asutosh_admin', '9667517894', 'asutoshphotography@gmail.com')
ON CONFLICT (id) DO NOTHING;

-- 3. Enable RLS on Tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- 4. Drop old policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Public Full Access Settings" ON site_settings;
DROP POLICY IF EXISTS "Public Full Access Images" ON site_images;
DROP POLICY IF EXISTS "Public Full Access Clients" ON clients;

-- 5. Create unrestricted policies for the tables (to fix table RLS)
CREATE POLICY "Public Full Access Settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Full Access Images" ON site_images FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Full Access Clients" ON clients FOR ALL USING (true) WITH CHECK (true);

-- 6. Fix Storage Bucket Policies (This fixes the upload "violates row-level security policy" error)
-- Allow anyone to upload, update, and delete files in the 'site_media' bucket
DROP POLICY IF EXISTS "Public Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Public Updates" ON storage.objects;
DROP POLICY IF EXISTS "Public Deletes" ON storage.objects;
DROP POLICY IF EXISTS "Public Reads" ON storage.objects;

CREATE POLICY "Public Reads" ON storage.objects FOR SELECT TO public USING (bucket_id = 'site_media');
CREATE POLICY "Public Uploads" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'site_media');
CREATE POLICY "Public Updates" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'site_media');
CREATE POLICY "Public Deletes" ON storage.objects FOR DELETE TO public USING (bucket_id = 'site_media');
