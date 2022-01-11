const neo4j = require('neo4j-driver');
const mongoose = require('mongoose');
const { model } = require('mongoose');

const dbConnDataNeo = {
    uri: 'bolt://localhost:7687',
    user: 'neo4j',
    password: 's3cr3t',
};

const dbConnDataMongo = {
    host: '127.0.0.1',
    port: 27017,
    database: 'kolokwium-2'
};

const driver = neo4j.driver(dbConnDataNeo.uri, neo4j.auth.basic(dbConnDataNeo.user, dbConnDataNeo.password), {disableLosslessIntegers: true });

countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    }
});

playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    playsFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    },
    represents: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    }
});

const Country = mongoose.model('Country', countrySchema);
const Club = mongoose.model('Club', clubSchema);
const Player = mongoose.model('Player', playerSchema);

mongoose
    .connect(`mongodb://${dbConnDataMongo.host}:${dbConnDataMongo.port}/${dbConnDataMongo.database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(async () => {
        const session = driver.session();

        const countries = await session.run("MATCH (c: Club) RETURN DISTINCT c.country ");
        const restCountries = await session.run("MATCH (c: Club) WITH collect(c.country) AS countries MATCH (t: NationalTeam) WHERE NONE(country IN countries WHERE t.country = country) RETURN DISTINCT t.country")
        const clubs = await session.run("MATCH (c: Club) RETURN c, c.country AS clubCountry, c.name AS clubName, c.id AS clubId");
        const players = await session.run("MATCH (c: Club)-[: PLAYS_FOR]-(p: Player)-[: REPRESENTS]-(t: NationalTeam) RETURN p.name AS player, t.country AS countryName, c.name AS clubName");
        
        const insertCountries = countries.records.map((record) => ({
            name: record.get("c.country")
        }));
        await Country.insertMany(insertCountries);

        const insertRestCountries = restCountries.records.map(record => ({
            name: record.get("t.country")
        }));
        console.log(insertRestCountries);
        await Country.insertMany(insertRestCountries);

        const insertClubs = clubs.records.map(async record => {
            const countryId = await Country.findOne({name: record.get('clubCountry')});
            return {
                ...record.get('c').properties,
                name: record.get("clubName"),
                country: countryId._id
            } 
        });
        const promise = await Promise.all(insertClubs);
        await Club.insertMany(promise);

        const insertPlayers = players.records.map(async record => {
            const clubId = await Club.findOne({name: record.get('clubName')});
            const countryId = await Country.findOne({name: record.get('countryName')});
            // if (countryId === null) {
            //     console.log(record.get("countryName"));
            // }
            return {
                ...record.get('player').properties,
                name: record.get("player"),
                playsFor: clubId._id,
                represents: countryId._id
            }
        });
        const promisePlayers = await Promise.all(insertPlayers);
        console.log(promisePlayers);
        await Player.insertMany(promisePlayers);

        await session.close();

        console.log('Data has been successfully saved in kolokwium-2');
    })
    .catch(error => console.error('Error connecting to MongoDB', error));

// module.exports = {Country: model(Country, countrySchema), Club: model(Club, clubSchema), Player: model(Player, playerSchema)};
