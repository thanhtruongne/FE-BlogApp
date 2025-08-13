import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useTabFromHash = (hashToTabMap, defaultTab) => {
    const { hash } = useLocation();
    const [activeTab, setActiveTab] = useState(defaultTab);

    console.log(hash,'hash')
  
    useEffect(() => {
      const tabKey = hashToTabMap[hash] || defaultTab;
      setActiveTab(tabKey);
    }, [hash, hashToTabMap, defaultTab]);
    
    
    return [activeTab, setActiveTab];
  };


export default useTabFromHash;