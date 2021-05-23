import userTypes from "./user.types";
import {
  auth,
  handleUserProfile,
  GoogleProvider,
} from "./../../firebase/utils";

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const signInUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const signUpUser =
  ({ displayName, email, password, confirmPassword }) =>
  async (dispatch) => {
    if (password !== confirmPassword) {
      const err = ["Passwords do not match"];
      dispatch({ type: userTypes.SIGN_UP_ERROR, payload: err });
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });
      dispatch({
        type: userTypes.SIGN_UP_SUCCESS,
        payload: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const resetPassword =
  ({ email }) =>
  async (dispatch) => {
    const config = {
      url: "http://localhost:3000/login",
    };
    try {
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          dispatch({ type: userTypes.RESET_PASSWORD_SUCCESS, payload: true });
          console.log("Password reset successfully");
        })
        .catch(() => {
          const err = ["Email does not exist"];
          dispatch({ type: userTypes.RESET_PASSWORD_ERROR, payload: err });

          console.log("Email does not exist");
        });
    } catch (error) {
      console.log(error);
    }
  };

export const signInWithGoogle = () => async (dispatch) => {
  try {
    await auth.signInWithPopup(GoogleProvider).then(() => {
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true,
      });
    });
  } catch (err) {}
};

export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS,
});
