const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide at least the password as an argument: node mongo.js <password>"
  );
  process.exit();
}

if (process.argv.length === 3) {
  console.log(
    `Only the password ${process.argv[2]} was provided, showing all elements in the database`
  );
  showNames();
} else if (process.argv.length < 5) {
  console.log(
    "You must include a message: node mongo.js <password> <name> <number>"
  );
  process.exit();
} else {
  console.log(`Saving entry to the database...`);
  addName();
}

function addName() {
  const dbName = "phonebook-app";
  const password = process.argv[2];
  const _name = process.argv[3];
  const _number = process.argv[4];

  const url = `mongodb+srv://fullstack:${password}@cluster0.9m5yr.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  mongoose.connect(url);

  const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
  });

  const Person = mongoose.model("Person", personSchema);

  const person = new Person({
    name: _name,
    number: _number,
  });

  person.save().then((result) => {
    console.log(`added ${_name} number ${_number} to phonebook`);
    mongoose.connection.close();
  });
}

function showNames() {
  const dbName = "phonebook-app";
  const password = process.argv[2];
  // const _name = process.argv[3];
  // const _number = process.argv[4];

  const url = `mongodb+srv://fullstack:${password}@cluster0.9m5yr.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  mongoose.connect(url);

  const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
  });

  const Person = mongoose.model("Person", personSchema);

  // const person = new Person({
  //   name: _name,
  //   number: _number,
  // });

  Person.find({}).then((persons) => {
    console.log("phonebook: ");
    persons.map((p) => {
      console.log(`${p.name} ${p.number}`);
    });
    mongoose.connection.close();
  });
}
