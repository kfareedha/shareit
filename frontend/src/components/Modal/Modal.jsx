import React, { useState } from "react";
import "./Modal.scss";

import { useNavigate } from "react-router-dom";
// import Button from "../Controls/Button/Button";
import { useDispatch } from "react-redux";
import { sendOTP } from "../../actions/otpaction";
import { verifyOTP } from "../../actions/verifyAction";
import { useEffect } from "react";
import { logout } from "../../actions/Authactions";

function Modal(props) {
  // const navigate = useNavigate()
  console.log(props, "  prooo");
  const {
    user: { mobile, email, username },
  } = props;
  const [display, setDisplay] = useState("block");
  const [method, setMethod] = useState("email");
  const [modal, setModal] = useState(true);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setErrMsg(false);
    setErrMsg("");
  }, []);
  const onClick = async (e) => {
    e.preventDefault();
    console.log("KKKKKK");
    const response =
      method === "email"
        ? await dispatch(sendOTP(email))
        : await dispatch(sendOTP(mobile));

    console.log(response, "ppppppppp");
    console.log(response.data.status, "ooooo");
    if (response.data.status) setModal(false);
    else {
      setError(true);

      setErrMsg(response.data.message);
      console.log(errMsg);
    }

    console.log("method", "=", method);
  };

  // const [display,setDisplay] = useState('block')
  // const {method,data,onclick} = props ;
  const navigate = useNavigate();
  // const dispatch = useDispatch()
  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });

  function handleChange(e) {
    console.log(e.target, "ggggggggg");
    const { name, value } = e.target;

    console.log(value, name, "UUUUUUU");
    setOtp((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let OTP = Object.values(otp).join("");

    const type = method === "email" ? email : mobile;
    console.log(type, "aaaaa");
    const result = await dispatch(verifyOTP({ OTP, type }));
    console.log(OTP, "KKKK");
    console.log(result, "KKKK");

    if (result.status) {
      navigate("/");
    } else {
      console.log("jjjjjj");
      setDisplay("none");
      setErr("Verification failed");
    }
  }

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      console.log("next");

      const next = elmnt.target.tabIndex;
      if (next < 6) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };

  const logOut = async () => {
    dispatch(logout());
  };
  return (
    <div>
      <div className="verify-profile">
        <button className="logout" onClick={logOut}>
          Logout
        </button>
        <h2>{username}</h2>
        <h4>{email}</h4>
        <div>{err}</div>
        <button
          onClick={() => {
            setDisplay("block");
          }}
          id="myBtn"
        >
          Verify Account
        </button>
      </div>

      <div style={{ display: display }} id="myModal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span
              onClick={() => {
                setDisplay("none");
              }}
              className="close"
            >
              &times;
            </span>
            <h2>
              {" "}
              {modal ? "Select email or mobile" : "Verify your account"}{" "}
            </h2>
          </div>
          {modal && (
            <FormBody
              error={error}
              errMsg={errMsg}
              onclick={() => {
                setMethod("email");
              }}
              method={method}
              email={email}
              mobile={mobile}
              onButtonClick={onClick}
              onInputClick={() => {
                setMethod("mobile");
              }}
            />
          )}

          {!modal && (
            <OtpBody
              handleSubmit={handleSubmit}
              otp={otp}
              handleChange={handleChange}
              inputfocus={inputfocus}
              resendOtp={onClick}
            />
          )}
        </div>
      </div>
    </div>
    //   )
    //   if(!modal)
    //   return(
    //     <OTPmodal onclick={()=>{setModal(true)}} method={method} data={ method ==='email' ? email : contact}/>
  );
}

export const FormBody = (props) => {
  const {
    error,
    errMsg,
    onclick,
    method,
    email,
    mobile,
    onButtonClick,
    onInputClick,
  } = props;
  return (
    <form>
      <div className="modal-body">
        {error && (
          <div className="error-alert">
            {errMsg === /^Invalid/ ? "Invalid Number" : "Something went wrong"}{" "}
          </div>
        )}

        <div className="radio-grp">
          <input
            onClick={onclick}
            name={"method"}
            type={"radio"}
            //  checked={ method === 'email' ? true : false }
            defaultChecked={true}
            value={method}
            id="email"
          />
          <label htmlFor="email">
            <span>Email</span>({email})
          </label>
        </div>
        <div className="radio-grp">
          <input
            onClick={onInputClick}
            name={"method"}
            type={"radio"}
            id="mobile"
            value={method}
          />
          <label htmlFor="contact">
            <span>Mobile</span>({mobile})
          </label>
        </div>
      </div>

      <div className="modal-footer">
        <button onClick={onButtonClick} className="primarySmall">
          Send OTP
        </button>
      </div>
    </form>
  );
};

export const OtpBody = (props) => {
  const { handleSubmit, otp, handleChange, inputfocus, resendOtp } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-body">
        <div className="otpContainer">
          <input
            name="otp1"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp.otp1}
            // onKeyPress={keyPressed}
            onChange={(e) => handleChange(e)}
            tabIndex="1"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp2"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp.otp2}
            onChange={(e) => handleChange(e)}
            tabIndex="2"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp3"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp.otp3}
            onChange={(e) => handleChange(e)}
            tabIndex="3"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp4"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp.otp4}
            onChange={(e) => handleChange(e)}
            tabIndex="4"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />

          <input
            name="otp5"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp.otp5}
            onChange={(e) => handleChange(e)}
            tabIndex="5"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp6"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp.otp6}
            onChange={(e) => handleChange(e)}
            tabIndex="6"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />
        </div>
      </div>
      <div className="modal-footer">
        <button class="primarySmall" onClick={resendOtp}>
          Resend OTP
        </button>

        <button class="primarySmall">Verify OTP</button>
      </div>
    </form>
  );
};
// export const OTPmodal = (props) =>{

//   return (
//       <div>
//           {/* <button onClick={() => {
//               setDisplay("block")

//           }} id="myBtn">Open Modal</button> */}

//           <div style={{ display: display }} id="myModal" className="modal">

//               <div className="modal-content2">
//                   <div className="modal-header">
//                       <span onClick={onclick} className="close">&times;</span>
//                       <h2>Verify your account</h2>
//                   </div>
//                   <OtpBody handleSubmit={handleSubmit} otp={otp} handleChange={handleChange} inputfocus={inputfocus} />
//                   {/* <form action=""> */}

//                   {/* <label htmlFor="otp">
//                                   OTP
//                               </label>
//                               <input onChange={(e)=>{setOtp(e.target.value)}} value={otp} type="number" id='otp' name='otp' />
//                       </div>
//                       <Button onclick={onClick}  classname="primarySmall">Verify OTP</Button>
//                     </div>  */}
//                   {/* </form> */}
//               </div>

//           </div>

//       </div>

//     )
// }

export default Modal;
