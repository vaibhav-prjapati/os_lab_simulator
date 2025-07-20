import { useMemo } from 'react';
import { 
  useReactTable, 
  flexRender,
  getCoreRowModel 
} from '@tanstack/react-table';
import Cell from './Cell.jsx';
import { ShinyButton } from '..';
import { ImCross } from "react-icons/im";
import { motion, AnimatePresence } from 'framer-motion';
import './Table.css';

const Table = ({ 
  data, 
  setData, 
  setNoOfProcesses, 
  animateOpacity = false, 
  columns, 
  isRunning = false, 
  isDeleteRowAllowed = true, 
  thClassName = '', 
  crossClassName = '', 
  isDisableEditing = false 
}) => {
  const spring = useMemo(
    () => ({
      type: 'spring',
      damping: 50,
      stiffness: 100,
    }),
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDeleteRow = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    setNoOfProcesses(newData?.length || 0);
  };

  return (
    <div className="table-container">
      {/* Table */}
      <table className='table-main'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th 
                  key={header.id}
                  className={`table-header ${thClassName}`}
                  colSpan={header.colSpan}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        
        <tbody>
          <AnimatePresence>
            {table.getRowModel().rows.map(row => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, maxHeight: 0 }}
                animate={{ opacity: 1, maxHeight: '49px' }}
                exit={{ opacity: 0, maxHeight: 0 }}
                transition={spring}
              >
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <Cell 
                    key={cell.id}
                    rowIndex={row.index}
                    cellIndex={cellIndex}
                    data={data}
                    setData={setData}
                    animateOpacity={animateOpacity}
                    isRunning={isRunning}
                    isDisabled={isDisableEditing}
                    cellID={cell.column.id}
                    value={cell.getValue()}
                  />
                ))}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
      
      {/* DeleteRow Buttons */}
      {!isRunning && isDeleteRowAllowed && (
        <div className='delete-buttons-container'>
          {data.map((row, index) => (
            <div key={index} className='delete-button-wrapper'>
              <ShinyButton
                text={<ImCross />}
                onClick={() => handleDeleteRow(index)}
                className={`delete-button ${crossClassName}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Table;