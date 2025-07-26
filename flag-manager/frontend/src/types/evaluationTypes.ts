// //TODO: make sure this matches evaluation-api version or deduplicate 

// export interface EvaluationContext {
//   targetingKey: string, // unique identifier for subject (ie UUID or hash of username)
//   kind: string
//   [attributes: string]: unknown
// }
// export interface UserEvaluationContext extends EvaluationContext {
//   kind: "user"
//   name?: string
//   email?: string
//   location?: string     //TODO: different data type here?
//   [attributes: string]: unknown
// }

// /**
//  * Allows multiple contexts to be combined for evaluation
//  */
// export interface MultiContext {
//   name: string
//   contexts: {
//     [kind: string]: EvaluationContext
//   }
// }

// // equals, notEquals, endsWith, startsWith,
// // matches(regex), contains, >/>=, </<=, before/after(dates)
// export type Operator =
//   'equals' | 'notEquals' | 'endsWith' | 'startsWith' |
//   'matches' | 'contains' | 'lessThan' | 'greaterThan' |
//   'lessThanEquals' | 'greaterThanEquals' | 'before' | 'after';

// export interface EvaluationRule {
//   name: string
//   contextKind: string
//   attribute: string //TODO: should exist on context type
//   operator: Operator
//   values: Array<string> //TODO: arr should have values of same type as attribute type
//   flagKey: string
//   variant: string //TODO: should exist on flag type
// }


// /*
// Rule: 


// curl -X POST http://localhost:3000/api/flags/rule \
//   -H "Content-Type: application/json" \
//   -d '{
//     "rule": {
//       "name": "admin can see featured park",
//       "contextKind": "user",
//       "attribute": "username",
//       "operator": "equals",
//       "values": ["admin"],
//       "flagKey": "featured-park",
//       "variant": "on"
//     }
//   }'

// */

