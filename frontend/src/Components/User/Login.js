import './User.css'
import { useState, useEffect, useRef} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import useAuth from '../../Hooks/useAuth'
import axios from 'axios'

const Login = () => {

    const { setAuth } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const userRef = useRef()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [userName, password])

    const LOGIN_URL = 'http://localhost:3210/user/login'

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                LOGIN_URL,
                { userName, password }
            )
            const accessToken = response.data.accessToken
            setAuth({ userName, password, accessToken })
            setUserName('')
            setPassword('')
            navigate(from, { replace: true })
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No server response')
            }
            else if (error.response?.status === 401) {
                setErrMsg('Wrong user name or password')
            }
            else if (error.response?.status === 400) {
                setErrMsg('One of the fields is missing')
            }
            else{
                setErrMsg('Login failed')
            }
        }
    }

    return (
        <section>
            <p className={errMsg ? "errmsg" : "nodisplay"}>{errMsg}</p>
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='userName'>
                    UserName:
                </label>
                <input
                    id='userName'
                    ref={userRef}
                    type='text'
                    onChange={e => { setUserName(e.target.value) }}
                    value={userName}
                    required
                />
                <label htmlFor='password'>
                    Password:
                </label>
                <input
                    id='password'
                    type='password'
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button>
                    Sign in
                </button>
            </form>
            <p>
                Don`t have an account yet?<br />
                {/*routerLink*/}
                <span><a href='#'>Sign up!</a></span>
            </p>
            {/*Link to forgot password*/}
            <a href='#'>
                Forgot your password?
            </a>
        </section>)
}

export default Login