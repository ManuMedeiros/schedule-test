import * as S from "./style";

interface SectionProps {
  children: React.ReactNode;
}

export const SectionContent = ({ children }: SectionProps) => {
  return <S.Section>{children}</S.Section>;
};
