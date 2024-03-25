import * as S from './style';

interface TitleProps {
    title: string;
}

export const TitlePage = ({ title }: TitleProps) => {
    return (
        <S.Title>{title}</S.Title>
    )
}