require("dotenv").config();
const express = require("express");
// const morgan = require("morgan");
const PORT = process.env.PORT || 3001; // Heroku sets up process.env.PORT
const app = express();
const Person = require("./models/person");

//////////// Middleware ///////////////
app.use(express.static("build"));
// app.use(cors)
app.use(express.json());

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
});

// Get person by id ********** (verify with postman)
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

// Delete person by id ********** (verify with client)
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

// Update person by id ************** (verify with client)
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

// Info {from exercise 3.2} *********** (verify with postman)
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

/////// ERROR HANDLING ///////////// ********** (add to endpoints)
const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).end(); // how do i implement this generically ???
  }

  next(error);
};

app.use(errorHandler);
/////// INIT SERVER ///////////////////////

app.listen(PORT, () => {
  console.log(`Server initiated at http://localhost:${PORT}`);
});
