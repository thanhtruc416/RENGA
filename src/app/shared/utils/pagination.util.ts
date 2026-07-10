/**
 * Trả về danh sách số trang hiển thị dạng "cửa sổ trượt" quanh trang hiện tại,
 * thay vì hiện toàn bộ số trang liền một dãy (dễ tràn ngang khi có nhiều trang).
 * Ví dụ windowSize=5: đang ở trang 1 → [1,2,3,4,5]; bấm sang trang 6 → [4,5,6,7,8].
 */
export function getPageWindow(current: number, total: number, windowSize = 5): number[] {
  if (total <= windowSize) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  let start = Math.max(1, current - Math.floor(windowSize / 2));
  let end = start + windowSize - 1;
  if (end > total) {
    end = total;
    start = end - windowSize + 1;
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
