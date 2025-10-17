# In application

Because icon is not cached when reload page icon is flashed
For use icon, you change icon to svg (assets/icons) then use img for display.

1. Only used img
   `<img :sr.../>`
2. Do not use i
   `<span :class="item.icon" />`
   `<i class="pi pi-check"></i>`
   `<i class="pi pi-times"></i>`
   `<span class="pi pi-search"></span>`
