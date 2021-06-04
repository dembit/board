import React from 'react';
import {  render, screen } from '@testing-library/react'
import { RenderElTestType } from '../../../../../Types/Tipes';
import LogoWithArray, { ArrowTextAlt, PropsAvatar, PropsLogoWithArray } from '../LogoWithArray';
import userEvent from '@testing-library/user-event';



describe('LogoWithArray', () => {
    let renderWrap = null as null | ((props: PropsLogoWithArray) => RenderElTestType)
    
    beforeEach(() => {
        renderWrap = (props: PropsLogoWithArray) => {
            return render(<LogoWithArray {...props} />)
        }
    })

    it('if not passed all props', () => {
        renderWrap && renderWrap({})
        expect(screen.getByText(PropsAvatar)).toBeInTheDocument()
    })

    it('if  props ("src" and "icon") not passed then set the default icon', () => {
        renderWrap && renderWrap({ avatar: { src: undefined, icon: undefined } })

        expect(screen.getAllByRole("img").length).toBe(2)
    })

    it("checking the event of a click on the arrow", () => {
  
        const mock = jest.fn();

        renderWrap && renderWrap({avatar: {}, arrowFunc: mock})
        
        let arrowEl = screen.getByAltText(ArrowTextAlt)

        userEvent.click(arrowEl)
     
        expect(mock).toHaveBeenCalled()
         

      })
})