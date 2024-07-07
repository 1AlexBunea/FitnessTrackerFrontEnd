import React, { useState } from 'react';
import styles from './EmailInput.module.css'; // Assuming you have a CSS module

interface EmailInputProps {
  isPassword: boolean; // Boolean prop to determine if it's a password input
  text: string;
  setVariable: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ isPassword, text, setVariable }) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    if (!inputValue) {
      setFocused(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);
      setVariable(value);
    };  

  return (
    <div className={styles.emailInput} style={{marginTop:'2%', width:'100%'}}>
      <input
        type={isPassword && !showPassword ? 'password' : 'text'}
        name="email"
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required
      />
      <label
        htmlFor="email"
        className={`${styles.label} ${focused || inputValue ? styles.active : ''}`}
      >
        {text}
      </label>
      {isPassword && (
        <button
          type="button"
          className={styles.togglePassword}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      )}
    </div>
  );
};

export default EmailInput;
