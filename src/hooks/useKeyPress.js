import { useState } from 'react'

function useKeyPress() {
  const [orders, setOrders] = useState([])

  return { orders, setOrders }
}

export default useKeyPress