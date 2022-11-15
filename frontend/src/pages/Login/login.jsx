import { useState } from "react";
import "./login.css";
import FormInput from "../../components/FormInput/FormInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../actions/Authactions.js";
import Logo from "../../img/logo.png";
const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },

    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password is required",
      label: "Password",

      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(logIn(values));
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form className="loginform" onSubmit={handleSubmit}>
        <div className="logo">
          <img className="logoimg" src={Logo} alt="" />
          <h2 className="h1">Login</h2>
        </div>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        <button className="loginformbtn">Submit</button>
        <span
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: "12px",
            paddingBottom: "30px",
            cursor: "pointer",
            display: "block",
          }}
          onClick={() => navigate("/signup")}
        >
          Don't have an account?..Register
        </span>
      </form>
    </div>
  );
};

export default Login;
