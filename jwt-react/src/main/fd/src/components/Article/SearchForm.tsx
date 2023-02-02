const fetchApi = () => {
    fetch('/page')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
        });
};

const SearchForm = () => {
    return (
        <div className="form">
            <input type="text" className="form-text" />
            <button type="button" className="form-btn" onClick={fetchApi}>
                search
            </button>
        </div>
    );
};

export default SearchForm;