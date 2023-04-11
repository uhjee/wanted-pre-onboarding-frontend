import styled from 'styled-components';

export const InputWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: relative;
`;

export const Label = styled.label`
  color: #666;
`;

export const Input = styled.input`
  line-height: 1.4;
  margin-top: 4px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 2px solid #40ad3d;
  font-size: 1.6em;
  width: 100%;
  padding: 0 6px;
`;

export const InputMessage = styled.div`
  color: #666;
  position: absolute;
  margin-top: 4px;
  font-size: 0.78em;
`;