export const dispatchWithPromise = (dispatch, action) => (...params) =>
  new Promise((resolve, reject) =>
    dispatch({
      ...action(...params),
      resolve,
      reject,
    }));
