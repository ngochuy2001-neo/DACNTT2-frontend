import React, { useEffect, useState } from "react";
import { Laptop, LaptopVariant } from "@/app/utils/interface";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

function LaptopVariantForm({
  closeModal,
  productId,
}: {
  closeModal: () => void;
  productId: string;
}) {
  const [variantName, setVariantName] = useState("");
  const [price, setPrice] = useState(0);

  const [promotionId, setPromotionId] = useState("");
  const [stock, setStock] = useState(0);
  const [hardwareId, setHardwareId] = useState("");
  const [mfgYear, setMfgYear] = useState(0);
  const [originId, setOriginId] = useState("");
  const [weight, setWeight] = useState(0);
  const [colorId, setColorId] = useState("");
  const [material, setMaterial] = useState("");
  const [upgradeRam, setUpgradeRam] = useState("no");
  const [maxRamUpgrade, setMaxRamUpgrade] = useState("");
  const [upgradeDisk, setUpgradeDisk] = useState("no");
  const [maxDiskUpgrade, setMaxDiskUpgrade] = useState("");
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenDepth, setScreenDepth] = useState(0);
  const [cpuBrand, setCpuBrand] = useState("");
  const [cpuModel, setCpuModel] = useState("");
  const [cpuName, setCpuName] = useState("");
  const [cpuSpeed, setCpuSpeed] = useState(0);
  const [vgaBrand, setVgaBrand] = useState("");
  const [vgaName, setVgaName] = useState("");
  const [vgaModel, setVgaModel] = useState("");
  const [ramType, setRamType] = useState("");
  const [ramCapacity, setRamCapacity] = useState("");
  const [ramSlots, setRamSlots] = useState(0);
  const [diskType, setDiskType] = useState("");
  const [diskModel, setDiskModel] = useState("");
  const [diskCapacity, setDiskCapacity] = useState("");
  const [diskSlots, setDiskSlots] = useState(0);
  const [screenSize, setScreenSize] = useState(0);
  const [screenType, setScreenType] = useState("");
  const [resolutionWidth, setResolutionWidth] = useState(0);
  const [resolutionHeight, setResolutionHeight] = useState(0);
  const [refreshRate, setRefreshRate] = useState(0);
  const [colorRatio, setColorRatio] = useState(0);
  const [screenRatio, setScreenRatio] = useState("");
  const [osName, setOsName] = useState("");
  const [osVersion, setOsVersion] = useState("");
  const [keyboardType, setKeyboardType] = useState("");
  const [backlit, setBacklit] = useState(false);
  const [numPad, setNumPad] = useState(false);
  const [touchpad, setTouchpad] = useState(false);
  const [power, setPower] = useState("");
  const [supply, setSupply] = useState("");
  const [gear1, setGear1] = useState("");
  const [wifi, setWifi] = useState("");
  const [bluetooth, setBluetooth] = useState("");
  const [webcam, setWebcam] = useState("");
  const [usb1, setUsb1] = useState("");
  const [hdmi1, setHdmi1] = useState("");
  const [usb_number, setUsb_number] = useState(0);
  const [hdmi_number, setHdmi_number] = useState(0);
  const [cardReaderSlots, setCardReaderSlots] = useState(0);
  const [jack3p5mmSlots, setJack3p5mmSlots] = useState(0);
  const [gear2, setGear2] = useState("");

  const [colors, setColors] = useState([]);
  const [origins, setOrigins] = useState([]);

  const prepareData = () => {
    return {
      variant: {
        name: variantName,
        price: price,
        promotionId: promotionId,
        stock: stock,
      },
      variantField: {
        partNumber: hardwareId,
        mfgYear: mfgYear,
        originId: originId,
        weight: weight,
        colorId: colorId,
        material: material,
        maxRamUp: upgradeRam === "yes" ? maxRamUpgrade : undefined,
        maxDriveUp: upgradeDisk === "yes" ? maxDiskUpgrade : undefined,
        whdSize: {
          width: screenWidth,
          height: screenHeight,
          depth: screenDepth,
        },
        cpu: {
          brand: cpuBrand,
          name: cpuName,
          model: cpuModel,
          minRate: cpuSpeed,
        },
        vga: {
          brand: vgaBrand,
          name: vgaName,
          model: vgaModel,
        },
        ram: {
          type: ramType,
          storage: ramCapacity,
          slots: ramSlots,
        },
        drive: {
          type: diskType,
          model: diskModel,
          storage: diskCapacity,
          slots: diskSlots,
        },
        screen: {
          size: screenSize,
          type: screenType,
          resolution: {
            width: resolutionWidth,
            height: resolutionHeight,
          },
          refreshRate: refreshRate,
          colorRate: colorRatio,
          ratio: screenRatio,
        },
        port: {
          wifi: true,
          bluetooth: true,
          webcam: true,
          usb1: {
            type: usb1,
            slots: usb_number,
          },

          hdmi1: {
            version: hdmi1,
            slots: hdmi_number,
          },
          cardReaderSlots: 1,
          jack3p5mmSlots: 1,
        },
        os: {
          name: osName,
          version: osVersion,
        },
        keyboard: {
          type: keyboardType,
          led: backlit,
          hasNumpad: numPad,
          touchpad: touchpad,
        },
        power: {
          capability: power,
          supply: supply,
        },
        gears: [{ name: gear1 }, { name: gear2 }],
      },
    };
  };

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

  const handleAddVariant = async () => {
    const data = prepareData();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/products/laptop/detail/${productId}/variant/add`,
        data
      );
      console.log(response.data);
      closeModal();
    } catch (error) {
      console.error("Có lỗi xảy ra khi thêm variant:", error);
    }
  };

  useEffect(() => {
    fetchOrigins();
    fetchColors();
  }, []);
  return (
    <form className="flex flex-col gap-4 w-[70vw]">
      <Typography variant="h6">Thông tin Variant</Typography>
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Tên variant"
          variant="standard"
          fullWidth
          required
          value={variantName}
          onChange={(e) => setVariantName(e.target.value)}
          onFocus={() => {
            if (variantName === "") setVariantName("");
          }}
        />
        <TextField
          label="Giá"
          variant="standard"
          type="number"
          fullWidth
          required
          value={price === 0 ? "" : price}
          onChange={(e) =>
            setPrice(Number(e.target.value === "" ? 0 : e.target.value))
          }
        />
        <TextField
          label="ID khuyến mãi"
          variant="standard"
          fullWidth
          value={promotionId}
          onChange={(e) => setPromotionId(e.target.value)}
          onFocus={() => {
            if (promotionId === "") setPromotionId("");
          }}
        />
        <TextField
          label="Số lượng"
          variant="standard"
          type="number"
          fullWidth
          required
          value={stock === 0 ? "" : stock}
          onChange={(e) =>
            setStock(Number(e.target.value === "" ? 0 : e.target.value))
          }
        />
      </div>

      <Typography variant="h6">Thông tin khác</Typography>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Mã phần cứng"
            variant="standard"
            fullWidth
            required
            value={hardwareId}
            onChange={(e) => setHardwareId(e.target.value)}
            onFocus={() => {
              if (hardwareId === "") setHardwareId("");
            }}
          />
          <TextField
            label="Năm sản xuất"
            variant="standard"
            type="number"
            fullWidth
            required
            value={mfgYear === 0 ? "" : mfgYear}
            onChange={(e) => setMfgYear(Number(e.target.value))}
          />
          <FormControl fullWidth variant="standard">
            <InputLabel id="origin-select-label">Nguồn gốc</InputLabel>
            <Select
              labelId="origin-select-label"
              variant="standard"
              fullWidth
              required
              value={originId}
              onChange={(e) => setOriginId(e.target.value)}
            >
              {origins?.map((origin, index) => (
                <MenuItem key={index} value={origin.origin_id}>
                  {origin.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Trọng lượng"
            variant="standard"
            type="number"
            fullWidth
            required
            value={weight === 0 ? "" : weight}
            onChange={(e) =>
              setWeight(Number(e.target.value === "" ? 0 : e.target.value))
            }
          />
          <FormControl fullWidth variant="standard">
            <InputLabel id="color-select-label">Màu sắc</InputLabel>
            <Select
              labelId="color-select-label"
              variant="standard"
              fullWidth
              required
              value={colorId}
              onChange={(e) => setColorId(e.target.value)}
            >
              {colors?.map((color, index) => (
                <MenuItem key={index} value={color.color_id}>
                  {color.color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Chất liệu"
            variant="standard"
            fullWidth
            required
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            onFocus={() => {
              if (material === "") setMaterial("");
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Typography variant="body1">Có thể nâng cấp RAM</Typography>
            <RadioGroup
              row
              value={upgradeRam}
              onChange={(e) => {
                setUpgradeRam(e.target.value);
                if (e.target.value === "no") {
                  setMaxRamUpgrade("");
                }
              }}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Có" />
              <FormControlLabel value="no" control={<Radio />} label="Không" />
            </RadioGroup>
            {upgradeRam === "yes" && (
              <TextField
                label="Dung lượng nâng cấp tối đa"
                variant="standard"
                fullWidth
                onChange={(e) => setMaxRamUpgrade(e.target.value)}
              />
            )}
          </div>
          <div>
            <Typography variant="body1">Có thể nâng cấp ổ đĩa</Typography>
            <RadioGroup
              row
              value={upgradeDisk}
              onChange={(e) => {
                setUpgradeDisk(e.target.value);
                if (e.target.value === "no") {
                  setMaxDiskUpgrade("");
                }
              }}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Có" />
              <FormControlLabel value="no" control={<Radio />} label="Không" />
            </RadioGroup>
            {upgradeDisk === "yes" && (
              <TextField
                label="Dung lượng nâng cấp tối đa"
                variant="standard"
                fullWidth
                onChange={(e) => setMaxDiskUpgrade(e.target.value)}
              />
            )}
          </div>
        </div>
        <div>
          <Typography variant="h6">Kích thước thiết bị</Typography>
          <div className="grid grid-cols-3 gap-4">
            <TextField
              label="Kích thước thiết bị (Rộng)"
              variant="standard"
              type="number"
              fullWidth
              required
              value={screenWidth}
              onChange={(e) => setScreenWidth(Number(e.target.value))}
              onFocus={() => {
                if (screenWidth === 0) setScreenWidth("");
              }}
            />
            <TextField
              label="Kích thước thiết bị (Cao)"
              variant="standard"
              type="number"
              fullWidth
              required
              value={screenHeight}
              onChange={(e) => setScreenHeight(Number(e.target.value))}
              onFocus={() => {
                if (screenHeight === 0) setScreenHeight("");
              }}
            />
            <TextField
              label="Kích thước thiết bị (Sâu)"
              variant="standard"
              type="number"
              fullWidth
              required
              value={screenDepth}
              onChange={(e) => setScreenDepth(Number(e.target.value))}
              onFocus={() => {
                if (screenDepth === 0) setScreenDepth("");
              }}
            />
          </div>
        </div>
        <div>
          <Typography variant="h6">Cổng kết nối</Typography>
          <div className="grid grid-cols-4 gap-4">
            <TextField
              label="Cổng Wifi"
              variant="standard"
              fullWidth
              required
              value={wifi}
              onChange={(e) => setWifi(e.target.value)}
            />
            <TextField
              label="Cổng Bluetooth"
              variant="standard"
              fullWidth
              required
              value={bluetooth}
              onChange={(e) => setBluetooth(e.target.value)}
            />
            <TextField
              label="Cổng Webcam"
              variant="standard"
              fullWidth
              required
              value={webcam}
              onChange={(e) => setWebcam(e.target.value)}
            />
            <TextField
              label="Cổng Jack 3.5mm"
              variant="standard"
              fullWidth
              required
              value={jack3p5mmSlots}
              onChange={(e) => setJack3p5mmSlots(Number(e.target.value))}
            />
            <TextField
              label="Cổng Card Reader"
              variant="standard"
              fullWidth
              required
              value={cardReaderSlots}
              onChange={(e) => setCardReaderSlots(Number(e.target.value))}
            />
            <div className="flex flex-col gap-2">
              <FormControl fullWidth variant="standard">
                <InputLabel>Cổng USB 1</InputLabel>
                <Select value={usb1} onChange={(e) => setUsb1(e.target.value)}>
                  <MenuItem value="usb2">USB 2.0</MenuItem>
                  <MenuItem value="usb3">USB 3.0</MenuItem>
                  <MenuItem value="usb3_1">USB 3.1</MenuItem>
                  <MenuItem value="usb_c">USB Type-C</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Số khe USB"
                variant="standard"
                type="number"
                fullWidth
                required
                value={usb_number}
                onChange={(e) => setUsb_number(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormControl fullWidth variant="standard">
                <InputLabel>Cổng HDMI 1</InputLabel>
                <Select
                  value={hdmi1}
                  onChange={(e) => setHdmi1(e.target.value)}
                >
                  <MenuItem value="hdmi1_4">HDMI 1.4</MenuItem>
                  <MenuItem value="hdmi2_0">HDMI 2.0</MenuItem>
                  <MenuItem value="hdmi2_1">HDMI 2.1</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Số khe HDMI"
                variant="standard"
                type="number"
                fullWidth
                required
                value={hdmi_number}
                onChange={(e) => setHdmi_number(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div>
          <Typography variant="h6">CPU</Typography>
          <div className="grid grid-cols-4 gap-4">
            <FormControl fullWidth variant="standard">
              <InputLabel>Hãng CPU</InputLabel>
              <Select
                value={cpuBrand}
                onChange={(e) => setCpuBrand(e.target.value)}
              >
                <MenuItem value="amd">AMD</MenuItem>
                <MenuItem value="intel">Intel</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth variant="standard">
              <InputLabel>Mẫu CPU</InputLabel>
              <Select
                value={cpuModel}
                onChange={(e) => setCpuModel(e.target.value)}
              >
                <MenuItem value="i3">i3</MenuItem>
                <MenuItem value="i5">i5</MenuItem>
                <MenuItem value="i7">i7</MenuItem>
                <MenuItem value="ryzen3">Ryzen 3</MenuItem>
                <MenuItem value="ryzen5">Ryzen 5</MenuItem>
                <MenuItem value="ryzen7">Ryzen 7</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Tên CPU"
              variant="standard"
              fullWidth
              required
              value={cpuName}
              onChange={(e) => setCpuName(e.target.value)}
              onFocus={() => {
                if (cpuName === "") setCpuName("");
              }}
            />
            <TextField
              label="Tốc độ tối thiểu CPU"
              variant="standard"
              type="number"
              fullWidth
              required
              value={cpuSpeed}
              onChange={(e) => setCpuSpeed(Number(e.target.value))}
              onFocus={() => {
                if (cpuSpeed === 0) setCpuSpeed("");
              }}
            />
          </div>
        </div>
        <div>
          <Typography variant="h6">VGA</Typography>
          <div className="grid grid-cols-3 gap-4">
            <FormControl fullWidth variant="standard">
              <InputLabel>Hãng VGA</InputLabel>
              <Select
                value={vgaBrand}
                onChange={(e) => setVgaBrand(e.target.value)}
              >
                <MenuItem value="nvidia">NVIDIA</MenuItem>
                <MenuItem value="amd">AMD</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth variant="standard">
              <InputLabel>Mẫu VGA</InputLabel>
              <Select
                value={vgaModel}
                onChange={(e) => setVgaModel(e.target.value)}
              >
                <MenuItem value="QUADRO">QUADRO</MenuItem>
                <MenuItem value="RTX">RTX</MenuItem>
                <MenuItem value="GTX">GTX</MenuItem>
                <MenuItem value="GT">GT</MenuItem>
                <MenuItem value="RX">RX</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Tên VGA"
              variant="standard"
              fullWidth
              required
              value={vgaName}
              onChange={(e) => setVgaName(e.target.value)}
              onFocus={() => {
                if (vgaName === "") setVgaName("");
              }}
            />
          </div>
        </div>
        <div>
          <Typography variant="h6">Ram</Typography>
          <div className="grid grid-cols-3 gap-4">
            <FormControl fullWidth variant="standard">
              <InputLabel>Loại RAM</InputLabel>
              <Select
                value={ramType}
                onChange={(e) => setRamType(e.target.value)}
              >
                <MenuItem value="ddr3">DDR3</MenuItem>
                <MenuItem value="ddr4">DDR4</MenuItem>
                <MenuItem value="ddr5">DDR5</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Dung lượng RAM"
              variant="standard"
              fullWidth
              required
              value={ramCapacity}
              onChange={(e) => setRamCapacity(e.target.value)}
            />
            <TextField
              label="Số khe RAM"
              variant="standard"
              type="number"
              fullWidth
              required
              value={ramSlots === 0 ? "" : ramSlots}
              onChange={(e) => setRamSlots(Number(e.target.value))}
            />
          </div>
        </div>
        <div>
          <Typography variant="h6">Ổ đĩa</Typography>
          <div className="grid grid-cols-4 gap-4">
            <TextField
              label="Loại ổ đĩa"
              variant="standard"
              fullWidth
              required
              value={diskType}
              onChange={(e) => setDiskType(e.target.value)}
              onFocus={() => {
                if (diskType === "") setDiskType("");
              }}
            />
            <TextField
              label="Mẫu ổ đĩa"
              variant="standard"
              fullWidth
              required
              value={diskModel}
              onChange={(e) => setDiskModel(e.target.value)}
              onFocus={() => {
                if (diskModel === "") setDiskModel("");
              }}
            />
            <TextField
              label="Dung lượng ổ đĩa"
              variant="standard"
              fullWidth
              required
              value={diskCapacity}
              onChange={(e) => setDiskCapacity(e.target.value)}
              onFocus={() => {
                if (diskCapacity.toString() === "") setDiskCapacity("");
              }}
            />
            <TextField
              label="Số khe ổ đĩa"
              variant="standard"
              type="number"
              fullWidth
              required
              value={diskSlots === 0 ? "" : diskSlots}
              onChange={(e) => setDiskSlots(Number(e.target.value))}
            />
          </div>
        </div>
        <div>
          <Typography variant="h6">Màn hình</Typography>
          <div className="grid grid-cols-4 gap-4">
            <TextField
              label="Kích thước màn hình"
              variant="standard"
              fullWidth
              type="number"
              required
              value={screenSize === 0 ? "" : screenSize}
              onChange={(e) => setScreenSize(Number(e.target.value))}
            />
            <TextField
              label="Loại màn hình"
              variant="standard"
              fullWidth
              required
              value={screenType}
              onChange={(e) => setScreenType(e.target.value)}
              onFocus={() => {
                if (screenType === "") setScreenType("");
              }}
            />
            <TextField
              label="Độ phân giải (Rộng)"
              variant="standard"
              type="number"
              fullWidth
              required
              value={resolutionWidth === 0 ? "" : resolutionWidth}
              onChange={(e) => setResolutionWidth(Number(e.target.value))}
            />
            <TextField
              label="Độ phân giải (Cao)"
              variant="standard"
              type="number"
              fullWidth
              required
              value={resolutionHeight === 0 ? "" : resolutionHeight}
              onChange={(e) => setResolutionHeight(Number(e.target.value))}
            />
            <TextField
              label="Tần số làm mới"
              variant="standard"
              type="number"
              fullWidth
              required
              value={refreshRate === 0 ? "" : refreshRate}
              onChange={(e) => setRefreshRate(Number(e.target.value))}
            />
            <TextField
              label="Tỷ lệ màu"
              variant="standard"
              type="number"
              fullWidth
              required
              value={colorRatio === 0 ? "" : colorRatio}
              onChange={(e) => setColorRatio(Number(e.target.value))}
            />
            <TextField
              label="Tỷ lệ màn hình"
              variant="standard"
              fullWidth
              required
              value={screenRatio}
              onChange={(e) => setScreenRatio(e.target.value)}
              onFocus={() => {
                if (screenRatio === "") setScreenRatio("");
              }}
            />
          </div>
        </div>
        <div>
          <Typography variant="h6">Hệ điều hành</Typography>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Tên hệ điều hành"
              variant="standard"
              fullWidth
              required
              value={osName}
              onChange={(e) => setOsName(e.target.value)}
              onFocus={() => {
                if (osName === "") setOsName("");
              }}
            />
            <TextField
              label="Phiên bản hệ điều hành"
              variant="standard"
              fullWidth
              required
              value={osVersion}
              onChange={(e) => setOsVersion(e.target.value)}
              onFocus={() => {
                if (osVersion === "") setOsVersion("");
              }}
            />
          </div>
        </div>
        <div>
          <Typography variant="h6">Bàn phím</Typography>
          <div className="grid grid-cols-1 gap-4">
            <TextField
              label="Loại bàn phím"
              variant="standard"
              fullWidth
              required
              value={keyboardType}
              onChange={(e) => setKeyboardType(e.target.value)}
              onFocus={() => {
                if (keyboardType === "") setKeyboardType("");
              }}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={backlit}
                    onChange={(e) => setBacklit(e.target.checked)}
                  />
                }
                label="Có đèn nền"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={numPad}
                    onChange={(e) => setNumPad(e.target.checked)}
                  />
                }
                label="Có bàn phím số"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={touchpad}
                    onChange={(e) => setTouchpad(e.target.checked)}
                  />
                }
                label="Có touchpad"
              />
            </div>
          </div>
        </div>
        <div>
          <Typography variant="h6">Nguồn</Typography>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Công suất"
              variant="standard"
              fullWidth
              required
              value={power}
              onChange={(e) => setPower(e.target.value)}
              onFocus={() => {
                if (power === "") setPower("");
              }}
            />
            <TextField
              label="Nguồn cung cấp"
              variant="standard"
              fullWidth
              required
              value={supply}
              onChange={(e) => setSupply(e.target.value)}
              onFocus={() => {
                if (supply === "") setSupply("");
              }}
            />
          </div>
        </div>
        <TextField
          label="Gear 1"
          variant="standard"
          fullWidth
          value={gear1}
          onChange={(e) => setGear1(e.target.value)}
          onFocus={() => {
            if (gear1 === "") setGear1("");
          }}
        />
        <TextField
          label="Gear 2"
          variant="standard"
          fullWidth
          value={gear2}
          onChange={(e) => setGear2(e.target.value)}
          onFocus={() => {
            if (gear2 === "") setGear2("");
          }}
        />
      </div>
      <div className="flex justify-between mt-4">
        <Button color="error" variant="contained" onClick={closeModal}>
          Hủy
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddVariant}>
          Thêm
        </Button>
      </div>
    </form>
  );
}

export default LaptopVariantForm;
