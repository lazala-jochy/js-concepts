
# Interview Prep README

## Node.js (40 Q&A)
1. What is Node.js?  
Node.js is a runtime environment that allows JavaScript to run on the server.

2. Event loop?  
Handles async operations in a non-blocking way.

3. Blocking vs Non-blocking?  
Blocking waits, non-blocking continues execution.

4. require vs import?  
require = CommonJS, import = ES Modules.

5. Middleware?  
Functions that run during request lifecycle.

6. Express?  
Minimal web framework.

7. Streams?  
Process data in chunks.

8. Buffer?  
Temporary memory for binary data.

9. Cluster?  
Run multiple processes.

10. Worker threads?  
Run CPU-heavy tasks.

11. package.json?  
Project metadata.

12. npm vs yarn?  
Package managers.

13. process object?  
Global runtime info.

14. __dirname?  
Current directory.

15. Error handling?  
try/catch or middleware.

16. REST API?  
Standard HTTP API.

17. JWT?  
Token-based auth.

18. CORS?  
Cross-origin rules.

19. dotenv?  
Environment variables.

20. fs module?  
File system access.

21. child_process?  
Run shell commands.

22. http module?  
Create server.

23. MVC pattern?  
Separation of concerns.

24. Rate limiting?  
Prevent abuse.

25. WebSockets?  
Real-time communication.

26. Scaling?  
Horizontal scaling.

27. PM2?  
Process manager.

28. Logging?  
Winston, Morgan.

29. Testing?  
Jest, Mocha.

30. Async/await?  
Simplifies promises.

31. Promise?  
Async result.

32. Callback?  
Function passed as argument.

33. EventEmitter?  
Handle events.

34. Microservices?  
Small services.

35. Monolith?  
Single app.

36. Docker?  
Containerization.

37. CI/CD?  
Automation.

38. Security?  
Helmet, validation.

39. Performance?  
Caching, clustering.

40. Example: Express API
```js
import express from 'express';
const app = express();
app.get('/', (req,res)=>res.send('Hello'));
app.listen(3000);
```

---

## React (40 Q&A)
1. What is React?  
Library for UI.

2. Component?  
Reusable UI block.

3. JSX?  
HTML in JS.

4. State?  
Component data.

5. Props?  
Data from parent.

6. useState?  
State hook.

7. useEffect?  
Side effects.

8. Virtual DOM?  
Efficient rendering.

9. Key prop?  
List identity.

10. Controlled input?  
State-driven.

11. Uncontrolled?  
DOM-driven.

12. Context?  
Global state.

13. Redux?  
State management.

14. useReducer?  
Complex state.

15. useMemo?  
Memoization.

16. useCallback?  
Function memo.

17. Fragment?  
No extra DOM.

18. Portal?  
Render outside tree.

19. Error boundary?  
Catch errors.

20. Lazy loading?  
Code splitting.

21. Suspense?  
Loading UI.

22. Hooks rules?  
Top-level only.

23. Functional vs class?  
Hooks vs lifecycle.

24. Lifecycle?  
Mount/update/unmount.

25. Reconciliation?  
DOM diffing.

26. SSR?  
Server rendering.

27. Next.js?  
Framework.

28. Routing?  
React Router.

29. Forms?  
Controlled.

30. Validation?  
Libraries.

31. Styling?  
CSS, styled-components.

32. Testing?  
RTL, Jest.

33. Performance?  
Memo, lazy.

34. StrictMode?  
Dev tool.

35. DevTools?  
Debugging.

36. Custom hooks?  
Reusable logic.

37. HOC?  
Higher-order component.

38. Render props?  
Function as child.

39. Example:
```jsx
function App(){
  const [count,setCount]=useState(0);
  return <button onClick={()=>setCount(count+1)}>{count}</button>;
}
```

40. Difference useMemo vs useCallback?  
Memo returns value, callback returns function.

---

## JavaScript (40 Q&A)
1. var vs let vs const?  
Scope differences.

2. Hoisting?  
Variables lifted.

3. Closure?  
Function with memory.

4. Promise?  
Async.

5. Async/await?  
Cleaner async.

6. this?  
Context.

7. Arrow function?  
No own this.

8. Prototype?  
Inheritance.

9. Class?  
Syntax sugar.

10. Event loop?  
Async queue.

11. Callbacks?  
Functions passed.

12. Map vs object?  
Key-value.

13. Set?  
Unique values.

14. WeakMap?  
Garbage collected.

15. JSON?  
Data format.

16. Spread?  
Copy.

17. Rest?  
Collect args.

18. Destructuring?  
Extract values.

19. Template strings?  
`${}`

20. Modules?  
import/export.

21. Strict mode?  
Safer JS.

22. Type coercion?  
Implicit conversion.

23. Equality?  
== vs ===.

24. NaN?  
Not a number.

25. isNaN?  
Check.

26. parseInt?  
Convert.

27. Date?  
Time.

28. RegExp?  
Patterns.

29. Debounce?  
Delay calls.

30. Throttle?  
Limit calls.

31. localStorage?  
Browser storage.

32. sessionStorage?  
Session data.

33. Cookies?  
Small data.

34. Fetch API?  
HTTP calls.

35. Error handling?  
try/catch.

36. DOM?  
Document.

37. BOM?  
Browser.

38. Example closure:
```js
function counter(){
 let c=0;
 return ()=>++c;
}
```

39. Garbage collection?  
Memory cleanup.

40. BigInt?  
Large numbers.

---

## TypeScript (40 Q&A)
1. What is TS?  
Typed JS.

2. Types?  
string, number.

3. Interface?  
Object shape.

4. Type alias?  
Custom type.

5. Enum?  
Constants.

6. Any?  
No type.

7. Unknown?  
Safer any.

8. Void?  
No return.

9. Never?  
No value.

10. Generics?  
Reusable types.

11. Union?  
A | B.

12. Intersection?  
A & B.

13. Optional?  
? property.

14. Readonly?  
Immutable.

15. Tuple?  
Fixed array.

16. Type inference?  
Auto types.

17. Assertion?  
as type.

18. Modules?  
import/export.

19. Decorators?  
Meta programming.

20. tsconfig?  
Config.

21. Compilation?  
tsc.

22. Strict mode?  
Safer.

23. Namespace?  
Grouping.

24. Interface vs type?  
Similar, differences.

25. extends?  
Inheritance.

26. implements?  
Class contract.

27. keyof?  
Keys.

28. typeof?  
Type from value.

29. Partial?  
Optional all.

30. Required?  
Mandatory all.

31. Pick?  
Select fields.

32. Omit?  
Exclude fields.

33. Record?  
Key-value type.

34. Utility types?  
Helpers.

35. Declaration merging?  
Extend.

36. Ambient?  
declare.

37. Example:
```ts
interface User {name:string}
const u:User={name:"Jochy"};
```

38. TS vs JS?  
Types.

39. Benefits?  
Safety.

40. Drawbacks?  
Setup complexity.
