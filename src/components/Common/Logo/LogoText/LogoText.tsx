import React, { FC} from 'react'
import styled from 'styled-components'
import LogoWithArray, { PropsLogoWithArray } from '../LogoWithArray/LogoWithArray'



const LogoTextStyle = styled.div`
  display: inline-flex;
  height: 100%;
  align-items: center;
`

const TextStyle = styled.div`
   margin-right: 20px;
   font-weight: bold;
   font-size: ${({ theme }) => theme.size ? theme.size.type4 : "18px"};
   line-height: 26px;
   color: ${({ theme }) => theme.color ? theme.color.type2 : "#11263C"};
`


interface Props extends PropsLogoWithArray {
  text?: string
}

const LogoText:FC<Props> = ({avatar, text}) => {

    return <LogoTextStyle>
            {text && <TextStyle>{text}</TextStyle>}
            <LogoWithArray avatar={avatar}/>
    </LogoTextStyle>
}

export default LogoText