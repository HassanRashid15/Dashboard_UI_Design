// src/Component/Login.js
import React, { useState } from 'react';
import { auth, googleAuthProvider } from './../FirbaseAuth/Config.js';
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isResetFormVisible, setIsResetFormVisible] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 6 characters long and include at least one uppercase letter and one special character';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('User logged in successfully:', user);
          toast.success('Login successful!');
          setTimeout(() => navigate('/dashboard'), 3000); // Redirect after 3 seconds
        })
        .catch((error) => {
          console.error('Error logging in:', error.code, error.message);
          toast.error('Login failed. Please check your credentials and try again.');
        });
    }
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const user = result.user;
        console.log('User signed in with Google:', user);
        toast.success('Google Sign-In successful!');
        setTimeout(() => navigate('/dashboard'), 3000); // Redirect after 3 seconds
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error.code, error.message);
        toast.error('Google Sign-In failed. Please try again.');
      });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (resetEmail) {
      sendPasswordResetEmail(auth, resetEmail)
        .then(() => {
          toast.success('Password reset email sent successfully!');
          setResetEmail(''); // Clear the email field after sending the email
          setIsResetFormVisible(false); // Hide the reset form
        })
        .catch((error) => {
          console.error('Error sending password reset email:', error.code, error.message);
          toast.error('Failed to send password reset email. Please try again.');
        });
    } else {
      toast.error('Please enter your email address.');
    }
  };

  return (
    <div className="login-container mx-auto p-8 flex justify-center">
      <div className="login-box max-w-md w-full mx-auto">
        <div className="login-form bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="login-content p-8">
            {isResetFormVisible ? (
              <>
                <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Reset Password</h1>
                <form onSubmit={handleForgotPassword}>
                  <div className="login-field mb-5">
                    <label htmlFor="reset-email" className="login-label block mb-2 text-sm font-medium text-gray-600">Email</label>
                    <input
                      type="email"
                      id="reset-email"
                      name="reset-email"
                      placeholder="Enter Your Email Address"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="login-input block w-full p-3 rounded bg-gray-200 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <button type="submit" className="login-button w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow-lg">Reset Password</button>
                  <button
                    type="button"
                    onClick={() => setIsResetFormVisible(false)}
                    className="w-full p-3 mt-4 bg-gray-200 text-gray-800 rounded shadow-lg"
                  >
                    Back to Login
                  </button>
                </form>
              </>
            ) : (
              <>
                <h1 className="login-title text-2xl font-semibold mb-6 text-gray-800 text-center">Login</h1>
                <form onSubmit={handleEmailLogin}>
                  <div className="login-field mb-5">
                    <label htmlFor="email" className="login-label block mb-2 text-sm font-medium text-gray-600">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Your Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="login-input block w-full p-3 rounded bg-gray-200 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    {errors.email && <p className="login-error text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div className="login-field mb-5">
                    <label htmlFor="password" className="login-label block mb-2 text-sm font-medium text-gray-600">Password</label>
                    <div className="password-input-wrapper relative">
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input block w-full p-3 pr-10 rounded bg-gray-200 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="password-toggle absolute inset-y-0 right-3 flex items-center"
                      >
                        {passwordVisible ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                      </button>
                    </div>
                    {errors.password && <p className="login-error text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>
                  <button type="submit" className="login-button w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow-lg">Login</button>
                  <button
                    type="button"
                    onClick={() => setIsResetFormVisible(true)}
                    className="forgot-password text-gray-600 text-right w-full block mt-4 text-sm hover:underline"
                  >
                    Forgot password?
                  </button>
                </form>
                <div className="divider-or my-6 flex items-center justify-center">
                  <span className="text-gray-500">OR</span>
                </div>
                <button
                  onClick={handleGoogleSignIn}
                  aria-label="Sign in with Google"
                  className="google-signin justify-center flex items-center bg-white border border-gray-300 rounded-md shadow-sm p-3 space-x-2 hover:bg-gray-50 transition ease-in-out duration-150 w-full"
                >
                  <div className="google-logo flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full border border-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                      <title>Sign in with Google</title>
                      <desc>Google G Logo</desc>
                      <path fill="#4285F4" d="M12 5.5c-1.29 0-2.5.43-3.47 1.16L6.34 5.94A6.978 6.978 0 0 1 12 4c3.59 0 6.68 2.78 7.35 6.34h-7.3l-1.08-2.5a3.48 3.48 0 0 0-2.53-1.1z"></path>
                      <path fill="#34A853" d="M4.93 12.47a7.473 7.473 0 0 1 0-2.47L12 12c0 2.65-.74 5.14-2.04 7.21l-3.57-2.49a7.473 7.473 0 0 1-1.46-3.24z"></path>
                      <path fill="#FBBC05" d="M12 4c-.78 0-1.5.14-2.2.39l-3.46-2.49A11.94 11.94 0 0 0 12 0c6.62 0 12 5.38 12 12 0 .89-.09 1.76-.25 2.61l-2.89-1.97A6.978 6.978 0 0 0 12 4z"></path>
                      <path fill="#FF0C2D" d="M12 12l-7.4 5.25a12.015 12.015 0 0 1-2.9-3.33L0 12l2.9-3.5a12.015 12.015 0 0 1 2.9-3.33L12 12z"></path>
                    </svg>
                  </div>
                  <span className="text-gray-800 font-medium">Sign in with Google</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
