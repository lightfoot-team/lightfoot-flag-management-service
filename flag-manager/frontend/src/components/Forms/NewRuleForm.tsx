import { useState } from 'react';
import { type EvaluationRule, type Operator, type EvaluationContext } from '../../types/evaluationTypes';
import { type FlagDetails } from '../../types/flagTypes';
import { addRule } from '../../services/rules';

interface NewRuleFormProps {
  flag: FlagDetails
  contextKinds: Array<EvaluationContext>
}
const OPERATORS: Array<Operator> = ['equals', 'contains', 'endsWith', 'startsWith', 'lessThan']
const NewRuleForm = (props: NewRuleFormProps) => {
  const { flag, contextKinds } = props;
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
      <h3>Add a new rule</h3>
      <form onSubmit={handleSubmit}>
        <div id='name-input-container'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setFormState({ ...formState, name: e.target.value });
            }}
            required
          />
        </div>
        <div id='context-select-container'>
          <label htmlFor="context-kind">Context Kind</label>
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
          >
            {contextKinds.map((context) => {
              return (
                <option value={context.kind}>{context.kind}</option>
              )
            })}
          </select>
        </div>
        <div id='attribute-select-container'>
          <label htmlFor="attribute">Attribute</label>
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
          >
            {Object.keys(contextKinds[0]).map((attribute) => {
              return (
                <option value={attribute}>{attribute}</option>
              )
            })}
          </select>
        </div>
        <div id='operator-select-container'>
          <label htmlFor="operator">Operator</label>
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
          >
            {OPERATORS.map((operator) => {
              return (
                <option value={operator}>{operator}</option>
              )
            })}
          </select>
        </div>
        <div id='values-input-container'>
          <label htmlFor="values">Values</label>
          <input
            type="text"
            placeholder="Value"
            onChange={(e) => {
              const newValues = [ e.target.value];
              setFormState({ ...formState, values: newValues });
            }}
            required
          />
        </div>
        <div id='variant-select-container'>
          <label htmlFor="variant">Variant</label>
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
          >
            {Object.keys(flag.variants).map((variant) => {
              return (
                <option value={variant}>{variant}</option>
              )
            })}
          </select>
        </div>
        <button type="submit">Submit Rule</button>


      </form >
    </>
  )
};
export default NewRuleForm