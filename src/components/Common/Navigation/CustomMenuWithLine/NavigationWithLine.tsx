import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'



const NavigationStyle = styled.div`
  height: 100%;
  display: inline-block;
  & :not(:last-child) {
    margin-right: 40px;
  }
     
`

const StyledLink = styled(NavLink)`
   color: ${({ theme }) => theme.color ? theme.color.type1 : "#D0D1D2"  };
   font-family: Poppins;
   font-weight: 600;
   font-size: ${({ theme }) => theme.size ? theme.size.type1 : "12px"};
   line-height: 24px;
   position: relative;
   height: 100%;
   display: inline-flex;
   align-items: center;
  
  &.activeMenu {
    color: ${({ theme }) => theme.color ? theme.color.type2 : "#11263C"};
    > div {
      opacity: 1;
      
    }
  }
  

`

const LineStyle = styled.div`
   position: absolute;
   opacity: 0;
   bottom: 0;
   width: 100%;
   display: flex;
   justify-content: center;
   > span {
    width: 50%;
    height: 2px;
    background-color: ${({ theme }) => theme.color ? theme.color.type2 : "#11263C"};
   }
   
    
`

export interface PropsNavigationWithLine  {
  menuArray: {
    path: string
    text: string
  }[] | undefined,
  showLine?: boolean,
  className?: string
  

}

export const PropsMenuArray = "Required parameter menuArray"

export const NavigationWithLine: FC<PropsNavigationWithLine> = ({className, menuArray, showLine}) => {
  
  if (menuArray === undefined) {
    return <div>{PropsMenuArray}</div>
  }

  let list = menuArray.map((item, i) => <StyledLink exact={item.path === '/' ? true : false} activeClassName="activeMenu" key={i} to={item.path}>
      {item.text}
      {showLine && <LineStyle data-testid="line">
         <span></span>
      </LineStyle>}
    </StyledLink>
  )

  return (
    <NavigationStyle className={className} >
      {list}
    </NavigationStyle>
  )
}










