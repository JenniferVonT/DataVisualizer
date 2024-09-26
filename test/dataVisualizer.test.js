/**
 * Automatically tests the main dataVisualizer class/module.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module test/dataVisualizer.test.js
 * @version 1.0.0
 */

import { DataVisualizer } from '../src/dataVisualizer.js'

const dataVisualizer = new DataVisualizer()

const setGlobalOptions = dataVisualizer.setGlobalOptions.bind(dataVisualizer)
const createColumnChart = dataVisualizer.createColumnChart.bind(dataVisualizer)
const createLineChart = dataVisualizer.createLineChart.bind(dataVisualizer)
const createPieChart = dataVisualizer.createPieChart.bind(dataVisualizer)