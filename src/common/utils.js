export default function (start, end, step) {
  return Array.from({ length: (end - start) / step + 1 }, (_, i) => start + i * step)
}