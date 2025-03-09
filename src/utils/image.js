/**
 * 图片URL处理工具
 * 用于处理图片资源的URL，统一管理图片资源的访问地址
 */

// 获取环境变量中的图片基础路径
const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL

/**
 * 获取完整的图片URL
 * @param {string} path - 图片相对路径，例如：'/cars/audi/a6l-thumb.jpg'
 * @returns {string} 完整的图片URL
 */
export function getImageUrl(path) {
  // 如果path是完整的URL，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  // 确保path以'/'开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // 移除可能重复的'/images'前缀
  const cleanPath = normalizedPath.replace(/^\/images/, '')
  
  return `${imageBaseUrl}${cleanPath}`
}

/**
 * 获取缩略图URL
 * @param {string} path - 图片相对路径
 * @param {string} suffix - 缩略图后缀，默认为'-thumb'
 * @returns {string} 缩略图完整URL
 */
export function getThumbUrl(path, suffix = '-thumb') {
  const ext = path.substring(path.lastIndexOf('.'))
  const basePath = path.substring(0, path.lastIndexOf('.'))
  return getImageUrl(`${basePath}${suffix}${ext}`)
}

/**
 * 检查图片URL是否有效
 * @param {string} url - 图片URL
 * @returns {Promise<boolean>} 是否有效
 */
export function checkImageUrl(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
} 