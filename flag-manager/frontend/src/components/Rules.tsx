import { useState, useEffect } from "react";
import { type EvaluationRule } from "../types/evaluationTypes";
import RuleListItem from "./RuleListItem";
import { 
  getRulesByFlagKey,
  deleteRule
} from "../services/rules";

interface RulesProps {
  flagKey: string;
}

const Rules:React.FC<RulesProps> = ({ flagKey }) => {
  const [rules, setRules] = useState<Array<EvaluationRule>>([]);

  useEffect(()=> {
    const fetchRules = async () => {
      const loadedRules = await getRulesByFlagKey(flagKey) as Array<EvaluationRule>;
      setRules(loadedRules)
    }
    fetchRules()
  }, [flagKey]);

  const handleDeleteRule = async (ruleId: string, ruleName: string) => {
    if (confirm('Are you sure you want to delete the rule?')) {
      try {
        deleteRule(ruleId, ruleName);
      } catch (e) {
        console.error("Error deleting rule:", e)
      }
    }
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Rules for flag: <span className="font-mono text-indigo-600">{flagKey}</span></h2>
      {rules.length === 0 ? (
        <p className="text-gray-500 italic">No rules found for this flag.</p>
      ) : (
        <ul className="space-y-3">
          {rules.map(rule => (
            <li key={rule.name}>
              <RuleListItem 
                ruleDetails={rule} 
                onDelete={handleDeleteRule}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Rules;