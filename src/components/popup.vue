<template>
  <div class="popup">
    <div class="popupImg">
      <img src="../static/img/po.png" alt="" mode="widthFix">
    </div>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style>
.popupImg{
  width: 80%;
  margin: auto;
}
.popupImg img{
  width: 100%;
}
.popup {
  position: fixed;
  top: 50%;
  width: 100%;
  z-index: 9;
}
</style>
