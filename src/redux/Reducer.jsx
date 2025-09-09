import { minusOne } from "./Action";
import { getAllData, postAllData } from "./Action";
const initialState ={
    myState: 10,
    storeData: []
}
const reducer =(state = initialState, action)=>{
    switch (action.type) {
        case "addOne":
                return{
                    ...state, myState: state.myState + 1
                }
              case minusOne:
                return{
                    ...state, myState: state.myState - 1
                }

                case getAllData:
                    return{
                        ...state, storeData: action.payload
                    }
                    case postAllData:
                        return{
                            ...state, storeData:[...state.storeData,action.payload]
                        }                   
                        // {obj:1},{obj:2},{obj:3},{obj:10}
    
        default:
            return state;
    }
}

export default reducer;