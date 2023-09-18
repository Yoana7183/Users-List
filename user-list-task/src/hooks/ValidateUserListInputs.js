import { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * ValidateUserListInputs component handles input validation for user data fields.
 *
 * This component receives the `type`, `value`, and `setValidationErrors` props to
 * determine the type of validation to perform and update validation errors accordingly.
 * It checks for various validation conditions for different types of user data fields
 * such as username, email, street, suite, and city.
 *
 * @component
 * @param {string} props.type - The type of input field to validate (e.g., 'username', 'email').
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.setValidationErrors - A function to set validation errors based on the type.
 * @returns {null} This component does not render any visible UI elements.
 */
const ValidateUserListInputs = ({ type, value, setValidationErrors }) => {
  /**
   * Regular expression pattern to validate user input.
   * Allows letters, digits, spaces, "@", ".", "_", but do not allow spaces or "@" or "." symbols without any letters.
   *
   * @type {RegExp}
   */

  const validEmailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const validInputPattern =
    /^(?![@.]*$)(?=.*[a-zA-Z._@])[a-zA-Z0-9\s@._]*[a-zA-Z0-9@.]$/;
  const validSuitePattern = /^[a-zA-Z]+[.]?[ ]?[0-9]+$/;

  const isEmailNotValid = (value) => {
    return !validEmailPattern.test(value);
  };
  const isSuiteNotValid = (value) => {
    return !validSuitePattern.test(value);
  };
  const isInputNotValid = (value) => {
    return !validInputPattern.test(value);
  };

  useEffect(() => {
    switch (type) {
      case 'username':
        if (value.length === 0) {
          setValidationErrors((prevState) => ({
            ...prevState,
            username: 'Username is required',
          }));
        } else if (isInputNotValid(value)) {
          setValidationErrors((prevState) => ({
            ...prevState,
            username:
              'Invalid characters. It is not allowed to have only spaces or "@" or "." symbols without any letters.',
          }));
        } else {
          setValidationErrors((prevState) => ({
            ...prevState,
            username: '',
          }));
        }
        break;

      case 'email':
        if (!value) {
          setValidationErrors((prevState) => ({
            ...prevState,
            email: 'Email is required',
          }));
        } else if (isInputNotValid(value)) {
          setValidationErrors((prevState) => ({
            ...prevState,
            ema: 'Invalid characters. It is not allowed to have only spaces or "@" or "." symbols without any letters.',
          }));
        } else if (isEmailNotValid(value)) {
          setValidationErrors((prevState) => ({
            ...prevState,
            email: 'Please enter a valid email address `@`',
          }));
        } else {
          setValidationErrors((prevState) => ({
            ...prevState,
            email: '',
          }));
        }
        break;

      case 'street':
        if (value.street.length === 0) {
          setValidationErrors((prevState) => ({
            ...prevState,
            street: 'Street is required',
          }));
        } else if (isInputNotValid(value.street)) {
          setValidationErrors((prevState) => ({
            ...prevState,
            street:
              'Invalid characters. It is not allowed to have only spaces or "@" or "." symbols without any letters.',
          }));
        } else {
          setValidationErrors((prevState) => ({
            ...prevState,
            street: '',
          }));
        }
        break;

      case 'suite':
        if (value.suite.length === 2) {
          setValidationErrors((prevState) => ({
            ...prevState,
            suite: 'Suite is required',
          }));
        } else if (isInputNotValid(value.suite)) {
          setValidationErrors((prevState) => ({
            ...prevState,
            suite:
              'Invalid characters. It is not allowed to have only spaces or "@" or "." symbols without any letters.',
          }));
        } else if (isSuiteNotValid(value.suite)) {
          setValidationErrors((prevState) => ({
            ...prevState,
            suite: 'Please indicate / write the suite number',
          }));
        } else {
          setValidationErrors((prevState) => ({
            ...prevState,
            suite: '',
          }));
        }
        break;

      case 'city':
        if (value.city.length === 0) {
          setValidationErrors((prevState) => ({
            ...prevState,
            city: 'City is required',
          }));
        } else if (isInputNotValid(value.city)) {
          setValidationErrors((prevState) => ({
            ...prevState,
            city: 'Invalid characters. It is not allowed to have only spaces or "@" or "." symbols without any letters.',
          }));
        } else {
          setValidationErrors((prevState) => ({
            ...prevState,
            city: '',
          }));
        }
        break;
      default:
        setValidationErrors({});
        break;
    }
  }, [type, value, setValidationErrors]);

  return null;
};

ValidateUserListInputs.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  setValidationErrors: PropTypes.func.isRequired,
};

export default ValidateUserListInputs;
