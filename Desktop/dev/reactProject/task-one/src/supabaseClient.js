import { createClient } from '@supabase/supabase-js';

// SupabaseのプロジェクトURLと匿名キー
const supabaseUrl = 'https://tokdhxrummddxxxpuaoh.supabase.co';  // SupabaseプロジェクトのURL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRva2RoeHJ1bW1kZHh4eHB1YW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMzczNTgsImV4cCI6MjA0ODgxMzM1OH0.woIbfasShc5CcJszS3oSo7zSkpTC0am8O6NGaqeBmes';  // Supabaseの匿名APIキー

export const supabase = createClient(supabaseUrl, supabaseKey);
