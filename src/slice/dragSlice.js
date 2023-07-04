import { createSlice } from "@reduxjs/toolkit";

const toggle = (state, ...args)=>{
   const [dragOverDivPos, action] = args;
   let activeCards = null;

   if(dragOverDivPos === 1) activeCards = state.newCards;
   if(dragOverDivPos === 2) activeCards = state.minimizedCards;
   if(dragOverDivPos === 3) activeCards = state.viewCards;
   
   let temp = 0;
   activeCards.map((card)=>{
      if(card.name === action.payload.name){
         //same card found
      temp = 1;
      }
      return null;
   })

   switch(dragOverDivPos){
      case 1: 
         //if different card
         if(temp === 0){
            state.newCards = [...state.newCards, {...action.payload, location: 1 }];
            state.viewCards.pop();
         }
         break;
      case 2:
         if(temp === 0){
            state.minimizedCards = [...state.minimizedCards, {...action.payload, location: 2 }];
            state.viewCards.pop();
         }
         break;
      case 3:
         if(temp === 0){
            state.viewCards = [...state.viewCards, {...action.payload, location: 3 }];
            state.newCards = state.newCards.filter((card) => card.name !== action.payload.name )
            state.minimizedCards = state.minimizedCards.filter((card) => card.name !== action.payload.name )
         }
         break;

      default: console.log("...");
   }
}

const initialState = {
   newCards:[
      {name:'a', location:1},
      {name:'b', location:1},
      {name:'c', location:1},
      {name:'d', location:1},
   ],
   minimizedCards:[

   ],
   viewCards:[

   ],
   //dragged element
   dragEle:null,
   //dragged over div
   dragOverDiv:null,
   //valid target indicator
   validTarget:null,
}

export const ToggleCards = createSlice({
   name:"toggleCard",
   initialState,
   reducers: {
     setDragEle:(state, action)=>{
      console.log(`elePos: ${action.payload}`);
      state.dragEle = action.payload;
     },
     
     setDragOverDiv:(state, action)=>{
      console.log(`divPos: ${action.payload}`);
      state.dragOverDiv = action.payload;
     },

     checkTarget:(state,action)=>{
      /**Invalid targets
       * 1->2,2->1( sum 3 is invalid), div 3 cannot have > 1 item in it.
       **Valid targets
       * 1->3,3->1,3->2,2->3
       */
      if((state.dragEle + state.dragOverDiv) === 3 ){
         //invalid
         state.validTarget = false;
      }else{
         //valid
         state.validTarget = true;

         //invalid
         // div 3 cannot have > 1 item in it.
         console.log(state.viewCards.length)
         if(state.dragOverDiv === 3 && state.viewCards.length !== 0){
            state.validTarget = false;
            console.log("jjjj")
         }
      }
      console.log(state.validTarget);
     },

     mouseLeave:(state, action)=>{
      //state.dragEle = null;
      state.dragOverDiv = null;
      state.validTarget = false;
     },

     changePositionOnDrop:(state, action)=>{
      console.log(action.payload);
      console.log(state.dragEle + state.dragOverDiv);
      console.log(state.validTarget);

      if(state.validTarget){
         console.log("valid")
         toggle(state,state.dragOverDiv,action);
      }else{
         console.log("invalid")
      }
      state.dragOverDiv = null;
      state.validTarget = false;
     }
   }
})

export const {setDragEle, setDragOverDiv, checkTarget, mouseLeave, changePositionOnDrop} = ToggleCards.actions;
export default ToggleCards.reducer;