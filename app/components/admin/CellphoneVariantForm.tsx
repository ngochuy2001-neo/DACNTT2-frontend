import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { CheckBox } from "@mui/icons-material";

function CellphoneVariantForm({ closeModal, productId }) {
  const [variantName, setVariantName] = useState("");
  const [price, setPrice] = useState(0);
  const [promotionId, setPromotionId] = useState("");
  const [stock, setStock] = useState(0);
  const [mfgYear, setMfgYear] = useState(0);
  const [originId, setOriginId] = useState("");
  const [weight, setWeight] = useState(0);
  const [colorId, setColorId] = useState("");
  const [material, setMaterial] = useState("");
  const [waterResist, setWaterResist] = useState("");
  const [ramStorage, setRamStorage] = useState("");
  const [gpu, setGpu] = useState("");
  const [whdSize, setWhdSize] = useState({ width: 0, height: 0, depth: 0 });
  const [cpu, setCpu] = useState({
    version: "",
    name: "",
    processorNum: 0,
    maxRate: 0,
  });
  const [connectors, setConnectors] = useState({
    wifi: "",
    bluetooth: "",
    sim: { type: "", slots: 0 },
    internet: "",
    chargerType: "",
    hasJack3p5mm: false,
    gpsSupport: [],
  });
  const [storage, setStorage] = useState({
    rom: "",
    driveSupport: "",
    maxDriveSupport: 0,
  });
  const [cameras, setCameras] = useState({
    backCamera: [
      {
        type: "",
        resolution: "",
        videoResolution: "",
      },
    ],
    frontCamera: {
      type: "",
      resolution: "",
      videoResolution: "",
    },
  });
  const [screen, setScreen] = useState({
    resolution: { width: 0, height: 0 },
    size: "",
    type: "",
    refreshRate: 0,
    brightRate: 0,
    touchRate: "",
    material: "",
  });
  const [power, setPower] = useState({
    batteryType: "",
    capability: 0,
    charger: "",
  });
  const [gears, setGears] = useState(["Charger", "USB Cable", "User Manual"]);
  const [origins, setOrigins] = useState([
    {
      _id: "",
      origin_id: "",
      country: "",
      __v: 0,
    },
  ]);
  const [colors, setColors] = useState([
    {
      _id: "",
      color_id: "",
      color: "",
    },
  ]);

  const fetchOrigins = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/origins`
      );
      const fetchedOrigins = response.data.origins;
      console.log(fetchedOrigins);
      setOrigins(fetchedOrigins);
    } catch (error) {
      console.error("Có lỗi xảy ra khi fetch origins:", error);
    }
  };

  const fetchColors = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/colors`
      );
      const fetchedColors = response.data.colors;
      console.log(fetchedColors);
      setColors(fetchedColors);
    } catch (error) {
      console.error("Có lỗi xảy ra khi fetch colors:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      variant: {
        name: variantName,
        price: price,
        stock: stock,
        promotionId: promotionId === "" ? undefined : promotionId,
      },
      variantField: {
        mfgYear: mfgYear,
        originId: originId,
        weight: weight,
        colorId: colorId,
        material: material,
        waterResist: waterResist,
        ramStorage: ramStorage,
        gpu: gpu,
        whdSize: whdSize,
        cpu: cpu,
        connectors: connectors,
        storage: storage,
        cameras: cameras,
        screen: screen,
        power: power,
        gears: gears,
      },
    };
    console.log(formData);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/cellphone/detail/${productId}/variant/add`,
        formData
      );

      console.log("Variant added successfully:", response.data);
      closeModal();
    } catch (error) {
      console.error("Error adding variant:", error);
    }
  };

  useEffect(() => {
    fetchOrigins();
    fetchColors();
  }, []);

  return (
    <div className="bg-white w-[80vw] h-[80vh] rounded-lg p-4 overflow-y-scroll">
      <Typography variant="h6">Thêm Biến Thể Điện Thoại</Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <div className="grid grid-cols-2 gap-4">
          <TextField
            variant="standard"
            label="Tên Biến Thể"
            value={variantName}
            onChange={(e) => setVariantName(e.target.value)}
          />
          <TextField
            variant="standard"
            label="Giá"
            type="number"
            value={price === 0 ? "" : price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <TextField
            variant="standard"
            label="Số Lượng"
            type="number"
            value={stock === 0 ? "" : stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
          <TextField
            variant="standard"
            label="Mã Khuyến Mãi"
            value={promotionId}
            onChange={(e) => setPromotionId(e.target.value)}
          />
          <TextField
            variant="standard"
            label="Năm Sản Xuất"
            type="number"
            value={mfgYear === 0 ? "" : mfgYear}
            onChange={(e) => setMfgYear(Number(e.target.value))}
          />

          <FormControl variant="standard">
            <InputLabel>Quốc Gia Sản Xuất</InputLabel>
            <Select
              value={originId}
              onChange={(e) => setOriginId(e.target.value)}
            >
              {origins.map((origin, index) => (
                <MenuItem key={index} value={origin.origin_id}>
                  {origin.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            variant="standard"
            label="Trọng Lượng"
            type="number"
            value={weight === 0 ? "" : weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />

          <FormControl variant="standard">
            <InputLabel>Màu Sắc</InputLabel>
            <Select
              value={colorId}
              onChange={(e) => setColorId(e.target.value)}
            >
              {colors.map((color, index) => (
                <MenuItem key={index} value={color.color_id}>
                  {color.color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            variant="standard"
            label="Chất Liệu"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
          <FormControl variant="standard">
            <InputLabel>Chứng Chỉ Chống Nước</InputLabel>
            <Select
              value={waterResist}
              onChange={(e) => setWaterResist(e.target.value)}
            >
              <MenuItem value="ip67">IP67</MenuItem>
              <MenuItem value="ip68">IP68</MenuItem>
              <MenuItem value="none">Không có</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard">
            <InputLabel>RAM</InputLabel>
            <Select
              value={ramStorage}
              onChange={(e) => setRamStorage(e.target.value)}
            >
              <MenuItem value="4GB">4GB</MenuItem>
              <MenuItem value="8GB">8GB</MenuItem>
              <MenuItem value="16GB">16GB</MenuItem>
              <MenuItem value="32GB">32GB</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="standard"
            label="GPU"
            value={gpu}
            onChange={(e) => setGpu(e.target.value)}
          />
        </div>
        <div>
          <div>
            <Typography variant="h6">Kích thước</Typography>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <TextField
              variant="standard"
              label="Chiều Rộng"
              value={whdSize.width === 0 ? "" : whdSize.width}
              onChange={(e) =>
                setWhdSize({ ...whdSize, width: Number(e.target.value) })
              }
            />
            <TextField
              variant="standard"
              label="Chiều Cao"
              value={whdSize.height === 0 ? "" : whdSize.height}
              onChange={(e) =>
                setWhdSize({ ...whdSize, height: Number(e.target.value) })
              }
            />
            <TextField
              variant="standard"
              label="Chiều Sâu"
              value={whdSize.depth === 0 ? "" : whdSize.depth}
              onChange={(e) =>
                setWhdSize({ ...whdSize, depth: Number(e.target.value) })
              }
            />
          </div>
        </div>
        <div>
          <Typography variant="h6">Chi tiết CPU</Typography>
          <div className="grid grid-cols-4 gap-4">
            <TextField
              variant="standard"
              label="Phiên bản"
              value={cpu.version}
              onChange={(e) => setCpu({ ...cpu, version: e.target.value })}
            />
            <TextField
              variant="standard"
              label="Tên CPU"
              value={cpu.name}
              onChange={(e) => setCpu({ ...cpu, name: e.target.value })}
            />
            <TextField
              variant="standard"
              label="Số lõi"
              type="number"
              value={cpu.processorNum === 0 ? "" : cpu.processorNum}
              onChange={(e) =>
                setCpu({ ...cpu, processorNum: Number(e.target.value) })
              }
            />
            <TextField
              variant="standard"
              label="Tốc độ tối đa"
              type="number"
              value={cpu.maxRate === 0 ? "" : cpu.maxRate}
              onChange={(e) =>
                setCpu({ ...cpu, maxRate: Number(e.target.value) })
              }
            />
          </div>
        </div>
        <div>
          <Typography variant="h6">Chi tiết kết nối</Typography>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <FormControl variant="standard" fullWidth>
              <InputLabel>Wifi</InputLabel>
              <Select
                value={connectors.wifi}
                onChange={(e) =>
                  setConnectors({ ...connectors, wifi: e.target.value })
                }
              >
                <MenuItem value="wifi-6">Wifi 6</MenuItem>
                <MenuItem value="wifi-5">Wifi 5</MenuItem>
                <MenuItem value="wifi-4">Wifi 4</MenuItem>
                <MenuItem value="not-supported">Không hỗ trợ</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" fullWidth>
              <InputLabel>Bluetooth</InputLabel>
              <Select
                value={connectors.bluetooth}
                onChange={(e) =>
                  setConnectors({ ...connectors, bluetooth: e.target.value })
                }
              >
                <MenuItem value="bluetooth-5.0">Bluetooth 5.0</MenuItem>
                <MenuItem value="bluetooth-4.2">Bluetooth 4.2</MenuItem>
                <MenuItem value="bluetooth-4.1">Bluetooth 4.1</MenuItem>
                <MenuItem value="not-supported">Không hỗ trợ</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="standard" fullWidth>
              <InputLabel>Loại Kết Nối Internet</InputLabel>
              <Select
                value={connectors.internet}
                onChange={(e) =>
                  setConnectors({ ...connectors, internet: e.target.value })
                }
              >
                <MenuItem value="gprs">GPRS</MenuItem>
                <MenuItem value="3g">3G</MenuItem>
                <MenuItem value="4g">4G</MenuItem>
                <MenuItem value="5g">5G</MenuItem>
                <MenuItem value="not-supported">Không hỗ trợ</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" fullWidth>
              <InputLabel>Loại Cổng Sạc</InputLabel>
              <Select
                value={connectors.chargerType}
                onChange={(e) =>
                  setConnectors({ ...connectors, chargerType: e.target.value })
                }
              >
                <MenuItem value="usb-c">USB-C</MenuItem>
                <MenuItem value="micro-usb">Micro USB</MenuItem>
                <MenuItem value="lightning">Lightning</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormControlLabel
              control={
                <Checkbox
                  checked={connectors.hasJack3p5mm}
                  onChange={(e) =>
                    setConnectors({
                      ...connectors,
                      hasJack3p5mm: e.target.checked,
                    })
                  }
                />
              }
              label="Có Jack 3.5mm"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={connectors.gpsSupport.includes("GPS")}
                  onChange={(e) => {
                    const newGpsSupport = e.target.checked
                      ? [...connectors.gpsSupport, "GPS"]
                      : connectors.gpsSupport.filter(
                          (support) => support !== "GPS"
                        );
                    setConnectors({ ...connectors, gpsSupport: newGpsSupport });
                  }}
                />
              }
              label="GPS"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={connectors.gpsSupport.includes("GLONASS")}
                  onChange={(e) => {
                    const newGpsSupport = e.target.checked
                      ? [...connectors.gpsSupport, "GLONASS"]
                      : connectors.gpsSupport.filter(
                          (support) => support !== "GLONASS"
                        );
                    setConnectors({ ...connectors, gpsSupport: newGpsSupport });
                  }}
                />
              }
              label="GLONASS"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <Typography sx={{ mb: "0px" }} variant="h6">
                Sim
              </Typography>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <FormControl variant="standard">
                <InputLabel>Loại Sim</InputLabel>
                <Select
                  value={connectors.sim.type}
                  onChange={(e) =>
                    setConnectors({
                      ...connectors,
                      sim: { ...connectors.sim, type: e.target.value },
                    })
                  }
                >
                  <MenuItem value="nano">Nano</MenuItem>
                  <MenuItem value="micro">Micro</MenuItem>
                  <MenuItem value="standard">Standard</MenuItem>
                </Select>
              </FormControl>
              <TextField
                variant="standard"
                label="Số Khe Sim"
                type="number"
                value={connectors.sim.slots === 0 ? "" : connectors.sim.slots}
                onChange={(e) =>
                  setConnectors({
                    ...connectors,
                    sim: { ...connectors.sim, slots: Number(e.target.value) },
                  })
                }
              />
            </div>
          </div>
        </div>
        <div>
          <Typography variant="h6">Lưu trữ</Typography>
          <div className="grid grid-cols-4 gap-4">
            <FormControl variant="standard">
              <InputLabel>Bộ nhớ</InputLabel>
              <Select
                value={storage.rom}
                onChange={(e) =>
                  setStorage({ ...storage, rom: e.target.value })
                }
              >
                <MenuItem value="64GB">64GB</MenuItem>
                <MenuItem value="128GB">128GB</MenuItem>
                <MenuItem value="256GB">256GB</MenuItem>
                <MenuItem value="512GB">512GB</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard">
              <InputLabel>Hỗ trợ Bộ nhớ</InputLabel>
              <Select
                value={storage.driveSupport}
                onChange={(e) =>
                  setStorage({ ...storage, driveSupport: e.target.value })
                }
              >
                <MenuItem value="microSD">microSD</MenuItem>
                <MenuItem value="none">Không hỗ trợ</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="standard"
              label="Tối đa"
              value={storage.maxDriveSupport}
              onChange={(e) =>
                setStorage({
                  ...storage,
                  maxDriveSupport: Number(e.target.value),
                })
              }
              disabled={storage.driveSupport === "none"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Typography variant="h6">Camera</Typography>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography variant="h6">Camera trước</Typography>
              <div className="grid grid-cols-3 gap-4">
                <FormControl variant="standard">
                  <InputLabel>Loại</InputLabel>
                  <Select
                    value={cameras.frontCamera.type}
                    onChange={(e) =>
                      setCameras({
                        ...cameras,
                        frontCamera: {
                          ...cameras.frontCamera,
                          type: e.target.value,
                        },
                      })
                    }
                  >
                    <MenuItem value="ống kính thường">Ống kính thường</MenuItem>
                    <MenuItem value="ống kính góc rộng">
                      Ống kính góc rộng
                    </MenuItem>
                    <MenuItem value="ống kính tele">Ống kính tele</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel>Độ phân giải</InputLabel>
                  <Select
                    value={cameras.frontCamera.resolution}
                    onChange={(e) =>
                      setCameras({
                        ...cameras,
                        frontCamera: {
                          ...cameras.frontCamera,
                          resolution: e.target.value,
                        },
                      })
                    }
                  >
                    <MenuItem value="2MP">2MP</MenuItem>
                    <MenuItem value="5MP">5MP</MenuItem>
                    <MenuItem value="12MP">12MP</MenuItem>
                    <MenuItem value="48MP">48MP</MenuItem>
                    <MenuItem value="108MP">108MP</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel>Chất lượng video</InputLabel>
                  <Select
                    value={cameras.frontCamera.videoResolution}
                    onChange={(e) =>
                      setCameras({
                        ...cameras,
                        frontCamera: {
                          ...cameras.frontCamera,
                          videoResolution: e.target.value,
                        },
                      })
                    }
                  >
                    <MenuItem value="720p">720p</MenuItem>
                    <MenuItem value="1080p">1080p</MenuItem>
                    <MenuItem value="4K">4K</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div>
              <Typography variant="h6">Camera sau</Typography>
              <div className="grid grid-cols-3 gap-4">
                <FormControl variant="standard">
                  <InputLabel>Loại camera</InputLabel>
                  <Select
                    value={cameras.backCamera[0].type}
                    onChange={(e) =>
                      setCameras({
                        ...cameras,
                        backCamera: [
                          {
                            ...cameras.backCamera[0],
                            type: e.target.value,
                          },
                        ],
                      })
                    }
                  >
                    <MenuItem value="ống kính góc rộng">
                      Ống kính góc rộng
                    </MenuItem>
                    <MenuItem value="ống kính tele">Ống kính tele</MenuItem>
                    <MenuItem value="ống kính macro">Ống kính macro</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel>Độ phân giải (Megapixel)</InputLabel>
                  <Select
                    value={cameras.backCamera[0].resolution}
                    onChange={(e) =>
                      setCameras({
                        ...cameras,
                        backCamera: [
                          {
                            ...cameras.backCamera[0],
                            resolution: e.target.value,
                          },
                        ],
                      })
                    }
                  >
                    <MenuItem value="2MP">2MP</MenuItem>
                    <MenuItem value="5MP">5MP</MenuItem>
                    <MenuItem value="12MP">12MP</MenuItem>
                    <MenuItem value="48MP">48MP</MenuItem>
                    <MenuItem value="108MP">108MP</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel>Độ phân giải video</InputLabel>
                  <Select
                    value={cameras.backCamera[0].videoResolution}
                    onChange={(e) =>
                      setCameras({
                        ...cameras,
                        backCamera: [
                          {
                            ...cameras.backCamera[0],
                            videoResolution: e.target.value,
                          },
                        ],
                      })
                    }
                  >
                    <MenuItem value="480p">480p</MenuItem>
                    <MenuItem value="720p">720p</MenuItem>
                    <MenuItem value="1080p">1080p</MenuItem>
                    <MenuItem value="1440p">1440p</MenuItem>
                    <MenuItem value="4K">4K</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Typography variant="h6">Màn hình</Typography>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              variant="standard"
              label="Độ phân giải chiều rộng"
              type="number"
              value={
                screen.resolution.width === 0 ? "" : screen.resolution.width
              }
              onChange={(e) =>
                setScreen({
                  ...screen,
                  resolution: {
                    ...screen.resolution,
                    width: Number(e.target.value),
                  },
                })
              }
            />
            <TextField
              variant="standard"
              label="Độ phân giải chiều cao"
              type="number"
              value={
                screen.resolution.height === 0 ? "" : screen.resolution.height
              }
              onChange={(e) =>
                setScreen({
                  ...screen,

                  resolution: {
                    ...screen.resolution,
                    height: Number(e.target.value),
                  },
                })
              }
            />
            <TextField
              variant="standard"
              label="Kích thước"
              value={screen.size}
              onChange={(e) => setScreen({ ...screen, size: e.target.value })}
            />
            <FormControl variant="standard">
              <InputLabel>Loại màn hình</InputLabel>
              <Select
                value={screen.type}
                onChange={(e) => setScreen({ ...screen, type: e.target.value })}
              >
                <MenuItem value="LCD">LCD</MenuItem>
                <MenuItem value="OLED">OLED</MenuItem>
                <MenuItem value="AMOLED">AMOLED</MenuItem>
                <MenuItem value="IPS">IPS</MenuItem>
                <MenuItem value="TFT">TFT</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard">
              <InputLabel>Tốc độ làm mới</InputLabel>
              <Select
                value={screen.refreshRate}
                onChange={(e) =>
                  setScreen({
                    ...screen,
                    refreshRate: Number(e.target.value),
                  })
                }
              >
                <MenuItem value={60}>60 Hz</MenuItem>
                <MenuItem value={90}>90 Hz</MenuItem>
                <MenuItem value={120}>120 Hz</MenuItem>
                <MenuItem value={144}>144 Hz</MenuItem>
                <MenuItem value={240}>240 Hz</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="standard"
              label="Độ sáng"
              type="number"
              value={screen.brightRate === 0 ? "" : screen.brightRate}
              onChange={(e) =>
                setScreen({ ...screen, brightRate: Number(e.target.value) })
              }
            />
            <TextField
              variant="standard"
              label="Tốc độ nhận cảm ứng"
              value={screen.touchRate}
              onChange={(e) =>
                setScreen({ ...screen, touchRate: e.target.value })
              }
            />
            <FormControl variant="standard">
              <InputLabel>Chuẩn kính màn hình</InputLabel>
              <Select
                value={screen.material}
                onChange={(e) =>
                  setScreen({ ...screen, material: e.target.value })
                }
              >
                <MenuItem value="Gorilla Glass">Gorilla Glass</MenuItem>
                <MenuItem value="Dragontrail Glass">Dragontrail Glass</MenuItem>
                <MenuItem value="Sapphire Glass">Sapphire Glass</MenuItem>
                <MenuItem value="Kính thường">Kính thường</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div></div>
        </div>
        <div>
          <Typography variant="h6">Pin</Typography>
          <div className="grid grid-cols-3 gap-4">
            <FormControl variant="standard">
              <InputLabel>Loại Công Nghệ Pin</InputLabel>
              <Select
                value={power.batteryType}
                onChange={(e) =>
                  setPower({ ...power, batteryType: e.target.value })
                }
              >
                <MenuItem value="Lithium-ion">Lithium-ion</MenuItem>
                <MenuItem value="Lithium-polymer">Lithium-polymer</MenuItem>
                <MenuItem value="Nickel-Metal Hydride">
                  Nickel-Metal Hydride
                </MenuItem>
                <MenuItem value="Nickel-Cadmium">Nickel-Cadmium</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="standard"
              label="Dung lượng"
              type="number"
              value={power.capability === 0 ? "" : power.capability}
              onChange={(e) =>
                setPower({ ...power, capability: Number(e.target.value) })
              }
            />
            <TextField
              variant="standard"
              label="Loại sạc"
              value={power.charger}
              onChange={(e) => setPower({ ...power, charger: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="contained" color="primary" type="submit">
            Thêm Biến Thể
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default CellphoneVariantForm;
