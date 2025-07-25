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
    <>
      <h1>Flags</h1>
      {flags.map((flag) => {
        return (
          <FlagListItem flagDetails={flag} onDeleteFlag={handleDeleteFlag} onToggleFlag={handleToggleFlag} key={flag.flagKey} />
        )
      })}
    </>
  )
}

export default Flags;