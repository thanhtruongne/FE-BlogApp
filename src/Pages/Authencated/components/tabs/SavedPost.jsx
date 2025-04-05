import { CommentOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const SavedPost = () => {
    
    return (
        <div className="w-full w-[240px] relative" style={{ maxWidth: "562px"}}>

            <div className="text-[22px] font-bold text-[#222] mb-[24px]">Tin đã lưu</div>

            <div className="wrapper_data_content w-full">
                {/* render_item */}
                <div className="mb-4 pb-5" style={{ borderBottom : "1px solid #e5e5e5" }}>
                    <div className="thumb_art_data w-[28%] mr-[12px]">
                        <Link className="h-0 pb-[60%] overflow-hidden relative bg-[#f4f4f4] block">
                            <img src="https://i1-vnexpress.vnecdn.net/2025/02/19/202502190830437792-z6330979302-5445-8072-1739940104.jpg?w=180&h=108&q=100&dpr=1&fit=crop&s=8elk3S9WIwjZdiAKjx2lsA" className="w-full object-fit-cover" alt="" />
                        </Link>
                    </div>

                    <div className="item_info">
                        <h3 className="title_data mb-3">
                            <Link className="text-[#222222]">
                            Hơn 8 tỷ USD xây đường sắt Lào Cai - Hà Nội - Hải Phòng
                            </Link>
                        </h3>
                        <div className="socical_activity flex items-center justify-between">
                            <div className="date_cate text-[14px] text-[#9F9F9F]">
                                <Link className="text-[#9F9F9F]">
                                    Thời sự
                                </Link>
                                -
                                <span>19/2/2025</span>
                            </div>

                            <div className="social_new_cate flx items-center">
                                <div className="inline-block">
                                    <Link className="ml-0 w-[20px] h-[20px] inline-block text-[#222]">
                                        <CommentOutlined />
                                    </Link>
                                    <span className="inline-block ml-2 text-[14px] text-[#B42652]">8</span>
                                </div>

                                <div className="inline-block ml-4 text-[14px] relative">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3298 12.8377L17.8269 8.41512L17.8841 8.34968C18.0558 8.12058 18.0367 7.78916 17.8268 7.58283L13.3297 3.16165L13.268 3.10864C12.9078 2.83964 12.3776 3.09805 12.3776 3.57782V5.70757L12.153 5.72268C8.59039 6.00547 6.50344 8.25989 6.00472 12.3501C5.94067 12.8754 6.54318 13.2042 6.93261 12.8564C8.36448 11.5779 9.84382 10.784 11.3776 10.4657C11.6236 10.4147 11.871 10.3759 12.1199 10.3493L12.3776 10.3261V12.4216L12.3829 12.5039C12.4429 12.9566 12.992 13.1699 13.3298 12.8377ZM12.2263 6.72L13.3776 6.64256V4.61104L16.8238 7.99905L13.3776 11.3882V9.23223L12.022 9.35403L12.0136 9.35493C10.3113 9.53692 8.70337 10.2189 7.18674 11.3555C7.48493 10.0174 7.99417 9.01008 8.6632 8.28852C9.49235 7.39426 10.6526 6.84605 12.2263 6.72ZM5.5 4C4.11929 4 3 5.11929 3 6.5V14.5C3 15.8807 4.11929 17 5.5 17H13.5C14.8807 17 16 15.8807 16 14.5V13.5C16 13.2239 15.7761 13 15.5 13C15.2239 13 15 13.2239 15 13.5V14.5C15 15.3284 14.3284 16 13.5 16H5.5C4.67157 16 4 15.3284 4 14.5V6.5C4 5.67157 4.67157 5 5.5 5H8.5C8.77614 5 9 4.77614 9 4.5C9 4.22386 8.77614 4 8.5 4H5.5Z" fill="#757575"></path>
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <SaveOutlined />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SavedPost
