function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
 
const requireComponent = require.context(
  '.', false, /.vue$/
   //找到components文件夹下以.vue命名的文件
)
 
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
 
  const componentName = capitalizeFirstLetter(
    fileName.replace(/.\//, '').replace(/.vue/, '')
  )
 
  Vue.component(componentName, componentConfig.default || componentConfig)
})
