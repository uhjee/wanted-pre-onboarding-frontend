import styled, { css } from 'styled-components';

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

export const Text = styled.span<{ checked: boolean }>`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.94rem;
  line-height: 1.8;
  cursor: pointer;
  ${({ checked }) =>
    checked
      ? css`
          color: #999;
          text-decoration: line-through;
        `
      : ''}

  &:hover {
    font-weight: 600;
  }
`;

export const Input = styled.input`
  line-height: 1.7;
  margin-top: 4px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 2px solid #666;
  font-size: 1rem;
  width: 100%;
  padding: 0 6px;
  outline: none;
  &:focus {
    border: 2px solid #168a2b;
  }
`;

export const ButtonGroupWrapper = styled.span`
  position: absolute;
  right: 0;
`;
