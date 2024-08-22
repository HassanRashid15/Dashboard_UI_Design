import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '', confirmPassword: '' };

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

    // Confirm password validation (matches password)
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
      valid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
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
    <div className="signup-container mx-auto p-8 flex justify-center">
      <div className="signup-box max-w-md w-full mx-auto">
        <div className="signup-form bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="signup-content p-8">
            <h1 className="signup-title text-2xl font-semibold mb-6 text-gray-800">Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <div className="signup-field mb-5">
                <label htmlFor="email" className="signup-label block mb-2 text-sm font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="signup-input block w-full p-3 rounded bg-gray-200 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <p className={`signup-error text-red-500 text-sm mt-1 ${errors.email ? 'opacity-100' : 'opacity-0'}`}>
                  {errors.email}
                </p>
              </div>
              <div className="signup-field mb-5">
                <label htmlFor="password" className="signup-label block mb-2 text-sm font-medium text-gray-600">Password</label>
                <div className="password-input-wrapper relative">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="signup-input block w-full p-3 pr-10 rounded bg-gray-200 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                <p className={`signup-error text-red-500 text-sm mt-1 ${errors.password ? 'opacity-100' : 'opacity-0'}`}>
                  {errors.password}
                </p>
              </div>
              <div className="signup-field mb-5">
                <label htmlFor="confirmPassword" className="signup-label block mb-2 text-sm font-medium text-gray-600">Confirm Password</label>
                <div className="password-input-wrapper relative">
                  <input
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Your Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="signup-input block w-full p-3 pr-10 rounded bg-gray-200 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    className="password-toggle absolute inset-y-0 right-3 flex items-center"
                  >
                    {confirmPasswordVisible ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </button>
                </div>
                <p className={`signup-error text-red-500 text-sm mt-1 ${errors.confirmPassword ? 'opacity-100' : 'opacity-0'}`}>
                  {errors.confirmPassword}
                </p>
              </div>
              <button type="submit" className="signup-button w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow-lg hover:bg-indigo-700 transition ease-in-out duration-150">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
