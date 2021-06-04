import React, { FC, useState } from 'react'
import styled from "styled-components"
import { moveCartThunk, setColumn, setNewTextOfCard, setText } from '../../Redux/reducers/boardReducer/boardReducer'
import { getUniqueKey, useAppDispatch, useAppSelector } from '../../VariablesAndFunc/Functions'
import PopUpWithInput from '../Common/PopUps/PopWithInput/PopUpWithINput'
import Card, { BoardEndType, BoardStartType, BoardType, ItemType } from './Card/Card'
import useActivePopUp from './../Common/PopUps/useInstallPopUp';
import CardTitle from './CardTitle/CardTitle'




const WrapCardsStyle = styled.div`
  padding: 36px 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 24px;

`
const PreviewTextStyle = styled.div`
     padding: 24px;
     display: grid;
     grid-template-columns: 1fr 1fr;
     grid-template-rows: 1fr;

     p {
      margin: 0;
      }


`

interface Props {

}




const Cards: FC<Props> = () => {
    let boards = useAppSelector((state) => state.boardReducer.boards)
    let dispatch = useAppDispatch()

    let [currentEl, setCurrentEl] = useState<ItemType | null>(null)

    let { content, setContent, isActive, setIsActive } = useActivePopUp<string>()

    return <>
        <PreviewTextStyle>
            <div>
                <p>На этой странице мы видим мини доску для постановки задач. </p>
                <p>Каждую задачу мы можем перетаскивать из одного блока в другой(Drag and Drop).</p>
                <p>Можем изменять текст задачи и добавлять задачу.</p>
                <p>Можем создавать множество блоков с задачами.</p>

                <p>Инструменты:</p>
                <p>Webpack, CreateReactApp, React, StyledComponent, ReduxToolKit, Typescript, Drag and Drop.</p>
            </div>
            <div>
                <p>On this page we can see a mini board for creating tasks.</p>
                <p>We can drag each task from one block to another(Drag and Drop).</p>
                <p>Also we can change the text of the task and add a task.</p>
                <p>We can create a many blocks with tasks.</p>

                <p>Tools:</p>
                <p>Webpack, CreateReactApp, React, StyledComponent, ReduxToolKit, Typescript, Drag and Drop.</p>

            </div>

        </PreviewTextStyle>
        <CardTitle getDataValue={getDataValue} />
        <WrapCardsStyle>
            {boards.map(board => <Card addNewCard={addNewCard} cardClick={CardClick} moveItem={moveItem} key={getUniqueKey()} board={board} />)}
        </WrapCardsStyle>
        {content && <PopUpWithInput isActive={isActive} text={content} setIsActive={setIsActive} buttonClick={ButtonClick} />}
    </>

    function addNewCard(value: string, board: BoardType) {
        dispatch(setNewTextOfCard({ value, board, boards }))
    }

    function getDataValue(title: string, text: string) {
        dispatch(setColumn({ title, text }))
    }

    function CardClick(item: ItemType) {
        setContent(item.text)
        setIsActive(true)
        setCurrentEl(item)
    }

    function ButtonClick(value: string) {
        if (!currentEl) {
            console.log("set Current element from function CardClick")
            return
        }
        dispatch(setText({ value, item: currentEl, boards }))
        setIsActive(false)
    }



    //get initial and final state
    function moveItem(from: BoardStartType | null, to: BoardEndType) {
        dispatch(moveCartThunk({ from, to }))

    }



}

export default Cards