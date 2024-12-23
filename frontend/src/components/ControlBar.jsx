import { Switch } from '@/components/ui/switch';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Reference from './Reference';
import State from './State';
import { useInspect } from '@/contexts/inspectProvider';

export default function ControlBar() {
  const { inspect, setInspect } = useInspect();
  console.log('🚀 ~ ControlBar ~ inspect:', inspect);

  return (
    <div className="mx-4 md:mx-auto md:w-[80%] lg:w-[70%] shadow-2xl mt-8 py-2 border-2 flex justify-center items-center">
      <span>
        <Switch
          checked={inspect}
          onCheckedChange={() => setInspect(!inspect)}
        />{' '}
        Turn On Inspect Mode
      </span>
      <span className="mx-3">
        <State />
      </span>
      <span>
        <Reference />
      </span>
    </div>
  );
}
