import styled from 'styled-components';

interface Props {
  image?: string;
  backgroundSize?: string;
  children: any;
}

const Wrapper = styled.div`
  background: var(--global--background-color);
  border-radius: 8px;
  height: 200px;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 64px;
`;

const FairResultGame = (props: Props) => {
  const { image, children, backgroundSize } = props;

  return (
    <Wrapper
      className="fair_result_box"
      style={{
        backgroundImage: image ? `url(${image})` : '',
        backgroundSize: backgroundSize,
      }}
    >
      {children}
    </Wrapper>
  );
};

export default FairResultGame;
