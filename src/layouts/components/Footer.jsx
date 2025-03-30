import { MailOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Navigation Links */}
        <div className="footer-nav">
          {/* Column 1 */}
          <div className="nav-column">
            <a href="/" className="nav-item bold">Trang chủ</a>
            <a href="/video" className="nav-item">Video</a>
            <a href="/podcasts" className="nav-item">Podcasts</a>
            <a href="/anh" className="nav-item">Ảnh</a>
            <a href="/infographics" className="nav-item">Infographics</a>
            <a href="/moi-nhat" className="nav-item">Mới nhất</a>
            <a href="/xem-nhieu" className="nav-item">Xem nhiều</a>
            <a href="/tin-nong" className="nav-item">Tin nóng</a>
            <a href="/newsletter" className="nav-item">Newsletter</a>
          </div>

          {/* Column 2 */}
          <div className="nav-column">
            <a href="/thoi-su" className="nav-item">Thời sự</a>
            <a href="/the-gioi" className="nav-item">Thế giới</a>
            <a href="/kinh-doanh" className="nav-item">Kinh doanh</a>
            <a href="/cong-nghe" className="nav-item">Công nghệ</a>
            <a href="/khoa-hoc" className="nav-item">Khoa học</a>
            <a href="/goc-nhin" className="nav-item">Góc nhìn</a>
          </div>

          {/* Column 3 */}
          <div className="nav-column">
            <a href="/bat-dong-san" className="nav-item">Bất động sản</a>
            <a href="/suc-khoe" className="nav-item">Sức khỏe</a>
            <a href="/the-thao" className="nav-item">Thể thao</a>
            <a href="/giai-tri" className="nav-item">Giải trí</a>
            <a href="/phap-luat" className="nav-item">Pháp luật</a>
            <a href="/giao-duc" className="nav-item">Giáo dục</a>
          </div>

          {/* Column 4 */}
          <div className="nav-column">
            <a href="/doi-song" className="nav-item">Đời sống</a>
            <a href="/xe" className="nav-item">Xe</a>
            <a href="/du-lich" className="nav-item">Du lịch</a>
            <a href="/y-kien" className="nav-item">Ý kiến</a>
            <a href="/tam-su" className="nav-item">Tâm sự</a>
            <a href="/thu-gian" className="nav-item">Thư giãn</a>
          </div>

          {/* Column 5 */}
          <div className="nav-column">
            <a href="/rao-vat" className="nav-item">Rao vặt</a>
            <a href="/startup" className="nav-item">Startup</a>
          </div>

        </div>

        {/* Newsletter Subscription */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <MailOutlined className="mail-icon" />
            <div className="newsletter-text">
              <h3>Đừng bỏ lỡ tin tức quan trọng!</h3>
              <p>Nhận tóm tắt tin tức nổi bật, hấp dẫn nhất 24 giờ qua trên Blog.</p>
            </div>
            <div className="newsletter-form">
              <Input 
                placeholder="nthanhtuong883@gmail.com" 
                className="email-input"
              />
              <Button type="primary" className="">
                Đăng ký
              </Button>
            </div>
            <div className="terms">
              *Khi đăng ký, bạn đồng ý với <a href="#">điều khoản</a> của Blog
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;