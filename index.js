const express = require("express");
const PORT = 3001;
const app = express();

const persons = [
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

app.get("/", (request, response) => {
    response.send("Please use '/api/persons' to interact with this app");
});

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.get("/info", (request, response) => {
    const currentDate = new Date();
    response.send(`
    <div>
        <h3>Phonebook has info for ${persons.length} people</h3>
        <p>${currentDate}</p>
    </div>`);
});

app.listen(PORT, () => {
    console.log(`Server initiated at http://localhost:${PORT}`);
});
