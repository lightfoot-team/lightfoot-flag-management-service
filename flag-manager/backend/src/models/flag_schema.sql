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

-- -- TODO: add constraints for rules and values and allow other types
-- CREATE TABLE rules (
--   id serial PRIMARY KEY,
--   rule_name text UNIQUE NOT NULL,
--   context_kind text,
--   attribute text,
--   operator text,
--   flag_key text,
--   variant text
-- );

-- -- TODO: allow for other value types 
-- CREATE TABLE rule_values (
--   id serial PRIMARY KEY,
--   val text, 
--   rule_id int
--     NOT NULL
--     REFERENCES rules (id)
--     ON DELETE CASCADE
-- );

CREATE TABLE rules (
  id serial PRIMARY KEY,
  rule_name text UNIQUE NOT NULL,
  user_attribute text
    NOT NULL
    CHECK (user_attribute IN ('id', 'role', 'group')), 
  operator text
    NOT NULL
    CHECK (operator IN ('=', '!=', '>', '<', '>=', '<=')),
  flag_key text
    NOT NULL
    REFERENCES flags(flag_key)
    ON DELETE CASCADE,
  variant text NOT NULL,
);

CREATE TABLE rule_values (
  id serial PRIMARY KEY,
  val text NOT NULL,
  rule_id int
    NOT NULL
    REFERENCES rules(id)
    ON DELETE CASCADE
);