import React, { useState } from 'react';

interface MonthSelectorProps {
  onChange: (num: number) => void
}

const MonthSelector = (props: MonthSelectorProps) => {
  const {
    onChange
  } = props
  // Definimos un estado para almacenar el mes seleccionado
  const [selectedMonth, setSelectedMonth] = useState('');

  // Manejador de cambio para actualizar el mes seleccionado
  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
    onChange(event.target.value)
  };

  return (
    <div>
      <h2>Select your month</h2>
      {/* Utilizamos un select para mostrar la lista de meses */}
      <select value={selectedMonth} onChange={handleChange}>
        <option value="">Seleccione un mes</option>
        <option value="1">Enero</option>
        <option value="2">Febrero</option>
        <option value="3">Marzo</option>
        <option value="4">Abril</option>
        <option value="5">Mayo</option>
        <option value="6">Junio</option>
        <option value="7">Julio</option>
        <option value="8">Agosto</option>
        <option value="9">Septiembre</option>
        <option value="10">Octubre</option>
        <option value="11">Noviembre</option>
        <option value="12">Diciembre</option>
      </select>
    </div>
  );
};

export default MonthSelector;
