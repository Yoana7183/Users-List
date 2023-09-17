import { useEffect } from 'react';
import PropTypes from 'prop-types';

const ValidateUserListInputs = ({ type, value, setValidationErrors }) => {
  useEffect(() => {
    switch (type) {
      case 'username':
        if (value.length == 0) {
          setValidationErrors((prevState) => ({
            ...prevState,
            username: 'Username is required',
          }));
        }
        if (value.length > 1) {
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
        } else if (!value.includes('@')) {
          setValidationErrors((prevState) => ({
            ...prevState,
            email: 'Please enter a valid email address',
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
        } else if (!/\d/.test(value.suite)) {
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
