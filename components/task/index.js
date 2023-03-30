import styled from "styled-components";
import { useState, useEffect } from "react";
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
&:hover {
  cursor: pointer;
}
`
const TaskBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
   width: 53rem;
  background-color: #FAF8FF;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0rem;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  positon: relative;
`

const Delete = styled.img`
  width: 2rem;
  height: 2rem;
&:hover {
  cursor: pointer;
}
`

const StyledInput = styled.input.attrs({ type: 'text' })`
  width: 100%;
  border: none;
  border-bottom: 2px solid #1b1b1b;
  background: transparent;
  font-size: 1.2rem;
&:focus {
  outline: none;
}
`

export default function Task({ txt,
  onHandleClick = () => { },
  completed,
  onHandleDelete = () => { },
  value,
  onHandleSubmit = () => { },
  onHandleChange = () => {}
}) {

  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (showEdit && !event.target.classList.contains("input") && !event.target.htmlFor) {
        setShowEdit(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showEdit]);

  return (
    <>
      <TaskBar>
        <TaskCont>
          <StyledCheckbox
            checked={completed}
            onChange={onHandleClick}
            type="checkbox"
            name={txt}
          />

          {!showEdit ?
            <StyledLabel htmlFor={txt}
              onClick={() => setShowEdit(!showEdit)}
            >{txt}</StyledLabel>
            :
            <form 
            onSubmit={onHandleSubmit}>
              <StyledInput className="input"
               type="text"
                placeholder={txt}
                value={value}
                name={txt} 
                onChange={onHandleChange}
                />
            </form>
          }

        </TaskCont>
        <Delete src="/delete_x.svg" onClick={onHandleDelete} />
      </TaskBar>
    </>
  );
}
