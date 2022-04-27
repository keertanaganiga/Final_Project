import React from 'react'
import firebase from './firebase'

const aadhaar_no_phone_no = new Map();

aadhaar_no_phone_no.set('515507675948', 7349072145);
aadhaar_no_phone_no.set('904505224974', 8072678067);



class Login extends React.Component {
  handleChange = (e) =>{
    const {name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  configureCaptcha = () =>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log("Recaptca varified")
      },
      defaultCountry: "IN"
    });
  }

  onSignInSubmit = (e) => {
    e.preventDefault()
    this.configureCaptcha()
    const aadharnumber = this.state.aadhar;
    if(typeof aadhaar_no_phone_no.get(aadharnumber) !== 'undefined') {
      console.log(aadhaar_no_phone_no.get(aadharnumber))
      const phoneNumber = "+91" + aadhaar_no_phone_no.get(aadharnumber)
      console.log(phoneNumber)
      const appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log("OTP has been sent")

            // ...
          }).catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("SMS not sent")
      });
    } else {
      console.log(aadhaar_no_phone_no.get(aadharnumber))
      alert("Invalid aadhar");
    }
  }
  onSubmitOTP = (e) =>{
    e.preventDefault()
    const code = this.state.otp
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))
      window.location.href = "/Home";
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }
  render() {
    return (
        <div>
          <h2>Login Form</h2>
          <form onSubmit={this.onSignInSubmit}>
            <div id="sign-in-button"></div>
            <input type="number" name="aadhar" placeholder="Aadhar number" required onChange={this.handleChange}/>
            <button type="submit">Submit</button>
          </form>

          <h2>Enter OTP</h2>
          <form onSubmit={this.onSubmitOTP}>
            <input type="number" name="otp" placeholder="OTP Number" required onChange={this.handleChange}/>
            <button type="submit">Submit</button>
          </form>
        </div>
    )
  }
}
export default Login
