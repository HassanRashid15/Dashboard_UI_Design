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
  
          toast.success('Login successful!', {
            autoClose: 1500,
            onClose: () => navigate('/dashboard'),
          });
          setEmail('');
          setPassword('');
        })
        .catch((error) => {
          console.error('Error logging in:', error.code, error.message);
  
          toast.error('Login failed. Please check your credentials and try again.', {
            autoClose: 3000,
          });
        });
    }
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const user = result.user;
        console.log('User signed in with Google:', user);
        toast.success('Google Sign-In successful!');
        setTimeout(() => navigate('/dashboard'), 3000);
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
          setResetEmail('');
          setIsResetFormVisible(false);
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
                      className="login-input block w-full p-3 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                <h1 className="login-title text-2xl font-semibold mb-6 text-gray-800 text-left">Please Log In</h1>
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
                      className="login-input block w-full p-3 rounded"
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
                        className="login-input block w-full p-3 pr-10 rounded"
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
                    Forgot your password?
                  </button>
                </form>
                <div className="divider-or my-3 flex items-center justify-center">
                  <span className="text-gray-500">OR</span>
                </div>
                <button  onClick={handleGoogleSignIn} type="button" class="google-button">
  <span class="google-button__icon">
    <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg"><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335"/><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05"/><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4"/><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853"/></svg>
  </span>
  <span class="google-button__text">Sign in with Google</span>
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
