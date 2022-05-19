import {useState} from 'react';
import logo from './../Assets/Easylink Logo Full.png'

export default function Form() {
// States for registration
const [userName, setUserName] = useState("");
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

// States for checking errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

// Handling name change
const handleNameChange = (e) => {
    setUserName(e.target.value);
    setSubmitted(false);
};

// Handling email change
const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
};

// Handling password change
const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
};

// Handling confirm password change
const handleConfirmPasswordChage = (e) => {
    setConfirmPassword(e.target.value);
    setSubmitted(false);
};

// Handling the form submission
const handleSubmit = (e) => {
    e.preventDefault();
    if (userName === '' || email === '' || password === '' || confirmPassword === '' || !(confirmPassword === password)) {
        setError(true);
    } else {
        setSubmitted(true);
        setError(false);
    }
};

// Show success message
const successMessage = () => {
    return (
        <div
        className='successMessage'>
        <h1> This is a placeholder message informing you that you have succeeded</h1>
        </div>
    );
};


// Show error message
const errorMessage = () => {
    return (
    <div
    className='errorMessage'
    style={{
        display: error? '' : 'none',
    }}>
        <h1> Please enter all fields</h1>
    </div>      
    );
};

return (
    <div className="form">
        <div className="messages">
            {errorMessage()}
            {successMessage()}
        </div>
        <form> 
        <label className='label'>Username</label>
        <input 
        onChange={handleName} 
        className="input"
        value={userName}
        type="text"
        />

        <label className='label'>Username</label>
        <input 
        onChange={handleName} 
        className="input"
        value={userName}
        type="text"
        />        
        </form>
    </div>
)
}