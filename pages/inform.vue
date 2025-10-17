<template>
  <div class="page flex flex-col">
    <div
      class="filter card rounded-[8px] flex h-[50px] pl-[10px] pr-[10px] items-center"
    >
      <div class="mr-[10px]">Thể loại:</div>
      <div class="flex items-center mr-[10px]">
        <Checkbox
          v-model="pizza"
          inputId="ingredient1"
          name="pizza"
          value="Cheese"
          class="mr-[5px]"
        />
        <label for="ingredient1"> Cheese </label>
      </div>
      <div class="flex items-center mr-[10px]">
        <Checkbox
          v-model="pizza"
          inputId="ingredient2"
          name="pizza"
          value="Mushroom"
          class="mr-[5px]"
        />
        <label for="ingredient2"> Mushroom </label>
      </div>
      <div class="flex items-center mr-[10px]">
        <Checkbox
          v-model="pizza"
          inputId="ingredient3"
          name="pizza"
          value="Pepper"
          class="mr-[5px]"
        />
        <label for="ingredient3"> Pepper </label>
      </div>
      <div class="flex items-center mr-[10px]">
        <Checkbox
          v-model="pizza"
          inputId="ingredient4"
          name="pizza"
          value="Onion"
          class="mr-[5px]"
        />
        <label for="ingredient4"> Onion </label>
      </div>
    </div>
    <div class="flex">
      <div class="left">
        <div
          class="item card rounded-[5px] w-full"
          v-for="(item, index) in counter"
        >
          <div class="flex">
            <div class="date-time flex-1">Đăng 4 ngày trước</div>
            <div class="like flex items-center justify-center">
              36 <i class="pi pi-heart ml-[5px]"></i>
            </div>
            <div
              class="follow flex mr-[10px] ml-[10px] items-center justify-center"
            >
              36 <i class="pi pi-star ml-[5px]"></i>
            </div>
            <div class="comment flex items-center justify-center">
              36 <i class="pi pi-comments ml-[5px]"></i>
            </div>
          </div>

          <div class="image-action flex mt-[10px]">
            <img
              :src="HowlingWolves"
              alt="Flag"
              class="image rounded-[8px] w-[150px]"
            />
            <div class="ml-[10px] flex flex-col">
              <div class="title font-bold">
                Quảng Ngãi xin dừng dự án khu đô thị Đảo Ngọc giữa sông Trà Khúc
                Quảng Ngãi xin dừng dự án khu đô thị Đảo Ngọc giữa sông Trà Khúc
                Quảng Ngãi xin dừng dự án khu đô thị Đảo Ngọc giữa sông Trà Khúc
                Quảng Ngãi xin dừng dự án khu đô thị Đảo Ngọc giữa sông Trà Khúc
              </div>
              <div class="description mt-[10px]">Thể loại: Confession</div>
            </div>
          </div>
          <div class="line"></div>
          <div class="flex items-center justify-center">
            <img
              :src="HowlingWolves"
              alt="Flag"
              class="image rounded-[3px] w-[40px]"
            />
            <div class="flex-1 font-bold ml-[10px]">Vietnam Silicon</div>
            <div class="like flex items-center justify-center mr-[10px]">
              36 <i class="pi pi-heart ml-[5px]"></i>
            </div>
            <div class="follow flex items-center justify-center">
              36 <i class="pi pi-star ml-[5px]"></i>
            </div>
          </div>
        </div>
        <div class="padding-span">
          <Paginator
            :rows="10"
            :totalRecords="120"
            :rowsPerPageOptions="[10, 20, 30]"
          ></Paginator>
        </div>
      </div>
      <div class="gap"></div>
      <div class="right flex-[60] pr-[16px] mt-[16px]">
        <div class="card rounded-[8px] w-full p-[16px] h-[1745px]">
          <div class="flex items-center justify-center">
            <img
              :src="HowlingWolves"
              alt="Flag"
              class="image rounded-[3px] w-[60px]"
            />
            <div class="flex-1">
              <div class="ml-[10px]">Bài viết được chia sẻ bởi</div>

              <div class="font-bold ml-[10px]">Vietnam Silicon</div>
            </div>
            <div class="like flex items-center justify-center mr-[10px]">
              Yêu thích: 36 <i class="pi pi-heart ml-[5px]"></i>
            </div>
            <div class="follow flex items-center justify-center">
              Theo dõi: 36 <i class="pi pi-star ml-[5px]"></i>
            </div>
          </div>
          <div class="line"></div>
          <div class="flex">
            <div class="flex-1">Thể loại: thời sự</div>
            <div>Đăng 4 ngày trước</div>
          </div>
          <div class="flex items-center justify-center mt-[10px]">
            <div class="font-bold text-[16px] flex-1">
              Nha Trang chấm dứt hạn chế về cấp phép xây dựng nhà ở cho dân
            </div>
            <div class="">
              <audio controls>
                <source :src="HorseAudio" type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
          <div class="line"></div>
          <div class="contain">
            <div class="">
              Chiều 5-4, Chủ tịch UBND TP Nha Trang Trần Minh Chiến đã trả lời
              phóng viên Tuổi Trẻ Online về việc cấp phép xây dựng công trình
              nhà ở cho dân trên địa bàn thành phố như trên. Trước đó, như Tuổi
              Trẻ Online đã thông tin, nhiều người dân ở TP Nha Trang không được
              giải quyết hồ sơ, cấp phép xây dựng công trình nhà ở. Vì theo
              Phòng Kinh tế, Hạ tầng và Đô thị TP Nha Trang, đó là do các khu
              vực chưa có Quy hoạch chi tiết xây dựng (tỉ lệ 1/500) và Quy chế
              quản lý kiến trúc được duyệt. Do đó, người dân chỉ có thể được cấp
              phép xây dựng có thời hạn nhà ở không quá 2 tầng, tổng diện tích
              sàn không quá 250m2. Còn đơn đề nghị cấp phép xây dựng có thời hạn
              thì người dân phải "có cam kết tự dỡ bỏ công trình khi nhà nước
              thực hiện xây dựng theo quy hoạch". TIN LIÊN QUAN Nha Trang chấm
              dứt hạn chế về cấp phép xây dựng nhà ở cho dân - Ảnh 2. 'Quản trị'
              bãi biển ở Nha Trang như thế nào để vừa hài hòa cộng đồng vừa phát
              triển du lịch? Nha Trang chấm dứt hạn chế về cấp phép xây dựng nhà
              ở cho dân - Ảnh 3. Vì sao nhiều hộ dân Nha Trang chỉ được cấp phép
              xây dựng nhà tạm? Nha Trang chấm dứt hạn chế về cấp phép xây dựng
              nhà ở cho dân - Ảnh 4. UBND TP Nha Trang có chủ tịch mới Ngày 3-4,
              UBND tỉnh Khánh Hòa có công văn khẩn giao UBND TP Nha Trang nghiên
              cứu ý kiến của Sở Xây dựng, xem xét "cấp giấy phép xây dựng nhà ở
              trên địa bàn thành phố Nha Trang nhằm ổn định cuộc sống của người
              dân". Chiều 5-4, ông Trần Minh Chiến - chủ tịch UBND TP Nha Trang
              - cho biết Quy chế quản lý kiến trúc TP Nha Trang mà thành phố
              trình đã được Sở Xây dựng thẩm định, báo cáo UBND tỉnh và trình
              HĐND tỉnh xem xét. Advertisements X Đồng thời, cũng theo ông
              Chiến, lãnh đạo UBND TP Nha Trang cũng đã báo cáo về việc "gỡ
              vướng" trong việc cấp phép xây dựng nhà ở cho trên địa bàn thành
              phố và đã được UBND tỉnh chấp thuận. Theo đó, chủ tịch UBND TP Nha
              Trang đã chỉ đạo các cơ quan, đơn vị chức năng tiếp nhận, giải
              quyết hồ sơ, thực hiện song song việc cấp phép cho dân xây dựng
              công trình nhà ở theo đúng quy định, bình thường, trong khi chờ
              HĐND tỉnh Khánh Hòa xem xét, thông qua các thủ tục ban hành Quy
              chế quản lý kiến trúc TP Nha Trang và lập Quy hoạch chi tiết xây
              dựng (tỉ lệ 1/500) các khu vực phường, xã để trình phê duyệt. Việc
              cấp phép xây dựng nhà ở cho dân như đã nêu trên, theo ông Trần
              Minh Chiến, sẽ được thực hiện ngay từ tuần tới, theo đúng chỉ đạo
              của UBND tỉnh Khánh Hòa và ý kiến của Sở Xây dựng tỉnh đã trình
              UBND tỉnh.
            </div>
            <div class="line"></div>
            <div class="flex items-center">
              <div class="like flex items-center justify-center mr-[10px]">
                Yêu thích: 36 <i class="pi pi-heart ml-[5px]"></i>
              </div>
              <div class="follow flex items-center justify-center mr-[10px]">
                Theo dõi: 36 <i class="pi pi-star ml-[5px]"></i>
              </div>
              <div class="follow flex items-center justify-center">
                Bình luận: 46 <i class="pi pi-star ml-[5px]"></i>
              </div>
            </div>
            <div class="mt-[20px]">
              <textarea id="mytextarea"></textarea>
            </div>
            <div v-for="(item, index) in counter2">
              <div class="mt-[20px]">
                <div class="flex w-full items-start justify-center">
                  <div class="w-[30px] h-[30px] avatar">
                    <img
                      :src="HowlingWolves"
                      alt="Flag"
                      class="rounded-[30px] w-[30px] h-[30px]"
                    />
                  </div>
                  <div class="flex-1 ml-[10px]">
                    <div class="font-bold">Van Nam</div>
                    <div class="">
                      Tôi nghĩ mình ở Việt Nam cũng sướng, hàng nội địa cái gì
                      cũng sản xuất được, muốn mua gì cũng có, chẳng cần phải
                      tích trữ làm gì. Dần dần tôi cũng nghiệm ra rằng mình càng
                      sống đơn giản chừng nào thì càng cảm thấy thoải mái và
                      không vướng bận chừng nấy.
                    </div>
                  </div>
                </div>
                <div class="flex mt-[10px] pl-[40px]">
                  <div class="font-[500]">Trả lời</div>
                  <div class="font-[500] ml-[10px]">Chỉnh sửa</div>

                  <div class="font-[500] ml-[10px]">12 phút trước</div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import HowlingWolves from '~/assets/images/howling-wolves.jpg'
import HorseAudio from '~/assets/audio/horse.wav'
import Paginator from 'primevue/paginator'
import { GlobalStore } from '~/store/Global'
const counter = ref(8)
const counter2 = ref(20)

const { $auth } = useNuxtApp()
const store = GlobalStore()

const initTinymce = () => {
  //@ts-ignore
  tinymce.init({
    selector: '#mytextarea',
    menubar: false,
    statusbar: false,
    height: 200,
    // plugins: 'table code advtable lists fullscreen',
    // toolbar:
    //   'undo redo | blocks | bold italic | ' +
    //   'alignleft aligncenter alignright alignjustify | indent outdent | ' +
    //   'table tableinsertdialog tablecellprops tableprops advtablerownumbering | fullscreen',
    // toolbar:
    //   'undo redo | bold italic underline| alignleft aligncenter alignright alignjustify | indent outdent | wordcount | subscript superscript strikethrough |',
  })
}
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
  },
  {
    label: 'Features',
    icon: 'pi pi-star',
  },
  {
    label: 'Projects',
    icon: 'pi pi-search',
    items: [
      {
        label: 'Components',
        icon: 'pi pi-bolt',
      },
      {
        label: 'Blocks',
        icon: 'pi pi-server',
      },
      {
        label: 'UI Kit',
        icon: 'pi pi-pencil',
      },
      {
        label: 'Templates',
        icon: 'pi pi-palette',
        items: [
          {
            label: 'Apollo',
            icon: 'pi pi-palette',
          },
          {
            label: 'Ultima',
            icon: 'pi pi-palette',
          },
        ],
      },
    ],
  },
  {
    label: 'Contact',
    icon: 'pi pi-envelope',
  },
])
onMounted(() => {
  if (store.getLoadEditor()) {
    initTinymce()
  }
})

watch(
  () => store.getLoadEditor(),
  (value) => {
    initTinymce()
  }
)
</script>

<style scoped lang="scss">
.page {
  padding-top: unset !important;
  padding-bottom: 16px;
}
.filter {
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 16px;
}
.left {
  width: 500px;
  padding-left: 16px;
  padding-top: 6px;

  .item {
    margin-top: 10px;
    padding: 10px;

    .date-time,
    .like,
    .follow,
    .comment {
      opacity: 0.5;
    }
    .line {
      margin-top: 10px;
      width: 100%;
      height: 1px;
      background: $border-color;
      margin-bottom: 10px;
    }
    .title {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3; /* number of lines to show */
      line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}
.gap {
  width: 16px;
}
.right {
  .contain {
    height: 1500px;
    overflow-y: scroll;
  }
  .line {
    margin-top: 20px;
    width: 100%;
    height: 1px;
    background: $border-color;
    margin-bottom: 20px;
  }
}

.avatar {
  //   background: red;
}

::-webkit-scrollbar {
  width: 5px;
  border-radius: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: red;
  background: #555;
  border-radius: 10px;
}
:deep(.p-paginator) {
  padding: unset;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
}
:deep(.p-paginator-rpp-dropdown) {
  display: none;
}
:deep(.p-paginator-page) {
  min-width: 28px;
  height: 28px;
}
:deep(.p-menubar) {
  border: unset;
}
:deep(.p-checkbox-box) {
  width: 15px;
  height: 15px;
  border-radius: 2px;
}
:deep(.p-checkbox) {
  width: 15px;
  height: 15px;
}
.padding-span {
  grid-column: unset;
}
/// Tablet
@media screen and (min-width: $tablet-min) and (max-width: $tablet-max) {
  .filter {
    margin-left: 8px;
    margin-right: 8px;
    margin-top: 8px;
  }
  .left {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 8px;
    padding-left: 8px;
    padding-top: 0px;
  }
  .gap {
    width: 8px;
  }
  .right {
    display: none;
  }
  .padding-span {
    grid-column: 1 / span 2;
  }
}

/// Mobile
@media screen and (min-width: $mobile-min) and (max-width: $mobile-max) {
  .filter {
    margin-left: 8px;
    margin-right: 8px;
    margin-top: 8px;
  }
  .left {
    width: 100%;
    display: grid;
    grid-template-columns: auto;
    column-gap: 16px;
    padding-left: 8px;
    padding-top: 0px;
  }
  .gap {
    width: 8px;
  }
  .right {
    display: none;
  }
}
</style>
