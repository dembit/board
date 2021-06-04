import React, { FC} from 'react'
import styled from 'styled-components'
import { Avatar } from 'antd';
import {AvatarProps} from 'antd/lib/avatar/avatar.d'
import {GroupProps} from 'antd/lib/avatar/group.d'
import { UserOutlined } from '@ant-design/icons';
import ArraySvg from "./img/ArrayDown.png"

const LogoArrayStyle = styled.div`
    
`

const AvatarStyle = styled(Avatar)`
    margin-right: 15px;
    border-radius: 16px;

`

const ArrowStyle = styled.img`
    transition: 0.5s;
    cursor: pointer;
    &:hover {
      transform: rotate(180deg) scale(1.1);
   
    }
    

`

export interface PropsLogoWithArray  {
   avatar?: AvatarProps & GroupProps,
   arrowFunc?: () => void
}

export const PropsAvatar = 'Required parameter props "avatar"'
export const ArrowTextAlt = "arrow"

const LogoWithArray:FC<PropsLogoWithArray> = ({avatar, arrowFunc}) => {
    
   function ArrowCallback() {
       arrowFunc && arrowFunc()
   }

   if(!avatar) {
       return <div>{PropsAvatar}</div>
    } 

    let {src, icon} = avatar
    
    // if through props not passed src(string) or icon(React.ReactNode) 
   //  set the default icon
    if(!icon && !src ) {
       avatar.icon = <UserOutlined/>
    }

    return <LogoArrayStyle>
          <AvatarStyle  {...avatar} />
          <ArrowStyle src={ArraySvg} alt={ArrowTextAlt} onClick={ArrowCallback} />
    </LogoArrayStyle>
}

export default LogoWithArray