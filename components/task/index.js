import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  height: 2rem;
  width: 2rem;
  background: white;
  font-size: 1.2rem;
  border-radius: 30px;
  color: #1B1B1B;
`

const TaskCont = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 0.5rem;
`
const StyledLabel = styled.label`
  font-size: 1.2rem;
  color: #1B1B1B;
`

export default function Task({ txt, checked, taskId, id, onHandleClick = () => {}, completed}) {
  
  return (
    <TaskCont>
      <StyledCheckbox
        checked={completed}
        onChange={onHandleClick}
        type="checkbox"
        name={txt}
      />
      <StyledLabel htmlFor={txt}>{txt}</StyledLabel>
    </TaskCont>
  );
}
