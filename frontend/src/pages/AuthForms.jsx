import { useState } from "react";
import { Link } from "react-router-dom";

function AuthForms() {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  const handleSignupClick = () => {
    setIsLogin(false);
  };

  const formStyle = isLogin ? { marginLeft: "0%" } : { marginLeft: "-100%" };
  const textStyle = isLogin ? { marginLeft: "0%" } : { marginLeft: "-100%" };

  return (
    <section className="wrapper">
      <div className="title-text" style={textStyle}>
        <h2 className="title login">Login Form</h2>
        <h2 className="title signup">Signup Form</h2>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input type="radio" name="slide" id="login" checked={isLogin} />
          <input type="radio" name="slide" id="signup" checked={!isLogin} />
          <button
            // htmlFor="login"
            type="button"
            className="slide login"
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            // htmlFor="signup"
            type="button"
            className="slide signup"
            onClick={handleSignupClick}
          >
            Signup
          </button>
          <div className="slider-tab" />
        </div>
        <div className="form-inner" style={formStyle}>
          <form action="#" className="login">
            <div className="field">
              <input type="email" placeholder="Email Address" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Password" required />
            </div>
            <div className="pass-link">
              <Link to="/">Forgot password?</Link>
            </div>
            <div className="field btn">
              <div className="btn-layer" />
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">
              Not a member? <span>Signup now</span>
            </div>
          </form>
          <form action="#" className="signup">
            <div className="field">
              <input type="text" placeholder="Username" required />
            </div>
            <div className="field">
              <input type="email" placeholder="Email Address" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Password" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Confirm password" required />
            </div>
            <div className="field btn">
              <div className="btn-layer" />
              <input type="submit" value="Signup" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AuthForms;
