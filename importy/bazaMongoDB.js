const dbConnDataMongo = {
    host: '127.0.0.1',
    port: 27017,
    database: 'kolokwium'
};

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    id: Number,
    father: Number,
    mother: Number,
    name: String,
    sex: String
}, {collection: 'dokumenty2'});
const User = mongoose.model('User', userSchema);

const dbConnDataNeo = {
    uri: 'bolt://localhost:7687',
    user: 'neo4j',
    password: 's3cr3t',
};
const neo4j = require('neo4j-driver');
const driver = neo4j.driver(dbConnDataNeo.uri, neo4j.auth.basic(dbConnDataNeo.user, dbConnDataNeo.password), {disableLosslessIntegers: true });

mongoose
    .connect(`mongodb://${dbConnDataMongo.host}:${dbConnDataMongo.port}/${dbConnDataMongo.database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(async () => {
        const session = driver.session()

        const test = await session.run("MATCH (p: Player) OPTIONAL MATCH (m:Person)<-[:MOTHER]-(p)-[:FATHER]->(f:Person) RETURN m.id as mi, p, f.id as fi")
        const testCorrect = test.records.map(record => ({
            ...record.get('p').properties,
            father: record.get('fi'),
            mother: record.get('mi')
        }));
        await session.close();

        await User.insertMany(testCorrect)
        console.log('completed')

        process.exit(0)

    })
    .catch(error => console.error('Error connecting to MongoDB', error));