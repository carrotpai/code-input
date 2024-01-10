import { useState } from "react"
import { InputCell } from "./ui";
import useRefs from "./hooks/useRefs";

interface CodeInputProps {
    length: number;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
}


const generateCellKey = (ind: number) => `cell-${ind}`




function CodeInput({length}: CodeInputProps) {
  //значение инпута - массив длины Length (значения массива = значения клеток, изначально пустые строки)
  const [value, setValue] = useState(Array(length).fill(''))
  //рефы для навигации
  const {getRefsMap, setRef} = useRefs<HTMLInputElement>()

  const handleOnFill = (ind: number) => {
        const cellRefs = getRefsMap()
        const nextCellInd = getNextCell(ind)
        if (nextCellInd !== -1) {
          cellRefs.get(generateCellKey(nextCellInd))?.focus()
        }
  }

  const handleOnDelete = (ind: number) => {
        const cellRefs = getRefsMap()
        if (ind !== 0) {
          cellRefs.get(generateCellKey(ind - 1))?.focus()
        }
  }

  //достать след не заполненную клетку
  const getNextCell = (ind: number) => {
      for(let i = ind + 1; i < length; i++){
        if (value[i] === '') {
          return i
        }
      }
      for(let i = 0; i < ind; i++){
        if (value[i] === '') {
          return i
        }
      }
      return -1
  }


  //клетки
  const cells: React.ReactNode[] = []
  for(let ind = 0; ind < length; ind++){
    cells.push(
      <InputCell
        index={ind}
        ref={(element) => setRef(generateCellKey(ind), element)}
        containerClassName="w-10 h-12 bg-slate-200 rounded-md"
        inputClassName="w-6 h-10"
        onFilled={handleOnFill}
        //срабатывает при удалении при пустом значении ячейки (нейминг получше нужен, но мне чет в голову ниче толкового не приходит)
        onDelete={handleOnDelete}
        onChange={(e) => {
          setValue((prev) => {
            const newValue = Array.from(prev)
            newValue[ind] = (e.target as HTMLInputElement).value
            return newValue
          })
        }}
        value={value[ind]}
        key={generateCellKey(ind)}
       />

    )
  }

  return (
    <div className="flex flex-row justify-between gap-3 w-fit h-fit">
        {cells}
    </div>
  )
}

export default CodeInput