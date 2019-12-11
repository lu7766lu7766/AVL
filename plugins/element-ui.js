import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-TW'
import 'bootstrap/dist/css/bootstrap.css'
export default () => {
  Vue.use(Element, { locale })
}
