

// Name: only letters, spaces, 3-30 chars
export const validateName = (name) => {
  const regex = /^[A-Za-z\s.]{3,30}$/;
  if (!name.trim()) return 'Name is required';
  if (!regex.test(name)) return 'Name must be 3–30 letters only';
  return '';
};

// Email validation
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return 'Email is required';
  if (!regex.test(email)) return 'Invalid email format';
  return '';
};

// Password validation
export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return '';
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return '';
};
