import hyRequest from '@/service'

export function sendMessageToGpt(message){
  return hyRequest.post({
    url: '/chat/bot',
    data: {
      message: message
    }
  })
}