// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
//
// const url = 'mongodb://localhost/';
//
// MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
//     assert.strictEqual(err, null);
//     console.log("Połączono z bazą.");
//
//     const collection = client.db('kolokwium').collection('dokumenty');
//
//     collection
//         .find().toArray()
//         .then((docs) => {
//             console.log(docs)
//         })
//         .catch(err => console.error(err))
// });

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
}, {collection: 'dokumenty'});
const User = mongoose.model('User', userSchema);

const dbConnDataNeo = {
    uri: 'bolt://localhost:7687',
    user: 'neo4j',
    password: 's3cr3t',
};
const neo4j = require('neo4j-driver')
const driver = neo4j.driver(dbConnDataNeo.uri, neo4j.auth.basic(dbConnDataNeo.user, dbConnDataNeo.password), {disableLosslessIntegers: true })

mongoose
    .connect(`mongodb://${dbConnDataMongo.host}:${dbConnDataMongo.port}/${dbConnDataMongo.database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(async () => {
        const users = await User.find()

        const session = driver.session()
        await session.writeTransaction(tx => {
            users.forEach((user, index) => {
                tx.run("create (p:Person {id: $id, name: $name, sex: $sex, father: $father, mother: $mother})", {
                    id: user.id,
                    name: user.name,
                    sex: user.sex,
                    father: user.father,
                    mother: user.mother
                })
                console.log(index)
            })
        })
        // gotta go fast
        // await session.run("CREATE INDEX PersonId FOR (p:Person) ON (p.id)")
        await session.run("MATCH (p:Person), (f:Person {id:p.father}), (m:Person {id:p.mother}) CREATE (f)<-[:FATHER]-(p)-[:MOTHER]->(m)")
        console.log('completed')
        await session.close()
        process.exit(0)

    })
    .catch(error => console.error('Error connecting to MongoDB', error));