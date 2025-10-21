<template>
  <div class="footer card w-full flex justify-center">
    <div class="address ml-[16px] ml-[16px] flex items-center">
      <div class="label font-bold">{{ $t('address') }}:</div>
      <div class="value">
        60A Hoàng Văn Thụ, P.9, Q.Phú Nhuận, Tp. Hồ Chí Minh
      </div>
    </div>
    <div class="hotline mr-[16px] ml-[16px] flex items-center">
      <div class="label font-bold">{{ $t('hotline') }}:</div>
      <div class="value">0918.033.133</div>
    </div>
    <div class="email mr-[16px] ml-[16px] flex items-center">
      <div class="label font-bold">{{ $t('email') }}:</div>
      <div class="value">iibelife@mail.com</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  border-top-right-radius: unset;
  border-bottom-left-radius: unset;
  border: unset;
  border-top: 1px solid $card-border-color; //border
}
.footer {
  flex-direction: row;
  height: 70px;
  .address,
  .hotline,
  .email {
    flex: 25;
    .label {
      margin-right: 5px;
    }
    .value {
      flex: 1;
    }
  }
  .address {
    flex: 50;
  }
}
/// tablet mini
@media screen and (min-width: $tablet-mini-min) and (max-width: $tablet-mini-max) {
  .footer {
    height: 100px;
    flex-direction: column;
    padding-top: 5px;
    padding-bottom: 5px;
    .address,
    .hotline,
    .email {
      flex: unset;
      display: flex;
      align-items: start;
      .label {
        margin-right: 5px;
        width: 60px;
      }
      .value {
        flex: 1;
      }
    }
  }
}
/// Mobile
@media screen and (min-width: $mobile-min) and (max-width: $mobile-max) {
  .footer {
    height: 100px;
    flex-direction: column;
    padding-top: 5px;
    padding-bottom: 5px;
    .address,
    .hotline,
    .email {
      flex: unset;
      display: flex;
      align-items: start;
      .label {
        margin-right: 5px;
        width: 60px;
      }
      .value {
        flex: 1;
      }
    }
  }
}
</style>
