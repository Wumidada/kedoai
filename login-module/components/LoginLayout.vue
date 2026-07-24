<template>
  <div class="login-layout">
    <div class="brand-section">
      <div class="brand-content">
        <div class="brand-logo">LOGO</div>
        <div class="brand-slogan">欢迎使用</div>
        <div class="brand-desc">扫码登录即可使用</div>
      </div>
    </div>
    <div class="form-section">
      <div class="form-blur-bg"></div>
      <div class="form-container">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(236, 228, 255, 0.5), #ffffff 21%, #ffffff 49%, rgba(255, 255, 255, 0.72) 78%, rgba(222, 238, 255, 0.5));
  overflow: hidden;
  position: relative;
}

.brand-section {
  margin-left: 6%;
  min-width: 450px;
  max-width: 800px;
  width: 52%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .brand-content {
    .brand-logo {
      width: 241px;
      height: 80px;
      font-size: 48px;
      font-weight: bold;
      color: #3e50e6;
    }

    .brand-slogan {
      font-size: 46px;
      color: #000000;
      margin-top: 20px;
      font-weight: 550;
      background: linear-gradient(90deg, #1ed7ff 0%, #3e50e6 50%, #0009e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .brand-desc {
      font-size: 20px;
      color: #808080;
      margin-top: 10px;
    }
  }
}

.form-section {
  position: relative;
  width: 480px;
  min-height: 620px;
  margin-right: 12%;
  display: flex;
  align-items: center;
  padding-left: 41.64px;
  box-sizing: border-box;
  flex-shrink: 0;

  .form-blur-bg {
    position: absolute;
    opacity: 0.2;
    background: linear-gradient(181deg, #2affdb 0%, #533aff 100%);
    filter: blur(50px);
    z-index: 0;
    left: 80px;
    top: 140px;
    right: -65px;
    bottom: 140px;
  }

  .form-container {
    width: 100%;
    min-height: 620px;
    background: #ffffff;
    border-radius: 30px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    z-index: 1;
    position: relative;
    padding: 60px 0;
  }
}

@media (max-width: 768px) {
  .login-layout {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .brand-section {
    margin: 0;
    margin-bottom: 40px;
    max-width: 95%;
    width: 100%;
    text-align: center;
  }

  .form-section {
    width: 90%;
    max-width: 400px;
    margin: 0;
    padding: 0;
    min-height: auto;

    .form-container {
      padding-top: 40px;
      min-height: 500px;
    }
  }
}
</style>