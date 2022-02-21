import "./App.css";
import Layout from "./Components/Layout";
import Login from "./Components/User/Login"
import Registration from "./Components/User/Registration"
import CreateRecipe from "./Components/Recipes/CreateRecipe";
import ViewPlan from "./Components/Plans/ViewPlan"
import GeneratePlan from "./Components/Plans/GeneratePlan"
import Missing from "./Errors/Missing"
import Unauthorized from "./Errors/Unauthorized"
import Home from "./Components/Home"
import RequireAuth from "./Components/RequireAuth";
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*public routes*/}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="missing" element={<Missing />} />
        {/*protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="createRecipe" element={<CreateRecipe />} />
          <Route path="viewPlan" element={<ViewPlan />} />
          <Route path="generatePlan" element={<GeneratePlan />} />
        </Route>
        {/* catch all route*/}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;