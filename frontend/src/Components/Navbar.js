import { Link } from "react-router-dom"
import useAuth from "../Hooks/useAuth"


const Navbar = () => {

    const { auth } = useAuth()

    return (
        <>{!auth.accessToken ? <></>
            : <nav >
                <Link to="/viewPlan">View Plan</Link>
                <Link to="/createRecipe">Create a new recipe</Link>
                <Link to="/generatePlan">Generate a meal plan</Link>
            </nav>}
        </>
    )
}

export default Navbar