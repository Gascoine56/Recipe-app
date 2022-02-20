import './User.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const Login = () => {

    const userRef = useRef()

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, password])

    const LOGIN_URL = 'http://localhost:3210/user/login'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUser('')
        setPassword('')
        setSuccess(true)
    }

    return (
        <>
            {success ? (<section>
                <h1>You are logged in!</h1>
                <br />
                {/*Link to home*/}
                <a href='#'>Go to Home</a>
            </section>) : (
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
                            onChange={e => { setUser(e.target.value) }}
                            value={user}
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
                </section>)}
        </>
    )
}

export default Login