import express from "express";
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

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.listen(PORT, () => {
    console.log(`Server initiated at http://localhost:${PORT}`);
});
