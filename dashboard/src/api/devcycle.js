import axios from 'axios';

// When api key is bad, the error usually thrown is mostly 401 and docs say 400, test both
// if some other error in 4xx, then the data has been tampered and inconsistent
// if some error in 5xx, then  server error

export const checkApiKey = async (key) => {
  try {
    // 200 and 400 possible
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
    return false;
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
      type: 200,
      data: response.data,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        type: err.response.status,
      };
    }
    return {
      type: 0,
    };
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
      type: 201,
      data: response.data,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        type: err.response.status,
      };
    }
    return {
      type: 0,
    };
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
      type: 201,
      data: response.data,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        type: err.response.status,
      };
    }
    return {
      type: 0,
    };
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
      type: 200,
      data: response.data,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        type: err.response.status,
      };
    }
    return {
      type: 0,
    };
  }
};
