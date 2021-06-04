import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { BlueButtonStyle } from '../../../Styles/styleComponent'
import ImgWitText from '../ImgWithText/ImgWithText'
import Arrow from "./img/arrow.svg"

const AddCardWrapStyle = styled.form`
      width:100%;
`
const AddCarStyle = styled.div`
      display: flex;
      justify-content: space-between;
`

const AddCarInputStyle = styled.div`
  margin-bottom: 16px;
      > textarea {
          width: 100%;
          height: 52px;
          box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
          border-radius: 2px;
          border: 0
      }
`


interface Props {
    textNotAct?: string
    imgNotActive?: string
    imgActive?: string
    textActiveLeft?: string
    textActiveRight?: string
    plh?: string
    getValue: (value: string) => void
}
let textNotActDf = "Добавить еще одну карточку"
let activeDfLeft = "Добавить карточку"
let activeDfRight = "Отмена"
let plhDf = "Введите текст карточки" 
let imgDf = Arrow

const AddCard: FC<Props> = ({ 
     textNotAct = textNotActDf,
     textActiveLeft = activeDfLeft, 
     textActiveRight = activeDfRight,
     plh = plhDf,
     imgActive = imgDf,
     imgNotActive = imgDf,
     getValue
     
    }) => {

    const [isActive, setIsActive] = useState(false)
    const [value, setValue] = useState("")

    if (!isActive) {
        return <ImgWitText callback={() => setIsActive(true)} text={textNotAct} img={imgNotActive} />
    }


    return <AddCardWrapStyle onSubmit={(e) => ClickButton(e)} >
        <AddCarInputStyle>
            <textarea
             required
             placeholder={plh}
             value={value}
             onChange={(e) => setValue(e.target.value)}
              />
        </AddCarInputStyle>
        <AddCarStyle>
            <BlueButtonStyle>
                {textActiveLeft}
            </BlueButtonStyle>
            <ImgWitText callback={Cancel} text={textActiveRight} img={imgActive} />
        </AddCarStyle>

    </AddCardWrapStyle>

   function ClickButton(e: React.FormEvent<HTMLFormElement>) {
       e.preventDefault()
       getValue(value)
       setIsActive(false)
       setValue("")
   }

    function Cancel() {
        setIsActive(false)
        setValue("")
    }
}

export default AddCard