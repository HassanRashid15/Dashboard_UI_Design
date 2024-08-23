import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toastify
import SuccessModal from './../Utils/SuccessModal.js'; // Adjust the path as necessary

const auth = getAuth(); // Initialize Firebase Auth

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [teamName, setTeamName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '', teamName: '', companyName: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '', confirmPassword: '', teamName: '', companyName: '' };

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
        newErrors.password = 'Password must be at least 6 characters long and include at least one uppercase letter and one special character';
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
            toast.success('Your account has been created successfully!'); // Show success toast
            setShowSuccessModal(true);
            // Optionally redirect or perform additional actions
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              setErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Email already in use',
              }));
              toast.error('Email already in use'); // Show error toast
            } else {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error('Error creating user:', errorCode, errorMessage);
              toast.error('Error creating user: ' + errorMessage); // Show generic error toast
            }
          });
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Side: Signup Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full signup-box-alignment">
          <h1 className="text-2xl font-semibold mb-0 text-gray-800">Sign up for TeamPassword</h1>
          <h6 className="font-semibold mb-6 text-gray-400">No Credit Card Required</h6>
          <form onSubmit={handleSubmit}>
            <div className="mb-5 relative">
              <input
                type="text"
                id="teamName"
                name="teamName"
                placeholder=" "
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 peer"
              />
              <label htmlFor="teamName" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-600 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-indigo-500 peer-focus:text-xs">
                Team Name
              </label>
              <p className={`text-red-500 text-sm mt-1 ${errors.teamName ? 'opacity-100' : 'opacity-0'}`}>
                {errors.teamName}
              </p>
            </div>
            <div className="mb-5 relative">
              <input
                type="text"
                id="companyName"
                name="companyName"
                placeholder=" "
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 peer"
              />
              <label htmlFor="companyName" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-600 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-indigo-500 peer-focus:text-xs">
                Company Name
              </label>
              <p className={`text-red-500 text-sm mt-1 ${errors.companyName ? 'opacity-100' : 'opacity-0'}`}>
                {errors.companyName}
              </p>
            </div>
            <div className="mb-5 relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 peer"
              />
              <label htmlFor="email" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-600 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-indigo-500 peer-focus:text-xs">
                Email
              </label>
              <p className={`text-red-500 text-sm mt-1 ${errors.email ? 'opacity-100' : 'opacity-0'}`}>
                {errors.email}
              </p>
            </div>

            {/* Conditionally Render Password Fields */}
            {showPasswordFields && (
              <>
                <div className="mb-5 relative">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full p-3 pr-10 rounded bg-gray-200 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 peer"
                  />
                  <label htmlFor="password" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-600 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-indigo-500 peer-focus:text-xs">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    {passwordVisible ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </button>
                  <p className={`text-red-500 text-sm mt-1 ${errors.password ? 'opacity-100' : 'opacity-0'}`}>
                    {errors.password}
                  </p>
                </div>
                <div className="mb-5 relative">
                  <input
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder=" "
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full p-3 pr-10 rounded bg-gray-200 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 peer"
                  />
                  <label htmlFor="confirmPassword" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-600 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-indigo-500 peer-focus:text-xs">
                    Confirm Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    {confirmPasswordVisible ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </button>
                  <p className={`text-red-500 text-sm mt-1 ${errors.confirmPassword ? 'opacity-100' : 'opacity-0'}`}>
                    {errors.confirmPassword}
                  </p>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </form>
          {showSuccessModal && <SuccessModal />}
        </div>
      </div>
      {/* Right Side: Image or Branding */}
      <div className="md:w-1/2 hidden md:flex items-center justify-center bg-blue-500 text-white">
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold mb-4">Welcome to TeamPassword</h2>
          <p className="text-lg">Secure your team's passwords easily and efficiently.</p>
        </div>
      </div>
      <ToastContainer /> {/* Make sure ToastContainer is included here */}
    </div>
  );
}

export default Signup;
