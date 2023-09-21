import { useState } from 'react'
import axios from 'axios';

import './App.css'

const App = () => {
  const[receiver,setReceiver]=useState('');
  const[amount,setAmount]=useState('');
  const[value,setValue]=useState('');
  const[transferring,setTransfering]=useState(false);
  const[link,setLink]=useState('');

  const handleSubmit=(e)=>{
    e.preventDefault();
    setTransfering(true);
    const url='http://localhost:3000/transfer';
    axios
    .post(url,{receiver,amount})
    .then((response)=>{
      setValue(`${amount}Eth sent to ${receiver}.View More---`);
      setLink(`https://sepolia.etherscan.io/tx/${response.data.transHash}`);
      
      setReceiver('');
      setAmount('');
      setTransfering(false);
    })
    .catch((error)=>{
      console.log(error);
      setTransfering(false);

    });
  }


  return (
    <>
 <form onSubmit={handleSubmit}>
 <label>ReceiverAddress</label>
   <input type="text"
   placeholder='Enter the address of Receiver'
   value={receiver}
   onChange={(e)=>setReceiver(e.target.value)}
   /><br></br>


   <label>Amount</label>
   <input type="number" 
   placeholder='please Enter the Amount in Wei'
   value={amount}
   onChange={(e)=>setAmount(e.target.value)}
   /><br></br>
 

 {transferring?(<button type='submit'>Send</button>):(<button type='button'>Transferring!!!</button>)}

 </form>
      
    </>
  )
}

export default App
