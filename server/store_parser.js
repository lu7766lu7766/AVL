const csv = require('csv-parser');
const fs = require('fs');
const path = require('path')
const pathResolve = filePath => path.join(__dirname, '..', filePath)
const _ = require('lodash')

const weekMapping = {
  'Mon': 1,
  'Tue': 2,
  'Wes': 3,
  'Thu': 4,
  'Fri': 5,
  'Sat': 6,
  'Sun': 7,
}
class StoreParser {
  static async working() {
    const rows = []
    return new Promise((resolve) => {
      fs.createReadStream(pathResolve('public/store.csv'))
        .pipe(csv())
        .on('data', (row) => {
          // console.log(row)
          rows.push(row)
        })
        .on('end', () => {
          resolve(_.reduce(rows, (result, data) => {
            data.time.split('/').map(perTime => {
              const dayParse0 = this.daysParse(perTime.split(' ')[0])
              const dayParse1 = this.daysParse(perTime.split(' ')[1])
              const days = dayParse0.concat(dayParse1)
              console.log(data.name,perTime.split(' ')[0],perTime.split(' ')[1], dayParse0, dayParse1)
              const splice = dayParse1.length ? 2 : 1
              _.forEach(days, day => {
                result.push({
                  name: data.name,
                  day,
                  time: perTime.split(' ').splice(splice).join('')
                })
              })
            })
            return result
          }, []))
        });
    })
  }

  static daysParse(str) {
    if (str.indexOf('-') > -1) {
      console.log(str , str.indexOf('-') > -1)
      const range = []
      _.forEach(weekMapping, (day, word) => {
        if (str.indexOf(word) > -1) {
          range.push(!range.length ? day : (day + 1))
        }
      })
      // console.log(range, ...range)
      return _.range(...range)
    } else {
      _.forEach(weekMapping, (day, word) => {
        if (str.indexOf(word) > -1) {
          return [day]
        }
      })
    }
    return []
  }

  static name() {
    const rows = []
    return new Promise((resolve) => {
      fs.createReadStream(pathResolve('public/store.csv'))
        .pipe(csv())
        .on('data', (row) => {
          rows.push(row)
        })
        .on('end', () => {
          resolve(_.map(rows, 'name'))
        });
    })
  }
}

// (async function () {
//   // console.log(await StoreParser.parse())
//   // await StoreParser.parse()
// })()
module.exports = StoreParser
