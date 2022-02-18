import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './User.css'
import axios from 'axios'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = 'http://localhost:3210/user/register'

const Registration = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [userName, setUserName] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocused, setUserFocus] = useState(false)

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [matchPassword, setMatchPassword] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(userName))
    }, [userName])

    useEffect(() => {
        setEmail(email);
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword)
    }, [password, matchPassword])

    useEffect(() => {
        setErrorMessage('')
    }, [userName, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!USER_REGEX.test(userName) || !PASSWORD_REGEX.test(password) || !EMAIL_REGEX.test(email)) {
            setErrorMessage("Invalid entry")
            return
        }
        try {
            await axios.post(REGISTER_URL,
                { userName, password, email },
            )
            setSuccess(true)
        } catch (error) {
            if (!error?.response) {
                setErrorMessage('No server response')
            } else if (error.response?.status === 400) {
                setErrorMessage('Username or email already in use ')
            } else {
                setErrorMessage('Registration failed')
            }
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Successfully registered!</h1>
                    <p>Log In</p>
                </section>
            ) : (
                <section>
                    <p ref={errRef}
                        className={errorMessage ? "errmsg" : "nodisplay"}>
                        {errorMessage}
                    </p>

                    <h1>Register</h1>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <span className={validName ? "valid" : "nodisplay"}><FontAwesomeIcon icon={faCheck} /></span>
                            <span className={validName || !userName ? "nodisplay" : "invalid"}><FontAwesomeIcon icon={faTimes} /></span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p className={userFocused && userName && !validName ? "instructions" : "nodisplay"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter <br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="email">
                            Email:
                            <span className={validEmail ? "valid" : "nodisplay"}><FontAwesomeIcon icon={faCheck} /></span>
                            <span className={validEmail || !email ? "nodisplay" : "invalid"}><FontAwesomeIcon icon={faTimes} /></span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            onChange={(e) => { setEmail(e.target.value) }}
                        />

                        <label htmlFor="password">
                            Password:
                            <span className={validPassword ? "valid" : "nodisplay"}><FontAwesomeIcon icon={faCheck} /></span>
                            <span className={password && !validPassword ? "invalid" : "nodisplay"}><FontAwesomeIcon icon={faTimes} /></span>
                        </label>
                        <input
                            type='password'
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p className={passwordFocus && !validPassword ? "instructions" : "nodisplay"} >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Password must be 8-24 characters long,<br />
                            must contain lowercase letter, uppercase letter,<br />
                            number and a special character (!@#$%).
                        </p>

                        <label htmlFor="confirmpassword">
                            Confirm password:
                            <span className={matchPassword && validMatch ? "valid" : "nodisplay"}><FontAwesomeIcon icon={faCheck} /></span>
                            <span className={matchPassword && !validMatch ? "invalid" : "nodisplay"}><FontAwesomeIcon icon={faTimes} /></span>
                        </label>
                        <input
                            type='password'
                            id="confirmpassword"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            required
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p className={matchFocus && !validMatch ? "instructions" : "nodisplay"} >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Passwords must match
                        </p>

                        <button disabled={!validName || !validPassword || !validMatch ? true : false}>
                            Register
                        </button>
                    </form>
                </section>)}
        </>
    )
}

export default Registration
