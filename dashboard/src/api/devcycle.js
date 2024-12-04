import axios from 'axios';

export const checkApiKey = async (key) => {
  try {
    const response = await axios.get('https://api.devcycle.com/v1/projects', {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });

    if (response.status == 200) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
