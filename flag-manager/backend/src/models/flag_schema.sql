CREATE TABLE flags (
  id serial PRIMARY KEY,
  flag_key text UNIQUE NOT NULL,
  flag_type text NOT NULL CHECK (flag_type IN ('string', 'boolean', 'number', 'object')), 
  variants jsonb NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp,
  default_variant text NOT NULL,
  is_enabled boolean NOT NULL DEFAULT FALSE
)
