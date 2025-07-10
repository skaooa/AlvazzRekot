-- Insert sample giveaways
INSERT INTO giveaways (title, description, image_url, value, end_date, entry_count, is_active) VALUES
('Ultimate Gaming Setup', 'Win a complete luxury gaming setup worth $5000 including RTX 4090, 4K monitor, and premium accessories', 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&h=400&fit=crop', '$5,000', NOW() + INTERVAL '7 days', 245, true),
('Premium Gaming Chair', 'Herman Miller Embody Gaming Chair - the ultimate in ergonomic luxury', 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop', '$1,500', NOW() + INTERVAL '14 days', 189, true),
('Luxury Mechanical Keyboard', 'Custom artisan mechanical keyboard with gold-plated switches', 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600&h=400&fit=crop', '$800', NOW() + INTERVAL '21 days', 156, true);

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category, sizes, stock, is_active) VALUES
('ALVAZZ Elite Hoodie', 'Premium cotton hoodie with embroidered logo and luxury finish', '89.99', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=400&fit=crop', 'hoodies', ARRAY['S', 'M', 'L', 'XL', 'XXL'], 50, true),
('REKOT Gaming T-Shirt', 'Ultra-soft premium gaming t-shirt with metallic print', '49.99', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop', 'tshirts', ARRAY['S', 'M', 'L', 'XL'], 75, true),
('Luxury Gaming Mousepad', 'Premium leather gaming mousepad with gold accents', '79.99', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop', 'accessories', NULL, 30, true),
('Elite Performance Hoodie', 'Tech-fabric hoodie for peak gaming performance', '119.99', 'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=600&h=400&fit=crop', 'hoodies', ARRAY['S', 'M', 'L', 'XL'], 25, true),
('ALVAZZ Signature Tee', 'Limited edition signature t-shirt with holographic design', '69.99', 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=400&fit=crop', 'tshirts', ARRAY['S', 'M', 'L', 'XL', 'XXL'], 40, true),
('Premium Gaming Headset Stand', 'Handcrafted wooden headset stand with RGB lighting', '149.99', 'https://images.unsplash.com/photo-1599669454699-248893623440?w=600&h=400&fit=crop', 'accessories', NULL, 20, true);

-- Insert sample events
INSERT INTO events (title, description, image_url, event_date, location, max_attendees, current_attendees, is_active) VALUES
('ALVAZZ Championship Tournament', 'Elite gaming tournament with $50,000 prize pool', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop', NOW() + INTERVAL '30 days', 'Los Angeles Convention Center', 500, 287, true),
('Luxury Gaming Expo', 'Exclusive showcase of premium gaming technology and merchandise', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop', NOW() + INTERVAL '45 days', 'New York Gaming Arena', 200, 143, true),
('VIP Gaming Meetup', 'Private networking event for elite gaming community members', 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&h=400&fit=crop', NOW() + INTERVAL '60 days', 'Beverly Hills Private Club', 50, 31, true);
