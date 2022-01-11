# neo4j

MATCH (t: NationalTeam)<-[: REPRESENTS]-(p: Player)-[: PLAYS_FOR]->(c: Club) 
WHERE t.country = c.country 
WITH collect(p.name) as players, count(p) as length,c 
WHERE length >= 7 
RETURN c.name AS club, players, length, c.country

/

MATCH (c: Club)-[rel: PLAYS_FOR]-(p: Player)-[: REPRESENTS]-(t: NationalTeam) 
WHERE NOT c.country = t.country 
WITH collect(DISTINCT p.name) AS represants, c.name AS `club name`, t.country AS `country name`, count(p) AS number 
RETURN `club name`, represants, `country name` 
ORDER BY number DESC 
LIMIT 4

MATCH (c: Club)-[rel: PLAYS_FOR]-(p: Player)-[: REPRESENTS]-(t: NationalTeam) 
WHERE NOT c.country = t.country 
WITH count(p) AS players, c, t
WITH MAX(players) AS maximum
MATCH (c: Club)-[rel: PLAYS_FOR]-(p: Player)-[: REPRESENTS]-(t: NationalTeam) 
WHERE NOT c.country = t.country 
WITH collect(DISTINCT p.name) AS represants, c.name AS `club name`, t.country AS `country name`, count(p) AS number, maximum
WHERE number = maximum
RETURN `club name`, represants, `country name` ORDER BY `club name`

/

MATCH (t: NationalTeam {country: "England"})-[: REPRESENTS]-(p: Player)-[: PLAYS_FOR]-(c: Club)-[: PLAYS_FOR]-(p2: Player)-[: REPRESENTS]-(t2: NationalTeam) 
WITH collect(t2.country) AS countries MATCH (t3: NationalTeam) 
WHERE NONE(country IN countries WHERE t3.country = country) 
RETURN t3.country AS countries
