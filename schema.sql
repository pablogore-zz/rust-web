CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  phone TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  bio TEXT NOT NULL,
  image TEXT NOT NULL,
  location TEXT NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   phone TEXT NOT NULL UNIQUE,
--   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
-- );

CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_id TEXT NOT NULL,
  user_id INTEGER REFERENCES users ON DELETE CASCADE,
  tags TEXT[] NOT NULL,
  created_by INTEGER REFERENCES users ON DELETE CASCADE,
  release_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE tracks (
  id SERIAL PRIMARY KEY,
  album_id INTEGER REFERENCES albums ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  file_id TEXT NOT NULL,
  number INT NOT NULL,
  play_time number INT NOT NULL,
  created_by INTEGER REFERENCES users ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- CREATE TABLE tokens (
--   id SERIAL PRIMARY KEY,
--   type TEXT NOT NULL,
--   user_id INTEGER REFERENCES users ON DELETE CASCADE,
--   PRIMARY KEY (id, type, user_id)
-- );

-- CREATE TABLE follows (
--   follower INTEGER REFERENCES users ON DELETE CASCADE,
--   followed INTEGER REFERENCES users ON DELETE CASCADE,
--   CHECK (follower != followed),
--   PRIMARY KEY(follower, followed)
-- );

-- CREATE TABLE comments (
--   id SERIAL PRIMARY KEY,
--   type TEXT NOT NULL, -- forum_topic, forum_post -> anywhere we want to attach a comment
--   title TEXT NOT NULL,
--   description TEXT NOT NULL,
--   body TEXT NOT NULL,
--   tags TEXT[] NOT NULL,
--   created_by INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
--   updated_by INTEGER REFERENCES users ON DELETE CASCADE,
--   deleted_by INTEGER REFERENCES users ON DELETE CASCADE,
--   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
-- );

-- CREATE TABLE comment_participants (
--   user_id INTEGER REFERENCES users ON DELETE CASCADE,
--   comment_id INTEGER REFERENCES comments ON DELETE CASCADE,
--   PRIMARY KEY (user_id, comment_id)
-- );

-- CREATE TABLE comment_likes (
--   user_id INTEGER REFERENCES users ON DELETE CASCADE,
--   comment_id INTEGER REFERENCES comments ON DELETE CASCADE,
--   PRIMARY KEY (user_id, comment_id)
-- );

-- CREATE TABLE notifications (
--   id SERIAL PRIMARY KEY,
--   type TEXT NOT NULL,
--   user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
--   seen BOOLEAN NOT NULL DEFAULT 'f',
--   data JSONB NOT NULL,
--   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
-- );

-- CREATE TABLE events (
--   id SERIAL PRIMARY KEY,
--   type TEXT NOT NULL,
--   data JSONB NOT NULL,
--   meta JSONB NOT NULL,
--   timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
-- );
