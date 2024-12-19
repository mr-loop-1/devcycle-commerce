import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function PanelSwitch({ panel, setPanel }) {
  return (
    <div className="flex border border-stone-300 rounded-xl w-fit mx-auto">
      <AlertDialog>
        <AlertDialogTrigger
          className={clsx(
            'py-2 px-6 rounded-xl',
            panel == 'control' && 'bg-stone-300'
          )}
          disabled={panel == 'control'}
        >
          Control
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Switching to Control Panel will remove your progress in Simulation
              Panel. However, the changes you made in any features in this
              project will persist.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setPanel(() => 'control')}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger
          className={clsx(
            'py-2 px-6 rounded-xl',
            panel == 'simulation' && 'bg-stone-300'
          )}
          disabled={panel == 'simulation'}
        >
          Simulation
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Switching to Simulation Panel will remove your progress in Control
              Panel. However, the changes you made in any features in this
              project will persist.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setPanel(() => 'simulation')}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
