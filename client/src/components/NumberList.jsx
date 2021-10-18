import React from "react";

const NumberList = ({ personList, deleteHandler }) => {
    // console.log(personList);
    return (
        <div className='NumberList'>
            <h2>Numbers</h2>
            <ul>
                {personList.map((person) => {
                    return (
                        <li key={person.id}>
                            {person.name} - {person.number !== undefined ? person.number : <em>"Missing number!"</em>}
                            <button style={{ marginLeft: "10px" }} onClick={() => deleteHandler(person.id)}>
                                Delete
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default NumberList;
