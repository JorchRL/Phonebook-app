const { response } = require("express");
const express = require("express");
const PORT = 3001;
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

//// REST Endpoints

app.get("/", (request, response) => {
    response.send("Please use '/api/persons' to interact with this app");
});

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const requestedPerson = persons.find((p) => p.id === id);
    console.log(requestedPerson);
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

app.get("/info", (request, response) => {
    const currentDate = new Date();
    response.send(`
    <div>
        <h3>Phonebook has info for ${persons.length} people</h3>
        <p>${currentDate}</p>
    </div>`);
});

/////

app.listen(PORT, () => {
    console.log(`Server initiated at http://localhost:${PORT}`);
});
