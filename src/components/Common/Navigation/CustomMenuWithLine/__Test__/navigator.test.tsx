import React from 'react'
import { render, screen  } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event';
import { NavigationWithLine, PropsMenuArray, PropsNavigationWithLine } from './../NavigationWithLine';
import {RenderElTestType} from "./../../../../../Types/Tipes"




let menuArray = [
  {
    text: "menu1",
    path: "/"
  },
  {
    text: "menu2",
    path: "/menu2"
  },
  {
    text: "menu3",
    path: "/menu3"
  },

]



describe('Navigation', () => {
  let history = {} as MemoryHistory
  let renderWrap = null as null | ((props: PropsNavigationWithLine) => RenderElTestType)
  
  beforeEach(() => {
    history = createMemoryHistory();
   
    renderWrap = (props: PropsNavigationWithLine) => {
      return render(<Router history={history}>
        <NavigationWithLine {...props} />
      </Router>)
    }

  })

  it("if in component not passed value menuArray", () => {
    render(<NavigationWithLine menuArray={undefined} />)
    expect(screen.getByText(PropsMenuArray)).toBeInTheDocument()
  })

  it("Value(menuArray) passed trough the props", () => {
      
    renderWrap && renderWrap({menuArray})
     
    expect(history.location.pathname).toBe("/")

    expect(screen.getByText("menu1")).toBeInTheDocument()

    expect(screen.getAllByRole("link").length).toBe(3)

  })


  it("Change history path, change which menu is active", () => {
    

    history.push("/menu2")

    renderWrap && renderWrap({menuArray})

    expect(history.location.pathname).toBe("/menu2")

    expect(screen.getByText("menu2")).toHaveClass("activeMenu")




  })


  // By clicking on each item from the menu.
  //  We change which active item from menu is active
  // And change URL
  it("click on each item", async () => {

    renderWrap && renderWrap({menuArray, showLine:true})
     
    expect(history.location.pathname).toBe("/")

    userEvent.click(screen.getByText("menu3"))

    expect(history.location.pathname).toBe("/menu3")

  
 
  })


  it("showLine item menu", () => {
    renderWrap && renderWrap({menuArray, showLine:true})

    expect(screen.queryAllByTestId("line").length).toBe(3)

  })

  it("hidden Line items menu", () => {
    renderWrap && renderWrap({menuArray, showLine: false})

    expect(screen.queryAllByTestId("line").length).toBe(0)

  })

  it("hidden Line items menu if not passed props ShowLine", () => {
    renderWrap && renderWrap({menuArray})

    expect(screen.queryAllByTestId("line").length).toBe(0)

  })


})









