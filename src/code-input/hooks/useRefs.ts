import { useRef } from "react"

type RefObjectMap<T = HTMLElement> =  Map<string, (T | null)>

function useRefs<T>() {
  const refsMap = useRef<RefObjectMap<T>>(new Map())

  /** достать мап с ссылками */
  function getRefsMap(){
    return refsMap.current
  }

  /** добавить/изменить ссылку в мап  */
  function setRef(key: string, element: T | null) {
    if (element) {
        refsMap.current?.set(key, element)
    } else {
        refsMap.current?.delete(key)
    }
  }


  return {getRefsMap, setRef}
}

export default useRefs