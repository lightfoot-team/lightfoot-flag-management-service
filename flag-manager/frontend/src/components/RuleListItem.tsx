import { type EvaluationRule } from "../types/evaluationTypes";

interface RuleListItemProps {
  ruleDetails: EvaluationRule;
  onDelete: (ruleId: string, ruleName: string) => void;
}

const RuleListItem: React.FC<RuleListItemProps> = ({ ruleDetails, onDelete }) => {
  const { id, name, attribute, operator, values, variant, percentage } = ruleDetails;

  const isEveryoneRule = attribute === "Everyone";

  return (
    <section className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-700">{name}</h2>
        <button
          onClick={() => onDelete(id, name)}
          className="px-5 py-2 rounded-md text-lg font-medium bg-red-100 text-red-800 hover:bg-red-200"
        >
          Delete
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-md p-3 shadow-sm border border-gray-100 flex justify-between items-center">
          <div className="font-medium text-gray-800">Criteria</div>
          <div className="text-gray-600">{attribute}</div>
        </div>

        {!isEveryoneRule && (
          <div className="bg-white rounded-md p-3 shadow-sm border border-gray-100 flex justify-between items-center">
            <div className="font-medium text-gray-800">Operator</div>
            <div className="text-gray-600">{operator}</div>
          </div>
        )}

        {!isEveryoneRule && values && (
          <div className="bg-white rounded-md p-3 shadow-sm border border-gray-100 flex justify-between items-center col-span-2">
            <div className="font-medium text-gray-800">Values</div>
            <div className="text-gray-600">{values.join(', ')}</div>
          </div>
        )}

        <div className="bg-white rounded-md p-3 shadow-sm border border-gray-100 flex justify-between items-center col-span-2">
          <div className="font-medium text-gray-800">Variant</div>
          <div className="text-gray-600">{variant}</div>
        </div>

        <div className="bg-white rounded-md p-3 shadow-sm border border-gray-100 flex justify-between items-center col-span-2">
          <div className="font-medium text-gray-800">Percentage</div>
          <div className="text-gray-600">{percentage}%</div>
        </div>
      </div>
    </section>
  );
};

export default RuleListItem;
