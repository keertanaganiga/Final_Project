import React from 'react'
import firebase from './firebase'


const aadhaar_no_phone_no = new Map();

aadhaar_no_phone_no.set('4al18cs053', 7349072145);//candidate1
aadhaar_no_phone_no.set('4al18cs041', 9591548957);//candidate2
aadhaar_no_phone_no.set('4al18cs031', 9591548957);//candidate3
aadhaar_no_phone_no.set('4al18cs036', 8123514535);
aadhaar_no_phone_no.set('4al18cs083', 8123514535);
aadhaar_no_phone_no.set('4al18cs098', 9731008301);//voter extra
aadhaar_no_phone_no.set('4al18cs022', 9731008301);//voter
aadhaar_no_phone_no.set('4al18cs042', 9591548957);//voter
aadhaar_no_phone_no.set('4al18cs053', 7349072145);//voter

aadhaar_no_phone_no.set('4al18ec028', 7349072145);//candidate1
aadhaar_no_phone_no.set('4al18ec058', 9731008301);//candidate2
aadhaar_no_phone_no.set('4al18ec056', 9591548957);//candidate3
aadhaar_no_phone_no.set('4al18ec037', 9591548957);//voter 
aadhaar_no_phone_no.set('4al18ec020', 9731008301);//voter
aadhaar_no_phone_no.set('4al18ec023', 9731008301);//voter
aadhaar_no_phone_no.set('4al18ec024', 9731008301);//voter





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
      alert("Invalid USN");
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
            <input type="text" name="aadhar" placeholder="USN number" required onChange={this.handleChange}/>
            <button type="submit">Submit</button>
          </form>

          <h2>Enter OTP</h2>
          <form onSubmit={this.onSubmitOTP}>
            <input type="number" name="otp" placeholder="OTP Number" required onChange={this.handleChange}/>
            <button type="submit">Submit</button>
          </form>
         
          <p class="thicker"><h1>Election registration must be done within 21/07/2022 11:59pm</h1></p>
          <p>
          <center>
          <table class="c">
              <tr>
                <th class="thicker">BRANCH CODE</th>
                <th class="thicker">BRANCH NAME</th>
              </tr>
              <tr>
                <td class="thicker">101</td>
                <td class="thicker">Computer Science and Engineering</td>
              </tr>
              <tr>
                <td class="thicker">201</td>
                <td class="thicker">Electronics and Communication Engineering</td>
              </tr>
              <tr>
                <td class="thicker">301</td>
                <td class="thicker">Information Science and Engineering</td>
              </tr>
                <tr>
                <td class="thicker">401</td>
                <td class="thicker">Mechanical and Engineering</td>
              </tr>
                <tr>
                <td class="thicker">501</td>
                <td class="thicker">Civil and Engineering</td>
              </tr>
            </table>
            </center>
          
           
          </p>
        </div>
        
    )
    
  }
  
 
}

export default Login

