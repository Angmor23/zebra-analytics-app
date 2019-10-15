export interface IReportFormProps {
  onChangeFormField: (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmitOptions: () => void;
}
