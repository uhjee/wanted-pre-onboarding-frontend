import styled from 'styled-components';
import { forwardRef, ReactNode, Ref } from 'react';

const StyledContainer = styled.div`
  border-bottom: 2px solid #666;
  box-sizing: border-box;
  padding: 18px;
  flex: 1;
  overflow-y: scroll;

  & > * {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

interface Props {
  children: ReactNode;
}

export const Container = forwardRef((props: Props, ref?: Ref<HTMLDivElement>) => (
  <StyledContainer ref={ref}>{props.children}</StyledContainer>
));
