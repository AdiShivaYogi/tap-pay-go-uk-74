
import { RequestResetForm, RequestResetValues } from "./RequestResetForm";
import { UpdatePasswordForm, UpdatePasswordValues } from "./UpdatePasswordForm";

export type ResetFormValues = RequestResetValues | UpdatePasswordValues;

export interface ResetPasswordFormProps {
  mode: 'request' | 'update';
  accessToken?: string;
  onSubmit: (values: ResetFormValues) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  errorMessage?: string;
}

export const ResetPasswordForm = ({ 
  mode, 
  onSubmit, 
  onCancel, 
  isLoading,
  errorMessage 
}: ResetPasswordFormProps) => {
  if (mode === 'request') {
    return (
      <RequestResetForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    );
  }

  return (
    <UpdatePasswordForm
      onSubmit={onSubmit}
      onCancel={onCancel}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
};
