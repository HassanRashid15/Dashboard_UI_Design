import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(); // Initialize Firebase Auth

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [teamName, setTeamName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    teamName: '',
    companyName: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const validate = () => {
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      teamName: '',
      companyName: '',
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!teamName) {
      newErrors.teamName = 'Team Name is required';
      valid = false;
    }

    if (!companyName) {
      newErrors.companyName = 'Company Name is required';
      valid = false;
    }

    if (showPasswordFields) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
      if (!password) {
        newErrors.password = 'Password is required';
        valid = false;
      } else if (!passwordRegex.test(password)) {
        newErrors.password =
          'Password must be at least 6 characters long and include at least one uppercase letter and one special character';
        valid = false;
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = 'Confirm Password is required';
        valid = false;
      } else if (confirmPassword !== password) {
        newErrors.confirmPassword = 'Passwords do not match';
        valid = false;
      }
    }

    setErrors(newErrors);

    if (valid && !showPasswordFields) {
      setShowPasswordFields(true);
    }

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (showPasswordFields) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log('User created successfully:', user);
            toast.success('Your account has been created successfully!');
            // Start transition
            setTransitioning(true);
            // Delay redirection after the transition
            setTimeout(() => {
              navigate('/login');
            }, 2000); // Adjust time to match transition duration
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              setErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Email already in use',
              }));
              toast.error('Email already in use');
            } else {
              const errorMessage = error.message;
              console.error('Error creating user:', error.message);
              toast.error('Error creating user: ' + errorMessage);
            }
          });
      }
    }
  };

  const handleBack = () => {
    setShowPasswordFields(false);
  };

  return (
    <div className={`flex min-h-screen bg-gray-100 ${transitioning ? 'transitioning' : ''}`}>
      {/* Left Side: Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md relative">
          <h1 className="text-2xl font-semibold my-5 pt-2 text-gray-800">Sign up for TeamPassword</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Wrapper to enforce consistent height */}
            <div className="relative">
              {/* First Form */}
              <div
                className={`transition-opacity duration-500 ${showPasswordFields ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              >
                <div className="mb-5">
                  <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">Team Name</label>
                  <input
                    type="text"
                    id="teamName"
                    name="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.teamName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  <p className={`mt-1 text-sm text-red-600 ${errors.teamName ? 'block' : 'hidden'}`}>{errors.teamName}</p>
                </div>
                <div className="mb-5">
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  <p className={`mt-1 text-sm text-red-600 ${errors.companyName ? 'block' : 'hidden'}`}>{errors.companyName}</p>
                </div>
                <div className="mb-5">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  <p className={`mt-1 text-sm text-red-600 ${errors.email ? 'block' : 'hidden'}`}>{errors.email}</p>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Next
                </button>
              </div>

              {/* Second Form */}
              <div
                className={`transition-opacity duration-500 ${showPasswordFields ? 'opacity-100' : 'opacity-0 pointer-events-none'} absolute top-0 left-0 w-full h-full`}
              >
                <div className="mb-5">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <p className={`mt-1 text-sm text-red-600 ${errors.password ? 'block' : 'hidden'}`}>{errors.password}</p>
                </div>
                <div className="mb-5">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={confirmPasswordVisible ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`mt-1 block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    />
                    <button
                      type="button"
                      onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <p className={`mt-1 text-sm text-red-600 ${errors.confirmPassword ? 'block' : 'hidden'}`}>{errors.confirmPassword}</p>
                </div>
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-4"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right Side: Placeholder */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-200">
        <h2 className="text-3xl font-bold text-gray-700">Join Us Today!</h2>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Signup;
