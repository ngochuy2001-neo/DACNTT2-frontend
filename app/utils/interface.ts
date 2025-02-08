type Product = {
  category_id: "LT" | "CP";
  _id: string;
  product_id: string;
  brand_id: string;
  product_name: string;
  description: string;
  cpu_brand: string;
  vga_brand: string;
  size: number;
  feature_img_src: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type LaptopVariant = {
  variant: {
    _id: string;
    variant_id: string;
    product_id: string;
    variant_name: string;
    sku: string;
    price: number;
    promotion_id: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  field: {
    part_number: string;
    mfg_year: number;
    origin_id: string;
    weight: number;
    color_id: string;
    material: string;
    max_ram_up: string;
    max_drive_up: string;
    whd_size: {
      width: number;
      height: number;
      depth: number;
    };
    cpu: {
      brand: string;
      name: string;
      model: string;
      min_rate: number;
    };
    vga: {
      brand: string;
      name: string;
      model: string;
    };
    ram: {
      type: string;
      storage: string;
      slots: number;
    };
    drive: {
      type: string;
      model: string;
      storage: string;
      slots: number;
    };
    screen: {
      size: number;
      type: string;
      resolution: {
        width: number;
        height: number;
      };
      refresh_rate: number;
      color_rate: number;
      ratio: string;
    };
    port: {
      wifi: boolean;
      bluetooth: boolean;
      webcam: boolean;
      usb1: {
        type: string;
        slots: number;
      };
      hdmi1: {
        version: string;
        slots: number;
      };
      card_reader_slots: number;
      jack3p5mm_slots: number;
    };
    os: {
      name: string;
      version: string;
    };
    keyboard: {
      type: string;
      led: boolean;
      has_numpad: boolean;
      touchpad: boolean;
    };
    power: {
      capability: string;
      supply: string;
    };
    gears: { name: string }[];
    __v: number;
  };
};

type Address = {
  _id: string;
  user_id: string;
  city: string;
  district: string;
  avenue: string;
  specific: string;
  create_at: string;
  update_at: string;
  address_id: string;
  __v: number;
};

type Laptop = {
  product_id: string;
  brand_id: string;
  product_name: string;
  description: string;
  cpu_brand: string;
  vga_brand: string;
  size: number;
  feature_img_src: string;
  category_id: "LT";
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type Cellphone = {
  product_id: string;
  brand_id: string;
  product_name: string;
  description: string;
  cpu_brand: string;
  os: string;
  size: number;
  feature_img_src: string;
  category_id: "CP";
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type CellphoneVariant = {
  variant: {
    _id: string;
    variant_id: string;
    product_id: string;
    variant_name: string;
    sku: string;
    price: number;
    promotion_id: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  field: {};
};

export type {
  Product,
  LaptopVariant,
  Address,
  Laptop,
  Cellphone,
  CellphoneVariant,
};
