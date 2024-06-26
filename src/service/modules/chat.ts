import hyRequest from '@/service'

export function sendMessageToGpt(message: string) {
  return hyRequest.post({
    url: '/chat/bot',
    data: {
      message: message
    }
  })
}