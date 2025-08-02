import { type EvaluationRule } from "../types/evaluationTypes";

interface RuleListItemProps {
  ruleDetails: EvaluationRule
}

const RuleListItem = ({ ruleDetails }: RuleListItemProps) => {
  const { name, attribute, operator, values, variant } = ruleDetails;

  return (
    <section className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">{name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-md p-3 shadow-sm border border-gray-100 flex justify-between items-center">
          <div className="font-medium text-gray-800">Attribute</div>
          <div className="text-gray-600">{attribute}</div>
        </div>
        <div className="bg-white rounded-md p-3 shadow-sm border border-gray-100 flex justify-between items-center">
          <div className="font-medium text-gray-800">Operator</div>
          <div className="text-gray-600">{operator}</div>
        </div>
        <div className="bg-white rounded-md p-3 shadow-sm border border-gray-100 flex justify-between items-center col-span-2">
          <div className="font-medium text-gray-800">Values</div>
          <div className="text-gray-600">{values.join(', ')}</div>
        </div>
        <div className="bg-white rounded-md p-3 shadow-sm border border-gray-100 flex justify-between items-center col-span-2">
          <div className="font-medium text-gray-800">Variant</div>
          <div className="text-gray-600">{variant}</div>
        </div>
      </div>
    </section>
  );
}

export default RuleListItem;
