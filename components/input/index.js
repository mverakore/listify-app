import styled from "styled-components"

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 12rem;
    margin: 0rem 0rem 5rem 0rem;
`

const StyledTaskForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
    height: 12rem;
    // margin: 0rem 0rem 5rem 0rem;
`
// const StyledBg = styled.div`
// display: flex;
// flex-direction: column;
// align-items: flex-start;
// justify-content: center;
// background-image: url('list.svg');
// background-repeat: no-repeat;
// background-position: center;
// background-size: contain;
// width: 100%;
// height: 12rem;

const StyledInput = styled.input.attrs({ type: 'text' })`
    height: 2rem;
    width: 53rem;
    background: transparent;
    font-size: 1.2rem;
    border-radius: 30px;
    padding: 0.75rem;
    font-weight: 700;
    border: 4px solid #1B1B1B;
&:focus {
    outline: none;
}
`

const StyledTaskInput = styled.input.attrs({ type: 'text' })`
    height: 2rem;
    width: 100%;
    background: white;
    font-size: 1.2rem;
    border-radius: 30px;
    padding: 0.75rem;
    font-weight: 700;
    border: 4px solid #1B1B1B;
&:focus {
    outline: none;
}
`

const InputCont = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-family: 'Epilogue', sans-serif;
`

export function NewList({onHandleSubmit = () => {}, value, onHandleChange = () => {}}) {
    return (
        <>
            <StyledForm onSubmit={onHandleSubmit}>
                <InputCont>
                <h2>Name your list</h2>
                    <StyledInput type="text" 
                    placeholder="ex. Shopping" 
                    value={value} 
                    onChange={onHandleChange} />
                </InputCont>
            </StyledForm>
        </>
    )
}

export function NewTask({onHandleSubmit = () => {}, value, onHandleChange = () => {}}) {
    return (
        <>
            <StyledTaskForm onSubmit={onHandleSubmit}>
                <InputCont>
                    <StyledTaskInput type="text" 
                    placeholder="ex. Buy milk" 
                    value={value} 
                    onChange={onHandleChange} />
                </InputCont>
            </StyledTaskForm>
        </>
    )
}