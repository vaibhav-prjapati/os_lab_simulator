import { useState, useRef, useEffect, useMemo } from "react"
import { ShinyButton } from '..'
import { SampleData, createColorSchemes, StepWiseFCFS, StepWiseSJF, StepWiseSRJF, StepWiseRR, StepWisePriority } from './data'
import { Table, PieChart } from '.'
import AlgorithmsData from '../../assets/DataFiles/AlgorithmsData'
import { Tooltip } from 'react-tooltip'
import { InView } from 'react-intersection-observer'
import { Element, scroller } from 'react-scroll';
import { TbEdit } from "react-icons/tb";
import { MdOutlineDoneOutline } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { MdBookmarks } from "react-icons/md";
import LoadAllInputsDialogueBox from "./LoadAllInputsDialogueBox"
import SaveInputDialogueBox from "./SaveInputDialogueBox"
import { Toaster, toast as toastifyToast } from "react-hot-toast"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImportJsonDialogueBox from "./ImportJsonDialogueBox"
import "./Simulator.css"


const Simulator = () => {
  const algoOptionsRef = useRef(null)
  const algoRef = useRef(null)

  const [isAlgoOpen, setIsAlgoOpen] = useState(false)
  const [algo, setAlgo] = useState('FCFS')
  const [noOfProcesses, setNoOfProcesses] = useState(SampleData().length)
  const [contextSwitchTime, setContextSwitchTime] = useState(0.0)
  const [data, setData] = useState(SampleData)
  const [isRunning, setIsRunning] = useState(false)
  const [animateShine, setAnimateShine] = useState(false)
  const [animateOpacity, setAnimateOpacity] = useState(false)
  const [queue, setQueue] = useState([{ Pid: 'Pid', AT: 'AT', BT: 'BT', P: 'P' }])
  const [stack, setStack] = useState(['Pid'])
  const [cpu, setCPU] = useState({Pid: 'Pid', RT: 'RT'})
  const [currentTime, setCurrentTime] = useState(0)
  const [isCPUFree, setIsCPUFree] = useState(false)
  const [isQueueEmpty, setIsQueueEmpty] = useState(false)
  const [isStackEmpty, setIsStackEmpty] = useState(false)
  const [animateTime, setAnimateTime] = useState(false)
  const [explanationMessage, setExplanationMessage] = useState([''])
  const [animateMessage, setAnimateMessage] = useState(false)
  const [steps, setSteps] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [avgWT, setAvgWT] = useState(0.0)
  const [avgTAT, setAvgTAT] = useState(0.0)
  const [animateAvgWT, setAnimateAvgWT] = useState(false)
  const [animateAvgTAT, setAnimateAvgTAT] = useState(false)
  const [ganttChartData, setGanttChartData] = useState([])
  const [isEditingNoOfProcesses, setIsEditingNoOfProcesses] = useState(false)
  const [tempNoOfProcesses, setTempNoOfProcesses] = useState(noOfProcesses)
  const [isVisibleSave, setIsVisibleSave] = useState(false)
  const [isVisibleLoad, setIsVisibleLoad] = useState(false)
  const [isNotifAllowedBeforeRunning, setIsNotifAllowedBeforeRunning] = useState(true)
  const [isVisibleImport, setIsVisibleImport] = useState(false)
  const [timeQuantum, setTimeQuantum] = useState(2)
  const [RTS, setRTS] = useState(null)
  const [priorityType, setPriorityType] = useState('higher')
  
 const columnsBeforeRunning = useMemo(() => {
  const columns = [
    { 
      id: 'Pid',
      Header: 'Process ID (Pid)', 
      accessor: 'Pid' 
    },
    { 
      id: 'AT',
      Header: 'Arrival Time (AT)', 
      accessor: 'AT'
    },
    { 
      id: 'BT',
      Header: 'Burst Time (BT)', 
      accessor: 'BT' 
    }
  ]
  if(algo === 'Priority') columns.push({ 
    id: 'P',
    Header: 'Priority (P)', 
    accessor: 'P' 
  })
  return columns 
}, [algo])
  const columnsWhileRunning = useMemo(() => {
  const columns = [
    { 
      id: 'Pid',
      Header: 'Process ID (Pid)', 
      accessor: 'Pid' 
    },
    { 
      id: 'AT',
      Header: 'Arrival Time (AT)', 
      accessor: 'AT'
    },
    { 
      id: 'BT',
      Header: 'Burst Time (BT)', 
      accessor: 'BT' 
    },
    { 
      id: 'CT',
      Header: 'Completion Time (CT)', 
      accessor: 'CT'
    },
    { 
      id: 'TAT',
      Header: 'Turnaround Time (TAT)', 
      accessor: 'TAT'
    },
    { 
      id: 'WT',
      Header: 'Waiting Time (WT)', 
      accessor: 'WT' 
    }
  ]
  if(algo === 'Priority') columns.splice(3, 0, { 
    id: 'P',
    Header: 'Priority (P)', 
    accessor: 'P' 
  })
  return columns
}, [algo])

  const keyBindingsData = useMemo(() => [{
    key: '<',
    functionality: 'Prev',
  },{
    key: '>',
    functionality: 'Next',
  },{
    key: 'Enter',
    functionality: 'Show Final Result',
  },{
    key: 'Backspace',
    functionality: 'Restart',
  },{
    key: 'Escape',
    functionality: 'Edit',
  }], [])


  /* Helper Functions */
  const handleAnimateOpacity = () => {
    setAnimateOpacity(true)
    const timeoutId = setTimeout(() => setAnimateOpacity(false), 500)
    return () => clearTimeout(timeoutId);
  }
  const processExplanationMessage = (msg) => {
    return msg.split("\n")
  }
  const animateScrollToPieCharts = () => {
    scroller.scrollTo('explanationMsgSection', {
      smooth: true,
    })
    const timeoutId1 = setTimeout(() => scroller.scrollTo('pieCharts', {
      smooth: true,
    }), 3000)
    return () => clearTimeout(timeoutId1)
  }

  /* Functionalities Functions */
  const handleChangeAlgoClick = () => {
    if(isRunning) return; // if simulation is running, then don't allow to change the algo
    setIsAlgoOpen(true);
  }
  const handleChangeAlgo = (e) => {
    setAlgo(e.target.value)
    setIsAlgoOpen(false);
  }
  const handleEditNoOfProcesses = () => {
    const newNoOfProcesses = tempNoOfProcesses

    // in case user enters an empty string
    if(typeof newNoOfProcesses === 'string' && newNoOfProcesses.trim() === ''){
      setIsEditingNoOfProcesses(false)
      return; 
    }
    if(newNoOfProcesses <= 0){
      alert('No. of Processes must be greater than 0!')
      return;
    }

    const newData = [...data]
    while(newData.length < newNoOfProcesses){
      newData.push({
        Pid: "P" + (newData.length+1),
        AT: 0,
        BT: 0
      })
    }
    while(newData.length > newNoOfProcesses){
      newData.pop()
    }

    if(data.toString() !== newData.toString()) setData(newData)
    setNoOfProcesses(newNoOfProcesses)
    setIsEditingNoOfProcesses(false)
  }
  const handleFillSampleData = () => {
    const sampleData = SampleData()
    setData(sampleData)
    setNoOfProcesses(sampleData.length)

    handleAnimateOpacity()
  }
  const handleFillRandomData = () => {
    const newData = [], limit = 10
    for(let i=0; i<noOfProcesses; i++){
      newData.push({
        Pid: "P" + (i+1),
        AT: Math.floor(Math.random() * limit),
        BT: Math.floor(Math.random() * limit),
        P: Math.floor(Math.random() * limit)
      })
    }
    setData(newData)

    handleAnimateOpacity();
  }
  const handleAddProcess = () => {
    const newData = [...data]
    newData.push({
      Pid: "P" + (newData.length+1),
      AT: 0,
      BT: 0
    })
    setData(newData)
    setNoOfProcesses(newData.length)
  }
  const handleRun = () => {
    let newColorSchemes = createColorSchemes(noOfProcesses);
    
    data.map((process, index) => {
      if(process.Pid === '') process.Pid = 'P' + (index+1)
      process.AT = (process.AT === '')? 0: parseInt(process.AT)
      process.BT = (process.BT === '')? 0: parseInt(process.BT)
      
      // filling default data
      process.CT = process.TAT = process.WT = process.RT = null 
      process.bgColor = {
        Pid: 'transparent', AT: 'transparent', BT: 'transparent', CT: 'transparent', TAT: 'transparent', WT: 'transparent'
      }
      process.color = newColorSchemes[index]
    })

    const getSteps = () => {
      if(algo === 'FCFS') return StepWiseFCFS(data)
      if(algo === 'SJF') return StepWiseSJF(data)
      if(algo === 'SRJF') return StepWiseSRJF(data)
      if(algo === 'RR') return StepWiseRR(data, timeQuantum)
      if(algo === 'Priority') return StepWisePriority(data, priorityType)
      toast.error('Simulation not implemented yet, Coming Soon!')
    }

    let steps = getSteps()
    if(!steps) return;
    console.log(steps)

    toast.dismiss()
    setIsRunning(true)
    setSteps(steps)
    
    handleAnimateOpacity()
  }
  const handleReset = () => {
    setIsRunning(false)
    setIsNotifAllowedBeforeRunning(false)

    setCurrentStepIndex(-1)
    setData([])
    setNoOfProcesses(0)
    setCurrentTime(0)
    setCPU({Pid: 'Pid', RT: 'RT'})
    setQueue([{ Pid: 'Pid', AT: 'AT', BT: 'BT', P: 'P' }])
    setStack(['Pid'])
    setExplanationMessage([''])
    setAvgTAT(0.0)
    setAvgWT(0.0)
    setGanttChartData([])
    setRTS(null)
  }
  const handleEdit = () => {
    setIsRunning(false)
    setIsNotifAllowedBeforeRunning(false)

    setData(steps[0].data)
    setCurrentStepIndex(-1)
    setCurrentTime(0)
    setCPU({Pid: 'Pid', RT: 'RT'})
    setQueue([{ Pid: 'Pid', AT: 'AT', BT: 'BT', P: 'P' }])
    setStack(['Pid'])
    setExplanationMessage([''])
    setAvgTAT(0.0)
    setAvgWT(0.0)
    setGanttChartData([])
    setRTS(null)
  }
  const handleNext = () => {
    if(currentStepIndex === steps.length-1) return;

    const newStepIndex = currentStepIndex + 1
    setCurrentStepIndex(newStepIndex)

    const { cpu: newCPU, queue: newQueue, completed: newStack, curTime, data: newData, msg, ganttChartData: newGanttChartData, avgTAT: newAvgTAT, avgWT: newAvgWT } = steps[newStepIndex]
    setExplanationMessage(processExplanationMessage(msg))

    if(JSON.stringify(cpu) !== JSON.stringify(newCPU)) setCPU(newCPU)
    if(JSON.stringify(queue) !== JSON.stringify(newQueue)) setQueue(newQueue)
    if(JSON.stringify(stack) !== JSON.stringify(newStack)) setStack(newStack)

    setCurrentTime(curTime)
    if(algo === 'RR') setRTS(steps[newStepIndex].RTS)

    if(JSON.stringify(data) !== JSON.stringify(newData)) setData(newData)
    if(JSON.stringify(ganttChartData) !== JSON.stringify(newGanttChartData)){
      scroller.scrollTo('ganttChart', { delay: 2000, smooth: true });
      const exec = () => {
        const timeoutId = setTimeout(() => {
          const timeoutId1 = setTimeout(() =>  setGanttChartData(newGanttChartData), 500)
          const timeoutId2 = setTimeout(() => scroller.scrollTo('explanationMsgSection', { smooth: true }), 2000)
          return () => { clearTimeout(timeoutId1); clearTimeout(timeoutId2); }
        }, 2000)
        return () => clearTimeout(timeoutId)
      }
      exec()
    }

    if(avgTAT !== newAvgTAT) setAvgTAT(newAvgTAT)
    if(avgWT !== newAvgWT) setAvgWT(newAvgWT)
  }
  const handlePrev = () => {
    if(currentStepIndex === -1) return;

    const newStepIndex = currentStepIndex - 1
    setCurrentStepIndex(newStepIndex)
    
    if(newStepIndex == -1){
      setExplanationMessage([''])
      setCurrentTime(0)
      setCPU({ Pid: 'Pid', RT: 'RT'})
      setQueue([{ Pid: 'Pid', AT: 'AT', BT: 'BT', P: 'P' }])
      setStack(['Pid'])
      return;
    }

    const { cpu: newCPU, queue: newQueue, completed: newStack, curTime, data: newData, msg, ganttChartData: newGanttChartData, avgTAT: newAvgTAT, avgWT: newAvgWT } = steps[newStepIndex]
    setExplanationMessage(processExplanationMessage(msg))

    if(JSON.stringify(cpu) !== JSON.stringify(newCPU)) setCPU(newCPU)
    if(JSON.stringify(queue) !== JSON.stringify(newQueue)) setQueue(newQueue)
    if(JSON.stringify(stack) !== JSON.stringify(newStack)) setStack(newStack)

    setCurrentTime(curTime)
    if(algo === 'RR') setRTS(steps[newStepIndex].RTS)

    if(JSON.stringify(data) !== JSON.stringify(newData)) setData(newData)
    if(JSON.stringify(ganttChartData) !== JSON.stringify(newGanttChartData)) setGanttChartData(newGanttChartData)

    if(avgTAT !== newAvgTAT) setAvgTAT(newAvgTAT)
    if(avgWT !== newAvgWT) setAvgWT(newAvgWT)
  }
  const handleShowFinalResult = () => {
    if(currentStepIndex === steps.length-1) return;

    const newStepIndex = steps.length-1
    setCurrentStepIndex(newStepIndex)

    const { cpu: newCPU, queue: newQueue, completed: newStack, curTime, data: newData, msg, ganttChartData: newGanttChartData, avgTAT: newAvgTAT, avgWT: newAvgWT } = steps[newStepIndex]
    setExplanationMessage(processExplanationMessage(msg))

    if(JSON.stringify(cpu) !== JSON.stringify(newCPU)) setCPU(newCPU)
    if(JSON.stringify(queue) !== JSON.stringify(newQueue)) setQueue(newQueue)
    if(JSON.stringify(stack) !== JSON.stringify(newStack)) setStack(newStack)

    setCurrentTime(curTime)
    if(algo === 'RR') setRTS(steps[newStepIndex].RTS)

    if(JSON.stringify(data) !== JSON.stringify(newData)) setData(newData)

    let timeoutId = null
    let tempGanttChartData = newGanttChartData.map((row) => {
      return row.map((process) => {
        return {
          ...process,
          timeInCPU: 0,
        }
      })
    })
    setGanttChartData(tempGanttChartData)
    timeoutId = setTimeout(() => setGanttChartData(newGanttChartData), 2500)

    if(avgTAT !== newAvgTAT) setAvgTAT(newAvgTAT)
    if(avgWT !== newAvgWT) setAvgWT(newAvgWT)

    handleAnimateOpacity()
    return () => clearTimeout(timeoutId)
  }
  const handleRestart = () => {
    if(currentStepIndex === -1) return;

    setCurrentStepIndex(-1)
    setExplanationMessage([''])
    setCurrentTime(0)
    setCPU({ Pid: 'Pid', RT: 'RT'})
    setQueue([{ Pid: 'Pid', AT: 'AT', BT: 'BT', P: 'P' }])
    setStack(['Pid'])
    setGanttChartData([])
    setAvgWT(0.0)
    setAvgTAT(0.0)
    if(algo === 'RR') setRTS(null)

    const { data: newData } = steps[0]
    if(JSON.stringify(data) !== JSON.stringify(newData)) setData(newData)
  }
  const handleSave = () => {
    setIsVisibleSave(true)
  }
  const handleLoad = () => {
    setIsVisibleLoad(true)
  }
  const handleCopy = () => {
    const copyData = data.map((process) => {
      return { 
        Pid: process.Pid, AT: process.AT, BT: process.BT, P: process.P
      }
    })
    navigator.clipboard.writeText(JSON.stringify(copyData))
    toast.success('Copied to clipboard!')
  }
  

  /* useEffect for binding keys */
  useEffect(() => {
    const handleKeyDown = (e) => {
      const inputElement = document.getElementById('noOfProcesses')
      if(!isRunning){
        if(e.key === 'Enter'){
          if (document.activeElement === inputElement) handleEditNoOfProcesses()
          else handleRun();
        }
      }else{
        if(e.key === 'ArrowRight') handleNext()
        if(e.key === 'ArrowLeft') handlePrev()
        if(e.key === 'Enter') handleShowFinalResult()
        if(e.key === 'Backspace') handleRestart()
        if(e.key === 'Escape') handleEdit()
      }
    }

    document.body.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRunning, currentStepIndex, ganttChartData, data, tempNoOfProcesses, algo, timeQuantum, priorityType]);

  useEffect(() => {
    if(isRunning){
      toast.info(
        <div className="ml-2 mb-1 flex flex-col gap-1 justify-center">
          <div className="flex flex-col text-center">
            <span> Key Bindings are as follows: </span>
            <span className="text-sm text-gray-300"> {'( Hover to pause )'} </span> 
          </div>

          {keyBindingsData.map(({key, functionality}, index) => {
            return (
              <div key={index} className="mt-3 flex items-center justify-between"> 
                <span className="border px-2"> {key} </span>
                &nbsp;:&nbsp;
                <span> {functionality} </span>
              </div>
            )
          })}
        </div>, 
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          icon: false,
          className: 'text-left'
        }
      );
    }else{
      if(!isNotifAllowedBeforeRunning) return;

      toast.info('Welcome to OS Lab Simulator!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        className: 'text-left'
      });
      toast.info('Press Enter for running the input and get started.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        delay: 1500,
        className: 'text-left'
      });
    }
  }, [isRunning])
  
  
  /* useEffects for animations */
  useEffect(() => {
    if(algoOptionsRef.current === null) return;

    if(isAlgoOpen){
      algoOptionsRef.current.style.maxHeight = "180px"
      algoOptionsRef.current.style.maxWidth = "550px"
    }else{
      algoOptionsRef.current.style.maxHeight = "32px"
      algoOptionsRef.current.style.maxWidth = "125px"
    }
  }, [isAlgoOpen])

  useEffect(() => {
    setTempNoOfProcesses(noOfProcesses)
    setAnimateShine(true);
    const timeoutId = setTimeout(() => setAnimateShine(false), 1000);
    return () => clearTimeout(timeoutId);
  }, [noOfProcesses]);

  useEffect(() => {
    setIsCPUFree(true)
    const timeoutId = setTimeout(() => setIsCPUFree(false), 1000)
    return () => clearTimeout(timeoutId)
  }, [cpu])

  useEffect(() => {
    setIsQueueEmpty(true)
    const timeoutId = setTimeout(() => setIsQueueEmpty(false), 1000)
    return () => clearTimeout(timeoutId)
  }, [queue])

  useEffect(() => {
    setIsStackEmpty(true)
    const timeoutId = setTimeout(() => setIsStackEmpty(false), 1000)
    return () => clearTimeout(timeoutId)
  }, [stack])

  useEffect(() => {
    setAnimateTime(true)
    const timeoutId = setTimeout(() => setAnimateTime(false), 1000)
    return () => clearTimeout(timeoutId)
  }, [currentTime])

  useEffect(() => {
    setAnimateMessage(true)
    const timeoutId = setTimeout(() => setAnimateMessage(false), 500)
    return () => clearTimeout(timeoutId)
  }, [explanationMessage])

  useEffect(() => {
    if(!Boolean(avgWT)) return;

    animateScrollToPieCharts()

    setAnimateAvgWT(true)
    const timeoutId = setTimeout(() => setAnimateAvgWT(false), 1000)
    return () => clearTimeout(timeoutId)
  }, [avgWT])

  useEffect(() => {
    if(!Boolean(avgTAT)) return;

    animateScrollToPieCharts()

    setAnimateAvgTAT(true)
    const timeoutId = setTimeout(() => setAnimateAvgTAT(false), 1000)
    return () => clearTimeout(timeoutId)
  }, [avgTAT])

  // useEffect(() => console.log("data: ", data), [data])

  
  return (
    <div className="simulator-container">
      <h1 className="main-title">CPU Scheduling Simulator</h1>

      {/* AlgoSelect Section */}
      <div className="algo-section">
        <h1 className="algo-title">Algo: </h1>
        <div ref={algoOptionsRef} className="algo-dropdown" style={{maxHeight: isAlgoOpen ? '180px' : '32px', maxWidth: isAlgoOpen ? '250px' : '125px'}}>
          {
            isAlgoOpen?
              AlgorithmsData.map(({name, value}, index) => {
                return (
                  <button key={index} className="algo-option" value={value} onClick={handleChangeAlgo}>
                    • {name}
                  </button>
                )
              })
            :
              <button ref={algoRef} className="algo-current" onClick={handleChangeAlgoClick}>
                {algo}

                {/* down arrow sign */}
                <div className="algo-arrow" />  
               </button>
          }
        </div>
      </div>

      {isRunning && <Element name="explanationMsgSection" id="explanationMsgSection" className="explanation-section">
        {/* Current Time */}
        <div className="current-time">
          <div className="time-label">
            <span> Current Time: </span>
            <div className={`time-underline${animateTime ? ' animate' : ''}`} />
          </div>
          <span> {currentTime} </span>
        </div>
        
        {/* Explanation Section */}
        <div className="explanation-message">
          <div className={`message-content${animateMessage ? ' hidden' : ' visible'}`}>
            {explanationMessage.map((msg, index) => <p key={index}> {msg} </p>)}
          </div>
        </div>
        
        {/* Time Before Switch */}
        {algo === 'RR' && <div className="time-before-switch">
          <div className="time-label">
            <span> Time Before Switch: </span>
            <div className={`time-underline${animateTime ? ' animate' : ''}`} />
          </div>
          <span> {RTS} </span>
        </div>}
        
        {/* Priority Mssg Section */}
        {algo === 'Priority' && <p className="priority-message">
          Higher the value, <span className="capitalize"> {priorityType} </span> the priority.
        </p>}
      </Element>}

      <div className="main-content">
        {isRunning?
          <div className="simulation-sidebar">
            {/* CPU Section */}
            <div className={`cpu-section${cpu.Pid ? ' with-process' : ' without-process'}${isCPUFree ? ' free' : ' busy'}`}>
              <h2 className="cpu-title">CPU</h2>
              {
                cpu.Pid && <div className={`cpu-content${isCPUFree? ' hidden': ' visible'}`}>
                  <span> {cpu.Pid} </span>
                  <span> : </span>
                  <span> {cpu.RT} </span>
                </div>
              }
            </div>

            {/* Queue Section */}
            <div className={`queue-section${isQueueEmpty ? ' empty' : ' filled'}`}>
              <h2 className="queue-title">Queue</h2>
              <div className="queue-content">
                {
                  queue.map(({ Pid, AT, BT, P }, index) => {
                    return (
                      <div key={index} className={`queue-item${isQueueEmpty? ' hidden': ' visible'}`}>
                        <span> {Pid} </span>:
                        {algo !=='RR' && <>
                          <span> {AT} </span>,
                        </>}
                        <span> {BT} </span>
                        {algo ==='Priority' && <>
                          ,<span> {P} </span>
                        </>}
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        : /* Simulator Sidebar Before Running */ 
        <div className="config-sidebar">
          {/* Section-1 */}
          <div className="config-section">
            {/* Total No of Processes */}
            <div className="process-count">
              <div className="process-count-content">
                Total No. of Processes: 
                {!isEditingNoOfProcesses? <>
                  &nbsp;{noOfProcesses} 
                  <button className="edit-button" onClick={() => setIsEditingNoOfProcesses(true)}>
                    <TbEdit />
                  </button>
                </>
                : <>
                  <input 
                    type="number"
                    id="noOfProcesses"
                    name="noOfProcesses"
                    min={1}
                    placeholder={noOfProcesses}
                    value={tempNoOfProcesses}
                    onChange={(e) => setTempNoOfProcesses(e.target.value)}
                    className="process-input"
                  />
                  <button className="edit-button" onClick={handleEditNoOfProcesses}>
                    <MdOutlineDoneOutline />
                  </button>
                </>}
              </div>
              <div className={`shine-effect${animateShine ? ' animate' : ''}`} />
            </div>
            
            {/* Context Switch Time */}
            {/* <div className="flex flex-row items-center">
              Context Switch Time:
              <input 
                type="number" 
                name="contextSwitchTime"
                min={0.0}
                step={0.1} 
                value={contextSwitchTime} 
                onChange={(e) => setContextSwitchTime(e.target.value)} 
                className="ml-2 px-2 w-[80px] text-center bg-transparent border-b-2 focus:outline-none"
              />
            </div> */}
            
            {/* Time Quantum */}
            {algo === 'RR' && <div className="time-quantum">
              Time Quantum:
              <input 
                type="number" 
                name="timeQuantum"
                min={0}
                value={timeQuantum} 
                onChange={(e) => setTimeQuantum(e.target.value)} 
              />
            </div>}

            {/* Priority Type */}
            {algo === 'Priority' && <div className="priority-config">
              <p><label htmlFor="priorityType"> Higher the value, </label></p>
              <select name="priorityType" id="priorityType" className="priority-select" value={priorityType} onChange={(e) => setPriorityType(e.target.value)}>
                <option value="higher" className="priority-option"> Higher </option>
                <option value="lower" className="priority-option"> Lower </option>
              </select>
              <p><label htmlFor="priorityType"> the priority </label></p>
            </div>}
            
            <ShinyButton 
              className="shiny-button"
              text="Fill Sample Data"
              onClick={handleFillSampleData}
            />
            <ShinyButton 
              className="shiny-button"
              text="Fill Random Data"
              onClick={handleFillRandomData}
            />
            <ShinyButton 
              className="shiny-button"
              text="Add Process"
              onClick={handleAddProcess}
            />
          </div>
          
          {/* Section-2 */}
          <div className="button-section">
            <ShinyButton 
              className="shiny-button"
              text={
                <span className="flex flex-row items-center gap-3">
                  <FaRegSave />
                  Save Current Input
                </span>
              }
              onClick={handleSave}
            />
            <ShinyButton 
              className="shiny-button"
              text={
                <span className="flex flex-row items-center gap-3">
                  <MdBookmarks />
                  Load Saved Inputs
                </span>
              }
              onClick={handleLoad}
            />
          </div>
        </div>}

        <div className="table-container">
          {/* Table */}
          <Table 
            data={data} 
            setData={setData} 
            setNoOfProcesses={setNoOfProcesses} 
            animateOpacity={animateOpacity} 
            isRunning={isRunning}
            columns={isRunning? columnsWhileRunning: columnsBeforeRunning}
          />
          
          {isRunning ? <>
            <div className="simulation-controls">
              <div className="control-group">
                <ShinyButton 
                  className="control-button"
                  text="Edit"
                  onClick={handleEdit}
                />
                <ShinyButton 
                  className="control-button"
                  text="Reset"
                  onClick={handleReset}
                />
              </div>
              <div className="control-group">
                <ShinyButton 
                  className={`control-button${currentStepIndex === steps.length-1? ' disabled': ''}`}
                  text="Show Final Result"
                  onClick={handleShowFinalResult}
                />
                <ShinyButton 
                  className={`control-button${currentStepIndex === -1? ' disabled': ''}`}
                  text="Restart"
                  onClick={handleRestart}
                />
              </div>
              <div className="control-group">
                <ShinyButton 
                  className={`control-button${currentStepIndex === -1? ' disabled': ''}`}
                  text="Prev"
                  onClick={handlePrev}
                />
                <ShinyButton 
                  className={`control-button${currentStepIndex === steps.length-1? ' disabled': ''}`}
                  text="Next"
                  onClick={handleNext}
                />
              </div>
            </div>
            <div className="results-section">
              {Boolean(avgTAT) && <div className={`result-item${animateAvgTAT? ' hidden': ' visible'}`}>
                <span className="result-label">Average Turn Around Time:</span>
                <span> &nbsp;{avgTAT} </span>
              </div>}
              {Boolean(avgWT) && <div className={`result-item${animateAvgWT? ' hidden': ' visible'}`}>
                <span className="result-label">Average Waiting Time:</span>
                <span> &nbsp;{avgWT} </span>
              </div>}
            </div>
          </>
          :  <div className="before-running-controls">
            <div className="control-group">
              <ShinyButton 
                className="control-button"
                text="Copy"
                onClick={handleCopy}
              />
              <ShinyButton 
                className="control-button"
                text="Import JSON file"
                onClick={() => setIsVisibleImport(true)}
              />
            </div>
            <div className="control-group">
              <ShinyButton 
                className="control-button"
                text="Reset"
                onClick={handleReset}
              />
              <ShinyButton 
                className="control-button"
                text="Run"
                onClick={handleRun}
              />
            </div>
          </div>}
        </div>
        
        {/* Completed Stack Section */}
        {isRunning && <div className={`completed-section${isStackEmpty ? ' empty' : ' filled'}`}>
          <h2 className="completed-title">Completed</h2>
          <div className={`completed-content${isStackEmpty? ' hidden': ' visible'}`}>
            {
              stack.map((Pid, index) => <span key={index}> {Pid} </span>)
            }
          </div>
        </div>}
      </div>

      {isRunning && <div className="gantt-section">
          <Element name="ganttChart" id="ganttChart" className="gantt-container">
            <h2 className="gantt-title"> Gantt Chart </h2>
            <div className="gantt-chart">
              {ganttChartData.map((row, rowIndex) => {
                  return (
                    <div key={rowIndex} className="gantt-row">
                      {row.map((process, colIndex) => {
                        return (
                          <div key={colIndex} className="gantt-process" style={{ flexGrow: process.timeInCPU }}>
                            <div 
                              className="gantt-cell"
                              style={{ background: process.color }}
                              data-tooltip-id={process.Pid}
                              data-tooltip-place="top"
                              data-tooltip-html={`
                                <div class='flex flex-col text-black items-center justify-center gap-2'>
                                  <div class='flex flex-row w-full py-2 items-center justify-center border-b-2 border-black gap-2'>
                                    <div class='rounded-full w-5 h-5 border-black border' style='background-color:${process.color};'></div>
                                    <span class='text-base'>${process.Pid}</span>
                                  </div>
                                  <div class='flex flex-col'>
                                    <span class='text-base'>Arrival Time: ${process.arrivalTime}</span>
                                    <span class='text-base'>Exiting Time: ${process.exitingTime}</span>
                                    <span class='text-base'>Time In CPU: ${process.timeInCPU}</span>
                                  </div>
                                </div>
                              `}
                              data-tooltip-class-name="!bg-white"
                              data-tooltip-wrapper="div"
                            >
                              {process.Pid}
                            </div>
                            <span className="gantt-time"> {process.arrivalTime} </span>
                            <Tooltip id={process.Pid} />
                          </div>
                        )
                      })}
                      <span className="gantt-end-time"> {row[row.length-1]?.exitingTime} </span>
                    </div>
                  )
              })}
            </div>
          </Element>
          {(currentStepIndex >= steps.length-2*noOfProcesses-3) &&
          <div className="pie-charts-section">
            <Element name="pieCharts" className="pie-charts-title"> Pie Charts </Element>
            <div className="pie-charts-container">
              {Boolean(avgTAT) && <div className="pie-chart">
                <h2 className="pie-chart-title"> Turnaround Time (TAT) </h2>  
                <InView threshold={0}>
                  {({ inView, ref }) => (
                    <div ref={ref} className={`pie-chart-content${inView? ' visible': ' hidden'}`}>
                      {inView && <PieChart data={steps[steps.length - 1].data} y='TAT' />}
                    </div>
                  )}
                </InView>
              </div>}
              {Boolean(avgWT) && <div className="pie-chart">
                <h2 className="pie-chart-title"> Waiting Time (WT) </h2>
                <InView threshold={0}>
                  {({ inView, ref }) => (
                    <div ref={ref} className={`pie-chart-content${inView? ' visible': ' hidden'}`}>
                      {inView && <PieChart data={steps[steps.length - 1].data} y='WT' />}
                    </div>
                  )}
                </InView>
              </div>}
            </div>
          </div>}
      </div>}

      {isVisibleSave && <SaveInputDialogueBox 
        isVisible={isVisibleSave} 
        handleClick={() => setIsVisibleSave(false)}
        data={data}
      />}

      {isVisibleLoad && <LoadAllInputsDialogueBox 
        isVisible={isVisibleLoad} 
        handleClick={() => setIsVisibleLoad(false)}
        setData={setData}
        setNoOfProcesses={setNoOfProcesses}
      />}

      <ImportJsonDialogueBox 
        isVisible={isVisibleImport}
        handleClick={() => setIsVisibleImport(false)}
        setData={setData}
        setNoOfProcesses={setNoOfProcesses}
      />

      <Toaster position="top-right" />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default Simulator
