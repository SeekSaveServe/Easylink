// https://stackoverflow.com/questions/70342811/useselector-with-usedispatch-causing-infinite-loop

import { useEffect, useRef } from "react"

export default function useUpdateEffect(callback, dependencies) {
  const firstRenderRef = useRef(true)

  // Since ref persists value between renders (and itself doesn't trigger a render when value is changed), we can simply just set ref to a failing condition on our 1st render so that component only is re-rendered when dependencies change and not also "onMount"
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    return callback()
  }, dependencies)
}