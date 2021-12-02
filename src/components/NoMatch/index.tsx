import { Link } from "react-router-dom";

const NoMatch = () => {
    return (<>
        <h1>Nothing to see here!</h1>
        <p>
            <Link to="/" className="btn btn-success">Go to the home page</Link>
        </p>
    </>
    );
}

export default NoMatch;