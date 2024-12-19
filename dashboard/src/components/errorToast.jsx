import { ToastAction, ToastDescription } from '@/components/ui/toast';

export default function showToast(toast, error) {
  const errors = {
    apiInitError: 'There was a problem in initializing the Api key',
  };
  const titles = {
    apiInitError: 'Invalid Api Key',
  };
  toast({
    className:
      'top-2 left-1/2 -translate-x-1/2 flex fixed md:max-w-[420px] md:top-4',
    variant: 'destructive',
    title: titles[error],
    description: (
      <ToastDescription className="text-base">{errors[error]}</ToastDescription>
    ),
    action: <ToastAction altText="Close">Close</ToastAction>,
  });
}
