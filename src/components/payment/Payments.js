import React from 'react'
import { BsFillCartCheckFill } from 'react-icons/bs';
import { useParams } from 'react-router'
import { BiErrorCircle } from 'react-icons/bi';
import './Payments.scss'
import { useDispatch } from 'react-redux';
import { resetCart } from "../../redux/cartSlice";
function Payments() {
    
    const params = useParams();
    
    const dispatch = useDispatch();

    const status = params.status;

    const infoData = {
      success: {
        message: "Your order has been placed",
        cta: "Shop More",
        icon: <BsFillCartCheckFill/>,
      },
      failed: {
        message: "Payment Failed",
        cta: "Try Again",
        icon: <BiErrorCircle/>
      },
    };

    if(status === 'success') {
      dispatch(resetCart())
    }

  return (
    <div className='Payments'>
      <div className='icons'>{infoData[status].icon}</div>
      <h2 className='message'>{infoData[status].message}</h2>
         <button className='btn-primary'>{infoData[status].cta}</button>
      
    </div>
  )
}

export default Payments