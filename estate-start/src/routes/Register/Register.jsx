import {Link} from "react-router-dom";
import "./Register.scss";

const Register = () => {
  return (
    <div className="register">
      <div className="formContainer">
        <form>
            <h1>Create an Account</h1>
            <input name="username" type="text" placeholder="Username" />
            <input name="emial" type="text" placeholder="Email" />
            <input name="password" type="text" placeholder="Password" />
            <button>Register</button>
            <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  )
}

export default Register
