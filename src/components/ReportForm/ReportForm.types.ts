import { IGoal } from '../../containers/App/App.types';

export interface IReportFormProps {
  addGoal: () => void;
  delGoal: (event: React.MouseEvent, i: number) => void;
  onChangeFormField: (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  goals: IGoal[];
  onChangeGoal: (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmitOptions: () => void;
}
