<script setup>

</script>

<template>
  <footer style="height: 300px; margin-top: 100px" >
    <div style="display: flex; justify-content: space-between">
      <div style="display: flex; flex-direction: column; justify-content: space-between">
        <div style="display: flex; justify-content: flex-start">
          <div style="display: flex; flex-direction: column">
            <a class="line-height" style="color: #333333; text-decoration: none;" href="#">Контакты</a>
            <a class="line-height" style="color: #333333; text-decoration: none;" href="#">Доставка и оплата</a>
            <a class="line-height" style="color: #333333; text-decoration: none;" href="#">Профиль</a>
          </div>
          <div style="display: flex; flex-direction: column">
            <a class="line-height" style="color: #333333; text-decoration: none;" href="#">Политика конфиденциальности и оферта</a>
            <a class="line-height" style="color: #333333; text-decoration: none;" href="#">Пользовательское соглашение</a>
            <a class="line-height" style="color: #333333; text-decoration: none;" href="#">Обратная связь</a>
          </div>
        </div>
        <div>
          <p style="color: #333333; margin: 10px 10px 0 0;">&copy; 2024 Любое использование контента без письменного разрешения запрещено</p>
        </div>
      </div>
      <div class="footer">
        <div>
          <p style="font-weight: 700">Мы в соц. сетях</p>
          <div style="display: flex; gap: 10px;">
            <a href="#"><img src="/public/images/TT.png" alt="ТикТок"></a>
            <a href="#"><img src="/public/images/VK.png" alt="ВК"></a>
          </div>
        </div>
        <div style="margin-top: 40px;">
          <p style="font-weight: bold; font-size: 21px;">+7 (953) 801-50-82</p>
          <p style="margin-top: -15px;">Филиал Новосибирск (с 11:00 до 20:00)</p>
          <p style="font-weight: bold; font-size: 21px;">+7 (923) 181-74-43</p>
        </div>
        <div style="display: flex; gap: 10px; margin-top: 35px;">
          <img style="width: 39px; height: 24px;" src="/public/images/MasterCard.png" alt="MasterCard">
          <img style="width: 56px; height: 18px; margin-top: 3px;" src="/public/images/Visa.png" alt="Visa">
          <img style="width: 61px; height: 18px; margin-top: 3px;" src="/public/images/Mir.png" alt="Мир">
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.line-height {
  padding: 10px;
}
</style>