import { useState, useEffect } from "react";
import { type EvaluationRule } from "../types/evaluationTypes";
import RuleListItem from "./RuleListItem";
import { getRules } from "../services/rules";
const Rules = ()=> {
  const [rules, setRules] = useState<Array<EvaluationRule>>([])
  useEffect(()=> {
    const fetchRules = async () => {
      const loadedRules = await getRules() as Array<EvaluationRule>;
      setRules(loadedRules)
    }
    fetchRules()
  })
  return (
    <>
    {rules.map(rule=><RuleListItem ruleDetails={rule}></RuleListItem>)}
    </>
  )
}

export default Rules;