import React, { FC, useEffect,  useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles, { StyledComponent, StyledInterface } from "styled-components"





const ButtonStyle = styles.button`

    


`
interface Person {
  age: number;
  name: string;
}

type PersonKeys = keyof Person; 

type Props = StyledComponent<"button", any, {}, never> | {}

const ButtonView1: FC<Props> = (props) => {
  
    


  return (
    <ButtonStyle {...props}>
        {props.children}
    </ButtonStyle>
  )
}

export default ButtonView1