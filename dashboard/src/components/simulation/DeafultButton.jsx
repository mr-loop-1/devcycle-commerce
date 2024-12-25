// import { useState } from 'react';
// import { Button } from './ui/button';
// import { LoadingSpinner } from './Spinner';
// import createFeatures from '@/lib/createFeatures';
// import createProject from '@/lib/createProject';
// import setVariations from '@/lib/setVariations';
// import createTargets from '@/lib/createTargets';
// import showToast from './errorToast';
// import { useToast } from '@/hooks/use-toast';

// export default function InitButton({
//   remoteSetup,
//   setRemoteSetup,
//   setTargetState,
//   setProjectKey,
//   apiKey,
//   error,
//   setError,
// }) {
//   const [loading, setLoading] = useState(false);
//   const { toast } = useToast();

//   const handleSetup = async () => {
//     try {
//       setLoading(() => true);
//       // setError(() => null);

//       const projectKeyResponse = await createProject({ apiKey });
//       console.log('🚀 ~ handleSetup ~ projectKeyResponse:', projectKeyResponse);
//       if (projectKeyResponse.type != 'success') {
//         showToast(toast, projectKeyResponse.type);
//         setError(() => projectKeyResponse.type);
//         return;
//       }
//       {
//         "koier": "asdewq",
//         "": ""
//       }
//       setProjectKey(() => projectKeyResponse.data);
//       const featuresDataResponse = await createFeatures({
//         apiKey,
//         projectKey: projectKeyResponse.data,
//       });
//       console.log(
//         '🚀 ~ handleSetup ~ featuresDataResponse:',
//         featuresDataResponse
//       );
//       if (featuresDataResponse.type != 'success') {
//         showToast(toast, featuresDataResponse.type);
//         setError(() => featuresDataResponse.type);
//         return;
//       }
//       const variationIds = setVariations(featuresDataResponse.data);

//       setVariationIds(() => variationIds);

//       const targetsDataResponse = await createTargets(
//         apiKey,
//         projectKeyResponse.data,
//         variationIds
//       );
//       console.log(
//         '🚀 ~ handleSetup ~ targetsDataResponse:',
//         targetsDataResponse
//       );
//       if (targetsDataResponse.type != 'success') {
//         showToast(toast, targetsDataResponse.type);
//         setError(() => targetsDataResponse.type);
//         return;
//       }
//       setTargetState(() => targetsDataResponse.data);

//       setRemoteSetup(() => true);
//     } catch (err) {
//       console.log('🚀 ~ handleSetup ~ err:', err);
//       showToast(toast, 'unknownError');
//       setError(() => 'unknownError');
//     } finally {
//       setLoading(() => false);
//     }
//   };

//   // highlight the button if error is dataError
//   return (
//     <div className="mt-4">
//       <Button
//         className="bg-blue-700"
//         onClick={handleSetup}
//         disabled={remoteSetup || loading || error == 'apiError'}
//       >
//         Set Feature Defaults {loading && <LoadingSpinner />}
//       </Button>
//       <div className="mt-2 mb-4">
//         {loading && (
//           <span className="text-blue-700 text-sm font-semibold">
//             Creating project...
//             <br />
//             Creating features, variables, variations
//             <br />
//             Applying defaults
//           </span>
//         )}
//         {remoteSetup && (
//           <span className="text-lime-700 text-sm font-semibold">
//             devcycle setup successfully
//           </span>
//         )}
//         {error == 'dataError' && (
//           <span className="text-red-700 text-sm font-semibold">
//             There seems to be some problem synchornising the features with
//             devcycle. The data is found to be out-of-order or invalid
//           </span>
//         )}
//         {error == 'unkownError' && (
//           <span className="text-red-700 text-sm font-semibold">
//             Unkown error has occured. The project data may have been corrupted.
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }
