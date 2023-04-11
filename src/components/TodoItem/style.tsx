import styled from 'styled-components';

export const Container = styled.li`
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  padding-right: 150px;
  //width: 100%;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Text = styled.span`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1.2em;
  line-height: 1.8;
`;

export const ButtonGroupWrapper = styled.span`
  position: absolute;
  right: 0;
`;

// export const CheckBox = styled.input<>``;
