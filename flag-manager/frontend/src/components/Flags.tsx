import { useState, useEffect } from "react";
import { type FlagDetails } from "../types/flagTypes";
import { getAllFlags } from "../services/flags";
const Flags = () => {
  const [flags, setFlags] = useState<Array<FlagDetails>>([])
  useEffect(() => {
    const fetchFlags = async () => {
      const response = await getAllFlags();
      console.log(response.data)
      setFlags(response.data)
    }
    fetchFlags()
  }, [])
  return (
    <>
      <h1>Flags</h1>
      {flags.map((flag, index) => {
        return (
          <div key={index}>
            <div>Key: {flag.flagKey}</div>
            <div>Type: {flag.flagType}</div>
            <div>Variants: {JSON.stringify(flag.variants)}</div>
            <div>{`Created at:
              ${new Date(flag.createdAt).toLocaleTimeString()}
              ${new Date(flag.createdAt).toLocaleDateString()}
              `}
            </div>

            {flag.updatedAt && <div>updated at: {flag.updatedAt}</div>}
            <div>default variant: {flag.defaultVariant}</div>
            <br></br>
          </div>
        )
      })}
    </>
  )
}

export default Flags;