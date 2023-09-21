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
   *
   */
  const validInputPattern =
    /^(?![@.]*$)(?=.*[a-zA-Z._@])[a-zA-Z0-9\s@._]*[a-zA-Z0-9@.]$/;
  const isInputNotValid = (value) => {
    return !validInputPattern.test(value);
  };
  /**
   * Regular expression for validating email addresses.
   *
   * This regular expression enforces the following rules for a valid email address:
   * - The local part (before the '@' symbol) can contain letters, digits, dots, underscores, and hyphens.
   * - There must be exactly one '@' symbol.
   * - The domain part (after the '@' symbol) can contain letters, digits, dots, and hyphens.
   * - There must be at least one dot in the domain part.
   * - The top-level domain (TLD) must consist of two or more letters.
   *
   * @type {RegExp}
   */
  const validEmailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const isEmailNotValid = (value) => {
    return !validEmailPattern.test(value);
  };
  /**
   * Regular expression for validating suite or unit numbers.
   *
   * This regular expression enforces the following rules for a valid suite or unit number:
   * - It must start with one or more alphabetical characters (letters).
   * - An optional (dot) can follow the letters.
   * - An optional space can follow the period (if present).
   * - It must end with one or more numerical digits.
   *
   * @type {RegExp}
   */
  const validSuitePattern = /^[a-zA-Z]+[.]?[ ]?[0-9]+$/;
  const isSuiteNotValid = (value) => {
    return !validSuitePattern.test(value);
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
        } else if (isEmailNotValid(value)) {
          setValidationErrors((prevState) => ({
            ...prevState,
            email: 'Please enter a valid email address `@mail.com`',
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
        if (value.suite.length === 0) {
          setValidationErrors((prevState) => ({
            ...prevState,
            suite: 'Suite is required',
          }));
        } else if (isInputNotValid(value.suite)) {
          setValidationErrors((prevState) => ({
            ...prevState,
            suite: 'Define suite type (apartment, villa) and suite number only',
          }));
        } else if (isSuiteNotValid(value.suite)) {
          setValidationErrors((prevState) => ({
            ...prevState,
            suite:
              'You must define suite type and suite number only. EXAMPLE: Apt.254',
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
