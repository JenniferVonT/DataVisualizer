# Test Report

This report documents all the tests for this module/package.
The automatic tests are made using the `jest` framework.
The semi automatic/manual testing is made on a local server on the client/in the browser using html and js

## ErrorHandler Tests

### `createErrorObject(string, string)` Automatic Tests
| Test Case |       Message      | Error Code |                                 Expected                                 | Status |
|-----------|--------------------|------------|--------------------------------------------------------------------------|--------|
|     1     | test error message |    403     | Instance of Error with message 'test error message' and status 403       |   ✅   |
|     2     | 12345              |    433     | Instance of Error with message undefined; status as 433                  |   ✅   |
|     3     | test error message |   '123'    | Instance of Error with message 'test error message'; status as undefined |   ✅   |
|     4     | test error message |   'test'   | Instance of Error with message 'test error message'; status as undefined |   ✅   |
|     5     | {}                 | undefined  | Instance of Error with message undefined and status undefined            |   ✅   |

### `consoleError(Error)` Automatic Tests
| Test Case |      Message       | Error Code |                Console Output              | Status |
|-----------|--------------------|------------|--------------------------------------------|--------|
|     1     | test error message |    403     | 'MESSAGE: test error message, STATUS: 403' |   ✅   |
|     2     |       12345        |    433     | 'STATUS: 433'                              |   ✅   |
|     3     | test error message |   '123'    | 'MESSAGE: test error message'              |   ✅   |
|     4     | test error message |   'test'   | 'MESSAGE: test error message'              |   ✅   |
|     5     |         {}         | undefined  | -                                          |   ✅   |


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

Also tests the private method `#createChart(String, Object)` that also takes the global options for the class.
| Test Case | Options | DataPoints |         Expected        | Status |
|-----------|---------|------------|-------------------------|--------|
|    1      |   ✅    |    none    | return type = LineChart |   ✅   |
|    2      |   ✅    |    one     | return type = LineChart |   ✅   |
|    3      |   ✅    |  multiple  | return type = LineChart |   ✅   |


### `createColumnChart(Object)` Automatic Tests

Also tests the private method `#createChart(String, Object)` that also takes the global options for the class.
| Test Case | Options | DataPoints |         Expected          | Status |
|-----------|---------|------------|---------------------------|--------|
|    1      |   ✅    |    none    | return type = ColumnChart |   ✅   |
|    2      |   ✅    |    one     | return type = ColumnChart |   ✅   |
|    3      |   ✅    |  multiple  | return type = ColumnChart |   ✅   |


### `createPieChart(Object)` Automatic Tests

Also tests the private method `#createChart(String, Object)` that also takes the global options for the class.
| Test Case | Options | DataPoints |        Expected        | Status |
|-----------|---------|------------|------------------------|--------|
|    1      |   ✅    |    none    | return type = PieChart |   ✅   |
|    2      |   ✅    |    one     | return type = PieChart |   ✅   |
|    3      |   ✅    |  multiple  | return type = PieChart |   ✅   |

## Chart Tests

error message for data validity = `#isDataPointsValid: One or more datapoint value(s) is not the correct type, it should be a number.`

### `setColorTheme(str)` Automatic Tests

error message for color = `setColorTheme: That color theme does not exist, choose: blue, green, red or yellow`

Also tests the private method `#isColorValidType(str)`
| Test Case |   Input  |                 Expected                | Status |
|-----------|----------|-----------------------------------------|--------|
|     1     |  'blue'  | 'pass': _globalOptions.color = 'blue'   |   ✅   |
|     2     | 'green'  | 'pass': _globalOptions.color = 'green'  |   ✅   |
|     3     |  'red'   | 'pass': _globalOptions.color = 'red'    |   ✅   |
|     4     | 'yellow' | 'pass': _globalOptions.color = 'yellow' |   ✅   |
|     5     | 'orange' | `error message for color`               |   ✅   |
|     6     | 'purple' | `error message for color`               |   ✅   |
|     7     |   1234   | `error message for color`               |   ✅   |


### `insertDataPoint(str, int)` Automatic Tests

| Test Case |      Input     |             Expected            | Status |
|-----------|----------------|---------------------------------|--------|
|     1     | 'cats', 235    | 'pass': _dataPoints.cats = 235  |   ✅   |
|     2     | 'dogs', 150    | 'pass': _dataPoints.dogs = 150  |   ✅   |
|     3     | 'birds', 350   | 'pass': _dataPoints.birds = 350 |   ✅   |
|     4     | '1234', '100'  |  `error message data validity`  |   ✅   |
|     5     | 'test', 'test' |  `error message data validity`  |   ✅   |


### `updateDataPoint(str, int)` Automatic Tests

first insert a data point then update it.

| Test Case |   First Input  | Second Input |            Expected            | Status |
|-----------|----------------|--------------|--------------------------------|--------|
|     1     | 'cats', 235    | 'cats', 1    | 'pass': _dataPoints.cats = 1   |   ✅   |
|     2     | 'dogs', 150    | 'dogs', 1    | 'pass': _dataPoints.dogs = 1   |   ✅   |
|     3     | 'birds', 350   | 'birds', 1   | 'pass': _dataPoints.birds = 1  |   ✅   |
|     4     | '1234', '100'  |      -       | `error message data validity`  |   ✅   |
|     5     | 'test', 'test' |      -       | `error message data validity`  |   ✅   |


### `deleteDataPoint(str, int)` Automatic Tests

first insert a data point then delete it.

| Test Case |   First Input  | Second Input |                 Expected              | Status |
|-----------|----------------|--------------|---------------------------------------|--------|
|     1     | 'cats', 235    | 'cats', 235  | 'pass': _dataPoints.cats = undefined  |   ✅   |
|     2     | 'dogs', 150    | 'dogs', 150  | 'pass': _dataPoints.dogs = undefined  |   ✅   |
|     3     | 'birds', 350   | 'birds', 350 | 'pass': _dataPoints.birds = undefined |   ✅   |
|     4     | '1234', '100'  |      -       |     `error message data validity`     |   ✅   |
|     5     | 'test', 'test' |      -       |     `error message data validity`     |   ✅   |

### `setWidthTo(int)`

| Test Case | Input |               Expected              | Status |
|-----------|-------|-------------------------------------|--------|
|     1     |  100  | 'pass': _globalOptions.width = 100  |   ✅   |
|     2     |  350  | 'pass': _globalOptions.width = 350  |   ✅   |
|     3     |  20   | 'pass': _globalOptions.width = 20   |   ✅   |
|     4     |  2000 | 'pass': _globalOptions.width = 2000 |   ✅   |
|     5     |  -234 |   _globalOptions.width = undefined  |   ✅   |
|     6     |  2350 |   _globalOptions.width = undefined  |   ✅   |

### `setHeightTo(int)`

| Test Case | Input |               Expected              | Status |
|-----------|-------|-------------------------------------|--------|
|     1     |  100  | 'pass': _globalOptions.width = 100  |   ✅   |
|     2     |  350  | 'pass': _globalOptions.width = 350  |   ✅   |
|     3     |  20   | 'pass': _globalOptions.width = 20   |   ✅   |
|     4     |  2000 | 'pass': _globalOptions.width = 2000 |   ✅   |
|     5     |  -234 |   _globalOptions.width = undefined  |   ✅   |
|     6     |  2350 |   _globalOptions.width = undefined  |   ✅   |

### `clearChart()`

| Test Case |                 Input                 |          Expected         | Status |
|-----------|---------------------------------------|---------------------------|--------|
|     1     | Set multiple data points - then clear | 'pass': _dataPoints = {}  |   ✅   |
