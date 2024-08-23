// src/Component/Login.js
import React, { useState } from 'react';
import { auth, googleAuthProvider } from './../FirbaseAuth/Config.js';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
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

  return (
    <div className="login-container mx-auto p-8 flex justify-center">
      <div className="login-box max-w-md w-full mx-auto">
        <div className="login-form bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="login-content p-8">
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
              <a href="#" className="forgot-password text-gray-600 text-right w-full block mt-4 text-sm hover:underline">Forgot password?</a>
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
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    className="fill-current text-blue-500"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    className="fill-current text-green-500"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    className="fill-current text-red-500"
                  ></path>
                  <path
                    d="M12 4.59c1.48 0 2.73.5 3.76 1.36l2.8-2.8C16.54 1.21 14.3 0 12 0 7.7 0 3.99 2.47 2.18 5.83l3.66 2.84c.87-2.6 3.3-4.08 5.16-4.08z"
                    className="fill-current text-yellow-500"
                  ></path>
                </svg>
              </div>
              <span className="text-gray-700 ml-2 text-sm font-semibold">Sign in with Google</span>
            </button>
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Don’t have an account?{' '}
                <a href="/signup" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
