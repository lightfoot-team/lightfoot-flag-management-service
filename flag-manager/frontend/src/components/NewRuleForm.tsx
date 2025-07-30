import { useState } from 'react';
import { 
  type EvaluationRule, 
  type Operator, 
  type EvaluationContext
} from '../types/evaluationTypes';
import { type FlagDetails } from '../types/flagTypes';
import { addRule } from '../services/rules';
import { z } from 'zod';

interface NewRuleFormProps {
  flag: FlagDetails
  contextKinds: Array<EvaluationContext>
  onClose: () => void;
}

type NewRuleFormDetails = z.infer<typeof ruleFormSchema>;

const OPERATORS: Array<Operator> = ['equals', 'contains', 'endsWith', 'startsWith', 'lessThan']

const NewRuleForm = (props: NewRuleFormProps) => {
  const { flag, contextKinds, onClose } = props;
  const { flagKey, flagType } = flag;
  const [formState, setFormState] = useState<EvaluationRule>({
    name: '',
    contextKind: 'user',
    attribute: '',
    operator: 'equals',
    values: [],
    flagKey: flagKey,
    variant: ''
  })
  const [currentContext, setCurrentContext] = useState<EvaluationContext>(contextKinds[0])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addRule(formState)
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setFormState({ ...formState, name: e.target.value });
            }}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="context-kind" className="block font-medium text-gray-700 mb-1">Context Kind</label>
          <select
            id="context-select"
            value={formState.contextKind}
            onChange={(e) =>
              setFormState({
                ...formState,
                contextKind: e.target.value
              })
            }
            required
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {contextKinds.map((context) => {
              return (
                <option key={context.kind} value={context.kind}>{context.kind}</option>
              )
            })}
          </select>
        </div>
        <div>
          <label htmlFor="attribute" className="block font-medium text-gray-700 mb-1">Attribute</label>
          <select
            id="attribute-select"
            value={formState.attribute}
            onChange={(e) =>
              setFormState({
                ...formState,
                attribute: e.target.value
              })
            }
            required
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.keys(contextKinds[0]).map((attribute) => {
              return (
                <option key={attribute} value={attribute}>{attribute}</option>
              )
            })}
          </select>
        </div>
        <div>
          <label htmlFor="operator" className="block font-medium text-gray-700 mb-1">Operator</label>
          <select
            id="operator-select"
            value={formState.operator}
            onChange={(e) =>
              setFormState({
                ...formState,
                operator: e.target.value as Operator
              })
            }
            required
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {OPERATORS.map((operator) => {
              return (
                <option key={operator} value={operator}>{operator}</option>
              )
            })}
          </select>
        </div>
        <div>
          <label htmlFor="values" className="block font-medium text-gray-700 mb-1">Values</label>
          <input
            type="text"
            placeholder="Value"
            onChange={(e) => {
              const newValues = [ e.target.value];
              setFormState({ ...formState, values: newValues });
            }}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="variant" className="block font-medium text-gray-700 mb-1">Variant</label>
          <select
            id="variant-select-container"
            value={formState.variant}
            onChange={(e) =>
              setFormState({
                ...formState,
                variant: e.target.value
              })
            }
            required
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.keys(flag.variants).map((variant) => {
              return (
                <option key={variant} value={variant}>{variant}</option>
              )
            })}
          </select>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 rounded-md text-base bg-blue-200 text-blue-1000 hover:bg-blue-300 transition"
          >
            Submit Rule
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md text-base bg-red-100 text-red-800 hover:bg-red-200 transition"
          >
            Cancel
          </button>
        </div>
      </form >
    </>
  )
};

export default NewRuleForm