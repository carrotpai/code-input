
import './App.css'
import CodeInput from './code-input'

function App() {

  return (
    <>
      {/* mt убрать */}
      <div className='flex justify-center mt-[200px]'>
        <CodeInput length={6} />
      </div>
    </>
  )
}

export default App
