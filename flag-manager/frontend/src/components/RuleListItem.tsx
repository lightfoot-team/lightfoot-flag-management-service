import { type EvaluationRule } from "../types/evaluationTypes";
interface RuleListItemProps {
  ruleDetails: EvaluationRule
}
const RuleListItem = (props: RuleListItemProps)=> {
  const {name, contextKind, attribute, operator, values, flagKey, variant} = props.ruleDetails;
  return (
    <>
      <div>name: {name}</div>
      <div>contextKind: {contextKind}</div>
            <div>flagKey: {flagKey}</div>
      <div>variant: {variant} </div>
      <div>attribute: {attribute}</div>
      <div>operator: {operator}</div>
      <div>values: {values}</div>

    </>
  )
}

export default RuleListItem;