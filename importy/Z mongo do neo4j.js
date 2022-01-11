// const mongoose = require("mongoose");
// const neo4j = require("neo4j-driver");

// const dbConnDataMongo = {
//   host: "127.0.0.1",
//   port: 27017,
//   database: "kolokwium",
// };

// const dbConnDataNeo = {
//   uri: "bolt://localhost:7687",
//   user: "neo4j",
//   password: "s3cr3t",
// };

// const { Schema, model } = mongoose;

// const personSchema = new Schema(
//   {
//     id: Number,
//     name: String,
//     sex: String,
//     father: Number,
//     mother: Number,
//   },
//   { collection: "dokumenty" }
// );

// const Person = model("Person", personSchema);

// mongoose
//   .connect(
//     `mongodb://${dbConnDataMongo.host}:${dbConnDataMongo.port}/${dbConnDataMongo.database}`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(async (response) => {
//     const documents = await Person.find({});
//     const driver = neo4j.driver(
//       dbConnDataNeo.uri,
//       neo4j.auth.basic(dbConnDataNeo.user, dbConnDataNeo.password),
//       { disableLosslessIntegers: true }
//     );
//     importFiles(documents, driver);
//   })
//   .catch((error) => console.error("Error connecting to MongoDB", error));

// const importFiles = async (documents, neoDriver) => {
//   // TWORZENIE NODOW
//   let licznik= 0;
//   for (const document of documents) {
//     licznik += 1;
//     const session = neoDriver.session();
//     const { id, name, sex } = document;
//     const query = "MERGE (p:Person {id: $idParam, name: $nameParam, sex: $sexParam}) RETURN p";
//     await session.run(query, {
//       idParam: id,
//       nameParam: name,
//       sexParam: sex,
//     });
//     if (licznik % 1000 === 0) console.log(licznik);
//   }
//   counter = 0;
//   // TWORZENIE POWIAZAN
//   for (const document of documents) {
//     counter += 1;
//     const sessionMother = neoDriver.session();
//     const sessionFather = neoDriver.session();
//     const { id, father, mother } = document;
//     const queryFather =
//       "MATCH (p:Person {id: $idFather}), (child:Person {id: $idChild}) MERGE (child)-[r:FATHER]->(p) RETURN child, type(r), p";
//     await sessionFather.run(queryFather, {
//       idFather: father,
//       idChild: id,
//     });
//     const queryMother =
//       "MATCH (p:Person {id: $idMother}), (child:Person {id: $idChild}) MERGE (child)-[r:MOTHER]->(p) RETURN child, type(r), p";
//     await sessionMother.run(queryMother, {
//       idMother: mother,
//       idChild: id,
//     });
//     if (counter % 100 === 0 )console.log(counter);
//     sessionFather.close();
//     sessionMother.close();
//   }
// };
const mongoose = require('mongoose');
const driver = require('./bazaNeo4j');

const dbConnDataMongo = {
  host: '127.0.0.1',
  port: 27017,
  database: 'kolokwium'
};

const userSchema = new mongoose.Schema({
  id: Number,
  father: Number,
  mother: Number,
  name: String,
  sex: String
}, {collection: 'dokumenty'});

const User = mongoose.model('User', userSchema);

mongoose
  .connect(`mongodb://${dbConnDataMongo.host}:${dbConnDataMongo.port}/${dbConnDataMongo.database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
  })
  .then(async () => {
      const users = await User.find();

      const session = driver.session();
      await session.writeTransaction(tx => {
          users.forEach((user, index) => {
              tx.run("CREATE (p:Person {id: $id, name: $name, sex: $sex, father: $father, mother: $mother})", {
                  id: user.id,
                  name: user.name,
                  sex: user.sex,
                  father: user.father,
                  mother: user.mother
              })
              console.log(index);
            })
      });
      await session.run("CREATE INDEX PersonId FOR (p:Person) ON (p.id)");
      await session.run("MATCH (p: Person), (f: Person {id: p.father}) CREATE (f)-[: IS_FATHER]->(p)");
      await session.run("MATCH (p: Person), (m: Person {id: p.mother}) CREATE (m)-[: IS_MOTHER]->(p)");
      console.log('completed')
      await session.close()
      process.exit(0)

  })
  .catch(error => console.error('Error connecting to MongoDB', error));

