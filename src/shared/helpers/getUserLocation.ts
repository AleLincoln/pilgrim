import type { Coordinates } from '../types/generic'

export default function getUserGeolocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.permissions || !navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'))
    } else {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          if (permissionStatus.state === 'granted') {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const coordinates: Coordinates = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                }
                resolve(coordinates)
              },
              (error) => {
                reject(error)
              }
            )
          } else {
            reject(new Error('Geolocation permission denied'))
          }
        })
        .catch((error) => {
          reject(error)
        })
    }
  })
}
