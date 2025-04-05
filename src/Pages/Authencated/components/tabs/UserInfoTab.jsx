import { Button, Image, Input } from 'antd';
import { HttpStatusCode } from 'axios';
import { useState } from 'react';
import Author from '../../../../apis/Author';
import showMessage from '../../../../Helpers/showMessage';
import { getUserCurrent } from '../../../../slices/auth';
import ProfileEditModal from '../ProfileEditModal';

const UserInfoTab = ({ user, dispatch}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');
    const [userData, setUserData] = useState(user);
    const [loadingBtn,setLoadingBtn] = useState(false)
    const showModal = (type) => {
        setModalType(type);
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = async(type, values) => {
        setLoadingBtn(true)
        try {
            values.type = type;   
            await Author.changeFieldsDataUser(userData?.id, values)
            .then(async(res) => {
                console.log(res.data,'check data2')
                if(res.status == HttpStatusCode.Ok) { 
                    const userResponse = await dispatch(getUserCurrent()).unwrap();
                    setUserData(userResponse.data);
                    showMessage(res.message,'success');
                    setIsModalVisible(false);
                }
            });
        } catch (error) {
            showMessage(error.message, 'error');
        } 
        finally {
            setLoadingBtn(false);
        }
    };

    return (
        <div className="w-full w-[240px] relative" style={{ maxWidth: "562px"}}>

            <div className="text-[22px] font-bold text-[#222] mb-[24px]">Thông tin tài khoản</div>

            <div className="wrapper_user w-full">
                <div className="detail_data pb-3 mb-3">
                    <div className="w-full border border-gray-200 rounded-md mb-4 overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <div className="">
                                <div className="font-medium mb-3">Ảnh đại diện</div>
                                {userData?.imageURL ? (             
                                    <div className="w-16 h-16 rounded-full bg-violet-500 text-white flex items-center justify-center text-lg font-medium overflow-hidden">
                                        {/* <img src={userData?.imageURL} alt="Avatar" className="w-full h-full object-cover" /> */}
                                        <Image 
                                            width={150}
                                            className="w-full h-full object-cover"
                                            src={userData?.imageURL}
                                        />
                                    </div>
                                ) : (
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium bg-[#E5E5E5] text-[#9F9F9F]">{userData?.full_name?.charAt(0) || 'N'}</span>
                                )}
                            </div>
                            <Button type="primary"  onClick={() => showModal('avatar')}>Thay Đổi</Button>
                        </div>
                        {/* <div className="p-4 flex items-center justify-between">
                              
                        </div> */}
                    </div>

                    {/* Name Section */}
                    <div className="w-full border border-gray-200 rounded-md mb-4 overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <div className="">
                                <div className="font-medium mb-3">Họ tên</div>
                                <p className="text-[16px] text-[#757575] w-full" style={{ lineHeight : '140%' }}>
                                    {userData?.full_name || 'Trống'}
                                </p>
                            </div>
                            <Button type="primary"  onClick={() => showModal('name')}>Thay Đổi</Button>
                        </div>
                    </div>

                    {/* Email Section */}
                    <div className="w-full border border-gray-200 rounded-md mb-4 overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <div className="">
                                <div className="font-medium mb-3">Email</div>
                                <p className="text-[16px] text-[#757575] w-full" style={{ lineHeight : '140%' }}>
                                    {userData?.email || 'Trống'}
                                </p>
                            </div>
                            <Button type="primary"  onClick={() => showModal('email')}>Thay Đổi</Button>
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="w-full border border-gray-200 rounded-md mb-4 overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <div className="mb-3">
                                <div className="font-medium">Mật khẩu</div>
                                <div className="mb-2 custom_input_password_hidden">
                                    <Input.Password 
                                        className=''
                                        readOnly
                                        placeholder="Nhập mật khẩu hiện tại" 
                                        value={'text'}
                                    />
                                </div>
                            </div>
                            <Button type="primary"  onClick={() => showModal('password')}>Thay Đổi</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for editing user information */}
            <ProfileEditModal
                isVisible={isModalVisible}
                modalType={modalType}
                user={userData}
                onCancel={handleCancel}
                loading={loadingBtn}
                onSave={handleSave}
            />
        </div>
    );
};

export default UserInfoTab;
