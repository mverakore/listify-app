import styled from "styled-components";
import { useState } from "react";

const StyledButton = styled.img`
color: white;
border: none;
width: 2.5rem;
height: 2.5rem;
z-index: 1;
`
const StyledP = styled.p`
color: #1B1B1B;
font-weight: 600;
font-size: 1rem;
font-family: 'Epilogue', sans-serif;
margin: 0.5em 0rem 0rem 0rem;
`
const Cont = styled.div`
display: flex;
width: 100%;
flex-direction: row;
align-items: center;
justify-content: flex-end;
gap: 1rem;
z-index: 1;
`
const StyledBack = styled.button`
background-color: #1B1B1B;
color: white;
font-weight: 700;
border: none;
padding: 1rem 3rem;
font-size: 1.2rem;
font-family: 'Epilogue', sans-serif;
border-radius: 15px;
&:hover {
    background-color: #4F4F4F;
    cursor: pointer;
`
const ButtonCont = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
justify-content: flex-start;
width: 100%;
margin-bottom: 3rem;
`

const EachCont = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 0.5rem 1rem;
background-color: ${props => props.bgColor || "white"};
border-radius: 15px;
&:hover {
    cursor: pointer;
    background-color: #E7DCFF;
    border-radius: 15px;
}
`

export function AddList({
    onHandleClick = () => {},
    onHandleDelete = () => {},
    onHandleEdit = () => {},
})

{

    const [bgColor, setBgColor] = useState("white");
    const [clicked, setClicked] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [edited, setEdited] = useState(false);

    const color = () => {
        setBgColor(clicked ? "white" : "#E7DCFF");
        setClicked(!clicked);
      }

      const deletecolor = () => {
        setBgColor(deleted ? "white" : "#E7DCFF");
        setDeleted(!deleted);
      };

      const editcolor = () => {
        setBgColor(edited ? "white" : "#E7DCFF");
        setEdited(!edited);
        };

    return (
        <Cont className="addlist">
          <EachCont bgColor={clicked ? "#E7DCFF" : "white"}>
                <StyledButton src="/add.svg" onClick={() => {onHandleClick(); color();}}/>
                <StyledP>Add</StyledP>
            </EachCont> 
            <EachCont bgColor={deleted ? "#E7DCFF" : "white" }>
                <StyledButton src="/delete.svg" onClick={()=> {onHandleDelete(); deletecolor();}} />
                <StyledP>Delete</StyledP>
            </EachCont>
            <EachCont bgColor={edited ?  "#E7DCFF" : "white"}>
                <StyledButton src="/edit.svg" onClick={()=> {onHandleEdit(); editcolor();}}/>
                <StyledP>Edit</StyledP>
            </EachCont>
        </Cont>)
}

export function BackButton({ onBack = () => {} }) {
    return (
        <ButtonCont>
            <StyledBack onClick={onBack}>Back</StyledBack>
        </ButtonCont>
    )
}
