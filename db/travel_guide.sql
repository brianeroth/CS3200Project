DROP DATABASE IF EXISTS travel_guide;
CREATE DATABASE travel_guide;

USE travel_guide;

CREATE TABLE cities (
  city_id           INT           PRIMARY KEY AUTO_INCREMENT,
  city_name         VARCHAR(128)  NOT NULL,
  city_description  TEXT,
  city_country      VARCHAR(128)  NOT NULL,
  city_state        VARCHAR(128)  NOT NULL
);

CREATE TABLE places (
  place_id                  INT           PRIMARY KEY AUTO_INCREMENT,
  place_name                VARCHAR(128)  NOT NULL,
  place_description         TEXT,
  place_address             VARCHAR(128)  NOT NULL,
  place_price_range         INT           NOT NUll DEFAULT 1,
  place_external_resource   VARCHAR(128)  NOT NULL,
  place_city_id             INT           NOT NULL,
  FOREIGN KEY	(place_city_id) REFERENCES cities(city_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE restaurant (
  restaurant_id             INT           PRIMARY KEY AUTO_INCREMENT,
  restaurant_cuisine_type   VARCHAR(128)  NOT NULL,
  restaurant_place_id       INT           NOT NULL,
  FOREIGN KEY (restaurant_place_id) REFERENCES places(place_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE events (
  event_id        INT             PRIMARY KEY AUTO_INCREMENT,
  event_date      DATE            NOT NULL,
  event_cost      DECIMAL(21, 0),
  event_place_id  INT             NOT NULL,
  FOREIGN KEY (event_place_id) REFERENCES places(place_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE landmarks (
  landmark_id         INT               PRIMARY KEY AUTO_INCREMENT,
  landmark_cost       DECIMAL(21, 0),
  landmark_place_id   INT               NOT NULL,
  FOREIGN KEY (landmark_place_id) REFERENCES places(place_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE hotels (
  hotel_id  INT  PRIMARY KEY AUTO_INCREMENT,
  place_id  INT  NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(place_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE admins (
  admin_id          INT           PRIMARY KEY AUTO_INCREMENT,
  admin_name        VARCHAR(128)  NOT NULL,
  admin_username    VARCHAR(128)  NOT NULL,
  admin_password    VARCHAR(128)  NOT NULL
);

CREATE TABLE reviews (
  review_id             INT           PRIMARY KEY AUTO_INCREMENT,
  review_author         VARCHAR(128)  NOT NULL,
  review_star_rating    INT           NOT NULL DEFAULT 0,
  review_description    TEXT,
  review_date_posted    DATE          NOT NULL,
  review_place_id       INT           NOT NULL,
  FOREIGN KEY (review_place_id) REFERENCES places(place_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE operational_hours (
  op_hours_id             INT    PRIMARY KEY AUTO_INCREMENT,
  op_hours_day_of_week    ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
  op_hours_open_time      TIME   NOT NULL,
  op_hours_close_time     TIME   NOT NULL,
  op_hours_place_id       INT    NOT NULL,
  FOREIGN KEY	(op_hours_place_id) REFERENCES places(place_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE images (
  image_id        INT                        PRIMARY KEY AUTO_INCREMENT,
  image_path      VARCHAR(128)               NOT NULL,
  image_caption   VARCHAR(128),
  image_type      ENUM('thumbnail', 'hero')  NOT NULL DEFAULT 'hero'
);

CREATE TABLE place_images (
  place_image_id  INT  PRIMARY KEY AUTO_INCREMENT,
  image_id        INT  NOT NULL,
  place_id        INT  NOT NUll,
  FOREIGN KEY (image_id) REFERENCES images(image_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY	(place_id) REFERENCES places(place_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE city_images (
  city_image_id   INT  PRIMARY KEY AUTO_INCREMENT,
  image_id        INT  NOT NULL,
  city_id         INT  NOT NULL,
  FOREIGN KEY (image_id) REFERENCES images(image_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY	(city_id) REFERENCES places(place_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE interest_type (
  interest_id             INT           PRIMARY KEY AUTO_INCREMENT,
  interest_description    VARCHAR(128)  NOT NULL
);

CREATE TABLE places_interesttypes (
  place_interest_id   INT  PRIMARY KEY AUTO_INCREMENT,
  place_id            INT  NOT NULL,
  interest_type_id    INT  NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(place_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (interest_type_id) REFERENCES interest_type(interest_id)
    ON UPDATE CASCADE ON DELETE CASCADE
);
