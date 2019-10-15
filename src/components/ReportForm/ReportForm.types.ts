export interface IReportFormProps {
  onChangeFormField: (
    event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) => void;
  onSubmitOptions: () => void;
}
