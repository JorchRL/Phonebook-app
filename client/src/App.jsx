import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Debug from "./components/Debug";
import NumberList from "./components/NumberList";
import PhoneBookForm from "./components/PhoneBookForm";
import phoneBookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personDisplay, setPersonDisplay] = useState(persons);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    // axios.get("http://localhost:3001/persons")
    phoneBookService.getAllNumbers().then((numbers) => {
      setPersons(numbers);
      setPersonDisplay(numbers);
      // console.log(resp.data);
    });
  }, []);

  const handleAddName = (event) => {
    event.preventDefault();

    const addedName = {
      name: event.target[0].value,
      number: event.target[1].value,
      // id: persons.length + 1,
    };

    // Validate our input
    const hasName =
      persons.find(({ name }) => name === event.target[0].value) !== undefined
        ? true
        : false;
    const includesNumber = addedName.number !== "" ? true : false;
    const includesName = addedName.name !== "" ? true : false;
    if (hasName) {
      // Here we want to check wheter the user wishes to update the existing name
      if (
        window.confirm(
          `${event.target[0].value} is already on the phonebook. Do you want to update their number?`
        )
      ) {
        const updateId = persons.filter((p) => {
          return p.name === addedName.name;
        })[0].id;

        phoneBookService
          .updateNumber(addedName, updateId)
          .then((updatedPerson) => {
            setPersons(
              persons.filter((p) => p.id !== updateId).concat(updatedPerson)
            );
            setPersonDisplay(
              personDisplay
                .filter((p) => p.id !== updateId)
                .concat(updatedPerson)
            );
            return updatedPerson.name;
          })
          .then((name) => {
            setNotification(`Modified ${name}'s entry on the phonebook!`);
            setTimeout(() => {
              setNotification("");
            }, 3000);
          });
      }
    } else if (!includesNumber || !includesName) {
      if (!includesNumber) {
        alert(`Please include ${addedName.name}'s number'`);
      } else {
        alert(`Please enter a name`);
      }
    } else {
      phoneBookService
        .addNumber(addedName)
        .then((returnedName) => {
          setPersons(persons.concat(returnedName));
          setPersonDisplay(personDisplay.concat(returnedName));
          return returnedName.name;
        })
        .then((name) => {
          setNotification(`Added ${name} to the phonebook!`);
          setTimeout(() => {
            setNotification("");
          }, 3000);
        })
        .catch((error) => {
          //   console.log(error.response);
          setNotification(error.response.data.message);
          setTimeout(() => {
            setNotification("");
          }, 3000);
          return error.message;
        });
    }

    event.target[0].value = "";
    event.target[1].value = "";
    // console.log(persons);
  };

  const handleDeleteNumber = (id) => {
    if (window.confirm(`Delete ${persons.find((p) => p.id === id).name}?`)) {
      phoneBookService
        .deleteNumber(id)
        .then((response) => {
          const newPersonsList = persons.filter((p) => {
            return p.id !== id;
          });
          setPersons(newPersonsList);
          setPersonDisplay(newPersonsList);
        })
        .then(() => {
          setNotification("Deletion complete!");
          setTimeout(() => {
            setNotification("");
          }, 3000);
        })
        .catch((error) => {
          console.log(
            "ERROR DELETING NUMBER: The number has already been deleted from the server"
          );
          setNotification(
            `${
              persons.find((p) => p.id === id).name
            } has already been deleted from the server!`
          );
          setTimeout(() => {
            setNotification("");
          }, 3000);

          setPersons(persons.filter((p) => p.id !== id));
          setPersonDisplay(persons.filter((p) => p.id !== id));

          /**
           * Handle error when deleting a number that no longer exists in the backend
           * 1 display error message
           * 2 update display
           */
        });
    }
  };

  const handleFilterPersons = (filteredPersons) => {
    // Our FilterPersons component will handle all the filtering logic,
    // but it will not change the state. Instead, it sends a filtered copy of persons
    // setPersons(filteredPersons);
    // console.log("event value: ", filteredPersons);

    setPersonDisplay(filteredPersons);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <FilterPersons personList={persons} handler={handleFilterPersons} />
      <PhoneBookForm addNameHandler={handleAddName} />
      <NumberList
        personList={personDisplay}
        deleteHandler={handleDeleteNumber}
      />
    </>
  );
};

export default App;

const FilterPersons = ({ personList, handler }) => {
  const handleFilter = (event) => {
    event.preventDefault();

    const filteredPersons = personList.filter((person) => {
      // Only filter when there is a query
      if (event.target.value === "") {
        return true;
      }
      const regex = RegExp(`${event.target.value}`, "i");
      // console.log(regex);
      return regex.test(person.name);
    });

    // console.log(filteredPersons);

    handler(filteredPersons);
  };

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        filter shown with: <input onChange={handleFilter}></input>
      </form>
    </div>
  );
};

const Notification = ({ message }) => {
  if (message === "") {
    return null;
  }

  return (
    <div className='notification'>
      <h3>{message}</h3>
    </div>
  );
};
