# Code Review: Exercise Calculator

## Executive Summary

Your exercise calculator implementation demonstrates solid foundational TypeScript skills with good test coverage. However, there are several critical issues that need immediate attention, along with opportunities to improve code quality, maintainability, and TypeScript best practices.

---

## 🔴 Critical Issues (Fix Immediately)

### 1. **`test.only` Preventing Other Tests from Running**
**Location:** [exerciseCalculator.test.ts:27](exerciseCalculator.test.ts#L27)

```typescript
test.only('rate', () => {  // ⚠️ This skips ALL other tests!
```

**Problem:** The `.only` modifier causes Jest to skip all other tests in the file. This means you're only testing the `rate` function while ignoring all other test suites.

**Impact:** You might have broken functionality in other functions without knowing it. This is a debugging artifact that must be removed before committing.

---

### 2. **Module-Level Side Effects**
**Location:** [exerciseCalculator.ts:68](exerciseCalculator.ts#L68)

```typescript
main()  // ⚠️ Executes every time module is imported!
```

**Problem:** Calling `main()` at the module level means this code runs whenever the file is imported—including during test runs. This violates the principle of pure modules.

**Impact:**
- Console output appears during test execution
- Makes the module less reusable
- Prevents proper separation between library code and CLI code

**Better Pattern:**
```typescript
// Only run main if this file is executed directly
if (require.main === module) {
  main()
}
```

Or better yet, move the CLI logic to a separate file entirely.

---

### 3. **Missing TypeScript Return Type Annotations**
**Locations:** Multiple functions

**Problem:** Several exported functions lack explicit return type annotations:

```typescript
// Current
export function calcTrainingDays(weekArray: number[]) {
  return weekArray.filter(i => i > 0).length
}

// Better
export function calcTrainingDays(weekArray: number[]): number {
  return weekArray.filter(i => i > 0).length
}
```

**Missing return types on:**
- `calcTrainingDays` (line 11)
- `calcSuccess` (line 24)
- `rate` (line 28)
- `describeRating` (line 33)
- `comp` (line 45) - should return `: Result`

**Why it matters:** Explicit return types improve code documentation, catch errors earlier, and make refactoring safer.

---

## 🟡 High Priority Issues

### 4. **Redundant Ternary Operator**
**Location:** [exerciseCalculator.ts:25](exerciseCalculator.ts#L25)

```typescript
// Current - unnecessarily verbose
return average >= target ? true : false

// Better - direct boolean return
return average >= target
```

The comparison already returns a boolean; wrapping it in a ternary is redundant.

---

### 5. **Spelling Error in User-Facing Text**
**Location:** [exerciseCalculator.ts:41](exerciseCalculator.ts#L41)

```typescript
return 'Pretty lowsy! Are you even trying?!'
//             ^^^^^ should be "lousy"
```

---

### 6. **Vague and Inconsistent Function Names**

**Problems:**
- `comp` - Extremely unclear. What does "comp" mean? Complete? Compute? Compare?
- `rate` - Too generic. Rate what? How?
- `calculateAvg` - Abbreviates "Average" while other functions spell out words
- Mix of `calc` and `calculate` prefixes

**Recommendations:**
- `comp` → `calculateExerciseMetrics` or `analyzeTraining`
- `rate` → `calculatePerformanceRating` or `computeRating`
- `calculateAvg` → `calculateAverage` (for consistency)

---

### 7. **No Documentation (JSDoc Comments)**

**Problem:** None of your exported functions or the `Result` interface have documentation.

**Example of what's needed:**

```typescript
/**
 * Analyzes weekly training data and returns comprehensive metrics
 * @param weekArray - Array of 7 numbers representing daily exercise hours
 * @param target - Target average hours per day
 * @returns Object containing training statistics and performance rating
 * @throws Error if weekArray doesn't contain exactly 7 elements
 */
export function comp(weekArray: number[], target: number): Result {
  // ...
}
```

**Benefits:**
- Better IDE autocomplete
- Clearer API for other developers
- Self-documenting code

---

## 🟢 Medium Priority Improvements

### 8. **Floating-Point Precision Issues**

**Location:** [exerciseCalculator.ts:30](exerciseCalculator.ts#L30)

```typescript
const num = (average * 3) / target
return Number(num.toPrecision(2))
```

**Issues:**
1. `toPrecision(2)` gives 2 **significant figures**, not 2 decimal places
   - `1.5` → `1.5` ✓
   - `15` → `15` ✓
   - `0.5` → `0.50` ✓
   - `123` → `1.2e+2` ✗ (scientific notation!)
2. `Number()` conversion is redundant—`toPrecision()` already returns a number

**Test Example:** [exerciseCalculator.test.ts:28](exerciseCalculator.test.ts#L28-L31)
```typescript
expect(rate(1.65, 2)).toBe(2.5)
expect(rate(1.3, 2)).toBe(2)  // This works, but is fragile
```

**Better approach:**
```typescript
// For 1 decimal place
return Math.round(num * 10) / 10

// For 2 decimal places
return Math.round(num * 100) / 100
```

---

### 9. **Incomplete Error Handling**

**Current state:**
- ✅ `calculateAvg` validates array length
- ❌ No validation for negative numbers
- ❌ No validation for target = 0 (would make rating calculation meaningless)
- ❌ No validation in `calcTrainingDays`, `calcSuccess`, `rate`, `describeRating`

**Edge cases not handled:**
```typescript
calcTrainingDays([])  // Returns 0 (probably OK?)
calcTrainingDays([-5, -3, 10])  // Counts -5 and -3 as training days? No!
rate(2, 0)  // Division by zero → Infinity
```

**Recommendation:** Add input validation to key functions:

```typescript
export function rate(average: number, target: number): number {
  if (target <= 0) {
    throw new Error('Target must be greater than 0')
  }
  if (average < 0) {
    throw new Error('Average cannot be negative')
  }
  // ...
}
```

---

### 10. **Array Length Validation is Hardcoded to 7**

**Location:** [exerciseCalculator.ts:16](exerciseCalculator.ts#L16)

```typescript
if (weekArray.length < 7) {
  throw new Error(`Your array should include 7 items...`)
}
```

**Issues:**
1. Hardcodes the expectation of 7 days
2. Only checks `< 7`, not `!== 7` (allows 8+ days)
3. Makes the function less reusable

**Questions to consider:**
- Should this function work with any array length?
- If 7 is required, should it also reject arrays > 7?
- Could you make period length configurable?

---

## 🔵 Testing Quality Issues

### 11. **Insufficient Test Coverage**

**Missing test cases:**

1. **Error path testing:**
   ```typescript
   // No test for this error case!
   test('calculateAvg throws error for invalid array length', () => {
     expect(() => calculateAvg([1, 2, 3])).toThrow()
   })
   ```

2. **Edge cases:**
   - Empty arrays
   - Negative numbers
   - Zero values
   - Very large numbers
   - Boundary values (rating exactly at 3.0, 1.5, 0.5)

3. **Integration testing:**
   - Only one test for `comp` with one scenario
   - Need multiple scenarios (success/failure, different rating levels)

---

### 12. **Floating-Point Test Assertions**

**Location:** [exerciseCalculator.test.ts:4](exerciseCalculator.test.ts#L4)

```typescript
expect(calculateAvg([3, 0, 2, 4.5, 0, 3, 1])).toBe(1.9285714285714286)
```

**Problem:** Using exact floating-point equality can be fragile across different JavaScript engines or environments.

**Better approach:**
```typescript
expect(calculateAvg([3, 0, 2, 4.5, 0, 3, 1])).toBeCloseTo(1.929, 3)
```

This checks if the value is close to 1.929 within 3 decimal places, which is more robust.

---

### 13. **Poor Variable Naming in Tests**

**Location:** [exerciseCalculator.test.ts:50-62](exerciseCalculator.test.ts#L50-L62)

```typescript
const arr = [3, 0, 2, 4.5, 0, 3, 1]  // What does arr represent?
const targ = 2                        // Why abbreviate?
const res = { ... }                   // What result?
```

**Better naming:**
```typescript
const weeklyHours = [3, 0, 2, 4.5, 0, 3, 1]
const targetHours = 2
const expectedMetrics = { ... }
```

Tests should be even more readable than production code!

---

## 📊 Code Structure & Organization

### 14. **Good Practices You're Following** ✅

1. **Single Responsibility:** Each function does one thing
2. **Functional Composition:** `comp` effectively combines smaller functions
3. **No Global State:** All functions are pure (except `main`)
4. **TypeScript Usage:** Parameters are properly typed
5. **Test Organization:** Good use of `describe` blocks
6. **Export Strategy:** Exporting utilities makes them testable

---

### 15. **Opportunities for Improvement**

**Consider this structure:**

```
exerciseCalculator/
├── types.ts              # Interface definitions
├── calculators.ts        # Pure calculation functions
├── validators.ts         # Input validation
├── index.ts             # Main API (comp function)
├── cli.ts               # CLI logic (main function)
└── __tests__/
    ├── calculators.test.ts
    ├── validators.test.ts
    └── integration.test.ts
```

This separates concerns and makes each file focused on one responsibility.

---

## 🎯 Summary of Recommendations

### Must Fix (Before Committing)
1. ✅ Remove `test.only` from line 27
2. ✅ Remove or guard `main()` execution at module level
3. ✅ Add return type annotations to all functions
4. ✅ Fix "lowsy" → "lousy" typo

### Should Fix (High Value)
5. ✅ Simplify `calcSuccess` ternary
6. ✅ Rename vague functions (`comp`, `rate`)
7. ✅ Add JSDoc comments
8. ✅ Add error handling for edge cases

### Nice to Have (Quality Improvements)
9. ✅ Improve floating-point handling (replace `toPrecision`)
10. ✅ Add comprehensive edge case tests
11. ✅ Use `toBeCloseTo()` for float assertions
12. ✅ Better variable names in tests
13. ✅ Add tests for error conditions

---

## 💡 Overall Assessment

**Strengths:**
- Solid fundamental programming skills
- Good test coverage for happy paths
- Clean functional style
- Proper TypeScript parameter typing

**Areas for Growth:**
- TypeScript best practices (return types, interfaces)
- Error handling and edge cases
- Code documentation
- Naming conventions and consistency
- Module organization and separation of concerns

**Grade: B-** (Would be B+ after fixing critical issues)

Your code works and is reasonably well-tested, but there's significant room for improvement in professional software engineering practices. The good news is that these are all easily fixable issues, and addressing them will level up your code quality significantly!
