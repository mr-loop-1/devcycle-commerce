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

export default function ControlBar() {
  return (
    <div className="mx-4 md:mx-auto md:w-[80%] lg:w-[70%] shadow-2xl mt-5 py-2 border-2 flex justify-center items-center">
      <span>
        <Switch /> Turn On Inspect Mode
      </span>
      <span className="mx-3">
        <Dialog>
          <DialogTrigger>
            <Button>State</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </span>
      <span>
        <Dialog>
          <DialogTrigger>
            <Button>Reference</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </span>
    </div>
  );
}
