import React from 'react'
import bigintToFloat from '../../utils/bigintToFloat'
import MonthSelector from '../../components/MonthSelector/MonthSelector'
import toAmountRepresentation from '../../utils/toAmountRepresentation'

interface movement {
  "expense_id": number,
  description: string
  "quantity": string,
  "movement_type": boolean,
  "expense_date": string
}

const Summary = () => {
  const [movements, setMovements] = React.useState<movement[]>()
  const [total, setTotal] = React.useState<number>(0)

  const getMonthMovements = async (month: number) => {
    //
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
    const response = await fetch(`http://localhost:5000/api/movements/month/${month}`, options)
    const responseJson = await response.json()
    console.log(responseJson);
    setMovements(responseJson)
  }

  React.useEffect(() => {
    if (movements) {
      console.log(movements);
      
      const sum = movements.reduce((prev,acc) => prev + bigintToFloat(acc.quantity)*100, 0)
      setTotal(sum)
    }
  },[movements])

  const changeMonth = (month: number) => {
    getMonthMovements(month)
  }

  return (
    <React.Fragment>
      <h1>Montly Summary</h1>
      <MonthSelector onChange={changeMonth} />
      <div>Total: {toAmountRepresentation(total)}</div>
    </React.Fragment>
  )
}

export default Summary