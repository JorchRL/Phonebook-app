const express = require("express");
const morgan = require("morgan");
const PORT = process.env.PORT || 3001; // Heroku sets up process.env.PORT
const app = express();

let persons = [
    {
        id: 1,
        name: "Pelos el Gato",
        number: "",
    },
    {
        id: 2,
        name: "Patiti Pulgosa",
        number: "",
    },
];

/// Middleware
app.use(express.static("build"));
app.use(express.json());

/// Logging requests to console
morgan.token("content", (req) => {
    return JSON.stringify(req.body.content);
});
app.use(morgan(":method :url :status :res[content-length] :response-time - ms :content"));

//// REST Endpoints

app.get("/", (request, response) => {
    /// We shouldn't see this message, as express should instead serve the built React frontend.
    response.send("Please use '/api/persons' to interact with this app");
});

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.post("/api/persons", (request, response) => {
    const newId = Math.max(...persons.map((p) => p.id)) + 1;
    const content = request.body.content;
    // console.log(content);
    if (content === undefined) {
        return response.status(400).send(`Bad Request: No content`);
    } else if (content.name === undefined || content.number === undefined) {
        return response.status(400).send("Bad Request: must include both a name and a number");
    } else if (persons.find((p) => p.name === content.name)) {
        return response.status(400).json({ error: "name must be unique" });
    }

    const newPerson = {
        name: request.body.content.name,
        number: request.body.content.number,
        id: newId,
    };

    persons = persons.concat(newPerson);
    // console.log(persons);
    response.send(newPerson);
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const requestedPerson = persons.find((p) => p.id === id);
    // console.log(requestedPerson);
    if (requestedPerson === undefined) {
        return response.status(400).send(`Bad Request: There is no person with id ${id}`);
    }

    response.json(persons.find((p) => p.id === id));
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const requestedPerson = persons.find((p) => p.id === id);
    if (requestedPerson === undefined) {
        return response.status(400).send(`Bad Request: There is no person with id ${id}`);
    }

    persons = persons.filter((p) => p.id !== id);

    response.status(200).end();
});

app.put("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const requestedPerson = persons.find((p) => p.id === id);
    if (requestedPerson === undefined) {
        console.log("Bad request: there is no such id. Check your frontend code!");
        return response.status(400).send(`Bad Request: There is no person with id ${id}`);
    }
    const content = request.body.content;
    // console.log(content);
    if (content === undefined) {
        return response.status(400).send(`Bad Request: No content`);
    } else if (content.name === undefined || content.number === undefined) {
        return response.status(400).send("Bad Request: must include both a name and a number");
    }

    const newPerson = {
        name: request.body.content.name,
        number: request.body.content.number,
        id: id,
    };

    persons = persons.map((p) => (id === p.id ? newPerson : p));
    response.json(persons.find((p) => p.id === id));
});

app.get("/info", (request, response) => {
    const currentDate = new Date();
    response.send(`
    <div>
        <h3>Phonebook has info for ${persons.length} people</h3>
        <p>${currentDate}</p>
    </div>`);
});

/////

const unknowEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknowEndpoint);

app.listen(PORT, () => {
    console.log(`Server initiated at http://localhost:${PORT}`);
});
