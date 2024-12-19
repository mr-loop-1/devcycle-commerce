import { createProjectApi, listProjectsApi } from '@/api/devcycle';

const getMaxNumber = (arr) => {
  const commNumbers = arr
    .filter((str) => /^ecom-\d+$/.test(str))
    .map((str) => parseInt(str.split('-')[1], 10));

  return commNumbers.length > 0 ? Math.max(...commNumbers) : 0;
};

export default async function createProject({ apiKey }) {
  const response = await listProjectsApi(apiKey);
  if (response.type == 'success') {
    const allProjects = response.data;
    const projectId =
      getMaxNumber(allProjects.map((project) => project.key)) + 1;

    const data = {
      name: `ecom${projectId}`,
      key: `ecom-${projectId}`,
      description: 'project for devcycle-ecommerce by abdul samad',
      settings: {
        lifeCycle: {
          disableCodeRefChecks: true,
        },
        sdkTypeVisibility: {
          enabledInFeatureSettings: false,
        },
      },
    };

    const projectResponse = await createProjectApi(apiKey, data);

    if (projectResponse.type == 'success') {
      return {
        type: 'success',
        data: projectResponse.data.key,
      };
    }
    return projectResponse;

    // create features, variables, and variations
    // then store them in an object so that they can be referenced later
  } else {
    // apiKey was wrong or internal server error (check the status code)
    return response;
  }
}
