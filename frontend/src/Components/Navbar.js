import {Link} from "react-router-dom"
import useAuth from "../Hooks/useAuth"


const Navbar = () => {

    const { auth } = useAuth() 

    return (
        <nav className={auth?.userName ? }>
            <Link to="/viewPlan">View Plan</Link>
        </nav>
    )
}

export default Navbar