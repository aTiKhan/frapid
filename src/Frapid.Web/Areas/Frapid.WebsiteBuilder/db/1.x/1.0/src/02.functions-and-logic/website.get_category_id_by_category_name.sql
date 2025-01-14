DROP FUNCTION IF EXISTS website.get_category_id_by_category_name(_category_name text);

CREATE FUNCTION website.get_category_id_by_category_name(_category_name text)
RETURNS integer
AS
$$
BEGIN
    RETURN category_id
    FROM website.categories
    WHERE category_name = _category_name;
END
$$
LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS website.get_category_id_by_category_alias(_alias text);

CREATE FUNCTION website.get_category_id_by_category_alias(_alias text)
RETURNS integer
AS
$$
BEGIN
    RETURN category_id
    FROM website.categories
    WHERE alias = _alias;
END
$$
LANGUAGE plpgsql;