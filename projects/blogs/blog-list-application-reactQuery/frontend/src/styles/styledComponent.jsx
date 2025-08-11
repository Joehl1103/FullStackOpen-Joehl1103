import styled from 'styled-components'

export const Button = styled.button`
  background: #ffd588;
  border: 2px #2d758d solid;
  margin: 5px;
  padding: 6px 12px 6px 12px ;
  min-width: 67px;
`
export const LogoutButton = styled(Button)`
  padding: 2px 5px 2px 5px;
  min-width: 0px;
`
export const SmallButton = styled(Button)`
  min-width: 0px;
  padding: 2px 5px 2px 5px;
  margin: 5px 0 0 0;
`

export const LikeButton = styled.button`
  background:rgb(217, 233, 239);
  border: 0;
  padding: 3px;
  border-radius: 30px;
  min-width: 0px;
  margin-left:5px;
`

export const Input = styled.input`
  width: 150px;
  border: 1px black solid;
  background: #fdf2dd; 
`

export const TextArea = styled.textarea`
  width: 150px;
  border: 1px black solid;
  background: #fdf2dd; 
`

export const Label = styled.label`
  width: 65px;
  padding: 2px 10px 2px 2px;
  display: inline-block;
`
export const Nav = styled.div`
  background: #9a6572;
  padding: 10px;
  display: flex;
  flex-direction: row;
  border: 2px #4a2d34 solid;
`
export const LoggedInDiv = styled.div`
  backgound:  
`

export const ContainerDiv = styled.div`
  display:flex;
  flex-direction:column;
  justify-content: start;
  border: 3px #202050 solid;
  background:rgb(182, 220, 235);
  margin: 0;
  padding: 10px;
`

export const MinorContainerDiv = styled(ContainerDiv)`
   border: 2px rgb(91, 91, 132) solid;
   margin: 5px;
   background:rgb(197, 224, 235);
`

export const HR = styled.hr`
  color: #202050;
  width: 100%;
  border: none;
  border-top: 2px solid #202050;
  margin: 10px 0;
`