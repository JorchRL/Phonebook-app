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
app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => {
      // console.log("Could not recover persons from MongoDB", error.message);
      next(error);
    });
});

// Add a new person
app.post("/api/persons", (request, response, next) => {
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
      // console.log("Error saving a new person", error.message);
      next(error);
    });
});

// Get person by id
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      // console.log(error);
      // response.status(500).end();
      next(error);
    });
});

// Delete person by id
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findOneAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// Update person by id
app.put("/api/persons/:id", (request, response, next) => {
  const content = request.body.content;
  if (content === undefined) {
    return response.status(400).send(`Bad Request: No content`);
  } else if (content.name === undefined || content.number === undefined) {
    return response
      .status(400)
      .send("Bad Request: must include both a name and a number");
  }

  const newPerson = {
    name: content.name,
    number: content.number,
  };

  Person.findByIdAndUpdate(request.params.id, newPerson, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

// Info {from exercise 3.2}
app.get("/info", async (request, response, next) => {
  const currentDate = new Date();
  const numPersons = await Person.find({})
    .then((persons) => persons.length)
    .catch((error) => next(error));
  response.send(`
    <div>
        <h3>Phonebook has info for ${numPersons} people</h3>
        <p>${currentDate}</p>
    </div>`);
});

///// HANDLE UNKNOWN ENDPOINT //////////////

const unknowEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
  next();
};

app.use(unknowEndpoint);

/////// ERROR HANDLING ///////////// ********** (add to endpoints)
const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).end(); // how do i implement this generically ???
  }

  reponse.status(500).end();

  next(error);
};

app.use(errorHandler);
/////// INIT SERVER ///////////////////////

app.listen(PORT, () => {
  console.log(`Server initiated at http://localhost:${PORT}`);
});
