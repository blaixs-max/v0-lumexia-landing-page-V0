-- Create leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id SERIAL PRIMARY KEY,
  wallet_id TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL,
  avatar_url TEXT,
  score INTEGER NOT NULL DEFAULT 0,
  reward_pool DECIMAL(10, 2) NOT NULL DEFAULT 0,
  rank INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on score for faster ranking queries
CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard(score DESC);

-- Create index on wallet_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_leaderboard_wallet ON leaderboard(wallet_id);

-- Enable Row Level Security
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON leaderboard
  FOR SELECT
  USING (true);

-- Create policy for authenticated insert/update (for game backend)
CREATE POLICY "Allow authenticated insert/update" ON leaderboard
  FOR ALL
  USING (auth.role() = 'authenticated');
