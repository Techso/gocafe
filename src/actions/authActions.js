import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("localhost:5000/user/register", userData)
    .then(res => history.push("/login"))
    /*.catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );*/
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("localhost:5000/user/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => ({message: err}),
      /*dispatch({
       // type: GET_ERRORS,
        //payload: err.response.data
      })*/
      console.log("error logging in")
    );
};

export const updateUser = userData => dispatch => {
    axios.post("localhost:5000/user/update:email"+this.props.match.params.id, userData)
    .then(console.log("User update done"))
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
