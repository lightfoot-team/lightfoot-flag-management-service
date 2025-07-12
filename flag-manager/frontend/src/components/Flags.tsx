import { useState, useEffect } from "react";
import { type FlagDetails } from "../types/flagTypes";
import { getAllFlags, deleteFlag, toggleFlag } from "../services/flags";
import Flag from "./Flag";

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
          <Flag flagDetails={flag} onDeleteFlag={handleDeleteFlag} onToggleFlag={handleToggleFlag} key={flag.flagKey} />
          // <div key={index}>
          //   <div>Key: {flag.flagKey}</div>
          //   <div>Type: {flag.flagType}</div>
          //   <div>Variants: {JSON.stringify(flag.variants)}</div>
          //   <div>Flag status: {flag.isEnabled ? "ON" : "OFF"}</div>
          //   <div>{`Created at:
          //     ${new Date(flag.createdAt).toLocaleTimeString()}
          //     ${new Date(flag.createdAt).toLocaleDateString()}
          //     `}
          //   </div>

          //   {flag.updatedAt && <div>updated at: {flag.updatedAt}</div>}
          //   <div>default variant: {flag.defaultVariant}</div>
          //   <br></br>
          //   <button onClick={() => handleDeleteFlag(flag.flagKey)}>Delete Feature</button>
          //   <button onClick={() => handleToggleFlag(flag.flagKey)}>Toggle Feature ON/OFF</button>
          // </div>
        )
      })}
    </>
  )
}

export default Flags;