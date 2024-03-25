import * as S from './style';

interface FormProps {
    children: React.ReactNode;
  }

export const ContentForm = ({ children }: FormProps) => {
    return (
        <S.ContentForm>{children}</S.ContentForm>
    )
}