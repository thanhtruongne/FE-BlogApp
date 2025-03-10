
const EmptyIcon = ({link = '#',text}) => {

    return (
        <div className="w-full h-[300px]">
            <div className="ctn-empty">
                <div className="">
                    <img src="https://s1.vnecdn.net/vnexpress/restruct/i/v9559/v2_2019/pc/graphics/icon-empty-noti.png" alt=""  className="mx-auto mb-6"/>
                </div>
                <p>
                  <a href={link} className="btn_log">Đăng nhập ngay</a>
                </p>
                <p className="txt">{text}</p>
                 
            </div>
        </div>
    )
    
}


export default EmptyIcon