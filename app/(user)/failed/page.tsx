"use client"
import { Button, Typography } from '@mui/material'
import React from 'react'
import {useRouter} from 'next/navigation'

function PurchaseFailedPage() {
  const router = useRouter()
  return (
    <div className='flex items-center justify-center h-full py-[30px]'>
      <div className='w-[30vw] shadow-md min-h-[10vh] flex justify-center p-4 flex-col items-center gap-[20px]'>
        <Typography sx={{color: "red", fontSize: "20px", textTransform: "uppercase"}}>
          Thanh toán thất bại
        </Typography>
        <Typography>
          Có vấn đề xảy ra trong quá trình giao dịch, vui lòng thử lại sao
        </Typography>
        <Button variant="contained" onClick={() => router.push('/')}>
          Quay trở về trang chủ
        </Button>
      </div>
    </div>
  )
}

export default PurchaseFailedPage