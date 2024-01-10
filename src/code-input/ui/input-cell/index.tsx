import React from "react"

type CellStateChangeHandler = (ind: number) => void

interface InputCellProps {
  index: number;
  value?: string
  containerClassName?: string;
  inputClassName?: string;

  onChange?: (e: React.ChangeEvent) => void;
  onFilled?: CellStateChangeHandler;
  onDelete?: CellStateChangeHandler;
}


const InputCell = React.forwardRef<HTMLInputElement, InputCellProps>(function InputCell(props, ref) {
  return (
    <div className={`${props.containerClassName} relative focus-within:border-[2px] focus-within:border-sky-400`}>
      <input
       style={{'top': '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
       className={`${props.inputClassName} absolute appearance-none bg-opacity-0 bg-transparent focus:outline-none text-center`}
       type="text"
       maxLength={1}
       ref={ref}
       value={props.value}
       onKeyDown={(e) => {
        //value falsy значение + value != 0, нажали backspace -> вызываем onDelete
        if (!props.value && e.key === "Backspace" && props.onDelete) {
          props.onDelete(props.index)
        }
       }}
       onChange={(e) => {
        //от 0 до 9 + удаление
        if ((e.target.value >= '0' && e.target.value <= '9') ||  !e.target.value) {
          if (props.onChange) {
            props.onChange(e)
          }
          // если это символы 0-9 то вызываем onFilled
          if (e.target.value && props.onFilled) {
            props.onFilled(props.index)
          }
        }
       }}
      />
    </div>
  )
})

export default InputCell