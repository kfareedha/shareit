// import React, { useState, useEffect } from "react";
// import authReducer from "../../reducers/authReducer";
// import "./Auth.css";
// import Logo from "../../img/logo.png";
// import { logIn, signUp } from "../../actions/Authactions.js";
// import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// const Auth = () => {
//   const loading = useSelector((state) => state.authReducer.loading);
//   // console.log(loading);
//   const [isSignUp, setIsSignUp] = useState(true);
//   const dispatch = useDispatch();
//   // const navigate = useNavigate();
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     username: "",
//     password: "",
//     confirmpassword: "",
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [errors, setErrors] = useState("");

//   const handlechange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//     setFormErrors({ ...formErrors, [e.target.name]: "" });
//     // console.log(e.target.name);
//   };

//   const [confirmPassword, setConfirmPassword] = useState(true);
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (isSignUp) {
//       setFormErrors(validate(data));
//       // data.password === data.confirmpassword
//       // ?
//       console.log(validate(data));
//       dispatch(signUp(data));
//       // if (!formErrors) {
//       //   dispatch(signUp(data));
//       // } else {
//       // }

//       // : setConfirmPassword(false);
//     } else {
//       console.log(data, "djkdsfj");
//       dispatch(logIn(data));
//     }
//   };
//   useEffect(() => {
//     // console.log(formErrors);
//     if (Object.keys(formErrors).length === 0) {
//       // console.log(data);
//     }
//   }, [formErrors]);
//   const validate = (values) => {
//     const errors = {};
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//     if (!values.name) {
//       errors.name = "Name is required!";
//     }
//     if (!values.email) {
//       errors.email = "Email is required!";
//     } else if (!regex.test(values.email)) {
//       errors.email = "This is not a valid email format!";
//     }
//     if (!values.mobile) {
//       errors.mobile = "Mobile is required!";
//     }
//     if (!values.username) {
//       errors.username = "Username is required!";
//     }
//     if (!values.password) {
//       errors.password = "Password is required!";
//     } else if (values.password.length < 4) {
//       errors.password = "Password must be more than 4 characters";
//     } else if (values.password.length > 10) {
//       errors.password = "Password cannot exceed more than 10 characters";
//     }
//     if (!values.confirmpassword) {
//       errors.confirmpassword = "Confimpassword is required!";
//     } else if (values.password === values.cofirmpassword) {
//       errors.confirmpassword = "Password should be same";
//     }
//     return errors;
//   };
//   const resetForm = () => {
//     setConfirmPassword(true);
//     setData({
//       name: "",
//       email: "",
//       mobile: "",
//       username: "",
//       password: "",
//       confirmpassword: "",
//     });
//   };
//   return (
//     <div className="Auth">
//       <div className="a-left">
//         <img src={Logo} alt="" />
//         <div className="Webname">
//           <h1>Shareit</h1>
//           <h5></h5>
//         </div>
//       </div>
//       <div className="a-right">
//         <form className="infoForm authForm" onSubmit={handleSubmit}>
//           <h1>{isSignUp ? "Register" : "Login"}</h1>
//           {isSignUp && (
//             <>
//               <div className="inputdiv">
//                 <input
//                   type="text"
//                   placeholder="First Name"
//                   className="infoInput"
//                   name="name"
//                   value={data.name}
//                   onChange={handlechange}
//                 />

//                 {formErrors?.name && <span>{formErrors.name}</span>}
//               </div>

//               <div className="inputdiv">
//                 <input
//                   type="text"
//                   className="infoInput"
//                   name="mobile"
//                   placeholder="Mobile number"
//                   value={data.mobile}
//                   onChange={handlechange}
//                 />

//                 {formErrors?.mobile && <span>{formErrors.mobile}</span>}
//               </div>
//               <div className="inputdiv">
//                 <input
//                   type="text"
//                   className="infoInput"
//                   name="username"
//                   placeholder="Username"
//                   value={data.username}
//                   onChange={handlechange}
//                 />

//                 {formErrors?.username && <span>{formErrors.username}</span>}
//               </div>
//             </>
//           )}

//           <div className="inputdiv">
//             <input
//               type="text"
//               placeholder="Email"
//               className="infoInput"
//               name="email"
//               value={data.email}
//               onChange={handlechange}
//             />

//             {formErrors?.email && <span>{formErrors.email}</span>}
//           </div>

//           <div className="inputdiv">
//             <input
//               type="password"
//               className="infoInput"
//               name="password"
//               placeholder="Password"
//               value={data.password}
//               onChange={handlechange}
//             />

//             {formErrors?.password && <span>{formErrors.password}</span>}
//           </div>
//           {isSignUp && (
//             <div className="inputdiv">
//               <input
//                 type="password"
//                 className="infoInput"
//                 name="confirmpassword"
//                 placeholder="Confirm Password"
//                 onChange={handlechange}
//               />

//               {formErrors?.confirmpassword && (
//                 <span>{formErrors.confirmpassword}</span>
//               )}
//             </div>
//           )}

//           {/* <span
//             style={{
//               display: confirmPassword ? "none" : "block",
//               color: "red",
//               fontSize: "15px",
//               alignSelf: "flex-start",
//               marginRight: "5px",
//             }}
//           >
//             *ConfirmPassword is not same
//           </span> */}

//           <div>
//             <span
//               style={{ font: "12px", cursor: "pointer" }}
//               onClick={() => {
//                 setIsSignUp((prev) => !prev);
//                 resetForm();
//               }}
//             >
//               {isSignUp
//                 ? "Already have an account? "
//                 : "Don't have an account??"}
//               <span style={{ color: "blue", fontWeight: "bold" }}>
//                 {isSignUp ? "LOGIN!!" : "SIGNUP"}
//               </span>
//             </span>
//           </div>
//           <button
//             className="button infoButton"
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? "Loading..." : isSignUp ? "Signup" : "Log In"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Auth;
