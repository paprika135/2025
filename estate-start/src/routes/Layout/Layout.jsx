import { Navigate,Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import "./Layout.scss";

const Layout = () => {
  return (
    <div className="layout">
        <div className="navbar">
            <NavBar></NavBar>
        </div>
        <div className="content">
            <Outlet></Outlet>
        </div>
    </div>
  )
}

const RequireAuth = () =>{
  const { currentUser } = useContext(AuthContext);

  if (!currentUser ) return (<Navigate to="/login"></Navigate>)
  else{
    return (
      <div className="layout">
        <div className="navbar">
          <NavBar></NavBar>
        </div>
        <div className="content">
          <Outlet></Outlet>
        </div>
      </div>
    )
  }
}

export {Layout,RequireAuth}
