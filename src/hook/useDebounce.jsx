import { useEffect, useState } from 'react';

const useDebounce  = (value,ms) => {
    const [debounce,setDebounce] = useState(value);

    
    useEffect(() => {
      
      if (value === "") {
        setDebounce(value); // trống thì return ra lun
        return;
      }
     const handler =  setTimeout(() => {setDebounce(value) },ms)
       return () => {
        clearTimeout(handler);
       }
    },[value,ms])

    return debounce;
  
}

export default useDebounce;