import Link from "next/link"

function NotFound() {
  return (
    <div className="min-h-[100vh]">
        <div className="flex flex-col gap-4 w-full h-full min-h-[100vh] items-center justify-center">
            <h2 className="text-[var(--primary-color)]">Lỗi 404 - Không tìm thấy trang</h2>
            <span className="text-[var(--text-white)]">Trang bạn đang tìm kiếm không tồn tại. Vui lòng kiểm tra đường dẫn hoặc quay về trang chủ.</span>
            <Link href={'/'} className="rounded-2xl py-4 px-6 bg-[var(--primary-color)] text-[var(--text-black)]">về trang chủ</Link>
        </div>
    </div>
  )
}

export default NotFound