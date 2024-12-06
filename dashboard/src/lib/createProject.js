import { createProjectApi, listProjectsApi } from '@/api/devcycle';

const getMaxNumber = (arr) => {
  const commNumbers = arr
    .filter((str) => /^ecom-\d+$/.test(str))
    .map((str) => parseInt(str.split('-')[1], 10));

  return commNumbers.length > 0 ? Math.max(...commNumbers) : 0;
};

export default async function createProject({ apiKey }) {
  try {
    const allProjects = await listProjectsApi(apiKey);
    if (allProjects) {
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

      const project = await createProjectApi(apiKey, data);

      return project.key;

      // create features, variables, and variations
      // then store them in an object so that they can be referenced later
    } else {
      // apiKey was wrong
      console.error('wrong api key');
    }
  } catch (err) {
    console.error(err);
  }
}
