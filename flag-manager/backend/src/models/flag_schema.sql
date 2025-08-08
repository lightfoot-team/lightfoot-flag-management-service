CREATE TABLE flags (
  id serial PRIMARY KEY,
  flag_key text UNIQUE NOT NULL,
  flag_type text NOT NULL CHECK (flag_type IN ('string', 'boolean', 'number', 'object')), 
  variants jsonb NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp,
  default_variant text NOT NULL,
  is_enabled boolean NOT NULL DEFAULT FALSE
);

CREATE TABLE rules (
  id serial PRIMARY KEY,
  rule_name text UNIQUE NOT NULL,
  user_attribute text
    NOT NULL
    CHECK (user_attribute IN ('Everyone', 'id', 'role', 'group')), 
  operator text
    NOT NULL
    CHECK (operator IN ('=', '!=', '>', '<', '>=', '<=')),
  flag_key text
    NOT NULL
    REFERENCES flags(flag_key)
    ON DELETE CASCADE,
  variant text NOT NULL,
  percentage integer NOT NULL DEFAULT 100 CHECK (percentage >= 0 AND percentage <= 100)
);

CREATE TABLE rule_values (
  id serial PRIMARY KEY,
  val text NOT NULL,
  rule_id int
    NOT NULL
    REFERENCES rules(id)
    ON DELETE CASCADE
);