<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <b-form-input v-model="search.name" placeholder="請輸入商店名稱"></b-form-input>
      </div>
    </div>
    <!--<div class="row">-->
      <!--<div class="col-md-3">-->
        <!--<b-form-input v-model="search.date" type="date" placeholder="請輸入營業日期"></b-form-input>-->
      <!--</div>-->
      <!--<div class="col-md-3">-->
        <!--<b-form-input v-model="search.time" type="time" placeholder="請輸入營業時間"></b-form-input>-->
      <!--</div>-->
    <!--</div>-->
    <div class="row">
      <div class="col-md-12">

        <table class="table table-striped table-dark">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">店名</th>
            <th scope="col">營業時間</th>
            <th scope="col">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(data, index) in datas" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ data.name }}</td>
            <td>{{ data.time }}</td>
            <td></td>
          </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import _ from 'lodash'
  export default {
    data: () => ({
      search: {
        name: '',
        date: '',
        time: ''
      },
      datas: [],
      translate: {
        weekDay: {
          'Mon': '星期一',
          'Tue': '星期二',
          'Wes': '星期三',
          'Thu': '星期四',
          'Fri': '星期五',
          'Sat': '星期六',
          'Sun': '星期日',
        }
      }
    }),
    computed: {
      tableData() {
        return this.datas.filter(x => {
          _.forEach(this.translate.weekDay, (name, code) => {
            if (x.time.indexOf(code) > -1) {
              x.time = x.time.replace(code, name)
            }
          })
          return x.name.indexOf(this.search.name) > -1
        })
      }
    },
    async mounted()
    {
      this.datas = (await axios.get('api/store')).data
    }
  }
</script>

<style>
  
</style>
