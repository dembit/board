import React, { FC, useEffect, useState } from 'react';
import styled from "styled-components"
import { BlueButtonStyle } from '../../../../Styles/styleComponent';
import { ItemType } from '../../../Cards/Card/Card';


const PopUpWrapStyle = styled.div`
   position: fixed;
   width:100vw;
   top: 0;
   left: 0;
   z-index: 1000;
   display: flex;
   justify-content: center;


`

const PopUpFonStyle = styled.div`
   position: fixed;
   width:100vw;
   height:100vh;
   background: rgba(63, 63, 63, 0.45);
   top: 0;
   left: 0;
   z-index: 1000;
   cursor: pointer;
`

const PopUpStyle = styled.div`
    position: relative;
    z-index: 10001;
    justify-content: center;
    margin-top: 40px;

    & > div {
        min-width: 300px;
        max-width: 60vw;
        padding: 16px;
        background: #D4D4D4;
        border-radius: 5px;
    }
  
`

const PopUpTitleStyle = styled.div`
    padding: 4px 17px 4px 4px;
    background-color: #fff;
    margin-right: 30px;
    margin-bottom: 12px;
    & > span {
        font-weight: bold;
        font-size: 24px;
        line-height: 28px;
        color: #212934;
        word-break: break-word;
    }
`

const PopUpTextStyle = styled.div`
   & > textarea {
       min-height: 92px;
       width: 100%;
       outline: none;
   }
    
  
`



interface Props {
    isActive: boolean;
    text: string;
    textButton?: string
    placeholder?: string
    setIsActive: (data: boolean) => void
    buttonClick: (input: string) => void
}

let plhDefault = "Описание"
let buttonDefault = "Coxранить"

const PopUpWithInput: FC<Props> = ({ isActive, text, textButton, placeholder, setIsActive, buttonClick }) => {

    const [value,  setValue] = useState(text)

    useEffect(() => {
       setValue(text)
    }, [isActive])

    if (!isActive) {
        return <div></div>
    }

    return <PopUpWrapStyle >
        <PopUpFonStyle onClick={() => setIsActive(!isActive)} />
        <PopUpStyle>
            <div>
                <PopUpTitleStyle>
                    <span>
                        {value}
                    </span>
                </PopUpTitleStyle>
                <PopUpTextStyle>
                    <textarea
                        value={value}
                        placeholder={placeholder ? placeholder : plhDefault}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </PopUpTextStyle>
                <BlueButtonStyle onClick={() => buttonClick(value)}>
                    {textButton ? textButton : buttonDefault}
                </BlueButtonStyle>
            </div>
        </PopUpStyle>
    </PopUpWrapStyle>

    function ButtonFallback() {
        
    }
}

export default PopUpWithInput