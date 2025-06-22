import { useEffect, useState } from 'react';

const Cell = ({ 
  rowIndex, 
  cellID, 
  data, 
  setData, 
  animateOpacity = false, 
  isRunning = false, 
  isDisabled = false,
  value // Added from Table component
}) => {
  const [cellValue, setCellValue] = useState(value);

  // Sync with external data changes
  useEffect(() => {
    setCellValue(data[rowIndex][cellID] ?? '');
  }, [data, rowIndex, cellID]);

  const handleChangeValue = (e) => {
    const newValue = e.target.value;
    setCellValue(newValue);
    
    const newData = [...data];
    newData[rowIndex][cellID] = newValue;
    setData(newData);
  };

  // Get background color safely
  const getBackgroundColor = () => {
    return isRunning && data[rowIndex]?.bgColor?.[cellID] 
      ? data[rowIndex].bgColor[cellID] 
      : 'transparent';
  };

  // Get border style safely
  const getBorderStyle = () => {
    const bgColor = data[rowIndex]?.bgColor?.[cellID];
    return isRunning && bgColor === 'rgba(0, 143, 90, 0.6)' 
      ? '3px solid' 
      : '1px solid';
  };

  return (
    <td 
      className={`py-3 transition-all duration-500 ease-in-out ${
        animateOpacity ? 'opacity-50' : 'opacity-100'
      }`}
      style={{ 
        backgroundColor: getBackgroundColor(),
        border: getBorderStyle(),
        borderColor: '#e5e7eb' // Default tailwind gray-200
      }}
    >
      <input
        type="text"
        value={cellValue ?? ''}
        onChange={handleChangeValue}
        placeholder={isRunning ? "-" : "0"}
        className={`bg-transparent w-full text-center focus:outline-none ${
          isRunning || isDisabled ? 'cursor-not-allowed' : 'cursor-text'
        }`}
        disabled={isRunning || isDisabled}
        aria-label={`Cell ${rowIndex}-${cellID}`}
      />
    </td>
  );
};

export default Cell;