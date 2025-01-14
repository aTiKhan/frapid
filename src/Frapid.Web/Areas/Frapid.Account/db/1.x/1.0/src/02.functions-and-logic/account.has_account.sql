DROP FUNCTION IF EXISTS account.has_account(_email national character varying(100));

CREATE FUNCTION account.has_account(_email national character varying(100))
RETURNS bool
AS
$$
    DECLARE _count                          integer;
BEGIN
    SELECT count(*) INTO _count FROM account.users WHERE lower(email) = LOWER(_email);
    RETURN COALESCE(_count, 0) = 1;
END
$$
LANGUAGE plpgsql;
