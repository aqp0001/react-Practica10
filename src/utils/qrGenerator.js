import QRCode from "qrcode"

export const generateEventQR = async (eventId) => {
  try {
    // Crear URL para compartir el evento
    const eventUrl = `${window.location.origin}/join-event/${eventId}`

    // Generar QR como data URL
    const qrDataUrl = await QRCode.toDataURL(eventUrl)
    return qrDataUrl
  } catch (error) {
    console.error("Error generating QR code:", error)
    return null
  }
}

