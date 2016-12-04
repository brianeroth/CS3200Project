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
  FOREIGN KEY   (place_city_id) REFERENCES cities(city_id)
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

DROP FUNCTION IF EXISTS does_username_exist;

DELIMITER //
CREATE FUNCTION does_username_exist(uname VARCHAR(45)) RETURNS BOOLEAN
BEGIN
  DECLARE exist BOOLEAN;
  SET exist = TRUE;

  IF ((SELECT COUNT(*) FROM admins WHERE admin_username = uname) > 0) THEN RETURN TRUE;
    ELSE RETURN FALSE;
  END IF;
END //
DELIMITER ;

INSERT INTO cities(city_id, city_name, city_description, city_country, city_state) VALUES
(1, 'Rome', 'Rome wasn\'t built in a day--and you\'ll need much more than a day to take in this timeless city. The city is a real-life collage of piazzas, open-air markets, and astonishing historic sites. Toss a coin into the Trevi Fountain, contemplate the Colosseum and the Pantheon, and sample a perfect espresso or gelato before spending an afternoon shopping at the Campo de’Fiori or Via Veneto. Enjoy some of the most memorable meals of your life here, too, from fresh pasta to succulent fried artichokes or a tender oxtail stew.', 'Italy', 'Lazio'),
(2, 'San Fransisco', 'Every neighborhood in San Francisco has its own personality, from the hippie chic of the Upper Haight to the hipster grit of the Mission. The Marina district boasts trendy bistros and postcard-perfect views of the Golden Gate Bridge, while Noe Valley offers quaint and quiet boutiques. Wave hello to the sea lions at Pier 39, and sample local cheese and charcuterie at the Ferry Building. Sit in on a yoga session in Dolores Park or marvel at the Dutch Windmill across from Ocean Beach.', 'United States', 'CA'),
(3, 'London', 'The crown jewels, Buckingham Palace, Camden Market…in London, history collides with art, fashion, food, and good British ale. A perfect day is different for everyone: culture aficionados shouldn\'t miss the Tate Modern and the Royal Opera House. If you love fashion, Oxford Street has shopping galore. For foodies, cream tea at Harrod’s or crispy fish from a proper chippy offers classic London flavor. Music and book buffs will love seeing Abbey Road and the Sherlock Holmes Museum (at 221B Baker Street, of course).', 'United Kingdom', 'England'),
(4, 'Paris', 'Lingering over pain au chocolat in a sidewalk café, relaxing after a day of strolling along the Seine and marveling at icons like the Eiffel Tower and the Arc de Triomphe… the perfect Paris experience combines leisure and liveliness with enough time to savor both an exquisite meal and exhibits at the Louvre. Awaken your spirit at Notre Dame, bargain hunt at the Marché aux Puces de Montreuil or for goodies at the Marché Biologique Raspail, then cap it all off with a risqué show at the Moulin Rouge.', 'France', 'Ile-de-France'),
(5, 'Barcelona', 'Barcelona feels a bit surreal – appropriate, since Salvador Dali spent time here and Spanish Catalan architect Antoni Gaudí designed several of the city’s buildings. Stepping into Gaudí’s Church of the Sacred Family is a bit like falling through the looking glass - a journey that you can continue with a visit to Park Güell. Sip sangria at a sidewalk café in Las Ramblas while watching flamboyant street performers, then create your own moveable feast by floating from tapas bar to tapas bar.', 'Spain', 'Catalonia'),
(6, 'Tokyo', 'Tradition collides with pop culture in Tokyo, where you can reverently wander ancient temples before rocking out at a karaoke bar. Wake up before the sun to catch the lively fish auction at the Tsukiji Market, then refresh with a walk beneath the cherry blossom trees that line the Sumida River. Spend some time in the beautiful East Gardens of the Imperial Palace, then brush up on your Japanese history at the Edo-Tokyo Museum. Don’t forget to eat as much sushi, udon noodles, and wagashi (Japanese sweets) as your belly can handle.', 'Japan', 'Kanto');

INSERT INTO places(place_id, place_name, place_description, place_address, place_price_range, place_external_resource, place_image, place_city_id) VALUES
(1, 'Colosseum', 'Perhaps the best-preserved of the monuments of ancient Rome, this huge marble structure was built to hold more than 50,000 spectators to witness bloody contests of might and the slaughter of wild beasts.', 'Piazza del Colosseo, 00184', 1, 'https://www.tripadvisor.com/Attraction_Review-g187791-d192285-Reviews-Colosseum-Rome_Lazio.html', 'http://cdn.history.com/sites/2/2015/03/hungry-history-vomitoriums-fact-or-fiction_Corbis-E.jpeg', 1),
(2, 'Pantheon', 'Dedicated to the seven planetary divinities and featuring an interior of gorgeous marble, the Pantheon is one of the most impressive monuments of Augustan Rome.', 'Piazza della Rotonda, 00186', 0, 'https://www.tripadvisor.com/Attraction_Review-g187791-d197714-Reviews-Pantheon-Rome_Lazio.html', 'http://www.mejplacehostel.com/wp-content/uploads/2015/12/Pantheon.jpg', 1),
(3, 'Roman Forum', '', 'Piazza Santa Maria Nova, 53, 00186', 1, 'https://www.tripadvisor.com/Attraction_Review-g187791-d2154770-Reviews-Roman_Forum-Rome_Lazio.html', 'http://www.destination360.com/europe/italy/rome/images/s/roman-forum.jpg', 1),
(4, 'Trevi Fountain', 'Certainly the most famous and photographed fountain in Rome, legend has it that whoever throws a coin into the pond will return to Rome.', 'Piazza di Trevi, 00187', 0, 'https://www.tripadvisor.com/Attraction_Review-g187791-d190131-Reviews-Trevi_Fountain-Rome_Lazio.html', 'http://www.trevifountain.net/images/trevifountain.jpg', 1),
(5, 'Spanish Steps', 'Located in the heart of Rome, this vibrant and elegant square is surrounded by 18th-century buildings augmented by the colorful flowers that adorn the Spanish Steps. The elegant steps by Francesco de Sanctis (1723-1726) consist of twelve flights of varying width, which descend to the scenic Franciscan Church of Trinita dei Monti.', 'Piazza di Spagna, 00187', 0, 'https://www.tripadvisor.com/Attraction_Review-g187791-d197717-Reviews-Spanish_Steps-Rome_Lazio.html', 'http://romeonsegway.com/wp-content/plugins/widgetkit/cache/gallery/759/spanish3-935e4d033a.jpg', 1),
(6, 'Sistine Chapel', 'Probably the most famous chapel in the world because of its incredible artwork, notably "The Last Judgment," Michelangelo\'s stunning fresco covering 10,000 square feet of the ceiling and wall.', 'Citta del Vaticano 1, 00120 Vatican City', 2, 'https://www.tripadvisor.com/Attraction_Review-g187793-d190130-Reviews-Sistine_Chapel-Vatican_City_Lazio.html', 'http://arounddeglobe.com/wp-content/uploads/2016/07/sistine-chapel-ceiling.jpg', 1),
(7, 'St. Peter\'s Basilica', 'Arguably one of the finest Cathedrals in the entire world, St. Peter\'s is the spiritual center of the Vatican and the product of many of Italy\'s great Renaissance\'s architects, among them Bramante, Raphael and Michelangelo.', 'Piazza di San Pietro, 00120 Vatican City', 2, 'https://www.tripadvisor.com/Attraction_Review-g187793-d631111-Reviews-St_Peter_s_Basilica-Vatican_City_Lazio.html', 'http://arounddeglobe.com/wp-content/uploads/2014/10/St-Peters-Basilica.jpg', 1),

(8, 'O\'vino', '', 'Via Pesaro 8', 3, 'https://www.tripadvisor.com/Restaurant_Review-g187791-d9569941-Reviews-O_vino-Rome_Lazio.html', 'https://u.tfstatic.com/restaurant_photos/767/217767/169/612/o-vino-vista-sala-3623e.jpg', 1),
(9, 'Pane e Salame', '', 'Via di Santa Maria in Via 19', 1, 'https://www.tripadvisor.com/Restaurant_Review-g187791-d10044289-Reviews-Pane_e_Salame-Rome_Lazio.html', 'https://media-cdn.tripadvisor.com/media/photo-s/0a/e0/d9/a2/pane-e-salame.jpg', 1),
(10, 'Pizzeria Loffredo', '', 'Via Vestricio Spurinna, 53, 00175', 1, 'https://www.tripadvisor.com/Restaurant_Review-g187791-d3494494-Reviews-Pizzeria_Loffredo-Rome_Lazio.html', 'https://media-cdn.tripadvisor.com/media/photo-s/09/24/11/40/pizzeria-loffredo.jpg', 1),
(11, 'Alla Pergola', '', 'Via Alberto Cadlolo 101', 4, 'https://www.tripadvisor.com/Restaurant_Review-g187791-d806462-Reviews-Alla_Pergola-Rome_Lazio.html', 'https://romecavalieri.com/wp-content/uploads/2016/03/La-Pergola-Restaurant-1-e1469604929350.jpg', 1),
(12, 'Pipero al Rex', '', 'Via Torino 149, 00184', 4, 'https://www.tripadvisor.com/Restaurant_Review-g187791-d2436520-Reviews-Pipero_al_Rex-Rome_Lazio.html', 'https://pickyglutton.files.wordpress.com/2014/12/pigeon-and-carrots-at-pipero-al-rex.jpg', 1),

(13, 'Appia Antica Resort', '', 'Via Appia Pignatelli 368, 00178', 4, 'https://www.tripadvisor.com/Hotel_Review-g187791-d4698947-Reviews-Appia_Antica_Resort-Rome_Lazio.html', 'http://d2otjue8e2v73a.cloudfront.net/_novaimg/2840631-892021_19_0_1399_900_1400_900.rc.jpg', 1),
(14, 'Portrait Roma', '', 'Via Bocca di Leone, 23, 00187', 4, 'https://www.tripadvisor.com/Hotel_Review-g187791-d601432-Reviews-Portrait_Roma-Rome_Lazio.html', 'https://www.gha.com/var/ezwebin_site/storage/images/files/gha-images/brands/lungarno/portrait-roma/lungarnoportraitroma_room01/4993685-1-eng-GB/LungarnoPortraitRoma_Room01_property_banner.jpg', 1),
(15, 'Deko Rome', '', 'Via Toscana 1, 00187', 3, 'https://www.tripadvisor.com/Hotel_Review-g187791-d2091012-Reviews-Deko_Rome-Rome_Lazio.html', 'http://www.dekorome.com/_include/img/profile/camera4.jpg', 1),
(16, 'Lifestyle Suites Rome', '', 'Piazza Navona 93, 00186', 3, 'https://www.tripadvisor.com/Hotel_Review-g187791-d8687540-Reviews-Lifestyle_Suites_Rome-Rome_Lazio.html', 'http://r-ec.bstatic.com/images/hotel/840x460/603/60303587.jpg', 1),

(17, 'Tax the Heat', '', 'Atlantico, Viale dell\'Oceano Atlantico 271', 1, 'http://www.bandsintown.com/event/13209401-tax-the-heat-rome-atlantico-2016?artist=Tax+The+Heat&came_from=192', 'https://s3.amazonaws.com/bit-photos/large/6825550.jpeg', 1),
(18, 'Saint Paul Chamber Orchestra', '', 'Sapienza University of Rome, Piazzale Aldo Moro, 5', 1, 'https://content.thespco.org/events/european-tour-patricia-kopatchinskaja/', 'https://lh3.googleusercontent.com/-ZkYWEZL6Ljw/AAAAAAAAAAI/AAAAAAAAAHU/dtVSkH3uPZw/s0-c-k-no-ns/photo.jpg', 1),
(19, 'Tinie Tempah', '', 'Orion Live Club, Viale J. F. Kennedy, 52', 1, 'http://www.viagogo.com/au/Rome/Orion-Live-Club-Tickets/_V-15403/Tinie-Tempah-Tickets', 'http://static1.stereoboard.com/images/stories/2013/images/A-Z%20Main%20Artist%20Images/T/tinie_tempah_hb_190115.jpg', 1),

(20, 'Golden Gate Bridge', 'Stretching 4,200 feet and towering as high as a 65-story building, this well-known bridge is the gateway to San Francisco.', 'Lincoln Boulevard, near Doyle Drive and Fort Point', 0, 'https://www.tripadvisor.com/Attraction_Review-g60713-d104675-Reviews-Golden_Gate_Bridge-San_Francisco_California.html', 'http://cdn.history.com/sites/2/2015/05/hith-golden-gate-144833144-E.jpeg', 2),
(21, 'Alcatraz Island', 'Park rangers conduct tours by recounting the prison\'s thrilling history along with intriguing anecdotes about Al Capone and other legendary figures that made a "home" here.', 'Pier 33, B201 Fort Mason', 3, 'https://www.tripadvisor.com/Attraction_Review-g60713-d102523-Reviews-Alcatraz_Island-San_Francisco_California.html', 'http://s3.amazonaws.com/production.reserve123/images/product/21706-1.jpg', 2),
(22, 'AT&T Park', 'Home of the San Francisco Giants Major League baseball team.', '24 Willie Mays Plaza', 2, 'https://www.tripadvisor.com/Attraction_Review-g60713-d557330-Reviews-AT_T_Park-San_Francisco_California.html', 'http://ww3.hdnux.com/photos/37/72/44/8366398/7/rawImage.jpg', 2),
(23, 'Cable Cars', 'Since 1873, cable cars have run up and down the hilly city, though after the 1950s, these cars have been kept in operation more out of historic nostalgia. Seventeen miles of track remain and have been deemed a historical landmark.', 'San Francisco', 2, 'https://www.tripadvisor.com/Attraction_Review-g60713-d104821-Reviews-Cable_Cars-San_Francisco_California.html', 'http://www.sftodo.com/images/cable-car/cable-cars-san-francico.jpg', 2),
(24, 'Golden Gate Park', '', '501 Stanyan St', 0, 'https://www.tripadvisor.com/Attraction_Review-g60713-d311684-Reviews-Golden_Gate_Park-San_Francisco_California.html', 'http://www.inetours.com/images/CoF/Conservatory_4718.jpg', 2),

(25, 'Seven Hills', '', '1550 Hyde Street', 4, 'https://www.tripadvisor.com/Restaurant_Review-g60713-d1999071-Reviews-Seven_Hills-San_Francisco_California.html', 'http://ww1.hdnux.com/photos/06/70/54/1805064/7/920x920.jpg', 2),
(26, 'Boulevard', '', '1 Mission St', 4, 'https://www.tripadvisor.com/Restaurant_Review-g60713-d353909-Reviews-Boulevard-San_Francisco_California.html', 'http://bunboyeatsla.com/wp-content/uploads/2014/01/IMG_2962.jpg', 2),
(27, 'Kokkari Estiatorio', '', '200 Jackson Street', 4, 'https://www.tripadvisor.com/Restaurant_Review-g60713-d353917-Reviews-Kokkari_Estiatorio-San_Francisco_California.html', 'https://www.zagat.com/proxy/v1.4?m=image&a=resize&url=http%3A//storage.googleapis.com/zgt-photos/0x80858060747de94d_0xb3d399f14d2b6c40/114eb10f781d4a67324ea49df0b415e9.JPG&width=497&height=286&key=abbc09b7c840c10937a4db331422c98b', 2),
(28, 'The Italian Homemade Company', '', '716 Columbus Ave', 3, 'https://www.tripadvisor.com/Restaurant_Review-g60713-d7254365-Reviews-The_Italian_Homemade_Company-San_Francisco_California.html', 'https://photos.smugmug.com/Food/Italian-Homemade-Company/i-rKg8czd/0/XL/Bite0226_*0893-XL.jpg', 2),
(29, 'Eight Am', '', '1323 Columbus Ave', 3, 'https://www.tripadvisor.com/Restaurant_Review-g60713-d8122118-Reviews-Eight_Am-San_Francisco_California.html', 'https://s3-media1.fl.yelpcdn.com/bphoto/fsVtYZS8vCeaY5ZJxCf2TQ/348s.jpg', 2),

(30, 'Hotel Drisco', '', '2901 Pacific Avenue', 4, 'https://www.tripadvisor.com/Hotel_Review-g60713-d80983-Reviews-Hotel_Drisco-San_Francisco_California.html', 'http://hoteldrisco.com/wp-content/uploads/sites/7/2016/05/1400x600-Hero_hi-res.jpg', 2),
(31, 'Loews Regency San Francisco', '', '222 Sansome Street', 4, 'https://www.tripadvisor.com/Hotel_Review-g60713-d81126-Reviews-Loews_Regency_San_Francisco-San_Francisco_California.html', 'http://cdn-image.travelandleisure.com/sites/default/files/styles/tnl_redesign_article_landing_page/public/1435345684/WBLGCITYHOTELS0715-loews-regency-san-francisco.jpg?itok=ojnvldgY', 2),
(32, 'Omni San Francisco Hotel', '', '500 California Street', 4, 'https://www.tripadvisor.com/Hotel_Review-g60713-d224948-Reviews-Omni_San_Francisco_Hotel-San_Francisco_California.html', 'http://www.sftravel.com/sites/sftraveldev.prod.acquia-sites.com/files/parters/images/P0039743_2_20141007171806_11.JPG', 2),
(33, 'The Inn at Union Square', '', '440 Post Street', 3, 'https://www.tripadvisor.com/Hotel_Review-g60713-d81409-Reviews-The_Inn_at_Union_Square-San_Francisco_California.html', 'http://www.sanfrancisco.com/inn-at-union-square/gifs/inn-at-union-square-pic2.jpg', 2),

(34, 'Mø', '', 'The Warfield, 982 Market Street', 2, 'http://www.thewarfieldtheatre.com/events/detail/310577', 'http://d1ya1fm0bicxg1.cloudfront.net/2016/06/mo-tickets_11-19-16_3_574f7b717b950.jpg', 2),
(35, 'Steve Aoki', '', 'Bill Graham Civic Auditorium, 99 Grove Street', 2, 'http://www.ticketmaster.com/steve-aoki-san-francisco-california-11-18-2016/event/1C00514B228A7DE1', 'http://images.sk-static.com/images/media/profile_images/artists/567464/huge_avatar', 2),
(36, 'Lupe Fiasco', '', '1015 Folsom, 1015 Folsom Street', 2, 'http://1015.com/events/11-16-2016/lupe-fiasco/', 'https://cdn.zumic.com/wp-content/uploads/2015/11/lupe-fiasco-2016-tour-tickets-promo-450x300.jpg', 2),

(37, 'Shiba Tofuya Ukai', 'Away from the hustle and bustle of the everyday, and it passes through the Nagayamon show the four seasons rich look from time to time, before the vast Japanese garden is the eye. In the private room of sukiya-zukuri and spacious, touch the charm of the architecture of the sum, beautiful cloister of lacquered. Inherit the spun\'s tradition when the two hundred years, is here the space of peace and hospitality. Among the lush greenery and Edo, please spend the irreplaceable moments.', 'Japan, 〒105-0011 Tokyo, 港区Shibakoen, 4−4−13', 3, 'http://www.ukai.co.jp/shiba/', 'http://www.ukai.co.jp/english/shiba/img/shi_en_abt_pic01-02.jpg', 6),
(38, 'Uobei Sushi', 'Diners pluck sushi & maki rolls from a moving conveyor belt at this Japan-based chain outpost.', '2 Chome-29-11 Dogenzaka, 渋谷区 Tokyo 150-0043, Japan', 2, 'http://www.genkisushi.co.jp/search/map.php?id=232', 'https://foodsaketokyo.files.wordpress.com/2015/07/uobei-interior.jpg', 6),
(39, 'Tapas Molecular Bar', 'With only eight seats, our one-Michelin starred Tapas Molecular Bar offers an exclusive dining experience celebrating the art of innovative molecular cuisine. Situated within the chic Oriental Lounge on the 38th floor, the bar serves a range of delicious dishes in the traditional sushi-bar style. Over the course of two hours, our team of talented chefs will prepare bite-sized delicacies right before your eyes, creating new texture and flavour combinations to stimulate both the imagination and the palate. Limited to an intimate group of only eight people per seating, it is the ultimate gourmet experience. Advance reservations are required.', '2-1-1 Nihonbashi-Muromachi, Chuo, Tokyo 103-8328, Japan', 4, 'http://www.mandarinoriental.com/tokyo/fine-dining/tapas-molecular-bar/?htl=MOTYO_tapas&eng=google&src=local', 'http://photos.mandarinoriental.com/is/image/MandarinOriental/tokyo-tapas-03?$SignatureRestaurantHero$&crop=3,140,1569,745', 6),
(40, 'CROWN', '"Crown" continues from the Old Palace hotel era, is a French restaurant of its founding in 1964. It has produced a virtuoso Alan Chapelle and Paul Bocuse of France culinary field, of France Vienne well-established store " La pyramid by" supervision, we are developing a "crown" original menu. While inheriting the Palace Hotel of tradition never ceased foodie who loves, you can enjoy the dishes of "Cuisine Modern" supreme which make up in a new sensibility that incorporates trends and ideas of the French local. The store is, the image of the evening dress, we become soft and elegant design that incorporates the curve. Dishes using luxury carefully selected materials of the four seasons, please enjoy all means to dress up.', 'Japan, 〒100-0005 Tokyo, Chiyoda, Marunouchi, 1−1, 6F Palace Hotel Tokyo', 4, 'http://www.palacehoteltokyo.com/restaurant/crown.php', 'http://en.palacehoteltokyo.com/wp-content/uploads/Palace-Hotel-Tokyo-F-Crown-Private-Dining-Room-460x340.jpg', 6),

(41, 'Meiji Shrine', 'Meiji Shrine, located in Shibuya, Tokyo, is the Shinto shrine that is dedicated to the deified spirits of Emperor Meiji and his wife, Empress Shōken.', '1-1 Yoyogikamizonocho, Shibuya, Tokyo 151-8557, Japan', 0, 'http://www.meijijingu.or.jp/', 'http://img.timeinc.net/time/photoessays/2009/tokyo/tokyo_meiji_tout_a.jpg', 6),
(42, 'Ueno Park', 'Ueno Park is a spacious public park in the Ueno district of Taitō, Tokyo, Japan. The park was established in 1873 on lands formerly belonging to the temple of Kan\'ei-ji.', 'Japan, 〒110-0007 Tokyo, 台東区上野公園・池之端三丁目', 0, 'http://www.kensetsu.metro.tokyo.jp/toubuk/ueno/index_top.html', 'http://www.japan-guide.com/g9/3019_12.jpg', 6),
(43, 'Tsukiji fish market', 'Sprawling wholesale fish market with an array of seafood & viewing areas for a popular tuna auction.', '5 Chome-2-1 Tsukiji, Chuo, Tokyo 104-0045, Japan', 1, 'http://www.tsukiji-market.or.jp/', 'http://www.japan-guide.com/g2/3021_03.jpg', 6),
(44, 'Tokyo National Museum', 'The Tokyo National Museum, or TNM, established in 1872, is the oldest Japanese national museum, the largest art museum in Japan and one of the largest art museums in the world.', '13-9 Uenokoen, Taito, Tokyo 110-8712, Japan', 0, 'http://www.tnm.jp/modules/r_guide/index.php?controller=top', 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Tokyo_National_Museum,_Honkan_2010.jpg', 6),
(45, 'Hamarikyu Gardens', 'Hamarikyu Gardens is a public park in Chūō, Tokyo, Japan. Located at the mouth of the Sumida River, it was opened April 1, 1946.', '1-1 Hamarikyuteien, Chuo, Tokyo 104-0046, Japan', 0, 'http://teien.tokyo-park.or.jp/contents/index028.html', 'http://www.japan-guide.com/g7/3025_11.jpg', 6),
(46, 'Tokyo Disneyland', 'Tokyo Disneyland is a 115-acre theme park at the Tokyo Disney Resort in Urayasu, Chiba, Japan, near Tokyo. Its main gate is directly adjacent to both Maihama Station and Tokyo Disneyland Station.', '1-1 Maihama, Urayasu, Chiba Prefecture 279-0031, Japan', 4, 'http://www.tokyodisneyresort.jp/tdl/index.html', 'http://sites.psu.edu/nkarafilis/wp-content/uploads/sites/31902/2015/11/tokyo.jpg', 6),

(47, 'Casey Neill & The Norway Rats', 'Casey Neill is an American musician. He leads Portland, Oregon-based band Casey Neill & The Norway Rats, singing with a raspy vocal quality and playing electric and acoustic guitars. Neill\'s style, folk-punk, mixes influences from punk, Celtic and folk music, and has been compared to R.E.M and The Pogues', 'Deseo (BIG BRIDGES)', 2, 'https://www.facebook.com/v2.1/dialog/oauth?client_id=123966167614127&redirect_uri=http%3A%2F%2Fwww.bandsintown.com%2Fevent%2F12653068%2Fbuy_tickets_callback%3Faffil_code%3Dfbjs_www.caseyneill.org%26app_id%3Dfbjs_www.caseyneill.org%26artist%3DCasey%2BNeill%2Band%2BThe%2BNorway%2BRats%26came_from%3D166&response_type=code&scope=email%2Cuser_likes%2Cuser_location%2Cuser_actions.music', 'http://www.caseyneill.org/pics/2013_2.jpg', 6),
(48, 'Rebecca Martin', 'Rebecca Martin is an American singer and songwriter from Rumford, Maine.', 'The University of Tokyo', 1, 'https://www.reverbnation.com/show/19758835?utm_campaign=HTML5_ShowSchedule_Widget_Details&utm_content=show_details_link&utm_medium=widget', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Rebecca_Martin_-_Jazz_Singer.jpg/220px-Rebecca_Martin_-_Jazz_Singer.jpg', 6),
(49, 'Cheap Trick', 'Cheap Trick is an American rock band from Rockford, Illinois, formed in 1973. As of 2016, the band currently consists of Robin Zander, Rick Nielsen, and Tom Petersson.', 'Studio Coast', 1, 'http://www.bandsintown.com/event/12689873/buy_tickets?affil_code=wpjs_www.cheaptrick.com&app_id=wpjs_www.cheaptrick.com&artist=Cheap%20Trick&came_from=166', 'http://img.wennermedia.com/article-leads-horizontal/rs-235725-R1259_FOB_Cheap_Trick_A.jpg', 6),

(50, 'Park Hotel Tokyo', 'Set in a bustling neighborhood, this upscale hotel is a 2-minute walk from Shinbashi Station, 1 km from Tsukiji fish market and 2 km from Tokyo Tower.', 'Japan, 〒105-7227 Tokyo, 港区Higashishinbashi, 1 Chome−7−1, 汐留メディアタワー', 2, 'http://parkhoteltokyo.com/', 'http://en.parkhoteltokyo.com/wp-content/uploads/sites/44/2014/12/ParkHotelTokyo-exterior1_1440x768.jpg', 6),
(51, 'Four Seasons Hotel Tokyo At Marunouchi', 'Within arm’s reach of Tokyo Station, Ginza and the Imperial Palace, Four Seasons Hotel Tokyo at Marunouchi presents its most intimate property. Each of our 57 Marunouchi boutique hotel rooms blends state-of-the-art convenience with timeless luxury. Our newly opened MOTIF Restaurant and Bar offers truly inspirational farm-to-table French cuisine, a gastronomic journey from early morning until midnight.', 'Japan, 〒100-6277 Tokyo, 千代田区Marunouchi, 1 Chome−11−1, パシフィックセンチュリープレイス丸の内', 4, 'http://www.fourseasons.com/tokyo/', 'http://enroute.aircanada.com/files/medias/thumb.940x470.hotelfourseasonstokyomarunouchi.jpg', 6),
(52, 'Hotel Villa Fontaine Tokyo Hatchobori', 'Set in a modern tower, this functional hotel is 2 km from Tsukiji fish market, a 3-minute walk from Kayabacho train station and 5 km from the Tokyo Imperial Palace.', ' Japan, 〒103-0025 Tokyo, Chuo, 日本橋茅場町3-3-3', 1, 'https://www.hvf.jp/hacchobori/', 'http://www.hvf.jp/eng/images/location/hatchobori-superior.jpg', 6),
(53, 'Cerulean Tower Tokyu Hotel', 'This upmarket high-rise hotel is 4.9 km from the Tokyo Tower and 9.2 km from the Imperial Palace.', '26-1 Sakuragaokacho, 渋谷区 Tokyo 150-8512, Japan', 3, 'https://www.ceruleantower-hotel.com/' , 'https://www.ceruleantower-hotel.com/en/img/index/mv_view03.jpg', 6),

(54, 'Carluccio\'s', 'Contemporary, white-walled chain Italian cafe-deli, with pastas, handmade focaccia and a kids\' menu.', '9 Garrick St, London WC2E 9BH, UK', 2, 'http://www.carluccios.com/', 'http://www.carluccios.com/getattachment/99b62c28-3ee9-4ae0-97dc-4a675604da07//Restaurants/London/Marylebone.aspx', 3),
(55, 'Prezzo', 'Casual Italian chain restaurant for stone-baked pizzas and classic pastas, plus separate kids\' menu.', '183-185 Eltham High St, London SE9 1TS, UK', 2, 'http://www.prezzorestaurants.co.uk/restaurant/eltham/', 'http://cdn.ltstatic.com/2013/May/LA715337_429long.jpg', 3),
(56, 'Garfunkel\'s', 'British and global comfort-food favourites fill the menu at this child-friendly chain eatery.', '2-3 Northumberland Ave, London WC2N 5BY, UK', 2, 'http://www.garfunkels.co.uk/', 'https://www.fluidnetwork.co.uk/gfx/venues/17257/garfunkels-american-diner-restaurant-london-soho.jpg', 3),
(57, 'Restaurant Gordon Ramsay', 'Ramsay\'s flagship where Clare Smyth coaxes polished French dishes from carefully chosen ingredients.', '68 Royal Hospital Rd, Chelsea, London SW3 4HP, UK', 4, 'https://www.gordonramsayrestaurants.com/restaurant-gordon-ramsay', 'http://www.elizabethonfood.com/files/Liesbeth%20Auerbach/image/gordonramsay2015/rhr.jpg', 3),

(58, 'Big Ben', 'Big Ben is the nickname for the Great Bell of the clock at the north end of the Palace of Westminster in London, and often extended to refer to the clock and the clock tower.', 'Westminster, London SW1A 0AA, UK', 0, 'http://www.parliament.uk/bigben', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Clock_Tower_-_Palace_of_Westminster,_London_-_May_2007.jpg/240px-Clock_Tower_-_Palace_of_Westminster,_London_-_May_2007.jpg', 3),
(59, 'Tower Bridge', 'Tower Bridge is a combined bascule and suspension bridge in London built in 1886–1894. The bridge crosses the River Thames close to the Tower of London and has become an iconic symbol of London.', 'Tower Bridge Rd, London SE1 2UP, UK', 0, 'http://www.towerbridge.org.uk/', 'https://upload.wikimedia.org/wikipedia/commons/4/44/Tower_Bridge_London_Feb_2006.jpg', 3),
(60, 'Tower of London', 'The Tower of London, officially Her Majesty\'s Royal Palace and Fortress of the Tower of London, is a historic castle located on the north bank of the River Thames in central London.', 'St Katharine\'s & Wapping, London EC3N 4AB, UK', 0, 'http://www.hrp.org.uk/tower-of-london/', 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Tower_of_London_viewed_from_the_River_Thames.jpg', 3),
(61, 'London Eye', 'The London Eye is a giant Ferris wheel on the South Bank of the River Thames in London. Also known as the Millennium Wheel, it has also been called by its owners the British Airways London Eye, then the Merlin Entertainments London Eye, then the EDF Energy London Eye. Since mid-January 2015, it has been known as the Coca-Cola London Eye, following an agreement signed in September 2014.', 'Lambeth, London SE1 7PB, UK', 2, 'https://www.londoneye.com/', 'https://upload.wikimedia.org/wikipedia/commons/b/b4/London_Eye_Twilight_April_2006.jpg', 3),
(62, 'Westminster Abbey', 'Westminster Abbey, formally titled the Collegiate Church of St Peter at Westminster, is a large, mainly Gothic abbey church in the City of Westminster, London, just to the west of the Palace of Westminster.', '20 Deans Yd, Westminster, London SW1P 3PA, UK', 1, 'http://www.westminster-abbey.org/', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/WestminsterAbbey-north-facade001m.jpg/191px-WestminsterAbbey-north-facade001m.jpg', 3),
(63, 'Hyde Park', 'Hyde Park is one of the largest parks in London and one of its Royal Parks. The park is the largest of four that form a chain from the entrance of Kensington Palace through Kensington Gardens and Hyde Park, via Hyde Park Corner and Green Park past the main entrance to Buckingham Palace and on through Saint James\'s Park to Horse Guards Parade in Whitehall. The park is divided by the Serpentine and the Long Water.', 'London W2 2UH, UK', 0, 'http://www.royalparks.org.uk/parks/hyde-park', 'http://vizts.com/wp-content/uploads/2016/03/hyde-park-london.jpg', 3),

(64, 'Hair by Sam McKnight', 'Sam McKnight is one of the most accomplished and well-respected hair stylists of his generation.', 'Strand London WC2R 1LA', 1, 'https://www.somersethouse.org.uk/', 'http://static.sammcknight.com//_tmp/full/portrait2.jpg', 3),
(65, 'Southbank Centre Winter Festival', 'Cider, carols and a Christmas market at the Southbank Winter Festival – it\'s all happening down by the river this winter.', 'Belvedere Rd, Lambeth, London SE1 8XX, UK', 0, 'http://www.timeout.com/london/things-to-do/southbank-centre-winter-festival-guide', 'http://www.culturewhisper.com/images/uploads/cw-8559.jpg', 3),
(66, 'Danny Howard', 'Danny Howard is a British dance music DJ, producer, and radio presenter, best known for presenting BBC Radio 1\'s Dance Anthems with Danny Howard Danny attended Edge Hill University, where he studied Sport and Exercise Science.', 'The Nest', 1, 'https://www.residentadvisor.net/event.aspx?892220', 'https://citiblogmk.files.wordpress.com/2014/06/danny-howard-press-5.jpg', 3),

(67, 'Park Plaza Westminster Bridge London', 'A 6-minute walk from Underground and National Rail trains at Waterloo station, this sleek hotel is a 12-minute walk from Westminster Abbey. ', '200 Westminster Bridge Rd, Lambeth, London SE1 7UT, UK', 2, 'https://www.parkplaza.com/london-hotel-gb-se1-7ut/gbwestmi', 'https://cache.carlsonhotels.com/ow-cms/pkp/images/hotels/GBWESTMI/NewCMS/Main_Photo_Gallery/Exterior2_650x370.jpg', 3),
(68, 'Bvlgari Hotel London', 'This sophisticated luxury hotel is a 3-minute walk from upscale shopping at Harrods and a 12-minute walk from the Victoria and Albert Museum.', '171 Knightsbridge, London SW7 1DW, UK', 4, 'https://www.bulgarihotels.com/en_US/london/the-hotel/overview', 'https://www.bulgarihotels.com/.imaging/bhr-960-jpg/dam/LONDON/THE-HOTEL/Hotel-Facade-Frontal.jpg/jcr%3Acontent', 3),
(69, 'Hotel 41', 'In an Edwardian building filled with original wood-panelling, opposite the side entrance to Buckingham Palace, this luxe hotel is a 5-minute walk from St James\'s Park.', '41 Buckingham Palace Rd, Westminster, London SW1W 0PS, UK', 3, 'https://www.41hotel.com/?utm_source=google&utm_medium=local&utm_campaign=41_hotel', 'http://q-ec.bstatic.com/images/hotel/840x460/137/13749962.jpg', 3),
(70, 'St Giles London - A St Giles Hotel', 'Located a block from the Tottenham Court Road tube station and shopping on Oxford Street, this functional hotel is also a 5-minute stroll from the British Museum.', 'Bedford Ave, Fitzrovia, London WC1B 3GH, UK', 1, 'http://www.stgiles.com/', 'http://www.stgiles.com/wp-content/uploads/2016/02/Reception-1024x614.jpg', 3),

(71, 'Eiffel Tower', 'Completed in 1889, this colossal landmark, although initially hated by many Parisians, is now a famous symbol of French civic pride.', '5 avenue Anatole France, 75007 Paris, France', 1, 'https://www.tripadvisor.com/Attraction_Review-g187147-d188151-Reviews-Eiffel_Tower-Paris_Ile_de_France.html', 'http://cdn.history.com/sites/2/2015/04/hith-eiffel-tower-iStock_000016468972Large.jpg', 4),
(72, 'Musee d\'Orsay', 'This beautiful museum, once a railroad station, now houses a staggering collection of Impressionist art, as well as other items created between 1848 and 1914. In 2011, the museum is running a renovation of the top floor (impressionist gallery). Only ground and medium floor are accessible. The top floor will re-open on the 20th of October. Meanwhile, some impressionist masterpieces are not visible.', '1, Rue de la Legion d\'Honneur, 75007 Paris, France', 3, 'https://www.tripadvisor.com/Attraction_Review-g187147-d188150-Reviews-Musee_d_Orsay-Paris_Ile_de_France.html', 'https://media-cdn.tripadvisor.com/media/photo-s/09/0e/76/f9/musee-d-orsay.jpg', 4),
(73, 'Musee du Louvre', 'Home to Leonardo da Vinci\'s Mona Lisa, the Louvre is considered the world\'s greatest art museum, with an unparalleled collection of items covering the full spectrum of art through the ages.', '99 rue de Rivoli, 75001 Paris, France', 2, 'https://www.tripadvisor.com/Attraction_Review-g187147-d188757-Reviews-Musee_du_Louvre-Paris_Ile_de_France.html', 'http://www.francetvinfo.fr/image/754twwlzh-d5f0/1500/843/5384127.jpg', 4),
(74, 'Notre Dame Cathedral', 'This famous cathedral, a masterpiece of Gothic architecture on which construction began in the 12th century, stands on the Île de la Cité and is the symbolic heart of the city.', '6 Parvis Notre-Dame | Place Jean-Paul II, 75004 Paris, France', 2, 'https://www.tripadvisor.com/Attraction_Review-g187147-d188679-Reviews-Notre_Dame_Cathedral-Paris_Ile_de_France.html', 'http://cdn.pcwallart.com/images/notre-dame-cathedral-wallpaper-2.jpg', 4),
(75, 'Luxembourg Gardens', 'These formal gardens, open to only royalty before the French Revolution, now serve as one of Paris\'s most popular destinations for relaxation.', 'Rue de Vaugirard, Boulevard St. Michel, Rue Auguste-Comte and Rue Guynemer | I iooll, 75006 Paris, France', 4, 'https://www.tripadvisor.com/Attraction_Review-g187147-d189687-Reviews-Luxembourg_Gardens-Paris_Ile_de_France.html', 'http://www.parisdigest.com/photos/luxembourg_paris.jpg', 4),
(76, 'Sainte-Chapelle', 'The Sainte-Chapelle is the finest royal chapel to be built in France and features a truly exceptional collection of stained-glass windows. It was built in the mid 13th century by Louis IX, at the heart of the royal residence, the Palais de la Cité. It was built to house the relics of the Passion of Christ. Adorned with a unique collection of fifteen glass panels and a large rose window forming a veritable wall of light,the Sainte-Chapelle is a gem of French Gothic architecture. Designated world heritage site by UNESCO. Open:> 1st March to 31st October: Monday to Friday: from 9.30 a.m. to 12.45 a.m. and to 2.15 p.m. to 6 p.m. Saturday and Sunday: from 9.30 a.m. to 6 p.m.> 1st November to 29th February: Monday to Friday: from 9 a.m. to 12.45 a.m. and to 2.15 p.m. to 5 p.m. Saturday and Sunday: from 9 a.m. to 5 p.m. Last admission 30 minutes before closing time. The best time to visit is in the morning from Tuesday to Friday. Closed:> 1st January, 1st May and 25th December and in case of negative temperatures.', '6, Boulevard du Palais, 75001 Paris, France', 1, 'https://www.tripadvisor.com/Attraction_Review-g187147-d190202-Reviews-Sainte_Chapelle-Paris_Ile_de_France.html', 'http://static.thousandwonders.net/Sainte-Chapelle.original.8622.jpg', 4),
(77, 'Arc de Triomphe', 'The Arc de triomphe was begun in 1806, on the orders of Napoleon I to honour the victories of his Grande Armée. Inspired by the great arches of antiquity, the monument combines the commemorative with the symbolic and it has always played a major role in the national republican consciousness. Every evening, the flame is lit on the tomb of the Unknown Soldier from the Great War. An exhibition portrays the history and explains its symbolic importance, nationally as well as internationally. The terrace provides superb views both by day and night across the city and its great sweeping avenues.-Opening hours : April to September: from 10 a.m. to 11 p.m.; October to March: from 10 a.m. to 10.30 p.m.-Closed: 1st January, 1st May, 8th May (morning), 14th July (morning), 11th November (morning), 25th December-Entry fees: Adults = 9,5 €; Concessions = 6 €; Free admission: 18-25 years old* (citizens of one of the 27 countries of the EU or are non-European permanent residents of France) * excluding school groups', 'The Arc de triomphe was begun in 1806, on the orders of Napoleon I to honour the victories of his Grande Armée. Inspired by the great arches of antiquity, the monument combines the commemorative with the symbolic and it has always played a major role in the national republican consciousness. Every evening, the flame is lit on the tomb of the Unknown Soldier from the Great War. An exhibition portrays the history and explains its symbolic importance, nationally as well as internationally. The terrace provides superb views both by day and night across the city and its great sweeping avenues.-Opening hours : April to September: from 10 a.m. to 11 p.m.; October to March: from 10 a.m. to 10.30 p.m.-Closed: 1st January, 1st May, 8th May (morning), 14th July (morning), 11th November (morning), 25th December-Entry fees: Adults = 9,5 €; Concessions = 6 €; Free admission: 18-25 years old* (citizens of one of the 27 countries of the EU or are non-European permanent residents of France) * excluding school groups', 1, 'https://www.tripadvisor.com/Attraction_Review-g187147-d188709-Reviews-Arc_de_Triomphe-Paris_Ile_de_France.html', 'http://static.thousandwonders.net/Arc.de.Triomphe.original.7168.jpg', 4),

(78, 'Boutary', 'Boutary is a chic and trendy "boutique bistro" with traditional French roots but a modern and affordable approach to gastronomic cuisine. High-end festive delicacies prepared by an expert chef and a short but exceptional selection of wines, champagne and vodkas are offered at reasonable prices. Caviar is one of the house\'s specialities: although not compulsory, we suggest you try a sampling or a small caviar dish to make your experience at Boutary truly unique.', '25 Rue Mazarine, 75006 Paris, France', 4, 'https://www.tripadvisor.com/Restaurant_Review-g187147-d9783452-Reviews-Boutary-Paris_Ile_de_France.html', 'http://www.luxemode.fr/2057356-3039.jpg?20160301', 4),
(79, 'La Petite Rose des Sables', 'Welcome to "la petite rose des sables", the warmest and most welcoming restaurant in Paris :) This family restaurant is very small (you can fit 6-10 people) and does not take reservations (especially through Hotels). The best way to eat there is to drop by and see if it\'s open / if there is space. Indeed, lots of friends come often so it can happen that there\'s birthdays, special reservations, etc. Due to popularity and for all the reasons above, Zouzou and Christian would like to host everyone but it is sometime impossible, try to be comprehensive and act with gentle manners. Moreover, we\'re very sorry for the people that were disappointed recently, Zouzou got her collarbone broken so the restaurant might be close from time to time with notice on the front door. Enjoy your stay in Paris Kind Regards - The little pink sands fan club', '6 rue de Lancry, 75010 Paris, France', 1, 'https://www.tripadvisor.com/Restaurant_Review-g187147-d3192219-Reviews-La_Petite_Rose_des_Sables-Paris_Ile_de_France.html', 'http://littlewanderings.com/wp-content/uploads/2014/09/Little-Wanderings-La-Petite-Rose-des-Sables-6-1024x767.jpg', 4),
(80, 'Roomies', 'At Epicure Eric Frechon has created a temple of gastronomy that is absolutely French, his signature style is all about terroir, a sense of place, this is after all Paris the gourmet capital of the world. Frechon also delights in matching unusual ingredients to astounding effect - vive la difference. His macaroni stuffed with black truffle, artichoke and duck foie gras, gratinéed with aged Parmesan is one of those unforgettable dishes people travel to Paris to experience. Frechon’s career began shucking oysters and today he holds the prestigious ‘Meilleur Ouvrier de France’ and three Michelin stars. Beyond the considerable talents of his right hand Franck Leroy, Epicure’s sommelier Bernard Neveu, Frechon is also keen to praise restaurant director Frédéric Kaiser; ‘he has rare savoir faire, he knows the produce, has technical ability and loves to host. Guests take a seat in Epicure and relax, while Frechon, Kaiser and the team stage a spectacular show. Epicure can be enjoyed every day of the year, with tables laid formally in an exquisite garden setting throughout the summer.', '112 rue du Faubourg Saint-Honore, 75008 Paris, France', 4, 'https://www.tripadvisor.com/Restaurant_Review-g187147-d719052-Reviews-Epicure-Paris_Ile_de_France.html', 'https://media-cdn.tripadvisor.com/media/photo-s/04/b5/a5/9b/epicure.jpg', 4),
(81, 'Loco', 'Gaspi, Ivan and Felipe are three boys from different backgrounds, united by their taste for good products, the Latin American culture, France in general and Paris in particular. Each brings his personal touch by mixing simplicity and joy.', '31 B rue du Faubourg Montmartre, 75009 Paris, France', 3, 'https://www.tripadvisor.com/Restaurant_Review-g187147-d10222301-Reviews-Loco-Paris_Ile_de_France.html', 'http://www.locolerestaurant.com/wp-content/uploads/2015/07/02_NOTRECARTE.jpg', 4),

(82, 'La Reserve Paris - Hotel and Spa', '', '42 avenue Gabriel, 75008 Paris, France', 4, 'https://www.tripadvisor.com/Hotel_Review-g187147-d497267-Reviews-La_Reserve_Paris_Hotel_and_Spa-Paris_Ile_de_France.html', 'https://f22bfca7a5abd176cefa-59c40a19620c1f22577ade10e9206cf5.ssl.cf1.rackcdn.com/849x498/la-reserve-paris-S-02-r.jpg', 4),
(83, 'Hotel Monge', '', '55 rue Monge, 75005 Paris, France', 3, 'https://www.tripadvisor.com/Hotel_Review-g187147-d10328342-Reviews-Hotel_Monge-Paris_Ile_de_France.html', 'http://d2ur0wk3vx7mcn.cloudfront.net/wcms/img/hotel-monge-deluxe-triple-sizel-451866-1600-1200.jpg', 4),
(84, 'Hotel Saint-Marc', '', '36 rue Saint Marc, 75002 Paris, France', 3, 'https://www.tripadvisor.com/Hotel_Review-g187147-d9865705-Reviews-Hotel_Saint_Marc-Paris_Ile_de_France.html', 'https://media-cdn.tripadvisor.com/media/photo-s/0a/b3/a4/e9/hotel-saint-mac.jpg', 4),
(85, 'Royal Wagram', '', '25 Boulevard Perreire-3 Cite de Pusy, 75017 Paris, France', 1, 'https://www.tripadvisor.com/Hotel_Review-g187147-d3367505-Reviews-Royal_Wagram-Paris_Ile_de_France.html', 'http://q-ec.bstatic.com/images/hotel/max400/143/14310076.jpg', 4), 
(86, 'Grand Hotel de l\'Europe', '', '74 boulevard de Strasbourg | 10th Arr., 75010 Paris, France', 1, 'https://www.tripadvisor.com/Hotel_Review-g187147-d604860-Reviews-Grand_Hotel_de_l_Europe-Paris_Ile_de_France.html', 'http://q-ec.bstatic.com/images/hotel/max400/382/3823211.jpg', 4),

(87, 'Moulin Rouge Show Paris', 'The Moulin Rouge is the number one show in Paris, if not the whole of Europe. No wonder it sells out quickly! Don\'t miss your chance to see the world-renowned showgirls and French Cancan dancers strut their stuff on the Moulin Rouge\'s historic stage', '82 Boulevard de Clichy, 75018 Paris, France', 2, 'https://www.tripadvisor.com/AttractionProductDetail?product=5022MOULIN&d=189283&aidSuffix=xsell&partner=Viator', 'http://globedancer.com/wp-content/uploads/Fa%C3%A7ade-Moulin-Rouge-HD-OK-%C2%A9-Francis-TheBlueRoom.small_.jpg', 4),
(88, 'Eiffel Tower, Paris Moulin Rouge Show and Seine River Cruise', 'Enjoy a memorable night out in Paris by combining a visit to the Eiffel Tower and Seine River cruise with a cabaret show at the Moulin Rouge. Enjoy dinner at the Eiffel Tower\'s 58 Tour Eiffel restaurant followed by a one-hour river cruise, or dine on board a Seine River dinner cruise followed by a 1-hour visit to the 2nd floor of the Eiffel Tower. Whichever option you choose, complete your night at the home of the Cancan, the famous Moulin Rouge in bohemian Montmartre.', '2 Rue des Pyramides, 75001 Paris, France', 2, 'https://www.tripadvisor.com/AttractionProductDetail?product=2050TEM&d=189283&aidSuffix=xsell&partner=Viator', 'http://cdn.history.com/sites/2/2015/04/hith-eiffel-tower-iStock_000016468972Large.jpg', 4),
(89, 'Moulin Rouge Paris Dinner and Show', 'Enjoy an evening dinner show at the Moulin Rouge the number one show in Paris. With a choice of three different dinner menus, don\'t miss your chance to see the world-renowned showgirls and French Cancan dancers strut their stuff on the Moulin Rouge\'s historic stage. Moulin Rouge Paris sells out months in advance, so book ahead to avoid disappointment.', '82 Boulevard de Clichy, 75018 Paris, France', 2, 'https://www.tripadvisor.com/AttractionProductDetail?product=5022MOUDIN&d=189283&aidSuffix=xsell&partner=Viator', 'http://globedancer.com/wp-content/uploads/Fa%C3%A7ade-Moulin-Rouge-HD-OK-%C2%A9-Francis-TheBlueRoom.small_.jpg', 4),
(90, 'Eiffel Tower Dinner, Seine River Cruise and Moulin Rouge Show by Minivan', 'Dine at 58 Tour Eiffel on the 1st floor of the Eiffel Tower to enjoy panoramic views of Paris followed by a romantic Seine river cruise. Finish the evening with a cabaret show at the famous Moulin Rouge.', '2 Rue des Pyramides, 75001 Paris, France', 4, 'https://www.tripadvisor.com/AttractionProductDetail?product=2050PLUSTM&d=189283&aidSuffix=xsell&partner=Viator', 'https://cache-graphicslib.viator.com/graphicslib/thumbs674x446/2050/SITours/eiffel-tower-dinner-seine-river-cruise-and-moulin-rouge-show-by-in-paris-117923.jpg', 4),

(91, 'Uma', '', 'Carrer de Provenca, 310, 08014 Barcelona, Spain', 4, 'https://www.tripadvisor.com/Restaurant_Review-g187497-d8003030-Reviews-Uma-Barcelona_Catalonia.html', 'https://media-cdn.tripadvisor.com/media/photo-s/09/25/0b/fb/photo1jpg.jpg', 5),
(92, 'Spoonik', '', 'Plaza Lesseps S/N, 08023 Barcelona, Spain', 4, 'https://www.tripadvisor.com/Restaurant_Review-g187497-d6278428-Reviews-Spoonik-Barcelona_Catalonia.html', 'http://fewvsmany.com/wp-content/uploads/2015/12/92307_9673.gl_-780x520.jpg', 5),
(93, 'The Box', '', 'Carrer D\'en Gignas 30, 08002 Barcelona, Spain', 1, 'https://www.tripadvisor.com/Restaurant_Review-g187497-d5820228-Reviews-The_Box-Barcelona_Catalonia.html', 'https://media-cdn.tripadvisor.com/media/photo-s/0c/c5/05/d2/20160830-195422-largejpg.jpg', 5),
(94, 'Intrepid De Gracia', '', 'Torrent De L\'olla 176 | Torrent De L\'olla 176, 08012 Barcelona, Spain', 2, 'https://www.tripadvisor.com/Restaurant_Review-g187497-d8535475-Reviews-Intrepid_De_Gracia-Barcelona_Catalonia.html', 'https://media-cdn.tripadvisor.com/media/photo-s/09/dc/2d/3c/celebracion-de-cumpleanos.jpg', 5),

(95, 'Mercer Hotel Barcelona', '', 'Calle dels Lledo 7, 08002 Barcelona, Spain', 4, 'https://www.tripadvisor.com/Hotel_Review-g187497-d3400654-Reviews-Mercer_Hotel_Barcelona-Barcelona_Catalonia.html', 'https://exp.cdn-hotels.com/hotels/6000000/5260000/5259000/5258906/44026ec9_z.jpg', 5),
(96, 'Hotel Primero Primera', '', 'C/ Doctor Carulla 25-29, 08017 Barcelona, Spain', 2, 'https://www.tripadvisor.com/Hotel_Review-g187497-d2367494-Reviews-Hotel_Primero_Primera-Barcelona_Catalonia.html', 'https://exp.cdn-hotels.com/hotels/6000000/5090000/5083400/5083318/5083318_85_z.jpg', 5),
(97, 'Hotel Climent', '', 'Gran Via Corts Catalanes 304, 08004 Barcelona, Spain', 1, 'https://www.tripadvisor.com/Hotel_Review-g187497-d651620-Reviews-Hotel_Climent-Barcelona_Catalonia.html', 'http://c.bpstatic.com/establishment/08/08/808/13_thumb.jpg', 5),

(98, 'Flamenco Night at Tablao Cordobes', 'Feel the passion of the flamenco at Barcelona\'s legendary Tablao Cordobes, where some of the greatest names in flamenco have performed. Entertained by an internationally renowned flamenco group, you\'ll discover why the traditional dance of Spain is so popular. You\'ll also have the option of dining on a traditional buffet meal or simply ordering a drink to enjoy while watching the show.', 'St Balmes, 5, 08007 Barcelona, Spain', 2, 'https://www.tripadvisor.com/AttractionProductDetail?product=2140FLAMENCO&d=1725621&aidSuffix=xsell&partner=Viator', 'https://cache-graphicslib.viator.com/graphicslib/thumbs674x446/2140/SITours/flamenco-night-at-tablao-cordobes-in-barcelona-115015.jpg', 5),
(99, 'Gran Festival Flamenco de Barcelona at Palau de la Música Catalana', 'Tablao Flamenco Cordobes pays tribute to one of the most important figures of the flamenco dance, Carmen Amaya, in the anniversary of her death and birth. This gypsy woman was born in the emigrant and gypsy neighborhood Somorrostro in Barcelona. She is the daughter of the dancer ‘La Faraona’ and the guitarist ‘El Chino’. She bent her career from the taverns of the fishing village to the President Roosevelt’s White House. The show is divided in three parts: ‘Lejanas Raíces’, ‘Carmen y su tiempo’ and ‘Lazos flamencos de Andalucía', 'La Rambla, 35 | Next to Palau Guell, 08001 Barcelona, Spain', 2, 'https://www.tripadvisor.com/AttractionProductDetail?product=17467P3&d=190824&aidSuffix=xsell&partner=Viator', 'https://cache-graphicslib.viator.com/graphicslib/thumbs674x446/17467/SITours/gran-festival-flamenco-de-barcelona-at-palau-de-la-m-sica-catalana-in-barcelona-224185.jpg', 5),
(100, 'Spanish Guitar Concert at the Palau de la Música Catalana in Barcelona', 'Let yourself be seduced by the Maestros de la Guitarra festival which has been seen by 850.000 people and currently is at its 15th season. Internationally praised guitarists interpret pieces written by some of the greatest composers of all time such as Francisco Tárrega, Joaquín Rodrigo, Isaac Albéniz and Manuel de Falla, transporting the audience to different corners of Spain.', 'Avinguda Francesc Cambo, 17 6 A, 08003 Barcelona, Spain', 2, 'https://www.tripadvisor.com/AttractionProductDetail?product=9158P2&d=4187211&aidSuffix=xsell&partner=Viator', 'https://cache-graphicslib.viator.com/graphicslib/thumbs674x446/9158/SITours/spanish-guitar-concert-at-the-palau-de-la-m-sica-catalana-in-barcelona-in-barcelona-234530.jpg', 5),

(101, 'Basilica of the Sagrada Familia', '', 'Carrer de Mallorca, 401, 08013 Barcelona, Spain', 1, 'https://www.tripadvisor.com/Attraction_Review-g187497-d190166-Reviews-Basilica_of_the_Sagrada_Familia-Barcelona_Catalonia.html', 'https://i.ytimg.com/vi/-MN8lI4r7dc/maxresdefault.jpg', 5),
(102, 'Casa Batllo', '', 'Passeig de Gracia, 43, 08007 Barcelona, Spain', 2, 'https://www.tripadvisor.com/Attraction_Review-g187497-d191052-Reviews-Casa_Batllo-Barcelona_Catalonia.html', 'https://media-cdn.tripadvisor.com/media/photo-s/09/24/b9/81/casa-batllo.jpg', 5),
(103, 'Palau de la Musica Orfeo Catala', '', 'Carrer Palau de la Musica, 4-6, 08003 Barcelona, Spain', 2, 'https://www.tripadvisor.com/Attraction_Review-g187497-d190824-Reviews-Palau_de_la_Musica_Orfeo_Catala-Barcelona_Catalonia.html', 'https://media-cdn.tripadvisor.com/media/photo-w/07/7e/c5/4f/palau-de-la-musica-orfeo.jpg', 5),
(104, 'Gothic Quarter (Barri Gotic)', '', 'Mediterranean Seafront to Ronda de Sant Pere, Ciutat Vella, 08002 Barcelona, Spain', 2, 'https://www.tripadvisor.com/Attraction_Review-g187497-d190162-Reviews-Gothic_Quarter_Barri_Gotic-Barcelona_Catalonia.html', 'http://ob9a8415roh4djoj110c31a1.wpengine.netdna-cdn.com/wp-content/uploads/2013/02/gothic-quarter.jpg', 5),
(105, 'The Basilica of Santa Maria del Mar', '', 'Placa Santa Maria 1, 08003 Barcelona, Spain', 1, 'https://www.tripadvisor.com/Attraction_Review-g187497-d246171-Reviews-The_Basilica_of_Santa_Maria_del_Mar-Barcelona_Catalonia.html', 'http://media.ruebarue.com/photos/places/4910609250385920/1-the-basilica-of-santa-maria-del-mar-1.jpg', 5),
(106, 'La Pedrera', '', 'Calle Paseo de Gracia, 92, 08012 Barcelona, Spain', 2, 'https://www.tripadvisor.com/Attraction_Review-g187497-d190629-Reviews-La_Pedrera-Barcelona_Catalonia.html', 'https://media-cdn.tripadvisor.com/media/photo-o/05/37/d2/39/la-pedrera-casa-mila.jpg', 5),
(107, 'Palau Guell', '', 'Carrer Nou de la Rambla 3-5, 08001 Barcelona, Spain', 3, 'https://www.tripadvisor.com/Attraction_Review-g187497-d295879-Reviews-Palau_Guell-Barcelona_Catalonia.html', 'https://media-cdn.tripadvisor.com/media/photo-o/08/7c/2c/0a/palau-guell.jpg', 5),
(108, 'CosmoCaixa Barcelona', '', 'Isaac Newton, 26, 08022 Barcelona, Spain', 3, 'https://www.tripadvisor.com/Attraction_Review-g187497-d244211-Reviews-CosmoCaixa_Barcelona-Barcelona_Catalonia.html', 'https://media-cdn.tripadvisor.com/media/photo-w/02/2f/9b/b2/science-museum-museu.jpg', 5);

INSERT INTO landmarks(landmark_cost, place_id) VALUES
(12.00, 1),
(0, 2),
(12.00, 3),
(0, 4),
(0, 5),
(14.00, 6),
(16.00, 7),
(0, 20),
(75.00, 21),
(50.00, 22),
(13.00, 23),
(0, 24),
(0, 41),
(0, 42),
(5.99, 43),
(0, 44),
(0, 45),
(95.00, 46),
(0, 58),
(0, 59),
(0, 60),
(40.00, 61),
(22.00, 62),
(95.00, 63),
(11.00, 71),
(12.00, 72),
(9.00, 73),
(10.00, 74),
(0.00, 75),
(10.00, 76),
(9.50, 77),
(24.00, 101),
(27.50, 102),
(18.00, 103),
(0.00, 104),
(8.00, 105),
(20.50, 106),
(12.00, 107),
(4.00, 108);

INSERT INTO restaurants(restaurant_cuisine_type, place_id) VALUES
('Italian', 8),
('Italian', 9),
('Italian', 10),
('Seafood', 11),
('Italian', 12),
('Italian', 25),
('American', 26),
('Greek', 27),
('Italian', 28),
('American', 29),
('Asian', 37),
('Asian', 38),
('Asian', 38),
('Asian', 40),
('Italian', 54),
('Italian', 55),
('Italian', 56),
('French', 57),
('French', 78),
('French', 79),
('American', 80),
('South American', 81),
('International', 91),
('Mediterranean', 92),
('Latin', 93),
('International', 84);

INSERT INTO events(event_date, event_cost, place_id) VALUES
('2016-11-19', 30.00, 17),
('2016-11-20', 45.00, 18),
('2016-11-22', 30.00, 19),
('2016-11-19', 75.00, 34),
('2016-11-18', 75.00, 35),
('2016-11-16', 50.00, 36),
('2016-11-16', 20.00, 47),
('2016-11-08', 15.00, 48),
('2016-11-16', 25.00, 49),
('2016-11-16', 20, 64),
('2017-01-20', 0, 65),
('2016-11-16', 10, 66),
('2016-12-23', 122.54, 87),
('2016-11-28', 279.00, 88),
('2017-01-09', 190.38, 89),
('2016-12-25', 366.53, 90),
('2016-12-02', 48.14, 98),
('2017-01-01', 42.67, 99),
('2016-12-14', 42.67, 100);

INSERT INTO hotels(place_id) VALUES
(13),
(14),
(15),
(16),
(30),
(31),
(32),
(33),
(50),
(51),
(52),
(53),
(67),
(68),
(69),
(70),
(95),
(96),
(97),
(82),
(93),
(84),
(85),
(86);

INSERT INTO city_images(image_id, image_path, image_caption, image_type, image_city_id) VALUES
(1, 'https://lonelyplanetimages.imgix.net/mastheads/stock-photo-roman-sunset-77415821.jpg?sharp=10&vib=20&w=1200', '', 'hero', 1),
(2, 'https://lonelyplanetimages.imgix.net/a/g/hi/t/9cf024dfd5c0bcb2b17f4785340145ea-san-francisco.jpg?sharp=10&vib=20&w=1200', '', 'hero', 2),
(3, 'https://media.timeout.com/images/100644443/image.jpg', '', 'hero', 3),
(4, 'http://handluggageonly.co.uk/wp-content/uploads/2016/01/Paris-3.jpg', '', 'hero', 4),
(5, 'http://happypeoplebarcelona.com/wp-content/uploads/2016/04/happy-people-barcelona-11.jpg', '', 'hero', 5),
(6, 'http://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/tokyo-mud-bath-bar-mudbath0716.jpg?itok=dJ8lDXJh', '', 'hero', 6);

INSERT INTO interest_types(interest_description) VALUES
('History'),
('Scenic'),
('Sports'),
('City Life');

INSERT INTO admins(admin_name, admin_username, admin_password) VALUES
('Admin', 'admin', 'admin');