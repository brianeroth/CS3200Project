DROP DATABASE IF EXISTS travel_guide;
CREATE DATABASE travel_guide;

USE travel_guide;

CREATE TABLE cities(
  id            INT           PRIMARY KEY AUTO_INCREMENT,
  name          VARCHAR(128)  NOT NULL,
  description   TEXT,
  country       VARCHAR(128)  NOT NULL,
  state         VARCHAR(128)  NOT NULL
);

CREATE TABLE places(
  id                   INT           PRIMARY KEY AUTO_INCREMENT,
  name                 VARCHAR(128)  NOT NULL,
  description          TEXT,
  address              VARCHAR(128)  NOT NULL,
  price_range          INT           NOT NUll DEFAULT 1,
  external_resource    VARCHAR(128)  NOT NULL,
  city_id              INT           NOT NULL,
  FOREIGN KEY	(city_id) REFERENCES cities(id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE resturants(
  id              INT           PRIMARY KEY AUTO_INCREMENT,
  cuisine_type    VARCHAR(128)  NOT NULL,
  place_id        INT           NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE events(
  id            INT  PRIMARY KEY AUTO_INCREMENT,
  event_date    DATE NOT NULL,
  clost         DECIMAL(21, 0),
  place_id      INT  NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE landmarks(
  id          INT  PRIMARY KEY AUTO_INCREMENT,
  cost        DECIMAL(21, 0),
  place_id    INT  NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE admins(
  id          INT           PRIMARY KEY AUTO_INCREMENT,
  name        VARCHAR(128)  NOT NULL,
  username    VARCHAR(128)  NOT NULL,
  password    VARCHAR(128)  NOT NULL
);

CREATE TABLE hotels(
  id          INT  PRIMARY KEY AUTO_INCREMENT,
  place_id    INT  NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE reviews(
  id             INT           PRIMARY KEY AUTO_INCREMENT,
  author         VARCHAR(128)  NOT NULL,
  star_rating    INT           NOT NULL DEFAULT 0,
  description    TEXT,
  date_posted    DATE          NOT NULL,
  place_id       INT           NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE operational_hours(
  id             INT    PRIMARY KEY AUTO_INCREMENT,
  day_of_week    ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
                        NOT NULL,
  open_time      TIME   NOT NULL,
  close_time     TIME   NOT NULL,
  place_id       INT    NOT NULL,
  FOREIGN KEY	(place_id) REFERENCES places(id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE images(
  id            INT                        PRIMARY KEY AUTO_INCREMENT,
  image_path    VARCHAR(128)               NOT NULL,
  caption       VARCHAR(128),
  type          ENUM('thumbnail', 'hero')  NOT NULL DEFAULT 'hero'
);

CREATE TABLE place_images(
  id          INT  PRIMARY KEY AUTO_INCREMENT,
  image_id    INT  NOT NULL,
  place_id    INT  NOT	NUll,
  FOREIGN KEY (image_id) REFERENCES images(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY	(place_id) REFERENCES places(id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE city_images(
  id          INT  PRIMARY KEY AUTO_INCREMENT,
  image_id    INT  NOT NULL,
  city_id     INT  NOT	NULL,
  FOREIGN KEY (image_id) REFERENCES images(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY	(place_id) REFERENCES places(id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE interest_type(
  id             INT           PRIMARY KEY AUTO_INCREMENT,
  description    VARCHAR(128)  NOT NULL
);

CREATE TABLE places_interesttypes(
  place_id            INT  NOT NULL,
  interest_type_id    INT  NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (interest_type_id) REFERENCES interest_type(id)
    ON UPDATE CASCADE ON DELETE CASCADE
);
