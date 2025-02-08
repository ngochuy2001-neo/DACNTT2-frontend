"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { Edit, Delete, CloudUpload, Close } from "@mui/icons-material";
import Image from "next/image";

interface Brand {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  category_name: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}

interface Laptop {
  _id: string;
  product_name: string;
  brand: {
    _id?: string;
    name?: string;
  } | null;
  category: {
    _id?: string;
    name?: string;
  } | null;
  description?: string;
  cpu_brand: string;
  vga_brand: string;
  size: string;
  variants: Array<{
    _id?: string;
    variant_name: string;
    price: number;
    specifications?: {
      part_number?: string;
      mfg_year?: string;
      origin?: string;
      weight?: number;
      color?: string;
      material?: string;
      max_ram_up?: number;
      max_drive_up?: number;
      whd_size?: string;
      cpu?: {
        brand?: string;
        name?: string;
        model?: string;
        min_rate?: string;
      };
      vga?: {
        brand?: string;
        name?: string;
        model?: string;
      };
      ram?: {
        storage?: number;
        type?: string;
        slots?: number;
      };
      drive?: {
        storage?: number;
        type?: string;
        model?: string;
        slots?: number;
      };
      screen?: {
        size?: number;
        type?: string;
        resolution?: number;
        refresh_rate?: number;
        color_rate?: string;
        ratio?: string;
      };
      port?: {
        wifi?: string;
        bluetooth?: string;
        webcam?: string;
        usb_type1?: string;
        usb_number1?: number;
        usb_type2?: string;
        usb_number2?: number;
        hdmi_type?: string;
        hdmi_number?: number;
        cardreader_number?: number;
        jack35mm_number?: number;
      };
      os?: {
        name?: string;
        version?: string;
      };
      keyboard?: {
        type?: string;
        led?: string;
        numbpad?: boolean;
        touchpad?: string;
      };
      power?: {
        capability?: number;
        supply?: number;
      };
      gears?: string[];
    };
  }>;
}

interface LaptopVariant {
  _id?: string;
  variant_name: string;
  price: number;
  images: File[];
  specifications: {
    part_number: string;
    mfg_year: string;
    origin: string;
    weight: number;
    color: string;
    material: string;
    max_ram_up: number;
    max_drive_up: number;
    whd_size: string;
    cpu: {
      brand: string;
      name: string;
      model: string;
      min_rate: string;
    };
    vga: {
      brand: string;
      name: string;
      model: string;
    };
    ram: {
      type: string;
      storage: number;
      slots: number;
    };
    drive: {
      type: string;
      model: string;
      storage: number;
      slots: number;
    };
    screen: {
      size: number;
      type: string;
      resolution: number;
      refresh_rate: number;
      color_rate: string;
      ratio: string;
    };
    port: {
      wifi: string;
      bluetooth: string;
      webcam: string;
      usb_type1: string;
      usb_number1: number;
      usb_type2: string;
      usb_number2: number;
      hdmi_type: string;
      hdmi_number: number;
      cardreader_number: number;
      jack35mm_number: number;
    };
    os: {
      name: string;
      version: string;
    };
    keyboard: {
      type: string;
      led: string;
      numbpad: boolean;
      touchpad: string;
    };
    power: {
      capability: number;
      supply: number;
    };
    gears: string[];
  };
}

function ProductManagePage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    product_name: "",
    category_id: "",
    brand_id: "",
    description: "",
    images: [] as File[],
    cpu_brand: "",
    vga_brand: "",
    size: "",
    variants: [] as LaptopVariant[],
  });
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingLaptop, setEditingLaptop] = useState<Laptop | null>(null);
  const [deletedVariants, setDeletedVariants] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandResponse, categoryResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/brand`),
          axios.get(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/category`),
        ]);

        setBrands(brandResponse.data);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
    setFormData({
      product_name: "",
      category_id: "",
      brand_id: "",
      description: "",
      images: [],
      cpu_brand: "",
      vga_brand: "",
      size: "",
      variants: [],
    });
  };

  const createLaptop = async () => {
    try {
      const form = new FormData();

      form.append("product_name", formData.product_name);
      form.append("category_id", formData.category_id);
      form.append("brand_id", formData.brand_id);
      form.append("description", formData.description);
      form.append("cpu_brand", formData.cpu_brand);
      form.append("vga_brand", formData.vga_brand);
      form.append("size", formData.size);

      formData.images.forEach((file) => {
        form.append("images", file);
      });

      form.append("variants", JSON.stringify(formData.variants));
      formData.variants.forEach((variant) => {
        variant.images.forEach((file) => {
          form.append("variantImages", file);
        });
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/laptop/create`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
      handleClose();
      alert("Thêm laptop thành công!");
      fetchLaptops();
    } catch (error: unknown) {
      console.error("Lỗi khi tạo laptop:", error);
      const apiError = error as ApiError;
      if (apiError.response?.data) {
        console.error("Error details:", apiError.response.data);
      }
      alert(
        apiError.response?.data?.message || "Có lỗi xảy ra khi thêm laptop!"
      );
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("variants.")) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, index, ...fields] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        variants: prev.variants.map((variant, idx) => {
          if (idx !== Number(index)) return variant;

          const updatedVariant = { ...variant };
          let current: Record<string, unknown> = updatedVariant;

          for (let i = 0; i < fields.length - 1; i++) {
            const field = fields[i];
            if (!(field in current)) {
              current[field] = {};
            }
            current = current[field] as Record<string, unknown>;
          }

          const lastField = fields[fields.length - 1];
          if (e.target.type === "number") {
            current[lastField] = value === "" ? 0 : Number(value);
          } else if (e.target.type === "checkbox") {
            current[lastField] = (e.target as HTMLInputElement).checked;
          } else {
            current[lastField] = value || "";
          }

          return updatedVariant;
        }),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value || "",
      }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchLaptops = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/laptop`
      );
      setLaptops(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách laptop:", error);
    }
  };

  useEffect(() => {
    fetchLaptops();
  }, []);

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          variant_name: "",
          price: 0,
          images: [],
          specifications: {
            part_number: "",
            mfg_year: "",
            origin: "",
            weight: 0,
            color: "",
            material: "",
            max_ram_up: 0,
            max_drive_up: 0,
            whd_size: "",
            cpu: {
              brand: "",
              name: "",
              model: "",
              min_rate: "",
            },
            vga: {
              brand: "",
              name: "",
              model: "",
            },
            ram: {
              type: "",
              storage: 0,
              slots: 0,
            },
            drive: {
              type: "",
              model: "",
              storage: 0,
              slots: 0,
            },
            screen: {
              size: 0,
              type: "",
              resolution: 0,
              refresh_rate: 0,
              color_rate: "",
              ratio: "",
            },
            port: {
              wifi: "",
              bluetooth: "",
              webcam: "",
              usb_type1: "",
              usb_number1: 0,
              usb_type2: "",
              usb_number2: 0,
              hdmi_type: "",
              hdmi_number: 0,
              cardreader_number: 0,
              jack35mm_number: 0,
            },
            os: {
              name: "",
              version: "",
            },
            keyboard: {
              type: "",
              led: "",
              numbpad: false,
              touchpad: "",
            },
            power: {
              capability: 0,
              supply: 0,
            },
            gears: [],
          },
        },
      ],
    }));
  };

  const removeVariant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    variantIndex?: number
  ) => {
    const files = Array.from(e.target.files || []);

    if (variantIndex !== undefined) {
      setFormData((prev) => ({
        ...prev,
        variants: prev.variants.map((variant, idx) =>
          idx === variantIndex
            ? { ...variant, images: [...variant.images, ...files] }
            : variant
        ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    }
  };

  const removeFile = (fileIndex: number, variantIndex?: number) => {
    if (variantIndex !== undefined) {
      setFormData((prev) => ({
        ...prev,
        variants: prev.variants.map((variant, idx) =>
          idx === variantIndex
            ? {
                ...variant,
                images: variant.images.filter((_, i) => i !== fileIndex),
              }
            : variant
        ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== fileIndex),
      }));
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa laptop này?")) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/laptop/${id}`
        );
        alert("Xóa laptop thành công!");
        fetchLaptops();
      } catch (error) {
        console.error("Lỗi khi xóa laptop:", error);
        alert("Có lỗi xảy ra khi xóa laptop!");
      }
    }
  };

  const handleEdit = (laptop: Laptop) => {
    setIsEditMode(true);
    setEditingLaptop(laptop);
    setFormData({
      product_name: laptop.product_name,
      category_id: laptop.category?._id || "",
      brand_id: laptop.brand?._id || "",
      description: laptop.description || "",
      images: [],
      cpu_brand: laptop.cpu_brand,
      vga_brand: laptop.vga_brand,
      size: laptop.size,
      variants: laptop.variants.map((v) => ({
        _id: v._id,
        variant_name: v.variant_name,
        price: v.price,
        images: [],
        specifications: {
          part_number: v.specifications?.part_number || "",
          mfg_year: v.specifications?.mfg_year || "",
          origin: v.specifications?.origin || "",
          weight: v.specifications?.weight || 0,
          color: v.specifications?.color || "",
          material: v.specifications?.material || "",
          max_ram_up: v.specifications?.max_ram_up || 0,
          max_drive_up: v.specifications?.max_drive_up || 0,
          whd_size: v.specifications?.whd_size || "",
          cpu: {
            brand: v.specifications?.cpu?.brand || "",
            name: v.specifications?.cpu?.name || "",
            model: v.specifications?.cpu?.model || "",
            min_rate: v.specifications?.cpu?.min_rate || "",
          },
          vga: {
            brand: v.specifications?.vga?.brand || "",
            name: v.specifications?.vga?.name || "",
            model: v.specifications?.vga?.model || "",
          },
          ram: {
            type: v.specifications?.ram?.type || "",
            storage: v.specifications?.ram?.storage || 0,
            slots: v.specifications?.ram?.slots || 0,
          },
          drive: {
            type: v.specifications?.drive?.type || "",
            model: v.specifications?.drive?.model || "",
            storage: v.specifications?.drive?.storage || 0,
            slots: v.specifications?.drive?.slots || 0,
          },
          screen: {
            size: v.specifications?.screen?.size || 0,
            type: v.specifications?.screen?.type || "",
            resolution: v.specifications?.screen?.resolution || 0,
            refresh_rate: v.specifications?.screen?.refresh_rate || 0,
            color_rate: v.specifications?.screen?.color_rate || "",
            ratio: v.specifications?.screen?.ratio || "",
          },
          port: {
            wifi: v.specifications?.port?.wifi || "",
            bluetooth: v.specifications?.port?.bluetooth || "",
            webcam: v.specifications?.port?.webcam || "",
            usb_type1: v.specifications?.port?.usb_type1 || "",
            usb_number1: v.specifications?.port?.usb_number1 || 0,
            usb_type2: v.specifications?.port?.usb_type2 || "",
            usb_number2: v.specifications?.port?.usb_number2 || 0,
            hdmi_type: v.specifications?.port?.hdmi_type || "",
            hdmi_number: v.specifications?.port?.hdmi_number || 0,
            cardreader_number: v.specifications?.port?.cardreader_number || 0,
            jack35mm_number: v.specifications?.port?.jack35mm_number || 0,
          },
          os: {
            name: v.specifications?.os?.name || "",
            version: v.specifications?.os?.version || "",
          },
          keyboard: {
            type: v.specifications?.keyboard?.type || "",
            led: v.specifications?.keyboard?.led || "",
            numbpad: v.specifications?.keyboard?.numbpad || false,
            touchpad: v.specifications?.keyboard?.touchpad || "",
          },
          power: {
            capability: v.specifications?.power?.capability || 0,
            supply: v.specifications?.power?.supply || 0,
          },
          gears: v.specifications?.gears || [],
        },
      })),
    });
    setIsModalOpen(true);
  };

  const handleRemoveVariant = (index: number) => {
    const variant = formData.variants[index];
    if (variant._id) {
      setDeletedVariants((prev) => [...prev, variant._id as string]);
    }
    removeVariant(index);
  };

  const updateLaptop = async () => {
    try {
      const form = new FormData();
      form.append("product_name", formData.product_name);
      form.append("category_id", formData.category_id);
      form.append("brand_id", formData.brand_id);
      form.append("description", formData.description);
      form.append("cpu_brand", formData.cpu_brand);
      form.append("vga_brand", formData.vga_brand);
      form.append("size", formData.size);

      form.append("deletedVariants", JSON.stringify(deletedVariants));

      form.append("variants", JSON.stringify(formData.variants));
      formData.variants.forEach((variant) => {
        variant.images.forEach((file) => {
          form.append("variantImages", file);
        });
      });

      await axios.put(
        `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/laptop/${editingLaptop?._id}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Cập nhật thành công!");
      handleClose();
      fetchLaptops();
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Có lỗi xảy ra khi cập nhật!");
    }
  };

  return (
    <div className="bg-white p-[20px]">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5" component="h1">
          Quản lý Laptop
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Thêm Laptop Mới
        </Button>
      </div>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên Laptop</TableCell>
              <TableCell>Thương hiệu</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>CPU Brand</TableCell>
              <TableCell>VGA Brand</TableCell>
              <TableCell>Kích thước</TableCell>
              <TableCell>Biến thể</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {laptops.map((laptop, index) => (
              <TableRow key={laptop._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{laptop.product_name}</TableCell>
                <TableCell>{laptop.brand?.name || "N/A"}</TableCell>
                <TableCell>{laptop.category?.name || "N/A"}</TableCell>
                <TableCell>{laptop.cpu_brand || "N/A"}</TableCell>
                <TableCell>{laptop.vga_brand || "N/A"}</TableCell>
                <TableCell>{laptop.size || "N/A"}</TableCell>
                <TableCell>
                  {laptop.variants?.length > 0 ? (
                    <div className="space-y-4">
                      {laptop.variants.map((variant, idx) => (
                        <div key={idx} className="p-2 border rounded">
                          <div>Tên: {variant.variant_name || "N/A"}</div>
                          <div>
                            Giá:{" "}
                            {typeof variant.price === "number"
                              ? variant.price.toLocaleString("vi-VN") + "đ"
                              : "N/A"}
                          </div>
                          <div>
                            CPU:{" "}
                            {variant.specifications?.cpu
                              ? `${variant.specifications.cpu.brand || ""} ${
                                  variant.specifications.cpu.name || "N/A"
                                }`
                              : "N/A"}
                          </div>
                          <div>
                            RAM:{" "}
                            {variant.specifications?.ram
                              ? `${variant.specifications.ram.storage || 0}GB ${
                                  variant.specifications.ram.type || ""
                                }`
                              : "N/A"}
                          </div>
                          <div>
                            Ổ cứng:{" "}
                            {variant.specifications?.drive
                              ? `${
                                  variant.specifications.drive.storage || 0
                                }GB ${variant.specifications.drive.type || ""}`
                              : "N/A"}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    "Không có biến thể"
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(laptop)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(laptop._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Modal open={isModalOpen} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: "80%",
            maxWidth: "1000px",
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
            Thêm Laptop Mới
          </Typography>

          <div className="grid grid-cols-2 gap-4">
            {/* Thông tin cơ bản */}
            <div className="col-span-2">
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Thông tin cơ bản
              </Typography>
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  fullWidth
                  label="Tên sản phẩm"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleInputChange}
                />

                <FormControl fullWidth>
                  <InputLabel>Thương hiệu</InputLabel>
                  <Select
                    name="brand_id"
                    label="Thương hiệu"
                    value={formData.brand_id}
                    onChange={handleSelectChange}
                  >
                    {brands.map((brand) => (
                      <MenuItem key={brand._id} value={brand._id}>
                        {brand.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Danh mục</InputLabel>
                  <Select
                    name="category_id"
                    label="Danh mục"
                    value={formData.category_id}
                    onChange={handleSelectChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.category_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="CPU Brand"
                  name="cpu_brand"
                  value={formData.cpu_brand}
                  onChange={handleInputChange}
                />

                <TextField
                  fullWidth
                  label="VGA Brand"
                  name="vga_brand"
                  value={formData.vga_brand}
                  onChange={handleInputChange}
                />

                <TextField
                  fullWidth
                  label="Kích thước"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                />
              </div>
              <TextField
                fullWidth
                label="Mô tả"
                name="description"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
              />
            </div>

            {/* Thêm vào phần thông tin cơ bản */}
            <div className="col-span-2 mt-4">
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Hình ảnh sản phẩm
              </Typography>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUpload />}
                >
                  Tải ảnh lên
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                <div className="flex flex-wrap gap-2">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        width={80}
                        height={80}
                        className="object-cover rounded"
                      />
                      <IconButton
                        size="small"
                        className="absolute top-0 right-0 bg-red-500 text-white"
                        onClick={() => removeFile(index)}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Divider className="col-span-2 my-4" />

            {/* Phần variants */}
            <div className="col-span-2">
              <div className="flex justify-between items-center mb-4">
                <Typography variant="subtitle1">Thông tin biến thể</Typography>
                <Button variant="contained" onClick={addVariant}>
                  Thêm biến thể
                </Button>
              </div>

              {formData.variants.map((variant, index) => (
                <div key={index} className="mb-8 p-4 border rounded">
                  <div className="flex justify-between items-center mb-4">
                    <Typography variant="h6">Biến thể {index + 1}</Typography>
                    <IconButton
                      onClick={() => handleRemoveVariant(index)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      fullWidth
                      label="Tên biến thể"
                      name={`variants.${index}.variant_name`}
                      value={variant.variant_name}
                      onChange={handleInputChange}
                    />

                    <TextField
                      fullWidth
                      type="number"
                      label="Giá"
                      name={`variants.${index}.price`}
                      value={variant.price}
                      onChange={handleInputChange}
                    />

                    <TextField
                      fullWidth
                      label="Part Number"
                      name={`variants.${index}.specifications.part_number`}
                      value={variant.specifications?.part_number}
                      onChange={handleInputChange}
                    />

                    <TextField
                      fullWidth
                      label="Năm sản xuất"
                      name={`variants.${index}.specifications.mfg_year`}
                      value={variant.specifications?.mfg_year}
                      onChange={handleInputChange}
                    />

                    <TextField
                      fullWidth
                      label="CPU Brand"
                      name={`variants.${index}.specifications.cpu.brand`}
                      value={variant.specifications?.cpu?.brand}
                      onChange={handleInputChange}
                    />

                    <TextField
                      fullWidth
                      label="CPU Name"
                      name={`variants.${index}.specifications.cpu.name`}
                      value={variant.specifications?.cpu?.name}
                      onChange={handleInputChange}
                    />

                    <TextField
                      fullWidth
                      label="CPU Model"
                      name={`variants.${index}.specifications.cpu.model`}
                      value={variant.specifications?.cpu?.model}
                      onChange={handleInputChange}
                    />

                    <TextField
                      fullWidth
                      label="RAM Type"
                      name={`variants.${index}.specifications.ram.type`}
                      value={variant.specifications?.ram?.type}
                      onChange={handleInputChange}
                    />

                    <TextField
                      fullWidth
                      type="number"
                      label="RAM Storage (GB)"
                      name={`variants.${index}.specifications.ram.storage`}
                      value={variant.specifications?.ram?.storage}
                      onChange={handleInputChange}
                    />

                    <TextField
                      fullWidth
                      label="RAM Slots"
                      name={`variants.${index}.specifications.ram.slots`}
                      value={variant.specifications?.ram?.slots}
                      onChange={handleInputChange}
                    />

                    <TextField
                      fullWidth
                      label="Drive Type"
                      name={`variants.${index}.specifications.drive.type`}
                      value={variant.specifications?.drive?.type}
                      onChange={handleInputChange}
                    />

                    <TextField
                      fullWidth
                      type="number"
                      label="Drive Storage (GB)"
                      name={`variants.${index}.specifications.drive.storage`}
                      value={variant.specifications?.drive?.storage}
                      onChange={handleInputChange}
                    />

                    <TextField
                      fullWidth
                      label="Drive Model"
                      name={`variants.${index}.specifications.drive.model`}
                      value={variant.specifications?.drive?.model}
                      onChange={handleInputChange}
                    />

                    <TextField
                      fullWidth
                      label="Drive Slots"
                      name={`variants.${index}.specifications.drive.slots`}
                      value={variant.specifications?.drive?.slots}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Thêm vào phần variant */}
                  <div className="mt-4">
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Hình ảnh biến thể
                    </Typography>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUpload />}
                      >
                        Tải ảnh lên
                        <input
                          type="file"
                          hidden
                          multiple
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, index)}
                        />
                      </Button>
                      <div className="flex flex-wrap gap-2">
                        {variant.images.map((file, fileIndex) => (
                          <div key={fileIndex} className="relative">
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={`Variant ${index} Preview ${fileIndex}`}
                              width={80}
                              height={80}
                              className="object-cover rounded"
                            />
                            <IconButton
                              size="small"
                              className="absolute top-0 right-0 bg-red-500 text-white"
                              onClick={() => removeFile(fileIndex, index)}
                            >
                              <Close fontSize="small" />
                            </IconButton>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outlined" onClick={handleClose}>
              Hủy
            </Button>
            <Button
              variant="contained"
              onClick={isEditMode ? updateLaptop : createLaptop}
              disabled={formData.variants.length === 0}
            >
              {isEditMode ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ProductManagePage;
