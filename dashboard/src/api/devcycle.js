import axios from 'axios';

export const checkApiKeyApi = async (key) => {
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

export const listProjectsApi = async (key) => {
  try {
    const response = await axios.get('https://api.devcycle.com/v1/projects', {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createProjectApi = async (key, data) => {
  const response = await axios.post(
    'https://api.devcycle.com/v1/projects',
    data,
    {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    }
  );

  return true;
};
