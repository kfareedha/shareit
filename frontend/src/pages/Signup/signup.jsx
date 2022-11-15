import { useState } from "react";
import "./signup.css";
import FormInput from "../../components/FormInput/FormInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from "../../img/logo.png";
import { signUp } from "../../actions/Authactions.js";
const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    mobile: "",

    password: "",
    confirmpassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "mobile",
      type: "Numeric",
      placeholder: "Mobile",
      errorMessage: "It should be a valid mobile number!",
      label: "Mobile",
      pattern: `^[0-9+]{10,13}$`,
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(values));
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form className="signupform" onSubmit={handleSubmit}>
        <div className="logo">
          <img className="logoimg" src={Logo} alt="" />
          <h2 className="h1">Register</h2>
        </div>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="signupbutton ">Submit</button>
        <span
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: "12px",
            paddingBottom: "30px",
            cursor: "pointer",
            display: "block",
          }}
          onClick={() => navigate("/")}
        >
          Already Registered?..Login
        </span>
      </form>
    </div>
  );
};

export default Signup;
