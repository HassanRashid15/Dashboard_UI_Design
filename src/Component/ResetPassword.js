// src/Component/ResetPassword.js
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { auth, confirmPasswordReset } from './../FirbaseAuth/Config.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ newPassword: '', confirmPassword: '' });
  const [isValidCode, setIsValidCode] = useState(false); // To track if the reset code is valid
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('oobCode');
    if (code) {
      // Verify the reset code to ensure it's valid
      auth.verifyPasswordResetCode(code)
        .then(() => {
          setIsValidCode(true);
        })
        .catch(() => {
          toast.error('Invalid or expired reset code.');
          navigate('/login');
        });
    } else {
      toast.error('Invalid or missing reset code.');
      navigate('/login');
    }
  }, [searchParams, navigate]);

  const validate = () => {
    let valid = true;
    const newErrors = { newPassword: '', confirmPassword: '' };

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
      valid = false;
    } else if (!passwordRegex.test(newPassword)) {
      newErrors.newPassword = 'Password must be at least 6 characters long and include at least one uppercase letter and one special character';
      valid = false;
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (validate()) {
      const code = searchParams.get('oobCode');
      if (code) {
        try {
          await confirmPasswordReset(auth, code, newPassword);
          toast.success('Password successfully reset!');
          setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
        } catch (error) {
          console.error('Error resetting password:', error);
          toast.error(`Failed to reset password. ${error.message}`);
        }
      } else {
        toast.error('Invalid or missing reset code.');
        navigate('/login');
      }
    }
  };

  if (!isValidCode) {
    // Optionally, show a loading state or message if you want to wait for code validation
    return <div className="p-8 text-center">Validating reset code...</div>;
  }

  return (
    <div className="reset-password-container mx-auto p-8 flex justify-center">
      <div className="reset-password-box max-w-md w-full mx-auto">
        <div className="reset-password-form bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="reset-password-content p-8">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Reset Password</h1>
            <form onSubmit={handlePasswordReset}>
              <div className="reset-password-field mb-5">
                <label htmlFor="new-password" className="reset-password-label block mb-2 text-sm font-medium text-gray-600">New Password</label>
                <input
                  type="password"
                  id="new-password"
                  name="new-password"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="reset-password-input block w-full p-3 rounded bg-gray-200 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                {errors.newPassword && <p className="reset-password-error text-red-500 text-sm mt-1">{errors.newPassword}</p>}
              </div>
              <div className="reset-password-field mb-5">
                <label htmlFor="confirm-password" className="reset-password-label block mb-2 text-sm font-medium text-gray-600">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="reset-password-input block w-full p-3 rounded bg-gray-200 border border-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                {errors.confirmPassword && <p className="reset-password-error text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
              <button type="submit" className="reset-password-button w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow-lg">Reset Password</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ResetPassword;
