<template>
  <div class="index">
    <div class="index-bg">
      <img src="../../static/img/bgi.jpg" alt="" class="img_bg">
      <div class="register" style="height:100%;">
        <div class="register-tit">
          <img src="../../static/img/tit5.png" alt="" mode="widthFix">
        </div>
        <div class="readEnter4">
          <div class="readEnter4-tit">
            小龙人阅读习惯养成计划
          </div>
          <div class="readEnter4-p">
            我们常说，一个人的阅读史就是他的精神发育史，阅读对人生的影响巨大。莎士比亚说：“书籍是全世界的营养品，生活里没有书籍就好像没有阳光；智慧中没有书籍就好像鸟儿没有翅膀。”阅读的重要性不言而喻。向每一个龙民、每一个家庭发出阅读倡议，致力于营造爱读书、多读书、读好书的好习惯，让阅读学习、追求知识成为龙湖社区的新时尚。腹有诗书气自华，孩子在阅读上花的每一秒，都会沉淀成将来更好的他。阅读的不断积累，不仅可以开阔孩子的眼界，应付考试也能轻而易举。不过，这可不是一朝一夕的事情。平日忙于上学没时间看书？暑假来了！这正是适合孩子阅读习惯养成的大好时间。爸爸妈妈们千万不要错过这样的好机会。
          </div>
        </div>
      </div>
      <div class="footer-img">
        <div class="divimg">
          <img src="../../static/img/ft.png" alt="" mode="widthFix">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      motto: '书润童心,阅启成长',
      userInfo: {}
    }
  },
  methods: {
  },

  created () {
  }
}
</script>

<style scoped>
  .readEnter4{
    width: 80%;
    margin: auto;
    font-size: 12px;
  }
  .readEnter4-tit{
    font-size: 25px;
    color: #ffd800;
    line-height: 40px;
    margin-bottom: 10px;
  }
  .readEnter4-p{
    line-height: 25px;
  }
  .index{
    width: 100%;
    height: 100vh;
  }
  .index-button{
    position: absolute;
    top: 59%;
    width: 100%;
    z-index: 9;
  }

  .index-bg img{
    width: 100%;
    /* display: block; */
  }
  .register{
    position: absolute;
    top: 0;
    color: #fff;
    width: 100%;
  }
  .register-tit {
    margin-top: 30px;
    margin-bottom: 15px;
  }
  .register-tit img{
    display: block;
    width: 85%;
    height: 100vh;
    margin: auto;
  }
  .footer-img{
    position: absolute;
    bottom:0;
    width: 100%;
    left: 0;
    margin: auto;
  }
  .footer-img .divimg{
    width: 80%;
    margin: auto;
  }
</style>
