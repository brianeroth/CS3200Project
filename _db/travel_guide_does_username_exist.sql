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
