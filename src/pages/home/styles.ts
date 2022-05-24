import styled from 'styled-components';

export const BoxContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

export const ContainerForm = styled.form`
  display: grid;
  grid-gap: 20px;
  max-width: 600px;
  width: 100%;

  div{
    width: 100%;
    display: grid;

    label{
      font-size: 1.5rem;
      padding-bottom: 0.6rem;
    }

    input{
      border-radius: 5px;
      padding: 0.7rem;
    }

  }
`

export const ButtonSubmit = styled.button`
  padding: 1rem;
  border-radius: 5px;
  font-size: 1.5rem;
`