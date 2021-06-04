import React, { FC} from 'react'
import styled from "styled-components"
import { addCard } from '../../../Redux/reducers/boardReducer/boardReducer'
import { getUniqueKey } from '../../../VariablesAndFunc/Functions'
import AddCard from '../AddCard/AddCard'



const WrapItemStyle = styled.div`
  background-color: #D4D4D4;
  padding: 12px;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;

`

const ContentItemStyle = styled.div`
  overflow: hidden;
  width: 100%;
  

`

const WrapTextStyle = styled.div`
  cursor: pointer;
  background: #FFFFFF;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  margin-bottom: 12px;
  word-break: break-word;

  & > div {

    padding: 8px 17px 8px 12px;
  }
  
  & > span {
    font-size: 15px;
    line-height: 18px;
    color: #212934;
    display: block;
  }

`

const TitleStyle = styled.div`
  margin-bottom: 16px;
  height: 20px;
  & > span {
    font-size: 15px;
    line-height: 18px;
    color: #404B5A;

  }

`





export interface BoardStartType {
    boardFrom: BoardType
    itemFrom: ItemType 
}

export interface BoardEndType {
    boardTo: BoardType
    itemTo: ItemType | null
}



export interface BoardType {
    board: number
    title: string 
    items: ItemType[] 
}

export interface ItemType {
        id: number
        text: string
}


interface Props {
    board: BoardType
    moveItem: (from: BoardStartType | null, to: BoardEndType) => void
    cardClick: (item: ItemType) => void
    addNewCard:(value: string, board: BoardType) => void

}


let startState = null as null | BoardStartType
let AddCardText = "add card"
const Card: FC<Props> = ({ board, moveItem, cardClick, addNewCard }) => {
    const { title, items } = board

    return <WrapItemStyle onDragOver={(e) => onDragOver(e)} onDrop={(e) => DropWrap(e)}>
        <ContentItemStyle  >
            <TitleStyle>
                <span>
                    {title}
                </span>
            </TitleStyle>
            {items.map(item => {
                let text = item.text
                //set maximum text length
                let maxCount = 60
                if (item.text.length >= maxCount) {
                    text = item.text.slice(0, maxCount) + "..."
                }

                return <WrapTextStyle key={getUniqueKey()}  >
                    <div
                        onDrag={(e) => onDrag(e)}
                        onDragStart={(e) => dragStart(e, board, item)}
                        draggable={true}
                        onDragOver={(e) => onDragOver(e)}
                        onDropCapture={(e) => Drop(e, item)}
                        onDragEnter={(e) => DragEnter(e)}
                        onDragLeave={(e) => DragLeave(e)}
                        onClick={() => cardClick(item)}
                        onDragEnd={(e) => {
                            let el = e.currentTarget as HTMLDivElement
                            el.style.opacity = "1"
                            el.style.backgroundColor = "#fff"
                        }}
                    >
                        {text}
                    </div>
                </WrapTextStyle>
            })}
        </ContentItemStyle>
      
          <AddCard getValue={AddCardFunc}/>
        
    </WrapItemStyle>

function AddCardFunc(value: string) {
   addNewCard(value, board)
}

//all function use this component
function dragStart(event: React.MouseEvent<HTMLDivElement, MouseEvent>, board: BoardType, item: ItemType) {
    let el = event.target as HTMLDivElement
    let parent = el.parentElement
    if (!parent) {
        return
    }
    el.style.backgroundColor = "#C7F1FF"
    parent.style.backgroundColor = "#BEBEBE"
    el.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 1px rgba(0, 0, 0, 0.25)"
    startState = {boardFrom: board, itemFrom: item}

    
}



function onDrag(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    let el = event.target as HTMLDivElement
    el.style.opacity = "0"
    

}

function onDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault() 
}

function DragEnter(event: React.DragEvent<HTMLDivElement>) {
    let el = event.currentTarget as HTMLDivElement
    el.style.backgroundColor = "#2ba92b"
    el.style.color = "#fff"

}

function DragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    let el = event.target as HTMLDivElement
    el.style.backgroundColor = ""
    el.style.color = ""

}

function Drop(event: React.DragEvent<HTMLDivElement>, item: ItemType) {
    event.preventDefault()
    moveItem(startState, {boardTo: board, itemTo: item })
    startState = null
}

function DropWrap(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    moveItem(startState, {boardTo: board, itemTo: null})
    startState = null
}

}

export default Card

