import { Toast } from '@/components/Toast';
import { CustomToastOptions } from '@/components/Toast/toastDTO';
import { useToast as useToastGluestack } from '@/components/ui/toast';

export function useToast() {
  const toast = useToastGluestack();

  const show = ({
    title,
    description,
    action = 'info',
    variant = 'solid',
    placement = 'top',
    duration = 3000,
  }: CustomToastOptions) => {
    return toast.show({
      placement,
      duration,
      render: ({ id }) => (
        <Toast
          id={id}
          action={action}
          variant={variant}
          title={title}
          description={description}
        />
      ),
    });
  };

  return {
    show,
    close: toast.close,
    closeAll: toast.closeAll,
    isActive: toast.isActive,
  };
}
