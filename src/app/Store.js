import {configureStore} from '@reduxjs/toolkit';
import ToggleCards  from '../slice/dragSlice';

export const store = configureStore({
   reducer:{
      toggleCard: ToggleCards,
   }
})