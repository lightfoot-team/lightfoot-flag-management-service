import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { 
  type EvaluationRuleInsertion,
  type Operator, 
  ruleFormSchema,
} from '../types/evaluationTypes';
import { type FlagDetails } from '../types/flagTypes';
import { addRule } from '../services/rules';

interface NewRuleFormProps {
  flag: FlagDetails;
  onClose: () => void;
  onAddRule: (rule: EvaluationRuleInsertion) => void;
}

type RuleFormDetails = z.infer<typeof ruleFormSchema>;

const OPERATORS: Array<Operator> = ['=', '!=', '>', '<', '>=', '<='];

const NewRuleForm: React.FC<NewRuleFormProps> = ({ flag, onClose, onAddRule }) => {
  const { flagKey, flagType } = flag;
  const [values, setValues] = useState<string[]>(['']);
  
  const { 
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RuleFormDetails>({
    resolver: zodResolver(ruleFormSchema),
    defaultValues: {
      name: '',
      attribute: 'id',
      operator: '=',
      values: [''],
      flagKey,
      flagType,
      variant: '',
      percentage: 100,
    },
  });

  const watchedAttribute = watch('attribute');
  const percentage = watch('percentage') ?? 100;

  useEffect(() => {
    if (watchedAttribute !== 'Everyone') {
      setValue('values', values, { shouldValidate: true });
    }
  }, [values, setValue, watchedAttribute]);

  useEffect(() => {
    if (watchedAttribute === 'Everyone') {
      setValues([]); // clear local state
      setValue('values', [], { shouldValidate: true });
      setValue('operator', '=', { shouldValidate: true });
    }
  }, [watchedAttribute, setValue]);

const onSubmit: SubmitHandler<RuleFormDetails> = async (data) => {
    console.log('onSubmit triggered!', data);
    try {
      const filteredData = {
        ...data,
        values: data.attribute === 'Everyone' ? [] : (data.values ?? []),
      };
      await addRule(filteredData);
      onAddRule(filteredData);
      onClose();
    } catch (error) {
      console.error("Error submitting rule, please try again", error);
    }
  };

  const addValue = () => {
    setValues([...values, '']);
  };

  const removeValue = (index: number) => {
    if (values.length > 1) {
      setValues(values.filter((_, i) => i !== index));
    }
  };

  const updateValue = (index: number, newValue: string) => {
    const updatedValues = [...values];
    updatedValues[index] = newValue;
    setValues(updatedValues);
  };

  const isEveryoneRule = watchedAttribute === 'Everyone';

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
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="attribute" className="block font-medium text-gray-700 mb-1">Criteria</label>
          <select
            {...register("attribute")}
            id="attribute"
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select criteria</option>
            <option key='Everyone' value='Everyone'>Everyone</option>
            <option key='id' value='id'>id</option>
            <option key='role' value='role'>role</option>
            <option key='group' value='group'>group</option>
          </select>
          {errors.attribute && (
            <p className="text-red-600 text-sm mt-1">{errors.attribute.message}</p>
          )}
        </div>
        
        {!isEveryoneRule && (
          <>
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
              {errors.operator && (
                <p className="text-red-600 text-sm mt-1">{errors.operator.message}</p>
              )}
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block font-medium text-gray-700">Values</label>
                <button
                  type="button"
                  onClick={addValue}
                  className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200 transition"
                >
                  + Add Value
                </button>
              </div>
              
              <div className="space-y-2">
                {values.map((value, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => updateValue(index, e.target.value)}
                      placeholder={`Value ${index + 1}`}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {values.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeValue(index)}
                        className="text-red-600 hover:text-red-800 px-2 py-1 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              {errors.values && (
                <p className="text-red-600 text-sm mt-1">
                  {Array.isArray(errors.values) 
                    ? "Please check your values" 
                    : errors.values.message
                  }
                </p>
              )}
            </div>
          </>
        )}
        
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
          {errors.variant && (
            <p className="text-red-600 text-sm mt-1">{errors.variant.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="percentage" className="block font-medium text-gray-700 mb-2">
            Percentage: {percentage}%
          </label>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">0%</span>
              <input
                type="range"
                min="0"
                max="100"
                {...register("percentage", { valueAsNumber: true })}
                className=""
              />
            <span className="text-sm text-gray-600">100%</span>
          </div>
          {isEveryoneRule && (
            <p className="text-sm text-gray-600 mt-2">
              This will roll out the selected variant to {percentage}% of all users.
            </p>
          )}
          {!isEveryoneRule && (
            <p className="text-sm text-gray-600 mt-2">
              This will roll out the selected variant to {percentage}% of users matching the above criteria.
            </p>
          )}
        </div>
        
        <input type="hidden" {...register("flagKey")} defaultValue={flagKey} />
        <input type="hidden" {...register("flagType")} defaultValue={flagType} />
        
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
      </form>
    </>
  );
};

export default NewRuleForm;
