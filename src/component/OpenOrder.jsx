import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import {setDragEle, setDragOverDiv, checkTarget, mouseLeave, changePositionOnDrop} from '../slice/dragSlice';
const OpenOrder = ()=>{
   const Orders = useSelector((state)=> state.toggleCard.viewCards);
   const validTarget = useSelector((state)=> state.toggleCard.validTarget);
   const dispatch = useDispatch();

   function dragStart(e,order){
      dispatch(setDragEle(order.location));
      console.log(order.location);
      e.dataTransfer.setData("text/plain",JSON.stringify(order))
   }
   //ondragover, is added as an event listener to the element where 
   //the dragged content will be dropped. 
   //In other words, it is used to specify where the content is to be dropped.
   function dragOver(e){
      e.preventDefault();
      dispatch(setDragOverDiv(3))
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
   /**
    * ondrop, is called immediately the dragged content is released
    * on the element that contains the ondragover event listener.
    */
   function dragDropped(e){
      var data = e.dataTransfer.getData("text/plain");
      console.log(data);
      dispatch(changePositionOnDrop(JSON.parse(data)))
      e.currentTarget.style.border='1px solid red';
   }

   return(
      <>
      <span>3</span>
      <div 
         id='3' 
         onDragOver={(e)=>dragOver(e)}
         onDragLeave={(e)=>dragLeave(e)}
         onDrop={(e)=>dragDropped(e)}

         style={{position:'relative',border: "1px solid red",padding:"20px",margin:"5px"}}>
         {
            Orders.map((order)=>{
               return(
                  <div 
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

export{OpenOrder}