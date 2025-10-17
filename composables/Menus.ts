import type { MenuItem } from 'primevue/menuitem'
export const menuNoAuth = (objectCallback: any): MenuItem[] => {
  return [
    {
      label: 'Tuyển dụng',
      icon: 'pi pi-image',
      command: () => {
        // clickRecruit()
        objectCallback.recruit()
      },
    },
    {
      label: 'Tin tức',
      icon: 'pi pi-file',
      command: () => {
        // clickInform()
        objectCallback.inform()
      },
    },
    {
      label: 'Sự kiên',
      icon: 'pi pi-file',
      command: () => {
        // clickEvent()
        objectCallback.event()
      },
    },
    {
      label: 'Tỉ giá',
      icon: 'pi pi-file',
    },
  ]
}

export const menuUser = (objectCallback: any): MenuItem[] => {
  return [
    {
      label: 'Tạo tổ chức',
      icon: 'pi pi-objects-column',
      command: () => {
        objectCallback.createOrganization()
        // clickCreateOrganization()
      },
    },
    {
      label: 'Tuyển dụng',
      icon: 'pi pi-image',
      command: () => {
        objectCallback.recruit()
        // clickRecruit()
      },
    },
    {
      label: 'Tin tức',
      icon: 'pi pi-file',
      command: () => {
        objectCallback.inform()
        // clickInform()
      },
    },
    {
      label: 'Sự kiên',
      icon: 'pi pi-file',
      command: () => {
        // clickEvent()
        objectCallback.event()
      },
    },
    {
      label: 'Tỉ giá',
      icon: 'pi pi-file',
    },
    {
      label: 'Chat',
      icon: 'pi pi-comments',
    },
    // {
    //   label: 'Thông báo',
    //   icon: 'pi pi-bell',
    // },
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => {
        objectCallback.profile()
      },
    },
    {
      label: 'Sign Out',
      icon: 'pi pi-sign-out',
      command: () => {
        // clickSignOut()
        objectCallback.signOut()
      },
    },
  ]
}

export const menuOrganization = (objectCallback: any): MenuItem[] => {
  return [
    {
      label: 'Thông tin',
      icon: 'pi pi-file',
      items: [
        {
          label: 'Tuyển dụng',
          icon: 'pi pi-image',
        },
        {
          label: 'Tin tức',
          icon: 'pi pi-file',
        },
        {
          label: 'Sự kiên',
          icon: 'pi pi-file',
        },
        {
          label: 'Cảnh báo',
          icon: 'pi pi-image',
        },
      ],
    },
    {
      label: 'Nhân viên',
      icon: 'pi pi-image',
      items: [
        {
          label: 'Nhân viên',
          icon: 'pi pi-image',
          command: () => {
            objectCallback.employeesOrg()
          },
        },
        {
          label: 'Thiết bị',
          icon: 'pi pi-file',
        },
        {
          label: 'Chi nhánh',
          icon: 'pi pi-file',
          command: () => {
            objectCallback.branchesOrg()
          },
        },
        {
          label: 'Phòng ban',
          icon: 'pi pi-image',
          command: () => {
            objectCallback.departmentsOrg()
          },
        },
        {
          label: 'Vị trí',
          icon: 'pi pi-image',
          command: () => {
            objectCallback.positionsOrg()
          },
        },
      ],
    },
    {
      label: 'Phê duyệt',
      icon: 'pi pi-image',
      items: [
        {
          label: 'Các phiếu',
          icon: 'pi pi-image',
        },
        {
          label: 'Bước duyệt',
          icon: 'pi pi-file',
        },
      ],
    },
    {
      label: 'Liên hệ',
      icon: 'pi pi-image',
      items: [
        {
          label: 'Các phiếu',
          icon: 'pi pi-image',
        },
        {
          label: 'Bước duyệt',
          icon: 'pi pi-file',
        },
      ],
    },
    {
      label: 'Thiết bị',
      icon: 'pi pi-desktop',
      items: [
        {
          label: 'Phone',
          icon: 'pi pi-mobile',
        },
        {
          label: 'Desktop',
          icon: 'pi pi-desktop',
        },
        {
          label: 'Tablet',
          icon: 'pi pi-tablet',
        },
      ],
    },

    {
      label: 'Xuất nhập kho',
      icon: 'pi pi-desktop',
      items: [
        {
          label: 'Phone',
          icon: 'pi pi-mobile',
        },
        {
          label: 'Desktop',
          icon: 'pi pi-desktop',
        },
        {
          label: 'Tablet',
          icon: 'pi pi-tablet',
        },
      ],
    },
    {
      label: 'Chat',
      icon: 'pi pi-comments',
    },
    // {
    //   label: 'Thông báo',
    //   icon: 'pi pi-bell',
    // },
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => {
        objectCallback.profile()
      },
    },
    {
      label: 'Sign Out',
      icon: 'pi pi-sign-out',
      command: () => {
        objectCallback.signOut()
      },
    },
  ]
}
