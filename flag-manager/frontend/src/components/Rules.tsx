import type { EvaluationRule } from "../types/evaluationTypes";
import RuleListItem from "./RuleListItem";

interface RulesProps {
  flagKey: string;
  onDeleteRule: () => void;
  rules: EvaluationRule[]
}

const Rules:React.FC<RulesProps> = ({ flagKey, onDeleteRule, rules }) => {
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
                onDelete={onDeleteRule}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Rules;