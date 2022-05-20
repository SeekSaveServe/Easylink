import { React } from 'react';
import { Link } from 'react-router-dom';

function Right() {
    return (
        <div className="right">
            <h1 className="join">Join us now!</h1>
            <h1 className="discover"> Discover new opportunities!</h1>

            <Link to="/signup">
                <button type="button">Sign Up</button>
            </Link>
        </div>
    )
}

export default Right;