require("dotenv").config();
const express = require("express");
// const morgan = require("morgan");
const PORT = process.env.PORT || 3001; // Heroku sets up process.env.PORT
const app = express();
const Person = require("./models/person");

let persons = [
  {
    id: 1,
    name: "Not on MongoDB Yet!",
    number: "",
  },
  {
    id: 2,
    name: "Try something else :3",
    number: "",
  },
];

//////////// Middleware ///////////////
app.use(express.static("build"));
app.use(express.json());

// Logging requests to console
// morgan.token("content", (req) => {
//   return JSON.stringify(req.body.content);
// });
// app.use(
//   morgan(
//     ":method :url :status :res[content-length] :response-time - ms :content"
//   )
// );
//

///////// REST ENDPOINTS ////////////////

// Serve the frontend client
app.get("/", (request, response) => {
  /// We shouldn't see this message, as express should instead serve the built React frontend.
  response.send("Please use '/api/persons' to interact with this app");
});

// Get all persons
app.get("/api/persons", (request, response) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => {
      console.log("Could not recover persons from MongoDB", error.message);
    });
});

// Add a new person
app.post("/api/persons", (request, response) => {
  //   const newId = Math.max(...persons.map((p) => p.id)) + 1;
  const content = request.body.content;
  // console.log(content);
  if (content === undefined) {
    return response.status(400).send(`Bad Request: No content`);
  } else if (content.name === undefined || content.number === undefined) {
    return response
      .status(400)
      .send("Bad Request: must include both a name and a number");
  }

  const newPerson = new Person({
    name: request.body.content.name,
    number: request.body.content.number,
  });

  newPerson
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => {
      console.log("Error saving a new person", error.message);
    });

  //   persons = persons.concat(newPerson);
  //   // console.log(persons);
  //   response.send(newPerson);
});

// Get person by id
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const requestedPerson = persons.find((p) => p.id === id);
  // console.log(requestedPerson);
  if (requestedPerson === undefined) {
    return response
      .status(400)
      .send(`Bad Request: There is no person with id ${id}`);
  }

  response.json(persons.find((p) => p.id === id));
});

// Delete person by id
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const requestedPerson = persons.find((p) => p.id === id);
  if (requestedPerson === undefined) {
    return response
      .status(400)
      .send(`Bad Request: There is no person with id ${id}`);
  }

  persons = persons.filter((p) => p.id !== id);

  response.status(200).end();
});

// Update person by id
app.put("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const requestedPerson = persons.find((p) => p.id === id);
  if (requestedPerson === undefined) {
    console.log("Bad request: there is no such id. Check your frontend code!");
    return response
      .status(400)
      .send(`Bad Request: There is no person with id ${id}`);
  }
  const content = request.body.content;
  // console.log(content);
  if (content === undefined) {
    return response.status(400).send(`Bad Request: No content`);
  } else if (content.name === undefined || content.number === undefined) {
    return response
      .status(400)
      .send("Bad Request: must include both a name and a number");
  }

  const newPerson = {
    name: request.body.content.name,
    number: request.body.content.number,
    id: id,
  };

  persons = persons.map((p) => (id === p.id ? newPerson : p));
  response.json(persons.find((p) => p.id === id));
});

// Info ???
app.get("/info", (request, response) => {
  const currentDate = new Date();
  response.send(`
    <div>
        <h3>Phonebook has info for ${persons.length} people</h3>
        <p>${currentDate}</p>
    </div>`);
});

///// HANDLE UNKNOWN ENDPOINT //////////////

const unknowEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknowEndpoint);

/////// INIT SERVER ///////////////////////

app.listen(PORT, () => {
  console.log(`Server initiated at http://localhost:${PORT}`);
});
