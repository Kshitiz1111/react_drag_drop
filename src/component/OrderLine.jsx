import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import {setDragEle, setDragOverDiv, checkTarget, mouseLeave, changePositionOnDrop} from '../slice/dragSlice';
const OrderLine = ()=>{
   const Orders = useSelector((state)=> state.toggleCard.newCards);
   const validTarget = useSelector((state)=> state.toggleCard.validTarget);
   const dispatch = useDispatch();

   // ondragstart, is called immediately the element dragged.
   // Usually the content to be dragged about is set at this point.
   function dragStart(e,order){
      dispatch(setDragEle(order.location));
      console.log(order.location);
      e.dataTransfer.setData("text/plain",JSON.stringify(order))
   }
   function dragOver(e){
      e.preventDefault();
      dispatch(setDragOverDiv(1))
      dispatch(checkTarget())
      if(validTarget){
         e.currentTarget.style.border="2px dashed green";
      }
   }
   function dragLeave(e){
      e.preventDefault();
      dispatch(mouseLeave());
      e.currentTarget.style.border='1px solid red';
   }
   function dragDropped(e){
      var data = e.dataTransfer.getData("text/plain");
      console.log(data);
      dispatch(changePositionOnDrop(JSON.parse(data)))
      e.currentTarget.style.border='1px solid red';
   }

   return(
      <>
      <span>1</span>
      <div 
         id="1"
         onDragOver={(e)=>dragOver(e)}
         onDragLeave={(e)=>dragLeave(e)}
         onDrop={(e)=>dragDropped(e)}

         style={{border: "1px solid red",padding:"20px",margin:"5px"}}>
         {
            Orders.map((order)=>{
               return(
                  <div
                     id={order.name}
                     key={order.name} 
                     draggable='true' 
                     onDragStart={(e)=>dragStart(e,order)}

                     style={{border: "2px solid black",padding:"2px",background: 'red',color:"white"}}>
                     <span>{order.name}</span>
                  </div>
               )
            })
         }
      </div>
      </>
   )
}

export{OrderLine}