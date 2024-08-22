import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    // Password validation (1 uppercase, 1 special character, min length 6)
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission
      console.log('Form submitted');
    }
  };

  return (
    <div className="login-container mx-auto p-8 flex justify-center">
      <div className="login-box max-w-md w-full mx-auto">
        <div className="login-form bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="login-content p-8">
            <h1 className="login-title text-2xl font-semibold mb-6 text-gray-800 text-center">Login</h1>
            <form onSubmit={handleSubmit}>
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
                {errors.email && <p className={`login-error text-red-500 text-sm mt-1 ${errors.email ? 'opacity-100' : 'opacity-0'}`}>{errors.email}</p>}
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
                    {passwordVisible ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.password && <p className={`login-error text-red-500 text-sm mt-1 ${errors.password ? 'opacity-100' : 'opacity-0'}`}>{errors.password}</p>}
              </div>
              <button type="submit" className="login-button w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow-lg hover:bg-indigo-700 transition ease-in-out duration-150">Login</button>
              <a href="#" className="forgot-password text-gray-600 text-right w-full block mt-4 text-sm hover:underline">Forgot password?</a>
            </form>
            <div className="divider-or my-6 flex items-center justify-center">
              <span className="text-gray-500">OR</span>
            </div>
            <button
              aria-label="Sign in with Google"
              className="google-signin flex items-center bg-white border border-gray-300 rounded-md shadow-sm p-3 space-x-2 hover:bg-gray-50 transition ease-in-out duration-150 w-full"
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
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    className="fill-current text-yellow-500"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    className="fill-current text-red-500"
                  ></path>
                </svg>
              </div>
              <span className="text-sm text-gray-700 font-medium">Sign in with Google</span>
            </button>
<div class="text-gray-700 mt-4 text-center">
  Not registered yet?  
  <a href="#" class="text-blue-500 font-semibold mr-3 hover:text-blue-700 focus:text-blue-700 transition-colors duration-300">
    Create an account
  </a>
</div>
            </div>
             </div>
        </div>
      </div>

  );
}

export default Login;
