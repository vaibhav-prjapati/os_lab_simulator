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
    <div className="flex flex-row mx-auto h-fit gap-4">
      {/* Table */}
      <table className='w-[800px] border-collapse'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th 
                  key={header.id}
                  className={`border py-3 ${thClassName}`}
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
        <div className='flex flex-col mt-12'>
          {data.map((row, index) => (
            <div key={index} className='flex items-center justify-end h-[49px]'>
              <ShinyButton
                text={<ImCross />}
                onClick={() => handleDeleteRow(index)}
                className={`p-2 text-xs rounded-full border border-gray-500 text-gray-500 hover:text-white hover:border-white ${crossClassName}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Table;