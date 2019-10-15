export interface IOAuthFormProps {
  onChangeToken: (event: React.FormEvent<HTMLInputElement>) => void;
  onSubmitToken: (event: React.SyntheticEvent) => void;
}
