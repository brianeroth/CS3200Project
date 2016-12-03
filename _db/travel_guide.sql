DROP DATABASE IF EXISTS travel_guide;
CREATE DATABASE travel_guide;
USE travel_guide;

DROP TABLE IF EXISTS cities;
CREATE TABLE cities (
  city_id           INT           PRIMARY KEY AUTO_INCREMENT,
  city_name         VARCHAR(128)  NOT NULL,
  city_description  TEXT,
  city_country      VARCHAR(128)  NOT NULL,
  city_state        VARCHAR(128)  NOT NULL
);

DROP TABLE IF EXISTS places;
CREATE TABLE places (
  place_id                  INT           PRIMARY KEY AUTO_INCREMENT,
  place_name                VARCHAR(128)  NOT NULL,
  place_description         TEXT,
  place_address             TEXT          NOT NULL,
  place_price_range         INT           NOT NUll DEFAULT 0,
  place_external_resource   TEXT          NOT NULL,
  place_image               TEXT,
  place_city_id             INT           NOT NULL,
  FOREIGN KEY	(place_city_id) REFERENCES cities(city_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS restaurants;
CREATE TABLE restaurants (
  restaurant_id             INT           PRIMARY KEY AUTO_INCREMENT,
  restaurant_cuisine_type   VARCHAR(128)  NOT NULL,
  place_id                  INT           NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(place_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS events;
CREATE TABLE events (
  event_id        INT             PRIMARY KEY AUTO_INCREMENT,
  event_date      DATE            NOT NULL,
  event_cost      DECIMAL(21, 0),
  place_id        INT             NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(place_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS landmarks;
CREATE TABLE landmarks (
  landmark_id     INT               PRIMARY KEY AUTO_INCREMENT,
  landmark_cost   DECIMAL(21, 0),
  place_id        INT               NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(place_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS hotels;
CREATE TABLE hotels (
  hotel_id  INT  PRIMARY KEY AUTO_INCREMENT,
  place_id  INT  NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(place_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS admins;
CREATE TABLE admins (
  admin_id          INT           PRIMARY KEY AUTO_INCREMENT,
  admin_name        VARCHAR(128)  NOT NULL,
  admin_username    VARCHAR(128)  NOT NULL,
  admin_password    VARCHAR(128)  NOT NULL
);

DROP TABLE IF EXISTS city_images;
CREATE TABLE city_images (
  image_id        INT                        PRIMARY KEY AUTO_INCREMENT,
  image_path      TEXT                        NOT NULL,
  image_caption   VARCHAR(128),
  image_type      ENUM('thumbnail', 'hero')  NOT NULL DEFAULT 'hero',
  image_city_id   INT                        NOT NULL,
  FOREIGN KEY (image_city_id) REFERENCES cities(city_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS interest_types;
CREATE TABLE interest_types (
  interest_id             INT           PRIMARY KEY AUTO_INCREMENT,
  interest_description    VARCHAR(128)  NOT NULL
);

DROP TABLE IF EXISTS places_interesttypes;
CREATE TABLE places_interesttypes (
  place_interest_id   INT  PRIMARY KEY AUTO_INCREMENT,
  place_id            INT  NOT NULL,
  interest_type_id    INT  NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(place_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (interest_type_id) REFERENCES interest_types(interest_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);
