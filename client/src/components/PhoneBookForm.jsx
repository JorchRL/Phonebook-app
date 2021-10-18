const PhoneBookForm = ({ addNameHandler }) => {
    return (
        <div>
            {/* <Debug vars={debugVars} /> */}
            <h2>Add new</h2>
            <form onSubmit={addNameHandler}>
                <div>
                    name: <input id='name-input' type='text' placeholder='Add a new name...' />
                    <br />
                    number: <input id='number-input' type='text' placeholder='Add a new number...' />
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
        </div>
    );
};

export default PhoneBookForm;
