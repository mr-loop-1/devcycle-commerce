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

  return response.data;
};

export const createFeaturesApi = async (key, projectKey, data) => {
  const response = await axios.post(
    `https://api.devcycle.com/v1/projects/${projectKey}/features/multiple`,
    data,
    {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    }
  );

  return response.data;
};

export const createTargetsApi = async (key, projectKey, featureKey, data) => {
  const response = await axios.patch(
    `https://api.devcycle.com/v1/projects/${projectKey}/features/${featureKey}/configurations`,
    { targets: data },
    {
      params: {
        environment: import.meta.env.DEVCYCLE_ENV || 'development',
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    }
  );

  return response.data;
};
