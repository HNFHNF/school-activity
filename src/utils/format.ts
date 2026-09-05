export function formatDate(str: string): string {
  const d = new Date(str)
  if (isNaN(d.getTime())) return str
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function getMonthDay(str: string): { month: number; day: number } {
  const d = new Date(str)
  return { month: d.getMonth() + 1, day: d.getDate() }
}
