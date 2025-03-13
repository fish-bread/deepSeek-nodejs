import {ref} from "vue";
export const isBack = ref(false);
export const newTitle = ref(false)
export const BodyLeft = ref()
export const BodyBack = ref()
export const homeAll = ref()
export const collapse = () => {
  if (isBack.value === false) {
    console.log("collapse")
    isBack.value = true
    homeAll.value.style.gridTemplateColumns = '0 auto'
    BodyLeft.value.style.transform = 'translateX(-80%)'
    BodyBack.value.style.transform = 'rotate(-180deg)'
  } else {
    console.log("!collapse")
    isBack.value = false
    homeAll.value.style.gridTemplateColumns = '260px auto'
    BodyLeft.value.style.transform = 'translateX(0%)'
    BodyBack.value.style.transform = 'rotate(0deg)'
  }
}
