# Test Report

This report documents all the tests for this module/package.

- The automatic tests are made using the `jest` framework.

- The semi automatic/manual testing is made on a local server on the client/in the browser using html and js

## ErrorHandler Tests

### `createErrorObject(string, string)` Automatic Tests
| Test Case | Message | Error Code | Expected | Status |
|-----------|---------|------------|----------|--------|
| 1 | test error message | 403 | Instance of Error with message 'test error message' and status 403 | ✅ |
| 2 | 12345  | 433  | Instance of Error with message undefined; status as 433 | ✅ |
| 3 | test error message | '123' | Instance of Error with message 'test error message'; status as undefined | ✅ |
| 4 | test error message | 'test' | Instance of Error with message 'test error message'; status as undefined | ✅ |
| 5 | {} | undefined | Instance of Error with message undefined and status undefined | ✅ |

### `consoleError(Error)` Automatic Tests
| Test Case | Message | Error Code | Console Output | Status |
|-----------|---------|------------|----------------|--------|
| 1 | test error message | 403 | 'MESSAGE: test error message, STATUS: 403' | ✅ |
| 2 | 12345  | 433  | 'STATUS: 433' | ✅ |
| 3 | test error message | '123' | 'MESSAGE: test error message' | ✅ |
| 4 | test error message | 'test' | 'MESSAGE: test error message' | ✅ |
| 5 | {} | undefined | - | ✅ |


## DataVisualizer Tests

### `setGlobalOptions(Object)` Automatic Tests
error message for width = `#isOptionsCorrect: The width is not correctly formatted or missing, please provide a string with integers not starting with 0`

error message for height = `#isOptionsCorrect: The height is not correctly formatted or missing, please provide a string with integers not starting with 0`

error message for color = `#isOptionsCorrect: That color theme does not exist, choose: blue, green, red or yellow`

| Test Case | Color  | Width  | Height |   Expected Error Message   | Status |
|-----------|--------|--------|--------|----------------------------|--------|
| 1         | red    | 500    | 200    | undefined                  |   ✅   |
| 2         | green  | 1500   | 1200   | undefined                  |   ✅   |
| 3         | yellow | 400    | 600    | undefined                  |   ✅   |
| 4         | green  | 000    | 1200   | `error message for width`  |   ✅   |
| 5         | orange | 250    | 1000   | `error message for color`  |   ✅   |
| 6         | yellow | 234    | 222    | `error message for width`  |   ✅   |
| 7         | green  | 234    | 222    | `error message for height` |   ✅   |
| 8         | blue   | test   | test   | `error message for width`  |   ✅   |
| 9         | 2345   | 100    | 100    | `error message for color`  |   ✅   |
| 10        | red    | 500    | test   | `error message for height` |   ✅   |
| 11        | green  | test   | 500    | `error message for width`  |   ✅   |
| 12        | red    | 500    |        | `error message for height` |   ✅   |
| 13        | red    | test   |        | `error message for width`  |   ✅   |
| 14        | red    | 100    |        | `error message for width`  |   ✅   |
| 15        | color  | 500    |        | `error message for color`  |   ✅   |
| 16        | red    |        | 500    | `error message for width`  |   ✅   |
| 17        | red    |        | test   | `error message for width`  |   ✅   |
| 18        | red    |        | 100    | `error message for width`  |   ✅   |
| 19        | color  |        | 500    | `error message for color`  |   ✅   |
| 20        |        | 100    | 100    | `error message for color`  |   ✅   |
| 21        |        | test   | 100    | `error message for color`  |   ✅   |
| 22        |        | 100    | test   | `error message for color`  |   ✅   |
| 23        |        |        | test   | `error message for color`  |   ✅   |
| 24        |        |        | 150    | `error message for color`  |   ✅   |
| 25        |        | 100    |        | `error message for color`  |   ✅   |
| 26        |        | test   |        | `error message for color`  |   ✅   |
| 27        | red    | 100    | 100    | `error message for color`  |   ✅   |
| 28        |        |        |        | `error message for color`  |   ✅   |


### `createLineChart(Object)` Automatic Tests

Also tests the private method `#createChart(String, Object)` that also inserts the global options for the class.
| Test Case | Options | DataPoints | Expected  | Status |
|-----------|---------|------------|-----------|--------|
|    1      |   ✅    |    none    | return type = LineChart |   ✅   |
|    2      |   ✅    |    one     | return type = LineChart |   ✅   |
|    3      |   ✅    |  multiple  | return type = LineChart |   ✅   |


### `createColumnChart(Object)` Automatic Tests

Also tests the private method `#createChart(String, Object)` that also inserts the global options for the class.
| Test Case | Options | DataPoints | Expected  | Status |
|-----------|---------|------------|-----------|--------|
|    1      |   ✅    |    none    | return type = ColumnChart |   ✅   |
|    2      |   ✅    |    one     | return type = ColumnChart |   ✅   |
|    3      |   ✅    |  multiple  | return type = ColumnChart |   ✅   |


### `createPieChart(Object)` Automatic Tests

Also tests the private method `#createChart(String, Object)` that also inserts the global options for the class.
| Test Case | Options | DataPoints | Expected  | Status |
|-----------|---------|------------|-----------|--------|
|    1      |   ✅    |    none    | return type = PieChart |   ✅   |
|    2      |   ✅    |    one     | return type = PieChart |   ✅   |
|    3      |   ✅    |  multiple  | return type = PieChart |   ✅   |

