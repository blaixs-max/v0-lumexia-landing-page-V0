-- Seed leaderboard with sample data
INSERT INTO leaderboard (wallet_id, username, avatar_url, score, reward_pool) VALUES
  ('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1', 'SpeedDemon_99', 'https://api.dicebear.com/7.x/avataaars/svg?seed=1', 99640, 2000.00),
  ('0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', 'CryptoRacerX', 'https://api.dicebear.com/7.x/avataaars/svg?seed=2', 98779, 1850.00),
  ('0x1bFD67037B42Cf73acF2047067bd4F2C47D9BfD6', 'Racer_4377', 'https://api.dicebear.com/7.x/avataaars/svg?seed=3', 97813, 1800.00),
  ('0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', 'Racer_8776', 'https://api.dicebear.com/7.x/avataaars/svg?seed=4', 97241, 1850.00),
  ('0xc2132D05D31c914a87C6611C10748AEb04B58e8F', 'Racer_6640', 'https://api.dicebear.com/7.x/avataaars/svg?seed=5', 96320, 1800.00)
ON CONFLICT (wallet_id) DO NOTHING;
