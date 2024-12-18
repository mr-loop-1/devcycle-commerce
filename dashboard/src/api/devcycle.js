import axios from 'axios';

// When api key is bad, the error usually thrown is mostly 401 and docs say 400, test both
// if some other error in 4xx, then the data has been tampered and inconsistent
// if some error in 5xx, then  server error
const processApiError = (err) => {
  if (axios.isAxiosError(err)) {
    if (err.response.status == 400 || err.response.status == 401) {
      return {
        type: 'apiError',
      };
    } else if (err.response.status >= 400 && err.response.status <= 499) {
      return {
        type: 'dataError',
      };
    }
    return {
      type: 'serverError',
    };
  }
  return {
    type: 'unkownError',
  };
};

export const checkApiKey = async (key) => {
  try {
    // 200 and 400 possible
    await axios.get('https://api.devcycle.com/v1/projects', {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return {
      type: 'success',
    };
  } catch (err) {
    return processApiError(err);
  }
};

export const listProjectsApi = async (key) => {
  try {
    // 200, 400 possible
    // 401 when api key problem
    const response = await axios.get('https://api.devcycle.com/v1/projects', {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });

    return {
      type: 'success',
      data: response.data,
    };
  } catch (err) {
    return processApiError(err);
  }
};

export const createProjectApi = async (key, data) => {
  try {
    // 201, 400, 409 possible
    // 409 not possible as new project
    const response = await axios.post(
      'https://api.devcycle.com/v1/projects',
      data,
      {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      }
    );

    return {
      type: 'success',
      data: response.data,
    };
  } catch (err) {
    return processApiError(err);
  }
};

export const createFeaturesApi = async (key, projectKey, data) => {
  try {
    // 201, 400, 409, 412
    // 409 and 412 not possible for this case
    const response = await axios.post(
      `https://api.devcycle.com/v1/projects/${projectKey}/features/multiple`,
      data,
      {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      }
    );

    return {
      type: 'success',
      data: response.data,
    };
  } catch (err) {
    return processApiError(err);
  }
};

// CREATE OR MODIFY both at same time
// The only api that can be called during runtime
export const createTargetsApi = async (key, projectKey, featureKey, data) => {
  try {
    // 200, 400, 404
    // 404 not possible
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

    return {
      type: 'success',
      data: response.data,
    };
  } catch (err) {
    return processApiError(err);
  }
};
