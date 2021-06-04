import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  BoardEndType,
  BoardStartType,
  BoardType,
  ItemType,
} from "../../../components/Cards/Card/Card";
import { AppDispatch, RootState } from "../../redux";



export const moveCartThunk = createAsyncThunk<
  void,
  moveCartThunkType,
  { dispatch: AppDispatch; state: RootState }
>("board/deleteCart", ({ from, to }, { getState, dispatch }) => {
  let { boards } = getState().boardReducer;

  if (!from) {
    console.log("column transfer error");
    return;
  }

  let { boardFrom, itemFrom } = from;
  let { boardTo, itemTo } = to;

  let indexBoardFrom = boards.indexOf(boardFrom);
  let indexItemFrom = boards[indexBoardFrom].items.indexOf(itemFrom);

  let indexBoardTo = boards.indexOf(boardTo);

  //if ItemTo undefined its means the event onDrop happened on the column
  if (!itemTo) {

    dispatch(deleteCard({indexBoard: indexBoardFrom, indexCard: indexItemFrom, boards}))

    let newState = getState().boardReducer
    let elementsCount = newState.boards[indexBoardTo].items.length

    dispatch(
      addCard({
        indexBoard: indexBoardTo,
        indexCard: elementsCount,
        item: itemFrom,
        boards: newState.boards
      })
    );
    return;
  }

  let indexItemTo = boards[indexBoardTo].items.indexOf(itemTo);
  dispatch(deleteCard({indexBoard: indexBoardFrom, indexCard: indexItemFrom, boards}))
  let newState = getState().boardReducer
  dispatch(
    addCard({
      indexBoard: indexBoardTo,
      indexCard: indexItemTo,
      item: itemFrom,
      boards: newState.boards
    })
  )

});

// Define the initial state using that type
let title = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."

const initialState = {
  boards: [
    {
      board: 1,
      title: "title1",
      items: [
        { id: 1, text: title },
        { id: 2, text: "board1_2" },
      ],
    },
    { board: 2, title: "", items: [{ id: 1, text: "board2_1" }] },
    {
      board: 3,
      title: "title3",
      items: [
        { id: 1, text: "text3_1" },
        { id: 2, text: "board3_2" },
        { id: 3, text: "text3_3" },
      ],
    },
    {
      board: 4,
      title: "title4",
      items: [
        { id: 1, text: "text4_1" },
        { id: 2, text: "board4_2" },
        { id: 3, text: "text14_3" },
      ],
    },
    {
      board: 5,
      title: "title5",
      items: [
        { id: 1, text: "text5_1" },
        { id: 2, text: "board5_2" },
        { id: 3, text: "text15_3" },
      ],
    },

  ],
};

// Define a type for the slice state
type CounterStateType = typeof initialState;

export interface moveCartThunkType {
  from: BoardStartType | null;
  to: BoardEndType;
}

export interface deleteCardType {
  indexBoard: number;
  indexCard: number;
  boards: BoardType[];
}

export interface AddCardType {
  indexBoard: number;
  indexCard: number;
  item: ItemType;
  boards: BoardType[];
}

export interface SetItemType {
  boards: BoardType[];
}

export interface SetTextType {
  item: ItemType;
  value: string
  boards: BoardType[];
}

export interface SetColumnType {
  title: string
  text: string
}

export interface SetNewTextOfCardType {
  value: string
  board: BoardType
  boards: BoardType[]
}

export const boardReducer = createSlice({
  name: "board",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<SetItemType>) => {
      state.boards = action.payload.boards;
    },
    deleteCard: (state, action: PayloadAction<deleteCardType>) => {
      let { indexBoard, indexCard, boards } = action.payload;
      state.boards = boards.map((board, index) => {
        if (index === indexBoard) {
          let items = board.items.filter((item, index) => index != indexCard);
          return {
            ...board,
            items,
          };
        }
        return board;
      });
    },
    addCard: (state, action: PayloadAction<AddCardType>) => {
      let { indexBoard, indexCard, item, boards } = action.payload;

      // check for existing el
      let itemBoard = boards[indexBoard].items.find((itemLocal) => {
        return itemLocal === item;
      });

      if(itemBoard) {
           console.log("we cant add elem because the one already exists")
           return
      }

      //add el
      state.boards = boards.map((board, index) => {
        if (index === indexBoard) {
          let copy = [...board.items]
          copy.splice(indexCard, 0, item)
          return {
            ...board,
            items: copy
          };
        }
        return board;
      });
    },

    setText: (state, action: PayloadAction<SetTextType>) => {
      let { item, value, boards } = action.payload;
      let boardIndex = null as null | number
      let itemIndex = null as null | number
 
      //find current index board and item 
      boards.map((board, indexBoard) => {
        board.items.map((itemLocal, index) => {
           if(item === itemLocal) {
             boardIndex = indexBoard
             itemIndex = index
           }
        })
        return board;
      });

      if(boardIndex === null || itemIndex === null) {
        return
      }
     
      state.boards[boardIndex].items[itemIndex].text = value
    },

    setColumn: (state, action: PayloadAction<SetColumnType>) => {
      let { title, text } = action.payload;
      let lastBoard = state.boards.length
      let newBoard =  {
        board: lastBoard,
        title,
        items: [
          { id: 1, text },
          
        ],
      }
      state.boards = [
        ...state.boards,
        newBoard
      ]
      
    },
    setNewTextOfCard: (state, action: PayloadAction<SetNewTextOfCardType>) => {
      let { value, board, boards } = action.payload;
      let index = null as null | number
      let id = null as null | number
      let items = null  as null | ItemType[]

      boards.map((boardLocal, indexBoard) => {
        if(boardLocal === board) {
           index = indexBoard
           id = boardLocal.items.length
           items = boardLocal.items
        }
        return boardLocal
      })
   
      if(index === null || id === null || items === null) {
        return 
      }
      state.boards[index].items = [...items, {id, text: value}]
      
    },
  },
  
});

export const { setItems, deleteCard, addCard, setText, setColumn, setNewTextOfCard } = boardReducer.actions;

export default boardReducer.reducer;

