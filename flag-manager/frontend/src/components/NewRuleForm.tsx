import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  type EvaluationRule, 
  type Operator, 
  type EvaluationContext,
  ruleFormSchema,
} from '../types/evaluationTypes';
import { type FlagDetails } from '../types/flagTypes';
import { addRule } from '../services/rules';

interface NewRuleFormProps {
  flag: FlagDetails
  // contextKinds: Array<EvaluationContext>
  onClose: () => void;
}

type RuleFormDetails = z.infer<typeof ruleFormSchema>;

const OPERATORS: Array<Operator> = ['=', '!=', '>', '<', '>=', '<='];

const NewRuleForm:React.FC<NewRuleFormProps> = ({ flag, contextKinds, onClose }) => {
  const { flagKey } = flag;
  
  const { 
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<RuleFormDetails>({
    resolver: zodResolver(ruleFormSchema),
    defaultValues: {
      name: '',
      attribute: 'id',
      operator: '=',
      value: '',
      flagKey: flagKey,
      variant: ''
    }
  });

  const onSubmit = async (data: RuleFormDetails) => {
    try {
      console.log('need to work on backend rule stuff...')
      // await addRule(data);
      onClose();
    } catch (error) {
      console.error("Error submitting rule, please try again", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700 mb-1">Rule Name</label>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="attribute" className="block font-medium text-gray-700 mb-1">User Attribute</label>
          <select
            {...register("attribute")}
            id="attribute"
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an attribute</option>
            <option key='id' value='attribute'>id</option>
            <option key='role' value='role'>role</option>
            <option key='group' value='group'>group</option>
          </select>
        </div>
        <div>
          <label htmlFor="operator" className="block font-medium text-gray-700 mb-1">Operator</label>
          <select
            {...register("operator")}
            id="operator"
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {OPERATORS.map((operator) => (
              <option key={operator} value={operator}>
                {operator}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="value" className="block font-medium text-gray-700 mb-1">Value</label>
          <input
            {...register("value")}
            type="text"
            id="value"
            placeholder="Value"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="variant" className="block font-medium text-gray-700 mb-1">Assign to Variant</label>
          <select
            {...register("variant")}
            id="variant"
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a variant</option>
            {Object.keys(flag.variants || {}).map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
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