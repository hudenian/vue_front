<template>
  <div class="wrap">
    <div class="item">
      <h2>这是标题</h2>
      <div class="info">这是内容，可能是很仓很长很长的内容</div>
    </div>
    <div class="item">
      <h2>这是标题</h2>
      <div class="info">
        这是内容
      </div>
    </div>
    <div class="item">
      <h2>这是标题</h2>
      <div class="info">这是内容，可能是很仓很长很长的内容</div>
    </div>
    <div class="item">
      <h2>这是标题</h2>
      <div class="info">这是内容，可能是很仓很长很长的内容</div>
    </div>
    <div class="item">
      <h2>这是标题</h2>
      <div class="info">这是内容，可能是很仓很长很长的内容</div>
    </div>
    <div class="item">
      <h2>这是标题</h2>
      <div class="info">这是内容，可能是很仓很长很长的内容</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;

  .item {
    display: flex;
    flex-direction: column;
    width: 25%;
    padding: 20px 30px;
    margin-bottom: 30px;
    height: 200px;
    text-align: center;
    border-radius: 10px;
    background-color: #ccc;

    h2 {
      padding: 0;
      margin: 0 0 20px;
    }

    .info {
      flex: 1;
      background-color: #fff;
      border: 1px solid #000;
    }
  }
}
</style>
