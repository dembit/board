import { ThunkAction } from "redux-thunk";
import { RootState } from "../../redux";

const EXAMPLE_AC = "EXAMPLE_AC";

let initialState = {
  example: "example",
};

type InitialStateType = typeof initialState;

const Example = (state = initialState,action: CommonAction): InitialStateType => {
  switch (action.type) {
    case EXAMPLE_AC:
      return {
        ...state,
        example: action.item,
      };
    default:
      return state;
  }
};

type ExampleACType = {
  type: typeof EXAMPLE_AC;
  item: "example";
};

type CommonAction = ExampleACType;

const ExampleAC = (): ExampleACType => ({ type: EXAMPLE_AC, item: "example" });

export type AppThunk = ThunkAction<void, RootState, null, CommonAction>;

export const ExampleThunk = (): AppThunk => async (dispatch, getState) => {
  dispatch(ExampleAC());

  try {
  } catch (e) {}
};

export default Example;


