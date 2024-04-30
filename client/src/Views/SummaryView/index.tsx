import React from 'react'

interface movement {
  "expense_id": number,
  description: string
  "quantity": number,
  "movement_type": boolean,
  "expense_date": string
}

const Summary = () => {
  const [movements, setMovements] = React.useState<movement[]>()
  const [total, setTotal] = React.useState<number>(0)
  const getMonthMovements = async () => {
    //
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
    const response = await fetch("http://localhost:5000/movements/month/4", options)
    const responseJson = await response.json()
    console.log(responseJson);
    setMovements(responseJson)
  }

  React.useEffect(() => {
    getMonthMovements();
  },[])
  React.useEffect(() => {
    if (movements) {
      const sum = movements.reduce((prev,acc) => prev + acc.quantity, 0)
      setTotal(sum)
    }
  },[movements])

  return (
    <React.Fragment>
      <h1>Montly Summary</h1>
      <div>Total: {total}</div>
    </React.Fragment>
  )
}

export default Summary