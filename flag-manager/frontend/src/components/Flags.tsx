import { useState, useEffect } from "react";
import { type FlagDetails } from "../types/flagTypes";
import { getAllFlags, deleteFlag, toggleFlag } from "../services/flags";
// import Flag from "./Flag";
import FlagListItem from "./FlagListItem";
const Flags = () => {
  const [flags, setFlags] = useState<Array<FlagDetails>>([]);

  useEffect(() => {
    const fetchFlags = async () => {
      const response = await getAllFlags();
      setFlags(response.data)
    }
    fetchFlags()
  }, []);

  const handleDeleteFlag = (flagKey: string) => {
    deleteFlag(flagKey);
    const newFlags = flags.filter(flag => flag.flagKey != flagKey);
    setFlags(newFlags);
  }

  const handleToggleFlag = (flagKey: string) => {
    toggleFlag(flagKey);
    const newFlags = flags.map(flag => {
      if (flag.flagKey === flagKey) {
        flag.isEnabled = !flag.isEnabled;
      }
      return flag;
    });

    setFlags(newFlags);
  }

  return (
    // <>
    //   <h1>Flags</h1>
    //   {flags.map((flag) => {
    //     return (
    //       <FlagListItem flagDetails={flag} onDeleteFlag={handleDeleteFlag} onToggleFlag={handleToggleFlag} key={flag.flagKey} />
    //     )
    //   })}
    // </>
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Feature Flags</h1>
      <div className="space-y-4">
        {flags.map((flag) => (
          <FlagListItem
            key={flag.flagKey}
            flagDetails={flag}
            onDeleteFlag={handleDeleteFlag}
            onToggleFlag={handleToggleFlag}
          />
        ))}
      </div>
    </div>
  )
}

export default Flags;