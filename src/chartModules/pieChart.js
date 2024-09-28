/**
 * A module that creates pie charts.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module src/chartModules/pieChart.js
 * @version 1.0.0
 */

import { Chart } from './chart.js'

export class PieChart extends Chart {
  constructor (globalOptions, dataPoints) {
    super(globalOptions, dataPoints) 
  }

  _drawChart () {
    try {
      this._drawPieChart(Object.keys(this._dataPoints).length)
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  _drawPieChart (amountOfDataPoints) {
    try {
      const chart = this._canvasElement.getContext('2d')
      const theme = this._getTheme()

      const maxValue = this._getMaxDataValue()

      const chartHeight = this._canvasElement.height
      const chartWidth = this._canvasElement.width


      chart.fillStyle = theme.background
      chart.fillRect(0, 0, this._canvasElement.width, this._canvasElement.height)

      const totalSumOfAllData = Object.values(this._dataPoints).reduce((acc, value) => acc + value, 0)
      let startAngle = 0

      Object.entries(this._dataPoints).forEach(([ name, data ], index) => {
        const dataSliceAngle = (data / totalSumOfAllData) * 2 * Math.PI
        const endAngle = startAngle + dataSliceAngle
    
        chart.beginPath()
        chart.moveTo(chartWidth / 2, chartHeight / 2)
        chart.arc((chartWidth / 2), (chartHeight / 2), (chartHeight / 2 - 20), startAngle, endAngle)
        chart.closePath()

        // Loop all the colors to fill the data slices with.
        chart.fillStyle = theme.data[index % theme.data.length]
        chart.fill()

        chart.lineWidth = 1
        chart.stroke()

        const angleAtTheCenterOfSlice = (startAngle + endAngle) / 2
        const textPositionX = (chartWidth / 2) + (chartHeight / 2 - 20) * Math.cos(angleAtTheCenterOfSlice) * 1.35
        const textPositionY = (chartHeight / 2) + (chartHeight / 2 - 20) * Math.sin(angleAtTheCenterOfSlice) * 1.1

        chart.strokeStyle = theme.lines || 'black'
        chart.fillStyle = theme.lines || 'black'
        chart.textAlign = 'center'
        chart.font = '1rem "Roboto", sans-serif'
        chart.fillText(`${name}(${data})`, textPositionX, textPositionY)

        startAngle = endAngle
      })
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }
}