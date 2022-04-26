import styled from 'styled-components';

const StyledA = styled.a`
  color: #e4f515;
`;

interface Props {
  href: string;
  children: any;
}

export default function CommonA({ href, children }: Props) {
  return (
    <StyledA href={href} rel="noopener, noreferrer">
      {children}
    </StyledA>
  );
}
