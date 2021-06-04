import React, { FC, useState } from 'react';
import styled from 'styled-components'
import { BlueButtonStyle } from '../../../Styles/styleComponent';

const TitleCardsStyle = styled.form`
  padding: 24px 24px 0 24px;
  display: inline-grid;
  grid-column-gap: 24px;
  grid-template-columns: repeat(3, auto);
  input { 
    border: 1px solid #c1b1b1;
    border-radius:5px;
    padding: 0 12px;
  }
  
`

interface Props {
    getDataValue: (title: string, text: string) => void
}

let plhTitle = "typing column title"
let plhName = "typing column text"

const CardTitle: FC<Props> = ({ getDataValue }) => {
    const [text, setText] = useState("")
    const [title, setTitle] = useState("")


    return <TitleCardsStyle onSubmit={(e) => {
        e.preventDefault()
        getDataValue(title, text)
        setText("text")
        setTitle("title")
    }}>
        <BlueButtonStyle >
            Add column
    </BlueButtonStyle>
        <input type="text" required placeholder={plhTitle} value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" required placeholder={plhName} value={text} onChange={(e) => setText(e.target.value)} />
    </TitleCardsStyle>
}

export default CardTitle