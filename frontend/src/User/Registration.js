import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwsomeIcon } from '@fortawesome/react-fontawesome'
import './User.css'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Registration = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('')
    const [validateName, setValidName] = useState(false)
    const [userFocused, setUserFocus] = useState(false)

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
        console.log(USER_REGEX.test(user));
        setValidName(USER_REGEX.test(user))
    }, [user])

    useEffect(() => {
        console.log(password);
        console.log(PASSWORD_REGEX.text(password));
        setValidPassword(PASSWORD_REGEX.text(password));
        setValidMatch(password === matchPassword)
    }, [password, matchPassword])

    useEffect(() => {
        setErrorMessage('')
    }, [user, password, matchPassword])

    return (
        <section>
            <p ref={errRef}
                className={errorMessage ? "errmsg" : "noerrmsg"}>
                {errorMessage}
            </p>
            <h1>Register</h1>
            <form>
                <label htmlFor="username">
                    Username:
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    required
                    onFocus = {() => setUserFocus(true)}
                    onBlur = {() => setUserFocus(false)}
                />
            </form>
        </section>
    )
}

export default Registration
