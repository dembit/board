import React, { FC, useState } from 'react'
import styled from 'styled-components'

const ImgWitTextWrapStyle = styled.div`
   display: inline-flex;
   align-items: center;
   padding: 7px 12px;
   cursor: pointer;

   &:hover {
    background: #C4C4C4;
    border-radius: 3px;
   }

   > span {
    font-size: 15px;
    line-height: 18px;
    color: #626262;
   }

   > img {
    margin-right: 13px;
   }
   
   
` 

interface Props {
   text: string
   img: string
   callback?: () => void
}

const ImgWitText: FC<Props> = ({img, text, callback}) => {

  return <ImgWitTextWrapStyle onClick={callback}>
         <img src={img} alt={text} />
         <span>{text}</span>
  </ImgWitTextWrapStyle>
}

export default ImgWitText