<template>
  <view class="axios-demo">
    <button @click="getAiPicture(1)">3D风</button>
    <button @click="getAiPicture(2)">写实风</button>
    <button @click="getAiPicture(3)">天使风</button>
    <button @click="getAiPicture(4)">动漫风</button>
  </view>
  <view class="result-img">
    <image
      src="https://d.ifengimg.com/w480_h270_q90_webp/x0.ifengimg.com/ucms/2024_45/3ED1B62598E317AEA05BCDA0FBF25172670D393F_size82_w975_h549.jpg"
    ></image>
  </view>
  <view class="result-img">
    <image :src="resultUrl"></image>
  </view>
</template>
<script setup>
import { ref } from 'vue'
import { axiosApi } from '@/api'

const resultUrl = ref('')

const styleEnum = {
  1: {
    Action: 'CVProcess',
    Version: '2022-08-31',
    req_key: 'img2img_disney_3d_style',
    image_urls:
      'https://d.ifengimg.com/w480_h270_q90_webp/x0.ifengimg.com/ucms/2024_45/3ED1B62598E317AEA05BCDA0FBF25172670D393F_size82_w975_h549.jpg'
  },
  2: {
    Action: 'CVProcess',
    Version: '2022-08-31',
    req_key: 'img2img_real_mix_style',
    image_urls:
      'https://d.ifengimg.com/w480_h270_q90_webp/x0.ifengimg.com/ucms/2024_45/3ED1B62598E317AEA05BCDA0FBF25172670D393F_size82_w975_h549.jpg'
  },
  3: {
    Action: 'CVProcess',
    Version: '2022-08-31',
    req_key: 'img2img_pastel_boys_style',
    image_urls:
      'https://d.ifengimg.com/w480_h270_q90_webp/x0.ifengimg.com/ucms/2024_45/3ED1B62598E317AEA05BCDA0FBF25172670D393F_size82_w975_h549.jpg'
  },
  4: {
    Action: 'CVProcess',
    Version: '2022-08-31',
    req_key: 'img2img_cartoon_style',
    image_urls:
      'https://d.ifengimg.com/w480_h270_q90_webp/x0.ifengimg.com/ucms/2024_45/3ED1B62598E317AEA05BCDA0FBF25172670D393F_size82_w975_h549.jpg'
  }
}

const getAiPicture = async (type) => {
  try {
    uni.showLoading(true)
    const res = await axiosApi.getAiPicture(styleEnum[type])
    if (res.code === 10000) {
      // eslint-disable-next-line prefer-destructuring
      resultUrl.value = res.data.image_urls[0]
      uni.showToast({
        title: '生成成功',
        icon: 'success'
      })
    } else {
      uni.showToast({
        title: '生成失败',
        icon: 'error'
      })
    }
  } finally {
    uni.showLoading(false)
  }
}
</script>

<style lang="less">
.axios-demo {
  text-align: center;
}
.h1 {
  font-size: 50rpx;
}
.result-img {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
