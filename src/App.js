import './App.css';
import { OrderLine } from './component/OrderLine';
import { MinimizedOrder } from './component/MinimizedOrder';
import { OpenOrder } from './component/OpenOrder';

function App() {
  return (
    <div className="App" style={{padding:"5px"}}>
      <OrderLine></OrderLine>
      <MinimizedOrder></MinimizedOrder>
      <OpenOrder></OpenOrder>
    </div>
  );
}

export default App;
