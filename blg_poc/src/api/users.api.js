import alxConnect from './config';

export const getAllUsers = async () => {
  const { users } = alxConnect;

  try {
    const res =  await users.getAllUsers();

    return res
  } catch ({ message }) {
    console.log("message", message)
    return {
      message,
      success: false,
      payload: [],
    };
  }
};

